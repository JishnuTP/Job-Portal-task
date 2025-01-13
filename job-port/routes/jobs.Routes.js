const express = require("express");
const { getJobs, getJobById, createjobs, updateJobs, deleteJob } = require("../controllers/jobsController");
const router = express.Router();


router.get("/jobs", getJobs)
router.get("/jobs/:id",getJobById),
router.post("/jobs", createjobs);
router.post("/jobs", createjobs);
router.put("/jobs/:id", updateJobs)
router.delete("/jobs/:id",deleteJob)

module.exports=router