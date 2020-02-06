#!/usr/bin/env node
const logger = require('./lib/logger');
const getViewer = require('./lib/get-viewer');
const onMyPlate = require('./lib/on-my-plate');

(async () => {
  try {
    const assignee = await getViewer();
    logger.debug(`Logged in as ${assignee}`);

    const [high, medium, low, noAssignedPriority] = await onMyPlate(assignee);
    logger.debug(`High priority items ${JSON.stringify(high, null, 4)}`);
    logger.debug(`Medium priority items ${JSON.stringify(medium, null, 4)}`);
    logger.debug(`Low priority items ${JSON.stringify(low, null, 4)}`);
    logger.debug(`No assigned priority items ${JSON.stringify(noAssignedPriority, null, 4)}`);
  } catch (e) {
    logger.error(e);
  }
})();
