import passport from "passport";
import PassportLocal from "passport-local";
// import PassportJWT from "passport-jwt";
import type { Express } from "express";
import db from "../db";
import config from "../config";
import bcrypt from 'bcrypt';


export function configurePassport(app: Express) {

    passport.use(new PassportLocal.Strategy({
        usernameField: 'email',
        session: false
    }, async (email, password, done) => {
        try {
            const [userFound] = await db.users.find('email', email);

					if (userFound && (await bcrypt.compare(password, userFound.password))) {
						delete userFound.password;
						return done(null, userFound);
					}

					done(null, false, { message: 'Usuário ou senha não encontrados' });
				} catch (error) {
					done(error);
				}
			}
		)
	);
    app.use(passport.initialize());
};