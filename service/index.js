const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const app = express();
app.use(express.json());
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js')

app.use(express.static('public'));
app.use(cookieParser());
app.set('trust proxy', true);

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

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
  secureApiRouter.post('/createSpot', async (req, res) => {
    const user = req.body.email;
    let post = {user: user, postID: req.body.postID, name: req.body.name, location: req.body.location, description: req.body.description}
    try {
      await DB.createSpot(post)
    } catch(error) {
      console.log(error)
    } finally {
      res.status(200).send({ message: "Post created successfully", post: post});
    }
  })

  //likePost
  secureApiRouter.post('/like', async (req, res) => {
    const user = req.body.user;
    const postID = req.body.postID;
    try {
      await DB.likePost(user, postID)
      res.status(200).send({ message: "Post Liked successfully" });
    } catch (error) {
      res.status(409).send({message: error.message});
    }
    
  })

  //savePost
  secureApiRouter.post('/save', async (req, res) => {
    const user = req.body.user;
    const postID = req.body.postID;
    try {
      await DB.savePost(user, postID);
      res.status(200).send({ message: "Post Saved successfully" });
    } catch (error) {
      res.status(409).send({message: error.message});
    }
  })

  //getSaved
  secureApiRouter.get('/saved', async (req, res) => {
    const user = req.query.user;
    const saved = await DB.getSaved(user)
    res.status(200).send({user: user, saved: saved})
  })
  
  //getLiked
  secureApiRouter.get('/liked', (req, res) => {
    const user = req.body.user;
    const liked = DB.getLiked(user);
    res.status(200).send({user: user, liked: liked})
  })

// Get all posts for current user
secureApiRouter.get('/posts', async (req, res) => {
  const user = req.query.user;
  const posts = (await DB.getPosts(user)).reverse();
  res.status(200).send({user: user, posts: posts})
})

secureApiRouter.get('/allPosts', async (req, res) => {
  const posts = (await DB.getAllPosts()).reverse();
  res.status(200).send({posts: posts});
})
  
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);