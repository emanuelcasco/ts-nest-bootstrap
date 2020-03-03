import { Injectable, NestInterceptor, ExecutionContext, Logger, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Intercept HTTP calls and log
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();

    const now = Date.now();
    const method = req.method;
    const url = req.url;

    return call$
      .handle()
      .pipe(tap(() => Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name)));
  }
}
