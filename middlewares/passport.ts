import * as passportJwt from 'passport-jwt';
import { PassportStatic } from 'passport';
import { UserModel } from 'home/vladimir/work/arkanoid-rss-be/models';

const { ExtractJwt, Strategy } = passportJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

export const createPassportJwt = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await UserModel.findById(payload.userId).select('email id');
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (e: unknown) {
        if (!(e instanceof Error)) throw e;
        console.log(e);
      }
    })
  );
};
