/**
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v2.0 which accompanies this
 * distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 */

const debug = require('debug')('test:utils');
const chalk = require('chalk');

const CLI_COMMAND = 'ncc';

const prepareCliCommand = (args) => {
  const params = [
    ...args,
  ].map(one => one.substr(0, 1) === '-' ? one : `"${one}"`);

  const final = [
    CLI_COMMAND,
    ...params,
  ].join(' ');

  debug(`Command: ${chalk.blue(final)}`);

  return final;
};

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive 
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  CLI_COMMAND,

  prepareCliCommand,

  getRandom,
};
