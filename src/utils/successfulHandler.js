/**
 * Format data to return to user
 * @param {*} res
 * @param {object} data
 * @param {number} statusCode
 * @param {string} message
 * @param {*} pagination
 * @returns object{
  success: true,
  data,
  message,
  pagination,
}
 */
const handleSuccess = (res, data, statusCode, message = '', pagination = {}) => res.status(statusCode).send({
  success: true,
  statusCode,
  data,
  message,
  pagination,
});

module.exports = handleSuccess;
