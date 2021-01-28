import * as express from 'express';
import * as mongoose from 'mongoose';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';
import * as passport from 'passport';
import * as logger from 'morgan';
import * as cors from 'cors';
import {
  savesRouter,
  authRouter,
  accountRouter,
  levelsStatsRouter,
  totalScoreRouter,
} from './routes';
import {
  jwtRouteProtector,
  googleRouteProtector,
  githubRouteProtector,
  facebookRouteProtector,
} from './middlewares';

export const app = express();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST } = process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/arkanoid?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Arkanoid API',
      version: '1.0.0',
      description: 'API for Arkanoid game',
      contact: {
        name: 'Vladimir Mazhirin',
        url: 'https://github.com/vladimirm85',
        email: 'vladimirm85@gmail.com',
      },
      servers: ['https://git.heroku.com/arkanoid-rss-be.git'],
    },
  },
  apis: ['./routes/saves.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(passport.initialize());
jwtRouteProtector(passport);
googleRouteProtector(passport);
githubRouteProtector(passport);
facebookRouteProtector(passport);

app.use(logger('dev'));
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: false }));

app.use('/saves', savesRouter);
app.use('/auth', authRouter);
app.use('/account', accountRouter);
app.use('/levels-stats', levelsStatsRouter);
app.use('/total-score', totalScoreRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.json({
    statusCode: 404,
  });
});

// error handler
app.use(function (err, req, res, next) {
  res.json({
    statusCode: 404,
    message: err.message,
    stack: err.stack,
  });
});
