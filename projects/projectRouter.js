const express = require("express");
const router = express.Router();
const {
  get,
  insert,
  update,
  remove,
  getProjectActions
} = require("../data/helpers/projectModel");

router.get("/", async (req, res) => {
  try {
    let projects = await get();
    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json({ message: "unable to get projects" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let project = await get(id);
    res.status(200).json(project);
  } catch (e) {
    es.status(500).json({ message: "unable to specified project" });
  }
});

router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;

  try {
    let project = await get(id);

    if (!project) {
      return res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }

    const projectActions = await getProjectActions(id);
    res.status(200).json(projectActions);
  } catch (e) {
    res.status(500).json({ message: "unable to get project actions" });
  }
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "missing require fields name and description" });
  }

  try {
    let project = await insert({ name, description });
    res.status(201).json(project);
  } catch (e) {
    res.status(500).json({ message: " unable to create new project" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  let changes = {};

  if (!name && !description) {
    return res
      .status(400)
      .json({ message: "Please provide name or description for project." });
  }

  try {
    let project = await get(id);

    if (!project) {
      return res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }

    if (name) {
      changes.name = name;
    }

    if (description) {
      changes.description = description;
    }

    let updatedProject = await update(id, changes);
    res.status(200).json(updatedProject);
  } catch (e) {
    res.status(500).json({ message: "unable to update project" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let project = await get(id);

    if (!project) {
      return res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }

    let deletedRecord = await remove(id);
    res.status(200).json(deletedRecord);
  } catch (e) {
    res.status(500).json({ message: "unable to delete project" });
  }
});

module.exports = router;
