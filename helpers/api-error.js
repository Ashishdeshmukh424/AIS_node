export class ApiError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.status = httpStatus;
  }
}
