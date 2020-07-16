/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-14 14:49:56
 * @modify date 2020-07-14 14:49:56
 * @desc [description]
 */

const { to } = require("await-to-js");
const { parseError } = require("parse-error");

module.exports.to = async (promise) => {
  let error, res;
  [error, res] = await to(promise);

  if (error) return [parseError(error)];

  return [null, res];
};

module.exports.ResponseError = function (response, error, code) {
  if (typeof error == "object" && typeof error.message != "undefined") {
    error = error.message;
  }

  if (typeof code !== "undefined") response.statusCode = code;
  return response.json({ success: false, error: error });
};

module.exports.ResponseSuccess = function (response, data, code) {
  let send_data = { success: true };

  if (typeof data == "object") {
    send_data = Object.assign(data, send_data);
  }

  if (typeof code !== "undefined") res.statusCode = code;
  return response.json(send_data);
};

module.exports.TerminalError = TerminalError = function (error_message, log) {
  if (log === true) {
    console.error(error_message);
  }

  throw new Error(error_message);
};
