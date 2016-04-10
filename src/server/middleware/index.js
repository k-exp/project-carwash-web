
export function isAuthenticated(req, res, next) {
  if(req.session.key) {
    next();
  }
  else {
    res.redirect('/authenticate');
  }
}