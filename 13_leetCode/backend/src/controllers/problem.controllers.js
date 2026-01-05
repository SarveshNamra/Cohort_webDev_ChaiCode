import {db} from "../libs/db.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
    const {title, description, difficulty, tags, examples, constraints, testCases, codeSnippets, referenceSolutions} = req.body;

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            success: false,
            error: "You don't have permission to this resource - Admins only"
        });
    }

    try {
        for(const [language, solutionCode] of Object.entries(referenceSolutions)){
            const languageId = getJudge0LanguageId(language);

        // Object.entries(referenceSolutions) converts this object into an array of key-value pairs, 
        // i.e., an array of arrays. Each array contains two elements:
        // the first element is the language name (like "python", "java", etc.), and the second element is the solution code (source code) written for that language.
        // referenceSolutions is likely an object where the keys are programming language names 
        // (like "python", "java", etc.), and the values are the solution code (source code) written for that language.

            if(!languageId){
                return res.status(400).json({
                    success: false,
                    error: `${language} language is not supported`
                });
            }

            // yha pay array of submissions ready kre for each languages(test cases) -->
            const submissions = testCases.map(({input, output})=> ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input ?? "",
                expected_output: output ?? "",
            }));

            const submissionResult = await submitBatch(submissions);    // Here we are getting token's

            const tokens = submissionResult.map((res) => res.token);    // extracting token's. tokens ke values ko extract krenge

            const results = await pollBatchResults(tokens);            // polling the results

            for(let i=0; i < results.length; i++){
                const result = results[i];
                console.log("Result ---", result);

                // console.log(`TestCase ${i+1} and language ${language} ----- result is ${JSON.stringify(result.status.description)}`);

                if(result.status.id !== 3){
                    return res.status(400).json({
                        success: false,
                        error: `TestCase ${i+1} failed for language ${language}`
                    });
                }
            }
        }
        // save the problem in DB
        const newProblem = await db.problem.create({
            data: {
                title, description, difficulty, tags, examples, constraints, 
                testCases, codeSnippets, referenceSolutions, 
                userId: req.user.id,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Message Created Successfully",
            problem: newProblem,
        });
    } catch (error) {
        console.log("Error while creating problem", error);
        res.status(500).json({
            success: false,
            error: "Error while creating problem",
        });
    }
};

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany({
            include: {
                solvedBy: {
                    where: {
                        userId: req.user.id,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        if(!problems){
            return res.status(404).json({
                success: false,
                error: "No problems found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "All problems fetched successfully",
            problems,
        });
    } catch (error) {
        console.log("Error while fetching problems", error);
        return res.status(500).json({
            success: false,
            error: "Error while fetching problems",
        });
    }
};

export const getProblemById = async (req, res) => {
    const {id} = req.params;

    try {
        const problem = await db.problem.findUnique({
            where: {
                id
            }
        })

        if(!problem){
            return res.status(404).json({
                error: "Problem not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Problem featching successfully",
            problem,
        })
    } catch (error) {
        console.log("Error while fetching a problem", error);
        res.status(500).json({
            success: false,
            error: "Error while fetching a problem",
        });
    }
};

export const updateProblem = async (req, res) => {
    const {id} = req.params;

    const {title, description, difficulty, tags, examples, constraints, testCases, codeSnippets, referenceSolutions} = req.body;

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            success: false,
            error: "You don't have permission to this resource - Admins only"
        });
    }

    try {
        const problem = await db.problem.findUnique({
            where: {
                id
            }
        });

        if(!problem){
            return res.status(404).json({
                success: false,
                error: "Problem not found",
            });
        }

        const finalTestCases = testCases ?? problem.testCases;
        const finalReferenceSolutions = referenceSolutions ?? problem.referenceSolutions;


        for(const [language, solutionCode] of Object.entries(finalReferenceSolutions)){
            const languageId = getJudge0LanguageId(language);

            if(!languageId){
                return res.status(400).json({
                    success: false,
                    error: `${language} language is not supported`
                });
            }

            const submissions = finalTestCases.map(({input, output})=> ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input ?? "",
                expected_output: output ?? "",
            }));

            const submissionResult = await submitBatch(submissions);

            const tokens = submissionResult.map((res) => res.token);

            const results = await pollBatchResults(tokens);

            for(let i=0; i < results.length; i++){
                const result = results[i];
                console.log("Result ---", result);

                if(result.status.id !== 3){
                    return res.status(400).json({
                        success: false,
                        error: `TestCase ${i+1} failed for language ${language}`
                    });
                }
            }
        }

        const updatedProblem = await db.problem.update({
            where: {
              id  
            },

            data: {
                title, description, difficulty, tags, examples, constraints, 
                testCases, codeSnippets, referenceSolutions, 
            },
        });

        return res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem: updatedProblem,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error while updating problem",
        });
    }
};

export const deleteProblem = async (req, res) => {
    const {id} = req.params;

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            success: false,
            error: "You don't have permission to this resource - Admins only"
        });
    }

    try {
        const problem = await db.problem.findUnique({
            where : {
                id
            }
        });

        if(!problem){
            return res.status(404).json({
                success: false,
                error: "Problem not found",
            });
        }

        await db.problem.delete({
            where:{
                id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error while deleting problem",
        })
    }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
    try {
        const problems = await db.problem.findMany({
            where: {
                solvedBy: {
                    some: {
                        userId: req.user.id
                    }
                }
            },
            include: {
                solvedBy: {
                    where: {
                        userId: req.user.id
                    }
                }
            }
        });

        res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            problems,
        });
    } catch (error) {
        console.error("Error fetching problems : ", error);
        res.status.json({
            success: false,
            error: "Failed to fetched problems",
        });
    }
}