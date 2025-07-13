import OpenAI from 'openai';
import config from '../config/config';

const grokClient = new OpenAI({
  apiKey: config.grokApiKey,
  baseURL: config.grokBaseUrl,
});

export default grokClient;
