export type Middleware = (ctx: any, next: Function) => any;

export function compose (middleware: Middleware[]): (context: any, next?: Middleware) => any {
  return function (context: any, next?: Middleware) {
    // let index = -1;
    return dispatch(0);

    function dispatch (i: number): Promise<any> {
      // index = i
      let fn: Middleware = middleware[i];
      if (i === middleware.length && next) {
        fn = next;
      }
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}