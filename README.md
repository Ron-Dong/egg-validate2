# egg-validate2

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-validate2.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-validate2
[travis-image]: https://img.shields.io/travis/eggjs/egg-validate2.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-validate2
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-validate2.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-validate2?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-validate2.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-validate2
[snyk-image]: https://snyk.io/test/npm/egg-validate2/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-validate2
[download-image]: https://img.shields.io/npm/dm/egg-validate2.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-validate2

<!--
Description here.
-->

## Install

```bash
$ npm i egg-validate2 --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.validate2 = {
  enable: true,
  package: 'egg-validate2',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.validate2 = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->
```js
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;

        await ctx.validator().validate({title: [{required: true, message: 'title is required!'}]},ctx.request.query);

        ctx.body = 'hi, egg';
    }
}

module.exports = HomeController;

```

See [async-validator](https://github.com/tmpfs/async-validate) for more information such as custom rule.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
