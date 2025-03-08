//Job application routes
const express = require('express');
const { addJob, getFilteredJobs, deleteJob, updateJobStatus} = require('../controllers/jobController');
const authMiddleware = require('../controllers/middleware/authMiddleware');

const router = express.Router();

// Protect the job routes with authMiddleware
router.post('/', authMiddleware, addJob);
router.put('/:id', authMiddleware, updateJobStatus);
router.get('/', authMiddleware, getFilteredJobs);
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;
