import express from "express";
import db from "../models/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.user.userId;
  const { search, tag } = req.query;

  try {
    const where = {};
    if (search) {
      where[db.Sequelize.Op.or] = [
        { title: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { content: { [db.Sequelize.Op.iLike]: `%${search}%` } },
      ];
    }

    if (tag) {
      where["$filterTags.name$"] = tag;
    }

    const notes = await db.Note.findAll({
      where: { userId, ...where },
      include: [
        {
          model: db.Tag,
          as: "filterTags",
          attributes: [],
          required: !!search,
          through: { attributes: [] }, // Exclude junction table attributes
        },
        {
          model: db.Tag,
          as: "tags",
          attributes: ["id", "name"],
          required: true,
          through: { attributes: [] }, // Exclude junction table attributes
        },
      ],
    });

    res.status(200).json(notes);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/note", async (req, res) => {
  const { title, content, tags } = req.body;
  const userId = req.user.userId;

  try {
    const note = await db.Note.create({
      title,
      content,
      tags,
      userId,
    });
    if (tags && tags.length > 0) {
      const tagInstances = await db.Tag.findAll({
        where: { id: tags },
      });
      await note.setTag(tagInstances);
    }
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  const userId = req.user.userId;

  try {
    const note = await db.Note.findOne({
      where: { id, userId },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags && tags.length > 0) {
      const tagInstances = await db.Tag.findAll({
        where: { id: tags },
      });
      await note.setTag(tagInstances);
    }
    await note.save();
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id/archive", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const note = await db.Note.findOne({
      where: { id, userId },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.status = "archived";
    await note.save();
    res.status(200).json({ message: "Note archived successfully" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id/restore", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const note = await db.Note.findOne({
      where: { id, userId },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.status = "active";
    await note.save();
    res.status(200).json({ message: "Note archived successfully" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const note = await db.Note.findOne({
      where: { id, userId },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.destroy();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
