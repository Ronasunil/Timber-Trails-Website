export default class AppError extends Error {
  constructor(errormMessage, statusCode) {
    super(errormMessage);
    this.statusCode = +statusCode;
    this.status = String(statusCode).startsWith("4") ? "error" : "fail";
  }
}
