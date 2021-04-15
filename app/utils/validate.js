const schema = require('async-validator').default;
const ResponseErrorCode = require('./response').ResponseErrorCode;

class Validator {
  static async validate(rules, data, code = ResponseErrorCode.ValidateError, noReturn = false) {

    data = data || this.request.body;
    const _validator = new schema(rules);

    function p() {
      return new Promise(
        (resolve, _reject) => {
          _validator.validate(data, (err, fields) => {
            if (err) {
              resolve({ message: 'error', err, fields });
            } else {
              resolve({ message: 'success' });
            }
          });
        },
        err => {
          console.log(err);
        }
      );
    }

    const res = await p();

    if (noReturn) {
      return res;
    }

    if (res.message === 'error') {

      this.throw(422, {
        errorCode: code,
        success: false,
        data: {

          error: res.err,

          fields: res.fields,
        },

        errorMessage: res.err[0].message,
        timestamp: Date.now(),
      });

    }
  }

  static async filterValidate(keys = [], rules, data, code = ResponseErrorCode.ValidateError) {
    let _rules = {};

    // 如果只传一个key
    if (typeof keys === 'string') {
      handleRules(keys);
      await Validator.validate.call(this, _rules, data, code);
    }

    if (keys instanceof Array) {
      if (keys.length) {
        if (!checkRepeatArr(keys)) {
          // 如果没有检测到重复keys
          keys.forEach(key => {
            handleRules(key);
          });
          await Validator.validate.call(this, _rules, data, code);
        } else {

          this.throw(500, 'Internal Server Error', {
            timestamp: Date.now(),
          });
        }
      } else {
        await Validator.validate.call(this, _rules, data, code);
        return;
      }
    }


    function handleRules(key) {
      if (handleKey(key)) {
        // 只校验传来的key的规则
        _rules[key] = rules[key];
      } else {
        _rules = rules;
        delete _rules[key];
      }
    }

    function checkRepeatArr(arr) {
      const json = {};
      const even = str => {
        let _str = str;
        if (!handleKey(str)) _str = str.substr(1);

        if (json[_str] >= 1) return true;
        json[_str] = 1;
      };

      return arr.some(even);
    }

    // 校验key  ^!代表排除这个key
    function handleKey(key) {
      if (key.startsWith('!')) {
        return false;
      }
      return true;

    }
  }


  static async RuleValidate(rules, data, code = 20002) {

    data = data || this.request.body;
    const _validator = new schema(rules);

    function p() {
      return new Promise(
        (resolve, _reject) => {

          _validator.validate(data, (err, fields) => {
            if (err) {
              resolve({ message: 'error', err, fields });
            } else {
              resolve({ message: 'success' });
            }
          });
        },
        err => {
          console.log(err);
        }
      );
    }

    const res = await p();

    if (res.message === 'error') {

      this.throw(422, {
        errorCode: code,
        success: false,
        data: {

          error: res.err,
          fields: res.fields,
        },
        errorMessage: res.err[0].message,
        timestamp: Date.now(),
      });
    }
  }


}

module.exports = Validator;
