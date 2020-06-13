const express = require("express");
const router = express.Router();
const { get, insert, update, remove } = require("../data/helpers/actionModel");

router.get("/", async (req, res) => {
  try {
    let actions = await get();
    res.status(200).json(actions);
  } catch (e) {
    res.status(500).json({ message: "unable to get actions" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let action = await get(id);
    res.status(200).json(action);
  } catch (e) {
    es.status(500).json({ message: "unable to get specified action" });
  }
});

router.post("/", async (req, res) => {
  const { project_id, notes, description } = req.body;
  if (!project_id || !notes || !description) {
    return res.status(400).json({
      message: "missing required fields project_id, notes and description"
    });
  }

  try {
    let action = await insert({ project_id, notes, description });
    res.status(201).json(action);
  } catch (e) {
    res.status(500).json({ message: " unable to create new action" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { notes, description } = req.body;
  let changes = {};

  if (!notes && !description) {
    return res
      .status(400)
      .json({ message: "Please provide notes or description for action." });
  }

  try {
    let action = await get(id);

    if (!action) {
      return res
        .status(404)
        .json({ message: "The action with the specified ID does not exist." });
    }

    if (notes) {
      changes.notes = notes;
    }

    if (description) {
      changes.description = description;
    }

    let updatedAction = await update(id, changes);
    res.status(200).json(updatedAction);
  } catch (e) {
    res.status(500).json({ message: "unable to update action" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let action = await get(id);

    if (!action) {
      return res
        .status(404)
        .json({ message: "The action with the specified ID does not exist." });
    }

    let deletedRecord = await remove(id);
    res.status(200).json(deletedRecord);
  } catch (e) {
    res.status(500).json({ message: "unable to delete action" });
  }
});

module.exports = router;
