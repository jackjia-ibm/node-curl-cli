/**
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v2.0 which accompanies this
 * distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 */

const http = require('http');
const https = require('https');
const URL = require('url');

class Curl {  
  constructor(options) {
    // give default value
    if (!options) {
      options = {};
    }

    // assign logger
    const { logger } = (options);
    this.logger = logger;
  }

  async req(url, options) {
    // parse url
    const urlObj = URL.parse(url);
    const {
      protocol,
      host,
      hostname,
      port,
      path,
      hash,
    } = urlObj;
    this.logger.debug('url: %s', url);
    this.logger.debug('url parsed: %j', urlObj);

    // parse headers
    let headers = {};
    if (options.headers && options.headers.length) {
      for (let header of options.headers) {
        let m = header.match(/^([^:]+):(.*)$/);
        if (m) {
          headers[m[1].trim()] = m[2].trim();
        }
      }
    }

    // parse post data
    if (options.data) {
      headers['Content-Length'] = Buffer.byteLength(options.data);
    }

    let requestOptions = {
      method: (options.request && options.request.toUpperCase()) || 'GET',
      protocol,
      host,
      hostname,
      port,
      path: path + (hash ? '#' + hash : ''),
      headers,
      rejectUnauthorized: !!options.insecure,
    };

    if (options.user) {
      requestOptions.auth = options.user;
    }

    this.logger.debug('>>>>>>>>>>: %j', requestOptions);

    let p = new Promise((resolve, reject) => {
      const handler = protocol === 'https:' ? https : http;
      const req = handler.request(requestOptions, (res) => {

        let body = [];
        res.on('data', function(chunk) {
          body.push(chunk);
        });
        
        res.on('end', function() {
          try {
            res.body = Buffer.concat(body).toString();
          } catch(e) {
            reject(e);
            return;
          }

          resolve(res);
        });
      });
      
      req.on('error', (e) => {
        reject(e);
      });

      if (options.data) {
        req.write(options.data);
      }

      req.end();
    });
    
    p = p
      .then(res => {
        // console.log(res);

        if (options.include) {
          process.stdout.write(`HTTP/${res.httpVersion} ${res.statusCode}\n`);
          for (let key in res.headers) {
            process.stdout.write(`${key}: ${res.headers[key]}\n`);
          }
          process.stdout.write('\n');
        } else {
          this.logger.debug('<<<<<<<<<<: %d', res.statusCode);
          this.logger.debug('response headers:');
          for (let key in res.headers) {
            this.logger.debug(`- ${key}: ${res.headers[key]}`);
          }
        }

        process.stdout.write(res.body);
      });

    return p;
  }
}

module.exports = {
  Curl,
};
