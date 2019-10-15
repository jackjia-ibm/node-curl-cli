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
Usage: ncc [options] <command> [command-options]

Commands:
  ncc labels <command>        List/add/delete labels of organization or user.
                                                                   [aliases: lb]
  ncc milestones <command>    List/add/delete milestones of a repository.
                                                                   [aliases: ms]
  ncc repositories <command>  List repositories of organization or user.
                                                      [aliases: repos, repo, rp]

GitHub:
  --organization   Github organization name.
  --template-repo  Github template repository name.
  --username, -u   Github account username. Required if API token is empty.
  --password, -p   Github account password. Required if API token is empty.
  --token          Github API token. Required if username is empty.

Options:
  --version      Show version number                                   [boolean]
  --config       Path to JSON config file
  --format       Response format. Available values are: plain, json.
                                                              [default: "plain"]
  --verbose, -v  Show more processing details.        [boolean] [default: false]
  -h, --help     Show help                                             [boolean]
```

For each command, you can type `ncc <command> -h` to get more detail help.
