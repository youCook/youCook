
// module.exports.checkLogin = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// };

module.exports.checkLogin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.active) {
    next();
  } else if (req.isAuthenticated()) {
    res.redirect('/auth/checkmail')
  } else {
    res.redirect('/login');
  }
};

// module.exports.checkRole = role => (req, res, next) => {
//   if (req.isAuthenticated() && req.user.role === role) {
//     next();
//   } else {
//     res.redirect('/');
//   }
// };
