import openai, { limiterOpenai } from "../setup/openai";


const baseComp = (chatData: any) => {
  return limiterOpenai.schedule(() => openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: chatData,
    temperature: 0.5,
    max_tokens: 1000,
  }));
}

type chatGptTypes = {
  context: string,
  matchScore: number,
  search: string
}

const generateBotResponse = async ({ context, matchScore, search }: chatGptTypes) => {
  const template = `
    You are a chatbot who answers user questions based on the given context.

    Context: ${context}

    Important rules:
      1. Must not add extra details.
      2. For details not provided in context, tell this to the user
      3. Keep it to point
  `;

  const chatData = [
    { role: 'system', content: template },
    {role: 'user', content: `search query: ${search}. Use details from context.`}
  ]

  try {
    let baseCompletion = await baseComp(chatData).catch(err => {
      return baseComp(chatData);
    });
    // If a human said the same thing as above, what would they say? Keep it concise
    let generatedCompletion = baseCompletion.data?.choices[0].message?.content;
    
    return generatedCompletion;
  } catch (e:any) {
    console.log('error is: ', e?.response?.data)
    throw "Could no create completion";
  };
};

export default generateBotResponse;