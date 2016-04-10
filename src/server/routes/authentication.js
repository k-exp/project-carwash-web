import express from 'express';
import common from 'jsCommon';

const router = express.Router();
const _ = common.util.lodash;


export default function (deps) {
  /*
   * GET /authenticate
   */
  router.get('/', function (req, res) {
    if(req.session.key) {
      res.redirect('/');
    }
    else {
      res.render('login');
    } 
  });


  router.post('/', function (req, res) {
    //console.log(req.body.user.email);
    //console.log(req.body.user.password);

    const email = req.body.user.email;
    const password = req.body.user.password;
    const user = deps.models.user;

    user.apply(user.model, 
      new user.commands.USER_VALIDATION_REQUESTED({
        data: {
          email: email,
          password: password
        }
      })
    )
    .then(function (ev) {
      switch(ev.eventType) {
        case 'USER_VALIDATION_FAILED':
          res.redirect('/');
          break;
        case 'USER_VALIDATION_SUCCEEDED':
          if(ev.data) {
            req.session.key = email;
          }
          res.redirect('/');
          break;
        default:
          res.redirect('/');
      }
    })
    .catch(function () {
      res.redirect('/');
    });
  });

  return router;
}
