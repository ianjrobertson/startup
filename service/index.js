const express = require('express');
const uuid = require('uuid');
const app = express();
app.use(express.json());

const port = process.argv.length > 2 ? process.argv[2] : 3000;

let users = {}; // We will replace this cached value with db in the next phase. 
let posts = {};
let likedPosts = {};
let savedPosts = {};

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
      res.send({ token: user.token });
    }
  });

  apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
  });

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      if (req.body.password === user.password) {
        user.token = uuid.v4();
        res.send({ token: user.token });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

  //createPost
  apiRouter.post('/create', async (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      let post = {user: user.email, postID: req.body.postID, name: req.body.name, location: req.body.location, image: req.body.image, description: req.body.description}
      if (posts[user.email]) {
        posts[user.email].push(post)
      }
      else {
        posts[user.email] = []
        posts[user.email].push(post)
      }
    } else {
      return res.status(401).send({ error: "Invalid token or user not found" });
    }
    res.status(200).send({ message: "Post created successfully" });
  })

  //likePost
  apiRouter.post('/like', async (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      if (!likedPosts[user.email]) {
        likedPosts[user.email] = new Set();
      }
      likedPosts[user.email].add(req.body.postID);
    } else {
      return res.status(401).send({ error: "Invalid token or user not found" });
    }
    res.status(200).send({ message: "Post Liked successfully" });
  })

  //savePost
  apiRouter.post('/save', async (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      if (!savedPosts[user.email]) {
        savedPosts[email] = new Set();
      }
      savedPosts[email].add(postID);
    } else {
      return res.status(401).send({ error: "Invalid token or user not found" });
    }
    res.status(200).send({ message: "Post Liked successfully" });
  })

  //getSaved
  apiRouter.get('/saved', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      res.send(savedPosts[user.email])
    } else {
      return res.status(401).send({ error: "Invalid token or user not found" });
    }
  })
  
  //getLiked
  apiRouter.get('/liked', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      res.send(likedPosts[user.email])
    } else {
      return res.status(401).send({ error: "Invalid token or user not found" });
    }
  })
  

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});