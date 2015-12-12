module.exports = function(Event) {
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
};
