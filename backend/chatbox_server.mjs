import express from 'express';
import session from 'express-session';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: 'medi-secret',
  resave: true,
  saveUninitialized: true,
}));

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (message) {
    if (!req.session.chatHistory) {
      req.session.chatHistory = [];
    }

    req.session.chatHistory.push({ role: 'user', content: message });

    try {
      const { chatWithMedi } = await import('./llama.mjs');
      const mediResponse = await chatWithMedi(req.session.chatHistory);
      req.session.chatHistory.push({ role: 'assistant', content: mediResponse });
      res.json({ reply: mediResponse });
    } catch (error) {
      res.status(500).send('Something went wrong.');
    }
  } else {
    res.status(400).send('No message provided.');
  }
});

app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
