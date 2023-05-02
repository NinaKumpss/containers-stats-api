const { setCounterLabelNameValue, clearRegistry } = require('./registry');
const { dockerContainers, dockerInfo } = require('dockerstats');

async function updateMetrics() {
    clearRegistry();

    await updateContainersPort();
    await updateContainersState();
}

async function updateContainersPort() {
    try {
        const data = await dockerContainers();

        for (const container of data) {
            const name = container.name;
            const image = container.image;

            let port = -1;
            for (const portObject of container.ports) {
                if (portObject.PublicPort) {
                    port = portObject.PublicPort;
                    break;
                }
            }

            setCounterLabelNameValue("containers_port", { name: name, image: image }, port);
        }
    } catch (e) {
        console.log(e)
    }
}

async function updateContainersState() {
    try {
        const data = await dockerInfo();
        setCounterLabelNameValue("containers_state", { state: 'running' }, data.containersRunning);
        setCounterLabelNameValue("containers_state", { state: 'paused' }, data.containersPaused);
        setCounterLabelNameValue("containers_state", { state: 'stopped' }, data.containersStopped);
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    updateMetrics
}