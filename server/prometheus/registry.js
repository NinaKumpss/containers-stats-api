const promClient = require('prom-client');
const { Counter } = require('prom-client');

let registry = new promClient.Registry();

addCounter('containers_port', 'The containers port', ['name', 'image']);
addCounter('containers_state', 'The containers state', ['state']);

function addCounter(name, help, labelNames) {
    try {
        let counter = null;

        if (labelNames) {
            counter = new Counter({
                name: name,
                help: help,
                labelNames: labelNames,
            });
        } else {
            counter = new Counter({
                name: name,
                help: help,
            });
        }

        registry.registerMetric(counter);
    } catch (e) {
        console.error(e);
    }
}

function setCounterLabelNameValue(name, labelName, value) {
    try {
        registry.getSingleMetric(name).inc(labelName, value);
    } catch (e) {
        console.error(e);
    }
}

function getRegistryContentType() {
    return registry.contentType;
}

async function getRegistryMetrics() {
    return registry.metrics();
}

function clearRegistry() {
    registry.resetMetrics();
}

module.exports = {
    clearRegistry,
    setCounterLabelNameValue,
    getRegistryContentType,
    getRegistryMetrics,
}