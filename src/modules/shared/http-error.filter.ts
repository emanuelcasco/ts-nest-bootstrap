import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

const getErrorDetails = (exception: HttpException): string | Record<string, string> => {
  const details = exception?.message?.message;
  return Array.isArray(details)
    ? details.map(({ property, constraints }) => ({ property, constraints }))
    : details;
};

/**
 * Catch errors and serialize
 */
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      message: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal error' : exception?.message?.error,
      details: getErrorDetails(exception)
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(`${request.method} ${request.url}`, exception.stack, 'ExceptionFilter');
    } else {
      Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter');
    }

    return response.status(status).json(errorResponse);
  }
}
