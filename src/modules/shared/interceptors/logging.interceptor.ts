import { Injectable, NestInterceptor, ExecutionContext, Logger, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const generateLogMessage = (type: string, handler: string, now: number): string =>
  `[${type.toUpperCase()}] "${handler}" (${Date.now() - now}ms)`;

/**
 * Intercept HTTP calls and log
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();

    if (req) {
      const method = req.method;
      const url = req.url;
      return call$.handle().pipe(tap(() => generateLogMessage('REST', `${method} ${url}`, now)));
    }
    const ctx = GqlExecutionContext.create(context);
    const type = ctx.getType();
    const handler = ctx.getClass().name;
    const resolver = ctx.getHandler().name;
    return call$.handle().pipe(tap(() => Logger.log(generateLogMessage(type, resolver, now), handler)));
  }
}
