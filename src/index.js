import { RequestTopic } from '@passes/reqs';
import * as Codecs from '@passes/reqs/codecs';
import * as Wrappers from '@passes/reqs/wrappers';

/**
 * Pass Request topic for requesting OpenAI API credentials
 */
export const openAIAPIRequestTopic = new RequestTopic({
  id: 'xyz.genesis.ai.openai-api',
  requestBodyCodec: Codecs.Void,
  resultBodyCodec: 
    /** @type {import('@passes/reqs').Codec<{ apiKey: string; baseURL: string }>} */
    (Codecs.Json),
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
