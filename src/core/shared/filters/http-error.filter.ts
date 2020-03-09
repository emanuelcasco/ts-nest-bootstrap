import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
  ValidationError
} from '@nestjs/common';
import { Request, Response } from 'express';

interface CustomBadRequestError {
  field: string;
  errors: ValidationError['constraints'];
  children: CustomBadRequestError[];
}

const getConstraints = (error: ValidationError): CustomBadRequestError => ({
  field: error.property,
  errors: error.constraints,
  children: error.children?.map(getConstraints)
});

const getErrorMessage = (details: ValidationError[] | string): CustomBadRequestError[] | string => {
  if (Array.isArray(details)) {
    return details.map(getConstraints);
  }
  return details;
};

/**
 * Catch errors and serialize
 */
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): Response {
    Logger.error(exception);

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status =
      typeof exception.getStatus === 'function' ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      message: exception?.message?.error || HttpStatus.INTERNAL_SERVER_ERROR,
      details: getErrorMessage(exception?.message?.message)
    };
    Logger.error(
      `${request?.method} ${request?.url}`,
      status === HttpStatus.INTERNAL_SERVER_ERROR ? exception.stack : JSON.stringify(errorResponse),
      'ExceptionFilter'
    );
    return response.status(status).json(errorResponse);
  }
}
