
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
    res.redirect('/checkmail')
  } else {
    res.redirect('/login');
  }
};

module.exports.checkActive = (req, res, next) => {
  if (req.user.active) {
    next();
  } else {
    res.redirect('/checkmail');
  }
};
