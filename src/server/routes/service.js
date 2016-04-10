import express from 'express';
import common from 'jsCommon';
import * as middleware from '../middleware';


const router = express.Router();
const _ = common.util.lodash;


export default function (deps) {
  /*
   * GET /service/
   */
  router.get('/', middleware.isAuthenticated, (req, res) => {
    const service = deps.models.service;

    service.apply(service.model, 
      new service.commands.SERVICE_READ_REQUESTED({
        data: req.query
      })
    ).then(function (ev) {
      res.send(JSON.stringify(ev));
    });

  });

  // todo OPTIONS
  router.options('/', middleware.isAuthenticated, (req, res) => {
    const service = deps.models.service;

    res.send(JSON.stringify({
      eventType: 'SERVICE_SCHEMA_INFO_SUCCEEDED',
      data: service.schema.def
    }));
  })


  return router;
}
