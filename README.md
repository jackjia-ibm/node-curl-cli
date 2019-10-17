# node-curl-cli

![Actions Status](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/badge/jackjia-ibm/node-curl-cli?style=flat-square)

GitHub tools to synchronize milestones or labels across all organization/user repositories.

## Prerequisites

- [Node.JS](https://nodejs.org/) v8.x LTS or above.

  The suggested way to install node.js is install [Node Version Manager](https://github.com/creationix/nvm). Follow [this](https://github.com/creationix/nvm#installation) instruction to install.

- GitHub credentials. You can use your username and password, or generate access tokens from [GitHub Settings - Developer Settings - Personal access tokens](https://github.com/settings/tokens).

## Installation

Install from npm registry.

```
npm install node-curl-cli -g
```

To upgrade, you can run the above command again.

## Usage

To find command help, type `ncc -h`:

```
$ ncc -h
ncc

fetch url

Options:
  --version, -V     Show version number                                [boolean]
  --user, -u        Server user and password.
  --headers, -H     Pass custom header LINE to server (H)                [array]
  --request, -X     Specify request command to use              [default: "GET"]
  --data, -d        HTTP POST data (H)
  --data-raw        HTTP POST data, '@' allowed (H)
  --fail, -f        Fail silently (no output at all) on HTTP errors (H)[boolean]
  --include, -i     Include protocol headers in the output (H/F)       [boolean]
  --insecure, -k    Allow connections to SSL sites without certs (H)   [boolean]
  --silent, -s      Silent mode (don't output anything)                [boolean]
  --show-error, -S  Show error. With -s, make curl show errors when they occur
                                                                       [boolean]
  --user-agent, -A  Specify  the  User-Agent string to send to the HTTP server.
  --output, -o      Write  output  to  <file>  instead  of  stdout.
  --verbose, -v     Show more processing details.     [boolean] [default: false]
  -h, --help        Show help                                          [boolean]
```

For each command, you can type `ncc <command> -h` to get more detail help.
