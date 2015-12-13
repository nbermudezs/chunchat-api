var archiveOptions = {
  name: 'Session Archive',
  outputMode: config.get('ARCHIVE_OUTPUTMODE')
};

module.exports = {
  exposeMethods: function(Model) {
    var acceptId = {
      arg: 'id', type: 'any',
      required: true,
      description: 'Model id',
      http: { source: 'path' }
    };

    Model.startArchive = function(id, cb) {
      Model.findById(id, function(err, model) {
        if (err) return cb(err);

        var sessionId = model && model.sessionId;
        if (!sessionId) return cb();

        opentok.startArchive(sessionId, archiveOptions, function(err, archive) {
          if (err) return cb(null, { success: false });

          model.updateAttribute('archiveId', archive.id);
          cb(null, { success: archive.status === 'started' });
        });
      });
    };

    Model.stopArchive = function(id, cb) {
      Model.findById(id, function(err, model) {
        if (err) return cb(err);

        var archiveId = model && model.archiveId;
        if (!archiveId) return cb();

        opentok.stopArchive(archiveId, function(err, archive) {
          cb(null, { success: !!err });
        });
      });
    };

    Model.remoteMethod(
      'startArchive',
      {
        http: { path: '/:id/startArchive', verb: 'post' },
        accepts: acceptId,
        returns: { arg: 'success', type: 'boolean' },
        description: 'Indicate TokBox to start the archiving of the session.'
      }
    );

    Model.remoteMethod(
      'stopArchive',
      {
        http: { path: '/:id/stopArchive', verb: 'post' },
        accepts: acceptId,
        returns: { arg: 'success', type: 'boolean' },
        description: 'Indicate TokBox to stop the ongoing archiving of the session.'
      }
    );
  }
}
