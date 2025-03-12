import { ApiResponse } from "../utils/ApiResonse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js"
import { ApiError } from "../utils/apiError.js";

const createJob = asyncHandler(async (req, res) => {
    /* 
    take data and save data 
    take data form req body
    what is uniqe in that job ? 
    only current user that is loggined can create the job
    if data come then update that else default
    job is created by logined user..
    data: company name, position, worklocation 
    check it
    create a new job, 
    save it to database and 
    check is it saved or not .. ?
    return response 

    question: how to track other data ? 
    from where we get enum data
    is data is not send then how to set default valuse ?
    how to handle it? 
    */

    const [company, position, worklocation, status, worktype] = req.body();
    if (!company || !position || !worklocation)
        throw new ApiError(400, "All fields required")

    const job = await Job.create({
        company,
        position,
        worklocation,
        status: status || 'pending',
        worktype: worktype || 'full-time',
        user: req.user._id
    })

    if (!job)
        throw new ApiError(500, "Failed to create job")

    return res
        .status(201)
        .json(
            new ApiResponse(201, newJob, "Job created succesfully")
        )
})
//filter jobs
const getJob = asyncHandler(async (req, res) => {
    /* 
        track the user of which job you want
        apply aggregation pipeline
        select all reords from job collection in which user is current user
        show records with all job details 

    */

})

const updateJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const { company, position } = req.body;
    if (!company || !position)
        throw new ApiError(400, "All fields are required")

    const job = await Job.findone({ _id: jobId });
    if (!job)
        throw new ApiError(400, "job not found")
    if (!(req.user.userId === job.createdBy.tostring())) {
        throw new ApiError(400, "you are not authorized to update this job")
    }

    const updatedJob = await Job.findOneAndUpdate(
        {
            _id: jobId,
        },
        req.body,
        {
            new: true,
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedJob, "Job updated successfully")
        )

})

const deleteJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new ApiError(400, "No job found")
    }
    if (!req.user._id === job.createdBy.tostring()) {
        throw new ApiError(400, "You are not authorized to delete this job")
    }

    await Job.findByIdAndDelete({ _id: jobId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Job deleted successfully")
        )
})

const jobStats = asyncHandler(async (req, res) => {
    // const stats = await Job.aggegration([
    //     {
    //         $match: {
    //             createdBy: new mongoose.Types.ObjectId(req.user._id)
    //         },
    //     },
    //     {
    //         $group: {
    //             _id: "$status",
    //             count: {
    //                 $sum: 1,
    //             },
    //         },
    //     },
    // ]);
})

export {
    createJob,
    getJob,
    updateJob,
    deleteJob
}