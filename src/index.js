import { RequestTopic } from '@passes/reqs';
import * as Codecs from '@passes/reqs/codecs';
import * as Wrappers from '@passes/reqs/wrappers';

/**
 * Pass Request topic for requesting OpenAI API credentials
 * @type {import('@passes/reqs').RequestTopic<void, { apiKey: string; baseURL: string }>}
 */
export const openAIAPIRequestTopic = new RequestTopic({
  id: 'xyz.genesis.ai.openai-api',
  requestBodyCodec: Codecs.Void,
  resultBodyCodec: Codecs.Json,
});

/**
 * A convenient function for requesting OpenAI API credentials, which uses https://genesis.xyz/ai/openai-api as the default provider.
 */
export async function requestOpenAIAPI() {
  const result = await Wrappers.Utils.sendRequestWithDefaultProvider({
    topic: openAIAPIRequestTopic,
    body: undefined,
    defaultProvider: 'https://genesis.xyz/request',
  });

  if (result.status !== 'accepted') {
    throw new Error(`OpenAI API Pass Request was not accepted: ${JSON.stringify(result)}`);
  }

  return result.body;
}
