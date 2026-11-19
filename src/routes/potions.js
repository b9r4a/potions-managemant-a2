const express = require("express");
const { eq } = require("drizzle-orm");
const renderErrorHandler = require("../utilities/renderErrorHandler");
const db = require("../db/db");
const { potions } = require("../db/schema");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allpotions = await db.select().from(potions);
    return res.status(200).json(allpotions);
  } catch (err) {
    return renderErrorHandler(res, err);
  }
});

router.get("/:id", async (req, res) => {
  const [entry] = await db
    .select()
    .from(potions)
    .where(eq(+req.params.id, potions.id));

  try {
    const [entry] = await db
      .select()
      .from(potions)
      .where(eq(+req.params.id, potions.id));
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "potions not found",
      });
    }
    return res.status(200).json(entry);
  } 
  catch (err) {
    return renderErrorHandler(res, err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, effect, isDangerous } = req.body;
    if (!name) {
      return res.status(404).json({
        succes: false,
        message: "this field is required",
      });
    }
    if (!effect) {
      return res.status(404).json({
        succes: false,
        message: "this field is required",
      });
    }
    if (isDangerous === undefined) {
      return res.status(404).json({
        succes: false,
        message: "this field is required",
      });
    }
    await db.insert(potions).values({
      name: name,
      effect: effect,
      isDangarous: isDangerous,
    });
    return res.status(201).json({
      message: "posted succesfully",
    });
  } catch (err) {
    return renderErrorHandler(res, err);
  }
});

module.exports = router;
