import { Mistral } from '@mistralai/mistralai';

export const analyzeResume = async (text, jd) => {
    const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
    
    const prompt = `Analyze the following resume text against the provided Job Description (JD). Provide the result as a raw JSON object only. Do not wrap it in markdown block quotes (no \`\`\`json). 
CRITICAL: You must generate REAL DYNAMIC VALUES based on the actual resume content and JD, do NOT copy the example schema values.

Use this JSON schema structure:
{
  "role": "Detected Job Role from resume (string)",
  "skillMatch": <integer between 0-100 indicating percentage match with JD>,
  "score": <integer between 0-100 ATS readability score>,
  "missingSkills": [
       { "name": "<Skill missing from resume but present in JD>", "impact": <integer 0-100> }
  ],
  "suggestions": [
       "<Actionable advice 1 to improve resume for this JD>",
       "<Actionable advice 2>"
  ]
}

Job Description:
${jd}

Resume text:
${text}
`;

    const response = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: prompt }]
    });

    let content = response.choices[0].message.content;
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
        content = content.substring(jsonStart, jsonEnd + 1);
    }
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(content);
};

export const generateQuestions = async (role) => {
    const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
    
    const prompt = `Generate exactly 15 critical interview questions for the role of ${role}. Provide the result as a raw JSON array of strings only. Do not wrap it in markdown block quotes. Provide exactly:
[
  "Question 1?",
  "Question 2?",
  ...
]
`;

    const response = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: prompt }]
    });

    let content = response.choices[0].message.content;
    const arrStart = content.indexOf('[');
    const arrEnd = content.lastIndexOf(']');
    if (arrStart !== -1 && arrEnd !== -1) {
        content = content.substring(arrStart, arrEnd + 1);
    }
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(content);
};

export const getNextQuestion = async (sessionData) => {
    const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
    
    const { role, questions, answers } = sessionData;
    let history = `Role: ${role}\n`;
    for(let i=0; i<questions.length; i++) {
        history += `Q: ${questions[i]}\nA: ${answers[i] || '(No answer provided yet)'}\n`;
    }
    
    const prompt = `You are a technical interviewer for the role of ${role}.
Review the past interview history below. Generate ONE follow-up question based on the candidate's last answer, or a new question if appropriate.
Return ONLY the question string, nothing else.

Interview History:
${history}
`;

    const response = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: prompt }]
    });

    return response.choices[0].message.content.trim();
};

export const generateFeedback = async (sessionData) => {
    const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
    
    const { role, questions, answers } = sessionData;
    let history = `Role: ${role}\n`;
    for(let i=0; i<questions.length; i++) {
        history += `Q: ${questions[i]}\nA: ${answers[i] || '(No answer provided yet)'}\n`;
    }
    
    const prompt = `You are an expert technical interviewer evaluating a candidate for the role of ${role}.
Review the candidate's questions and answers. Provide a JSON evaluation without markdown blocks (no \`\`\`json). 

CRITICAL RULES:
1. Provide a score exactly between 0 and 10.
2. If the user provides gibberish, nonsensical, or irrelevant random characters (e.g., 'efejfvferghf'), assign a score of 0.
3. Be professional but honest in your evaluation.

Format precisely:
{
  "score": 8 (Overall score out of 10),
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "suggestions": ["Suggestion 1", "Suggestion 2"]
}

Interview Transcript:
${history}
`;

    const response = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: prompt }]
    });
    
    let content = response.choices[0].message.content;
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
        content = content.substring(jsonStart, jsonEnd + 1);
    }
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(content);
};
