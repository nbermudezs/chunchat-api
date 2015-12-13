module.exports = function(Person) {

  // Add expiration to the user token.
  var TWO_WEEKS = 60 * 60 * 24 * 7 * 2;
  Person.beforeRemote('login', function(context, user, next) {
    var req = context.req;
    req.body.ttl = TWO_WEEKS;
    next();
  });

};
