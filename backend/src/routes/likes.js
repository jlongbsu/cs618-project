import {
  addLike,
  removeLike,
  countLikes,
  hasUserLiked,
} from "../services/likes.js";

import { requireAuth } from "../middleware/jwt.js";

export async function likeRoutes(app) {
  app.post("/api/v1/likes/:id", requireAuth, async (req, res) => {
    try {
      const like = await addLike(req.params.id, req.auth.sub);
      res.json(like);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete("/api/v1/likes/:id", requireAuth, async (req, res) => {
    try {
      await removeLike(req.params.id, req.auth.sub);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/v1/likes/:id/count", async (req, res) => {
    try {
      const count = await countLikes(req.params.id);
      res.json({ count });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/v1/likes/:id/user", requireAuth, async (req, res) => {
    try {
      const userLiked = await hasUserLiked(req.params.id, req.auth.sub);
      res.json({ userLiked });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
}
