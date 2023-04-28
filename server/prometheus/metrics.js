const { setCounterLabelNameValue, clearRegistry } = require('./registry');
const { dockerContainers } = require('dockerstats');

async function updateMetrics() {
    clearRegistry();

    await updateContainersPort();
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

module.exports = {
    updateMetrics
}