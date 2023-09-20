const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve static CSS files from the 'css' directory
app.use('/css', express.static('css'));

// Route for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Simulated data (replace this with a database)
const topics = [
  {
    id: 1,
    title: 'Topic 1: Web-Development',
    posts: [
      { id: 1, username: 'User 1', content: 'Hello' },
      { id: 2, username: 'User 2', content: 'Need help in backend using Mongo DB' },
    ],
  },
  {
    id: 2,
    title: 'Topic 2: Game Development',
    posts: [
      { id: 1, username: 'User 3', content: 'Hi, i am trying to create VR Games.' },
    ],
  },
];

// Get all topics
app.get('/topics', (req, res) => {
  res.json(topics);
});

// Get a specific topic by ID
app.get('/topics/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const topic = topics.find((t) => t.id === id);
  if (topic) {
    res.json(topic);
  } else {
    res.status(404).json({ error: 'Topic not found' });
  }
});

// Create a new topic
app.post('/topics', (req, res) => {
  const { title, posts } = req.body;
  const newTopic = { id: topics.length + 1, title, posts: [] };
  topics.push(newTopic);
  res.status(201).json(newTopic);
});

// Create a new post for a specific topic
app.post('/topics/:id/posts', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, content } = req.body;
  const topic = topics.find((t) => t.id === id);
  if (topic) {
    const newPost = { id: topic.posts.length + 1, username, content };
    topic.posts.push(newPost);
    res.status(201).json(newPost);
  } else {
    res.status(404).json({ error: 'Topic not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
