import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  grokApiKey: string;
  grokBaseUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  grokApiKey: process.env.GROK_API_KEY || '',
  grokBaseUrl: process.env.GROK_BASE_URL || '',
};

export default config;
