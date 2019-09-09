const helpers = require('./_helpers');

module.exports = {
  authenticated: (req, res, next) => {
    if (helpers.isAuthenticated(req)) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用')
    res.redirect('/users/login')
  }
}
