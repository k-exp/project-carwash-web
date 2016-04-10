import express from 'express';
import common from 'jsCommon';
import * as middleware from '../middleware';


const router = express.Router();
const _ = common.util.lodash;


export default function (deps) {
  /*
   * GET /job/
   */
  router.get('/', middleware.isAuthenticated, (req, res) => {
    const job = deps.models.job;

    job.apply(job.model, 
      new job.commands.JOB_READ_REQUESTED({
        data: req.query
      })
    ).then(function (ev) {
      res.send(JSON.stringify(ev));
    });

  });

  // todo OPTIONS
  router.get('/opts', middleware.isAuthenticated, (req, res) => {
    const job = deps.models.job;

    res.send(JSON.stringify({
      eventType: 'JOB_SCHEMA_INFO_SUCCEEDED',
      data: job.schema.def
    }));
  })


  return router;
}
