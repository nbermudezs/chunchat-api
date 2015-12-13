var OpenTok = require('opentok');
var opentok = new OpenTok(
  process.env.TOKBOX_API_KEY,
  process.env.TOKBOX_API_SECRET
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

  // expose remote methods.

  Event.remoteMethod (
    'start',
    {
      http: { path: '/start', verb: 'get' },
      accepts: { arg: 'id', type: 'string', http: { source: 'query' } },
      returns: { arg: 'status', type: 'string' }
    }
  );

  Event.remoteMethod (
    'close',
    {
      http: { path: '/close', verb: 'get' },
      accepts: { arg: 'id', type: 'string', http: { source: 'query' } },
      returns: { arg: 'status', type: 'string' }
    }
  );

  Event.remoteMethod(
    'active',
    {
      http: { path: '/active', verb: 'get' },
      returns: { arg: 'events', type: 'array' }
    }
  )
};
