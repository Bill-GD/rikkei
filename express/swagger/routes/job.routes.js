const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controllers");

/**
 * @openapi
 * /jobs:
 *  get:
 *    description: Get all jobs.
 *    responses:
 *      200:
 *        description: Returns all jobs.
 *      500:
 *        description: Internal server error
 */
router.get("/", jobController.getAll);

router.get("/:id", jobController.getOne);

router.post("/", jobController.createOne);

router.put("/:id", jobController.updateOne);

router.delete("/:id", jobController.deleteOne);

module.exports = router;
