var OpenTok = require('opentok');
var config  = require('./../../conf');

var opentok = new OpenTok(
  config.get('TOKBOX_APIKEY'),
  config.get('TOKBOX_APISECRET')
);

module.exports = function(Event) {
  Event.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    var options = {};
    options.mediaMode = req.mediaMode || 'relayed';

    opentok.createSession(options, function(err, session) {
      if (!err) {
        req.sessionId = session.sessionId;
      }

      next();
    });
  });

  Event.statuses = {
    CREATED: 'CREATED',
    STARTED: 'STARTED',
    CLOSED : 'CLOSED'
  };

  function updateStatus(eventId, newStatus, cb) {
    Event.findById( eventId, function (err, instance) {
      if (err) return cb(err);
      if (!instance) return cb(null, null);

      instance.updateAttribute('status', newStatus, function(err, updated) {
        var response = updated && updated.status;
        cb(null, response);
      });
    });
  }

  Event.start = function(eventId, cb) {
    updateStatus(eventId, Event.statuses.STARTED, cb);
  }

  Event.close = function(eventId, cb) {
    updateStatus(eventId, Event.statuses.CLOSED, cb);
  }

  Event.active = function(cb) {
    var today = new Date();
    Event.find({
      where: { startsAt: { gt: today } }
    }, function(err, events) {
      if (err) return cb(err);
      if (!events) return cb();
      cb(null, events);
    });
  }

  Event.getToken = function(eventId, cb) {
    Event.findById(eventId, function(err, ev) {
      if (err) return cb(err);
      if (!ev) return cb();

      cb(null, { token: opentok.generateToken(ev.sessionId) });
    });
  }

  // expose remote methods.
  var acceptId = {
    arg: 'id', type: 'any',
    required: true,
    description: 'Model id',
    http: { source: 'path' }
  };

  Event.remoteMethod(
    'active',
    {
      http: { path: '/active', verb: 'get' },
      returns: { arg: 'events', type: 'array' }
    }
  );

  Event.remoteMethod (
    'start',
    {
      http: { path: '/:id/start', verb: 'post' },
      accepts: acceptId,
      returns: { arg: 'status', type: 'string' }
    }
  );

  Event.remoteMethod (
    'close',
    {
      http: { path: '/:id/close', verb: 'post' },
      accepts: acceptId,
      returns: { arg: 'status', type: 'string' }
    }
  );

  Event.remoteMethod(
    'getToken',
    {
      http: { path: '/:id/getToken', verb: 'get' },
      accepts: acceptId,
      returns: { arg: 'token', type: 'string' }
    }
  )
};
