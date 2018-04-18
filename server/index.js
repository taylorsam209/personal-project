require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    axios = require('axios');
    controller = require('./controller');
    cors = require('cors')

const port = 3010;
const app = express();
app.use(bodyParser.json());
app.use( express.static( `${__dirname}/../build` ) );

app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION).then(db => {
    app.set('db', db);
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    console.log(profile)
    db.find_user([profile.identities[0].user_id]).then(user => {
        // console.log(user)
        if (user[0]) {
            return done(null, user[0].id)
        } else {
            const user = profile._json;
            db.create_user([user.name, user.email, user.picture, user.identities[0].user_id])
                .then(user => {
                    return done(null, user[0].id)
                })
        }
    })
}));

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}));

app.get('/auth/me', (req, res) => {
    if(!req.user) {
        return res.status(200).send(false)
    }
    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302,process.env.SUCCESS_REDIRECT)
})

passport.serializeUser(function (id, done) {
    done(null, id);
});

passport.deserializeUser(function (id, done) {
    app.get('db').find_current_user([id])
        .then(user => {
            done(null, user[0]);
        })
})

app.get('/api/getlisting/:location', controller.readListing) //Search input returns listing of restaurants
app.get('/api/getRestaurant/:id', controller.readRestaurant) //get single restaurant by yelp-id in database and makes request to yelp
app.post('/api/addRestaurant', controller.addRestaurant)
app.get('/api/getfavlisting/:id', controller.readFavListing)
app.delete('/api/deletefavrestaurant', controller.deleteFavRestaurant)
app.get('/api/reviews/:id', controller.getReviews)


const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(port, () => console.log(`Running on port ${port}`))