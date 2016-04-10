import express from 'express';
import common from 'jsCommon';
import * as middleware from '../middleware';


const router = express.Router();
const _ = common.util.lodash;


export default function (deps) {
  /*
   * GET /customer/
   */
  router.get('/', middleware.isAuthenticated, (req, res) => {
    const customer = deps.models.customer;

    customer.apply(customer.model, 
      new customer.commands.CUSTOMER_READ_REQUESTED({
        data: req.query
      })
    ).then(function (ev) {
      res.send(JSON.stringify(ev));
    });

  });

  // todo OPTIONS
  router.options('/', middleware.isAuthenticated, (req, res) => {
    const customer = deps.models.customer;

    res.send(JSON.stringify({
      eventType: 'CUSTOMER_SCHEMA_INFO_SUCCEEDED',
      data: customer.schema.def
    }));
  })


  return router;
}
