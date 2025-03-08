// Handles job application logic
const JobApplication = require('../models/JobApplication');

// 1. Submitting a Job (Create a new job application)
exports.addJob = async (req, res) => {
    const { jobTitle, companyName, status } = req.body;

    try {
        // Create a new job application
        const newJob = new JobApplication({
            jobTitle,
            companyName,
            status: status || 'Applied',  // Default status if not provided
            user: req.user.id  // Assuming the user is authenticated
        });

        // Save the job to the database
        const savedJob = await newJob.save();

        res.status(201).json(savedJob);  // Return the saved job as a response
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// 2. Updating Job Status
exports.updateJobStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;  // Get job ID from URL

    try {
        // Find the job by ID and update its status
        const updatedJob = await JobApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true }  // Return the updated document
        );

        if (!updatedJob) {
            return res.status(404).json({ msg: 'Job application not found' });
        }

        res.json(updatedJob);  // Return the updated job
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// 3. Filtering Jobs (by status and company name)
exports.getFilteredJobs = async (req, res) => {
    const { status, companyName } = req.query;  // Get query parameters from the request

    try {
        // Create a filter object for the query
        const filter = {
            user: req.user.id  // Assuming the user is authenticated
        };

        if (status) {
            filter.status = status;  // Filter by status
        }

        if (companyName) {
            filter.companyName = { $regex: companyName, $options: 'i' };  // Case-insensitive regex search for company name
        }

        // Fetch filtered jobs from the database
        const jobs = await JobApplication.find(filter);
        if (!jobs.length) {
            return res.status(404).json({ msg: 'No jobs found' });
        }
        res.json(jobs);  // Return the filtered jobs
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
// 4. Deleting a Job Application
exports.deleteJob = async (req, res) => {
    const { id } = req.params;  // Get the job ID from the URL parameters

    try {
        // Find the job by ID and delete it
        const job = await JobApplication.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ msg: 'Job application not found' });
        }

        res.json({ msg: 'Job application deleted successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
