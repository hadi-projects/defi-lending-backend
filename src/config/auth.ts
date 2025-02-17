import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppDataSource } from "../data-source"; // Pastikan AppDataSource diimpor
import { User } from "../model/user";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRepository = AppDataSource.getRepository(User); // FIXED: Menggunakan AppDataSource
        let user = await userRepository.findOne({ where: { googleId: profile.id } });

        if (!user) {
          user = userRepository.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
          });
          await userRepository.save(user);
        }

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const userRepository = AppDataSource.getRepository(User); // FIXED: Menggunakan AppDataSource
  try {
    const user = await userRepository.findOne({ where: { id: Number(id) } });
    done(null, user);
  } catch (error) {
    done(error, undefined);
  }
});

export default passport;
