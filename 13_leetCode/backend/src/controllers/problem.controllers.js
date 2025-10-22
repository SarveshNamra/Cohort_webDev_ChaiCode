import {db} from "../libs/db.js";
import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

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

            if(!languageId){
                return res.status(400).json({
                    success: false,
                    error: `${language} language is not supported`
                });
            }

            const submissions = testCases.map(({input, output})=> ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));

            const submissionResult = await submitBatch(submissions);    // Here we are getting token's

            const tokens = submissionResult.map((res) => res.token);    // extracting token's\

            const results = await pollBatchResults(tokens);            // polling the results

            for(let i=0; i < results.length; i++){
                const results = results[i];

                if(results.status.id !== 3){
                    return res.status(400).json({
                        success: false,
                        error: `Test case ${i+1} failed for language ${language}`
                    });
                }
            }

            // save the problem in DB
            const problem = await db.problem.create({
                data: {
                    title, description, difficulty, tags, examples, constraints, 
                    testCases, codeSnippets, referenceSolutions, 
                    userIs: req.user.id
                },
            });

            return res.status(201).json({
                success: true,
                newProblem
            });
        }
    } catch (error) {
        console.error("Error in creating problem", error);
        res.status(500).json({
            success: false,
            error: "Error in creating problem"
        });
    }
}

export const getAllProblems = async (req, res) => {}

export const getProblemById = async (req, res) => {}

export const updateProblem = async (req, res) => {}

export const deleteProblem = async (req, res) => {}

export const getAllProblemsSolvedByUser = async (req, res) => {}