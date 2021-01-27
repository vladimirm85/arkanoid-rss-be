import * as passportGithub from 'passport-github2';
import { PassportStatic } from 'passport';
import { UserInterface, UserModel, VerKeyInterface, VerKeyModel } from '../models';
import { v4 as uuid } from 'uuid';

const { Strategy } = passportGithub;

const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'https://arkanoid-rss-be.herokuapp.com/auth/github/callback',
};

export const githubRouteProtector = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (accessToken, refreshToken, profile, done) => {
      const { email, picture } = profile._json;
      const hash = uuid();

      try {
        const userCandidate = await UserModel.findOne({ email });
        if (userCandidate) {
          done(null, userCandidate);
        }

        const userData: UserInterface = {
          createdAt: new Date(),
          totalScore: 0,
          email,
          nickname: email.split('@')[0],
          avatar: picture,
        };

        const user = await UserModel.create(userData);

        const verificationKeyData: VerKeyInterface = {
          userId: user._id,
          verifiedAt: new Date(),
          hash,
        };

        const verificationKey = await VerKeyModel.create(verificationKeyData);
        await verificationKey.save();

        done(null, await user.save());
      } catch (e: unknown) {
        if (!(e instanceof Error)) throw e;
        console.log(e);
      }
    })
  );
};
