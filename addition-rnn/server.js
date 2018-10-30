const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa-cors');
const Sequelize = require('sequelize');
/**
 * Create HTTP server.
 */
const app = new Koa();
app.listen(3000);

// middlewares
// CORS middleware for koa2
app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// Router middleware for koa.
router.get('/api/config', controller);
// routes
app.use(router.routes(), router.allowedMethods());
// async functions
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.body = (`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// promise-based Node.js ORM
const sequelize = new Sequelize('ml', 'root', 'test@2018', {
  host: '127.0.0.1',
  dialect: 'mysql',
  pass: 'test@2018',
});
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
async function controller(ctx) {
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
