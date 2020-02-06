#!/usr/bin/env node
const logger = require('./lib/logger');
const getViewer = require('./lib/get-viewer');
const onMyPlate = require('./lib/on-my-plate');

(async () => {
  try {
    const assignee = await getViewer();
    logger.debug(`Logged in as ${assignee}`);

    const plate = await onMyPlate(assignee);
    logger.debug(`Plate ${JSON.stringify(plate, null, 4)}`);
  } catch (e) {
    logger.error(e);
  }
})();
