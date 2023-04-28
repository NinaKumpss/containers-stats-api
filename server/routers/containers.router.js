const express = require('express');
const containersController = require('../controllers/containers.controller');

const router = () => {
  const apiRouter = express.Router();

  apiRouter.route('/containers/metrics').get(containersController.getMetrics);

  return apiRouter;
};

module.exports = router;
