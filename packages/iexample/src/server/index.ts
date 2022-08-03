import Koa from 'koa';
import Router from 'koa-router';
import { renderPage } from './util/render';

const app = new Koa();
const port = 8081;

const router = new Router();
router.get('/', ctx => {
  ctx.body = renderPage('index');
});
router.get('/api/get-summary', ctx => {
  ctx.body = {
    hello: 'get-summary111'
  };
});

app.use(router.routes());
app.listen(port, () => {
  console.log(`Starting at http://127.0.0.1:${port}`);
});
