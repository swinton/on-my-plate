#!/usr/bin/env node
const nunjucks = require('nunjucks');
const argv = require('minimist')(process.argv.slice(2));
const logger = require('./lib/logger');
const getViewer = require('./lib/get-viewer');
const onMyPlate = require('./lib/on-my-plate');
const reportTemplate = require('./lib/report-template');

(async () => {
  try {
    const assignee = argv.assignee || (await getViewer());
    logger.debug(`Generating for ${assignee}`);

    const [high, medium, low, tbd] = await onMyPlate(assignee);
    logger.debug(`High priority items ${JSON.stringify(high, null, 4)}`);
    logger.debug(`Medium priority items ${JSON.stringify(medium, null, 4)}`);
    logger.debug(`Low priority items ${JSON.stringify(low, null, 4)}`);
    logger.debug(`No assigned priority items ${JSON.stringify(tbd, null, 4)}`);

    // Render report
    const report = nunjucks.renderString(reportTemplate, {
      assignee,
      high,
      medium,
      low,
      tbd,
      now: new Date().toUTCString()
    });

    // Write report to STDOUT
    process.stdout.write(report);
  } catch (e) {
    logger.error(e);
  }
})();
