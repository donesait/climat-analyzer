import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {retry, timer} from "rxjs";

export const yandexApiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.url.includes('yandex')) {
      const newReq: HttpRequest<unknown> = req.clone({ setHeaders: { 'X-Yandex-API-Key': `add your api key` } });

      return next(newReq).pipe(
          retry({
              count: 2,
              delay: (_, retryCount: number) => timer(retryCount * 1000)
          })
      );
  }

  return next(req);
};
