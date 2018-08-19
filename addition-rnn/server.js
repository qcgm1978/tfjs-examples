const Koa = require('koa');
const app = new Koa();
// const router = require('koa-router');
var router = require('koa-route');
const Sequelize = require('sequelize');
// const cors = require('koa2-cors');
// const cors = require('@koa/cors');
var cors = require('koa-cors');

const sequelize = new Sequelize('ml', 'root', 'test@2018', {
  host: '127.0.0.1',
  dialect: 'mysql',
  pass: 'test@2018',
})

const ConfigModel = sequelize.define('rnn', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  digits: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  trainingSize: {
    type: Sequelize.BIGINT,
    defaultValue: 5000,
    allowNull: false
  },
  iterations: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: 'SimpleRNN',
    allowNull: false
  },
  layers: {
    type: Sequelize.INTEGER
  },
  layerSize: {
    type: Sequelize.INTEGER
  },
  batchSize: {
    type: Sequelize.INTEGER

  },

  examples: {
    type: Sequelize.INTEGER

  }
}, {
    timestamps: false,
  });
app.use(router.get('/api/config', controller));
// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });
debugger;
// app.use(router.routes(), router.allowedMethods());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.body = (`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// Middleware normally takes two parameters (ctx, next), ctx is the context for one request,
// next is a function that is invoked to execute the downstream middleware. It returns a Promise with a then function for running code after completion.
// app.use(cors({
//   origin: '*',
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));
app.use(async (ctx, next) => {
  const origin = ctx.get('Origin');
  if (ctx.method !== 'OPTIONS') {
    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Credentials', 'true');
  } else if (ctx.get('Access-Control-Request-Method')) {
    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Methods', 'GET');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.set('Access-Control-Max-Age', '42');
    ctx.set('Access-Control-Allow-Credentials', 'true');
  }
  await next();
});

app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});
app.listen(3000);

async function controller(ctx) {
  debugger;
  console.log('````````````````')
  const id = ctx.query.id;
  try {
    console.log(id)
    const ml = await ConfigModel.findOne({
      attributes: ['digits', 'trainingSize', 'type', 'layers', 'layerSize', 'batchSize', 'iterations', 'examples'],
      where: {
        id
      },
    });
    if (!ml) {
      ctx.body = {
        code: 404,
        data: {
          result: 'no ini data'
        }
      };
      return;
    }



    ctx.body = {
      code: 0,
      data: ml.dataValues
    }
  }
  catch (e) {
    ctx.body = {
      code: 10000,
      message: e.message
    }
  }
}
