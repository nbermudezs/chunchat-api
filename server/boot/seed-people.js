module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
  var RoleMapping = app.models.RoleMapping;
  var Person = app.models.Person;
  var Role = app.models.Role;

  var users = [
    {
      firstName: 'Nestor',
      email: 'nestor.bermudez+dev@agilityfeat.com',
      password: 'AGILITYfeat1'
    },
    {
      firstName: 'Nestor',
      email: 'nestor.bermudez+user@agilityfeat.com',
      password: 'AGILITYfeat1'
    },
    {
      firstName: 'Nestor',
      email: 'nestor.bermudez+admin@agilityfeat.com',
      password: 'AGILITYfeat1'
    }
  ];

  Person.create(users, function(err, users) {
    if (err) return cb();

    Role.create({
      name: 'admin'
    }, function (err, role) {
      if (err || !role) return;
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      })
    });

    Role.create({
      name: 'developer'
    }, function (err, role) {
      if (err || !role) return;
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      })
    });

    cb();
  })
};
