import {
  GoogleGenAI,
} from '@google/genai';

export async function generateAiResponse(prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  // const model = 'gemini-2.5-pro-preview-03-25';
  const model = 'gemini-2.0-flash-thinking-exp-01-21';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const result = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  // const generatedText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  // const generatedText = result.text || "No generated text available";
  // return generatedText; 

  return result;
}