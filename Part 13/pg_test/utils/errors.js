export class ApplicationError extends Error {
  constructor(
    message = "Something went wrong",
    status = 500,
    properties = null
  ) {
    super(message);

    this.message = this.constructor.name;
    this.status = status;
    this.properties = properties;
  }

  toJSON() {
    return {
      message: this.message,
      properties: this.properties,
      status: this.status,
    };
  }
}

export class ValidationError extends ApplicationError {
  constructor(
    message = "The requested resource is not found",
    properties = null
  ) {
    super(message, 404, properties);
  }
}
