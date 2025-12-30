import { db } from "../libs/db.js";

export const getAllSubmission = async (req, res) => {
    try {
        const userId = req.user.id;

        if(!req.user.id){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        const submissions = await db.submission.findMany({
            where: {
                userId: userId
            }
        })

        res.status(200).json({
            success: true,
            message: "Submission fetched succcessfully",
            submissions
        })
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({
            error:"Failed to fetch submissions"
        });
    }
}

export const getSubmissionsForProblem = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!req.user.id){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }
        
        const problemId = req.params.problemId;
        const submissions = await db.submission.findMany({
            where: {
                userId: userId,
                problemId: problemId,
            }
        })

        res.status(200).json({
            success: true,
            message: "Submission fetched succcessfully",
            submissions
        })
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({
            error:"Failed to fetch submissions"
        });
    }
}

export const getAllTheSubmissionForProblem = async (req, res) => {
    try {
        const problemId = req.params.problemId;
        const submission = await db.submission.count({
            where: {
                problemId: problemId,
            }
        })

        res.status(200).json({
            success: true,
            message: "Submission fetched succcessfully",
            count: submission
        })
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({
            error:"Failed to fetch submissions"
        });
    }
}