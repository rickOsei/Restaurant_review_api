const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const Google_User = require("../models/google_auth_model");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   // const user = await Google_User.findById(id);
//   Google_User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

passport.serializeUser((user, done) => {
  // console.log(`serialize user:${user.id}`);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`deserialize user:${id}`);

  Google_User.findById(id).then((user) => {
    // console.log(user);
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      callbackURL:
        "https://restaurant-review-oct1.onrender.com/api/v1/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log(profile.emails[0].value);
      Google_User.findOne({ google_id: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log(`user exist ${currentUser}`);
          done(null, currentUser);
        } else {
          new Google_User({
            name: profile.displayName,
            google_id: profile.id,
            email: profile.emails[0].value,
            token: accessToken,
          })
            .save()
            .then((newUser) => {
              console.log(`new user ${newUser}`);
              done(null, newUser);
            });
        }
      });
    }

    // async (request, accessToken, refreshToken, profile, done) => {
    //   // console.log(profile);
    //   let googleUser = {
    //     name: profile.displayName,
    //     google_id: profile.id,
    //     email: profile._json.email,
    //   };
    //   // passport callback func
    //   const user = await Google_User.findOne({ google_id: profile.id });
    //   if (user) {
    //     console.log(`User already exist: ${user}`);
    //     done(null, user);
    //   } else {
    //     const user = await Google_User.create({ ...googleUser });
    //     // const token = user.createJWT()
    //     done(null, user);
    //     console.log(`new user is : ${user}`);
    //   }
    //   // console.log(profile);
    // }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       // options for the google strat
//       callbackURL: "http://localhost:3000/api/v1/auth/google/redirect",
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // passport callback function

//       Google_User.findOne({ google_id: profile.id }).then((currentUser) => {
//         if (currentUser) {
//           // already have a user
//           // console.log("user is: " + currentUser);
//           done(null, currentUser);
//         } else {
//           // if not, create user in db
//           new Google_User({
//             username: profile.displayName,
//             google_id: profile.id,
//             email: profile.emails[0].value,
//           })
//             .save()
//             .then((newUser) => {
//               // console.log("new user created" + newUser);
//               done(null, newUser);
//             });
//         }
//       });
//     }
//   )
// );
