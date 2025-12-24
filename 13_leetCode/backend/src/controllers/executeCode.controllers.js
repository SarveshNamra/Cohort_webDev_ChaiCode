import { submitBatch, pollBatchResults } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
    const {source_code, language_id, stdin, expected_outputs, problemId} = req.body;
    const userId = req.user.id;

    try {
       // validation test cases
       if(
            !Array.isArray(stdin) || stdin.length === 0 ||
            !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length
        ){
           return res.status(400).json({
            error: "Invalid or Missing test cases"
           })
       }
       // prepare each test cases for judge0 batch submissions
       const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
       }));

       // send batch submissions to judge0
       const submitResponse = await submitBatch(submissions);

       const tokens = submitResponse.map((res) => res.token);

       // poll judge0 for results of all submitted test cases
       const results = await pollBatchResults(tokens);
    } catch (error) {
        
    }
}