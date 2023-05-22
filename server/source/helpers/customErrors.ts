/*=============================================
=                  HTTP 4XX                   =
=============================================*/

export class BadRequestError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class PaymentRequiredError extends Error {
  statusCode = 402;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, PaymentRequiredError.prototype);
  }
}

export class ForbiddenError extends Error {
  statusCode = 403;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class MethodNotAllowedError extends Error {
  statusCode = 405;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
  }
}

export class NotAcceptableError extends Error {
  statusCode = 406;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotAcceptableError.prototype);
  }
}

export class ConflictError extends Error {
  statusCode = 409;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class PayloadTooLargeError extends Error {
  statusCode = 413;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, PayloadTooLargeError.prototype);
  }
}

export class TooManyRequestsError extends Error {
  statusCode = 429;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

export class RequestHeaderFieldsTooLargeError extends Error {
  statusCode = 431;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, RequestHeaderFieldsTooLargeError.prototype);
  }
}

/*=============================================
=                   HTTP 5XX                  =
=============================================*/

export class InternalServerError extends Error {
  statusCode = 500;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class NotImplementedError extends Error {
  statusCode = 501;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}

export class BadGatewayError extends Error {
  statusCode = 502;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadGatewayError.prototype);
  }
}

export class ServiceUnavailableError extends Error {
  statusCode = 503;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

export class GatewayTimeoutError extends Error {
  statusCode = 504;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, GatewayTimeoutError.prototype);
  }
}

export class HTTPVersionNotSupportedError extends Error {
  statusCode = 505;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HTTPVersionNotSupportedError.prototype);
  }
}

export class VariantAlsoNegotiatesError extends Error {
  statusCode = 506;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, VariantAlsoNegotiatesError.prototype);
  }
}

export class InsufficientStorageError extends Error {
  statusCode = 507;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InsufficientStorageError.prototype);
  }
}

export class LoopDetectedError extends Error {
  statusCode = 508;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, LoopDetectedError.prototype);
  }
}

export class NotExtendedError extends Error {
  statusCode = 510;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotExtendedError.prototype);
  }
}

export class NetworkAuthenticationRequiredError extends Error {
  statusCode = 511;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NetworkAuthenticationRequiredError.prototype);
  }
}
