#!/usr/bin/env node

/**
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v2.0 which accompanies this
 * distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 */

const chalk = require('chalk');

const { Curl } = require('./libs/curl');

let logger;
const startLogging = argv => {
  // init logger
  logger = require('./libs/logger')(argv.verbose ? 'debug' : 'info');
  logger.debug('argv: %j', argv);

  argv.logger = logger;
};

// parse arguments
const yargs = require('yargs');
yargs
  .version()
  .alias('version', 'V')
  .scriptName('ncc')
  .usage('Usage: $0 [options] <url>')
  .command('*', 'fetch url', () => {}, async (argv) => {
    const url = argv._ && argv._[0];
    if (!url) {
      throw new Error('<url> is missing');
    }

    const curl = new Curl(argv);
    await curl.req(url, argv);
  })
  .options({
    user: {
      alias: 'u',
      description: 'Server user and password.',
    },
    headers: {
      alias: 'H',
      description: 'Pass custom header LINE to server (H)',
      type: 'array',
    },
    request: {
      alias: 'X',
      description: 'Specify request command to use',
      default: 'GET',
    },
    data: {
      alias: 'd',
      description: 'HTTP POST data (H)',
    },
    'data-raw': {
      description: 'HTTP POST data, \'@\' allowed (H)',
    },
    fail: {
      alias: 'f',
      description: 'Fail silently (no output at all) on HTTP errors (H)',
      type: 'boolean',
    },
    include: {
      alias: 'i',
      description: 'Include protocol headers in the output (H/F)',
      type: 'boolean',
    },
    insecure: {
      alias: 'k',
      description: 'Allow connections to SSL sites without certs (H)',
      type: 'boolean',
    },
    silent: {
      alias: 's',
      description: 'Silent mode (don\'t output anything)',
      type: 'boolean',
    },
    'show-error': {
      alias: 'S',
      description: 'Show error. With -s, make curl show errors when they occur',
      type: 'boolean',
    },
    'user-agent': {
      alias: 'A',
      description: 'Specify  the  User-Agent string to send to the HTTP server.',
    },
    output: {
      alias: 'o',
      description: 'Write  output  to  <file>  instead  of  stdout.',
    },
    verbose: {
      alias: 'v',
      default: false,
      description: 'Show more processing details.',
      type: 'boolean',
    }
  })
  .help()
  .alias('h', 'help')
  .middleware([startLogging])
  .fail((msg, err) => {
    const l = logger || console;
    if (msg) {
      l.error(msg);
    }
    if (err) {
      l.error(`${err}`);
    }
    l.error(chalk `Try {green --help} to get usage information, or use {green --verbose} option to display more details.`);
    process.exit(1);
  })
  .parse();
