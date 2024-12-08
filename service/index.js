const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const app = express();
app.use(express.json());
const DB = require('./database.js');

app.use(express.static('public'));
app.use(cookieParser());
app.set('trust proxy', true);

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {}; // We will replace this cached value with db in the next phase. 
let posts = {};
let likedPosts = {};
let savedPosts = {};

const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password);
      setAuthCookie(res, user.token)
      res.status(200).send({
        id: user._id,
      });
    }
  });

  apiRouter.delete('/auth/logout', (req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.status(200).send({ id: user._id})
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

  const secureApiRouter = express.Router();
  apiRouter.use(secureApiRouter);

  secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized - Cookie' });
    }
  });

  //createPost
  apiRouter.post('/createSpot', async (req, res) => {
    const user = req.body.email;
    let post = {user: user, postID: req.body.postID, name: req.body.name, location: req.body.location, description: req.body.description}
    console.log(post);
    try {
      await DB.createSpot(post)
    } catch(error) {
      console.log(error)
    } finally {
      res.status(200).send({ message: "Post created successfully", post: post});
    }
  })

  //likePost
  apiRouter.post('/like', async (req, res) => {
    const user = req.body.user;
    if (!likedPosts[user.email]) {
      likedPosts[user.email] = new Set();
    }
    likedPosts[user.email].add(req.body.postID);
    res.status(200).send({ message: "Post Liked successfully" });
  })

  //savePost
  apiRouter.post('/save', async (req, res) => {
    const user = req.body.user;
    if (!savedPosts[user.email]) {
      savedPosts[email] = new Set();
    }
    savedPosts[email].add(postID);
    res.status(200).send({ message: "Post Liked successfully" });
  })

  //getSaved
  apiRouter.get('/saved', (req, res) => {
    const user = req.body.user;
    res.status(200).send({user: user, saved: savedPosts[user.email]})
  })
  
  //getLiked
  apiRouter.get('/liked', (req, res) => {
    const user = req.body.user;
    res.status(200).send({user: user, liked: likedPosts[user.email]})
  })

// Get all posts for current user
apiRouter.get('/posts', async (req, res) => {
  const user = req.query.user;
  console.log(user)
  const posts = await DB.getPosts(user)
  console.log(posts)
  res.status(200).send({user: user, posts: posts})
})
  
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});