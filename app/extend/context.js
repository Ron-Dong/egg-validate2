'use strict';

const Validator = require('../utils/validate');

module.exports = {
  validator() {
    return {
      validate: Validator.validate.bind(this),
      fValidate: Validator.filterValidate.bind(this),
      ruleValidator: Validator.RuleValidate.bind(this),
    };
  },
};
