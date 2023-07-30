import Bottleneck from 'bottleneck';
import { Configuration, OpenAIApi } from 'openai';

class CustomFormData extends FormData {
  getHeaders() {
      return {}
  }
}

export const limiterOpenai = new Bottleneck({
  maxConcurrent: 1,
  minTime: 50
});

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  formDataCtor: CustomFormData
});

const openai = new OpenAIApi(configuration);

export default openai;

export const customOpenai = (apiKey: string) => {
  const configurationCus = new Configuration({
    apiKey: apiKey,
    formDataCtor: CustomFormData
  });
  const config = new OpenAIApi(configurationCus);
  return config;
}