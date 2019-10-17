/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 */

const expect = require('chai').expect;
const debug = require('debug')('test:simple');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { prepareCliCommand } = require('./utils');

describe('should be able to fetch url content', function() {
  it('should return content of https://www.google.com without error', async function() {
    const result = await exec(prepareCliCommand(['https://www.google.com']));

    debug('result:', result);

    expect(result).to.have.property('stdout');
    expect(result).to.have.property('stderr');

    expect(result.stderr).to.be.empty;
    expect(result.stdout).to.include('<html ');
  });
});
