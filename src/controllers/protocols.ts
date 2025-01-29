export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<T> {
  params?: any;
  headers?: any;
  body?: T;
}

export interface IController {
  handle(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
