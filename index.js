"use strict";
const
  _ = require("lodash"),
  args = require('parse-cli-arguments')({
    options: {
      input: {alias: "i", multiple: true, defaultOption: true},
      color: {
        alias: "C", transform: value => !value,
        defaultValue: true, flag: "no-color"
      },
      stack: {alias: "s", defaultValue: false, propName: "showStack"},
      verbosity: {
        alias: "v", transform: value => +value, defaultValue: 1
      }
    },
  }),
  Jasmine = require("jasmine-core"),
  jasmine = Jasmine.boot(Jasmine),
  env = jasmine.getEnv(),
  path = require("path"),
  reporters = require("jasmine-reporters");

module.id = "#candace";
env.addReporter(new reporters.TerminalReporter(_.omit(args, "input")));

for (let file of args.input) {
  require(path.resolve(file));
}

env.execute();
