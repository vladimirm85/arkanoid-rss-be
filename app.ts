import * as express from 'express';
import * as mongoose from 'mongoose';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
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
const swaggerDocs = YAML.load('./documentation-api/swagger.yaml');

export const app = express();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST } = process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/arkanoid?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { swaggerOptions: { apis: ['./documentation-api/**/*.yaml'] } })
);

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
