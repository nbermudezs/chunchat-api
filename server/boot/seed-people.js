module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
  var users = [
    {
      firstName: 'Nestor',
      email: 'nestor.bermudez@agilityfeat.com',
      password: 'AGILITYfeat1'
    }
  ];

  app.models.Person.create(users, function(err, response) {
    cb();
  })
};
