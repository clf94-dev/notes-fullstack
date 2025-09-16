import express from "express";
import bcrypt from "bcryptjs";
import db from "../models/index.js";
const router = express.Router();

router.get("/profile", async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await db.User.findByPk(userId, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Interval server error" });
  }
});

router.patch("/reset-password", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isOldPasswordValid = await bcrypt.compare(
      String(oldPassword),
      user.password
    );

    if (!isOldPasswordValid) {
      return res.status(400).json({ message: "invalidOldPassword" });
    }

    const isSameNewPassord = await bcrypt.compare(
      String(newPassword),
      user.password
    );
    if (isSameNewPassord) {
      return res.status(400).json({
        message: "sameAsOld",
      });
    }

    const hashedPassword = await bcrypt.hash(String(newPassword), 10);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
