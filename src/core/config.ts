import { getLogLevelFromEnv } from './logging.ts';
import '$std/dotenv/load.ts';

// Define a specific type for tursoConfig
interface TursoConfig {
  authToken: string;
  url: string;
  syncUrl?: string;
  interval?: number;
}

// Define an interface for your configuration
interface Config {
  tursoConfig: TursoConfig;
  anthropicApiKey: string;
  isProd: boolean;
  baselimeApiKey: string;
  minLogLevel: number;
  openaiApiKey: string;
  embeddingModel: string;
  llmModel: string;
  llmTimeout: number;
  siteUrl: string;
  // Add other configuration properties as needed
}

// A function to safely get the environment variable or throw an error if not found
function getEnvVar(key: string): string {
  const value = Deno.env.get(key);
  if (value === undefined && Deno.env.get('DENO_SKIP_ENVVAR') !== 'true') {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value!;
}

// Load and validate all environment variables
export const config: Config = {
  tursoConfig: {
    authToken: getEnvVar('TURSO_AUTH_TOKEN'),
    url: getEnvVar('TURSO_DATABASE_URL'),
  },
  anthropicApiKey: getEnvVar('ANTHROPIC_API_KEY'),
  isProd: getEnvVar('PROD') === 'true',
  baselimeApiKey: getEnvVar('BASELIME_API_KEY'),
  minLogLevel: getLogLevelFromEnv(),
  openaiApiKey: getEnvVar('OPENAI_API_KEY'),
  embeddingModel: 'text-embedding-3-small',
  llmModel: 'gpt-4o-mini',
  llmTimeout: 10000, // 10 seconds timeout
  siteUrl: Deno.env.get('SITE_URL') || 'http://localhost:8000',
  // Load other environment variables as needed
};
