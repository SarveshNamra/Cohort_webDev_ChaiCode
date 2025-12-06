import axios from "axios";

const JUDGE0_BASE_URL = process.env.JUDGE0_API_URL || "http://localhost:2358";


export const getJudge0LanguageId = (Language) =>{
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63
    };

    return languageMap[Language.toUpperCase()];
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
    while(true){
        const {data} = await axios.get(`${JUDGE0_BASE_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(","),
                base64_encoded: false
            }
        });

        const results = data.submissions;

        const isAllDone = results.every(
            (r) => r.status.id !== 1 && r.status.id !== 2
        );

        if(isAllDone){
            return results;
        }

        await sleep(1000);
    }
}

export const submitBatch = async (submissions) => {
    const {data} = await axios.post(`${JUDGE0_BASE_URL}/submissions/batch?base64_encoded=false`, {submissions});
    // const url = `${JUDGE0_BASE.replace(/\/+$/, '')}/submissions/batch?base64_encoded=false`;
    // const { data } = await axios.post(url, { submissions });

    console.log("Submission data", data);

    return data.submissions || data; // here data is an array like [{token}, {token}, {token}]
}