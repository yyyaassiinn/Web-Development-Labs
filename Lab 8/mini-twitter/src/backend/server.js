import express from "express";
import cors from "cors";
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const posts = [
  {
    id: 1,
    name: "Alex",
    content: "Hello, Mini-Twitter!",
    comments: [{ comment: "Welcome!" }],
  },
];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

app.post("/posts", (req, res) => {
  const { name, content } = req.body;

  if (typeof name !== "string" || !name.trim() ||
      typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Name and content are required" });
  }

  const post = {
    id: posts.length ? Math.max(...posts.map((item) => item.id)) + 1 : 1,
    name: name.trim(),
    content: content.trim(),
    comments: [],
  };

  posts.push(post);
  res.status(201).json(post);
});

app.get("/posts/:id/comments", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post.comments);
});

app.post("/posts/:id/comments", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const { comment } = req.body;

  if (typeof comment !== "string" || !comment.trim()) {
    return res.status(400).json({ error: "Comment is required" });
  }

  const newComment = { comment: comment.trim() };
  post.comments.push(newComment);
  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Mini-Twitter API listening on http://localhost:${PORT}`);
});
