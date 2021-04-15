'use strict';

const Response = require('../utils/response').default;
const ResponseErrorCode = require('../utils/response').ResponseErrorCode;

const handleCustomErr = (ctx, err) => {
  if (err.errorCode) {
    let result = {};
    const errorCodeHandle = {
      10001: () => {
        return { showType: 0 };
      },
    };

    if (
      errorCodeHandle[err.errorCode] &&
            errorCodeHandle[err.errorCode] instanceof Function
    ) {
      const res = errorCodeHandle[err.errorCode](err);
      if (res.constructor === Object) {
        result = res;
      }
    }
    ctx.status = 200;

    ctx.body = new Response().error(ResponseErrorCode.ValidateError, result.errorMessage, {
      data: err.data,
      success: false,
      showType: err.showType,
    });

    return true;
  }
  return false;
};

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      // eslint-disable-next-line no-empty
      if (status >= 400 && status < 500) {

      }
      delete err.message;

      // 自定义错误码
      ctx.status = status;

      // 处理自定义错误
      if (handleCustomErr(ctx, err)) return;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { ...err };
    }
  };
};
