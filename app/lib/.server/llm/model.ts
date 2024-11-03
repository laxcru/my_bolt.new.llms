// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import { getAPIKey } from '~/lib/.server/llm/api-key';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { ollama } from 'ollama-ai-provider';

export function getAnthropicModel(apiKey: string, model: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic(model);
}

export function getOpenAIModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    apiKey,
  });

  return openai(model);
}

export function getGroqModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey,
  });

  return openai(model);
}

export function getGroqModel_cn(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://gateway.ai.cloudflare.com/v1/8d75f22605db146a86f364ff865aa219/qi/groq',
    apiKey,
  });

  return openai(model);
}

export function getSiliconflow(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.siliconflow.cn/v1',
    apiKey,
  });

  return openai(model);
}

export function getOllamaModel(model: string) {
  return ollama(model);
}

export function getModel(provider: string, model: string, env: Env) {
  const apiKey = getAPIKey(env, provider);

  switch (provider) {
    case 'Anthropic':
      return getAnthropicModel(apiKey, model);
    case 'OpenAI':
      return getOpenAIModel(apiKey, model);
    case 'Groq':
      return getGroqModel_cn(apiKey, model);
    case 'Siliconflow':
      return getSiliconflow(apiKey, model);
    default:
      return getOllamaModel(model);
  }
}
