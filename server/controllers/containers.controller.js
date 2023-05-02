const { updateMetrics } = require('../prometheus/metrics');
const { getRegistryContentType, getRegistryMetrics } = require('../prometheus/registry');

const getMetrics = async (req, res) => {
  await updateMetrics();

  res.setHeader('Content-Type', getRegistryContentType());
  return res.end(await getRegistryMetrics());
}

module.exports = {
  getMetrics
}