const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('select * from users where username = ?', [username], function (err, row) {
    if (err) return cb(err);
    if (!row) return cb(null, false, { message: 'Incorrect username or password.' });

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
      if (err) return cb(err);
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, name: user.name });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user);
  });
});

const router = express.Router();

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.post('/logout', (req, res, next) => {
  console.log(req);
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
    if (err) return next(err);
    db.run('insert into users (username, hashed_password, salt) values (?, ?, ?)', [
      req.body.username,
      hashedPassword,
      salt,
    ], (err) => {
      if (err) return next(err);
      const user = {
        id: this.lastID,
        username: req.body.username,
      };
      req.login(user, (err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  });
});

module.exports = router;
