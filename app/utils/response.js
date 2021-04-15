'use strict';

const customId = require('custom-id');

const ResponseErrorCode = {
  BaseSuccess: '0',
  BaseError: '1',

  AuthError: '10000',
  AuthTimeoutError: '10001',
  AuthNeedResError: '10004',

  ValidateError: '10002',
  SequelizeError: '10003',
};

const ErrorMessage = {
  [ResponseErrorCode.BaseSuccess]: '请求成功',
  [ResponseErrorCode.BaseError]: '网络错误，请重试',
  [ResponseErrorCode.AuthError]: '请登录',
  [ResponseErrorCode.AuthTimeoutError]: '登录时间过长，请重新登录',

  [ResponseErrorCode.ValidateError]: '参数错误，请重试',
  [ResponseErrorCode.SequelizeError]: '数据错误，请重试',
  [ResponseErrorCode.AuthNeedResError]: '用户未注册',
};

class Response {

  genTraceId() {
    this.res.traceId = customId({ lowerCase: true });
    return customId({ lowerCase: true });
  }

  msg(msg, success, options) {
    this.res = {
      ...options,
      success,
      errorMessage: msg,
    };
    this.genTraceId();
    return this.res;
  }

  error(code, msg, options) {
    this.res = {
      ...options,
      success: false,
      errorMessage: msg || ErrorMessage[code] || ErrorMessage[ResponseErrorCode.BaseError],
      errorCode: code,
    };
    this.genTraceId();
    return this.res;
  }

  success(data, msg) {
    this.res = {
      data,
      success: true,
      errorMessage: msg || ErrorMessage[ResponseErrorCode.BaseSuccess] || ErrorMessage[ResponseErrorCode.BaseSuccess],
      errorCode: ResponseErrorCode.BaseSuccess,
    };
    this.genTraceId();
    return this.res;
  }
}

const genRespContractData = data => {
  return {
    errorCode: { type: 'number', required: true, example: 0 },
    errorMessage: { type: 'string', required: false, example: '' },
    showType: { type: 'number', required: false, enum: [ 0, 1, 2, 3, 4, 9 ] },
    success: { type: 'boolean', required: true, example: true },
    data,
  };
};

module.exports = {
  default: Response,
  genRespContractData,
  ErrorMessage,
  ResponseErrorCode,
};
