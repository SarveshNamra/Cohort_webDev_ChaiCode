import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const judge0Client = axios.create({
  baseURL: process.env.JUDGE0_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.JUDGE0_RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.JUDGE0_RAPIDAPI_HOST || "judge0-ce.p.rapidapi.com",
  },
});

export const getJudge0LanguageId = (Language) =>{
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63
    };

    return languageMap[Language.toUpperCase()];
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await judge0Client.get("/submissions/batch", {
      params: {
        tokens: tokens.join(","),
        base64_encoded: "false",
        fields: "*",
      },
    });

    const results = data.submissions || data;

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2 // 1: In Queue, 2: Processing
    );

    if (isAllDone) return results;

    await sleep(1000);
  }
};

export const submitBatch = async (submissions) => {
  const { data } = await judge0Client.post(
    "/submissions/batch",
    { submissions },
    {
      params: {
        base64_encoded: "false", // IMP
        wait: "false",
      },
    }
  );

  return data.submissions || data; // here data is an array like [{ token }, ...]
};