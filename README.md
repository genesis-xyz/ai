## Sign In With AI

Auth that enables users to sign in with their own OpenAI API key, so that you can build apps powered by users. Your app, their API usage.

User OpenAI API keys will not be shared with your app. Instead, your app will receive an `apiKey` and `baseURL` for a proxy to the OpenAI API which uses your user's API keys.

## Why build apps using Sign In With AI?

Because we believe it should be easier for developers to experiment and build new ideas for AI apps. 

For each new app they build, developers also become responsible for the cost of using the OpenAI API and apps that leverage cutting-edge models like GPT-4 can carry a large bill if usage grows. Multiply that cost burden across several app ideas and that's a lot of overhead, making it harder to justify building new app ideas.

As a result, it’s becoming increasingly common to allow users to paste their personal OpenAI API key directly into the app. Not only is this bad security, it’s also super annoying for users to manually paste their API key in every new app that they want to try. 

By offering a product for users to sign in with their own OpenAI API key, Genesis provides a safer way for users to try more AI apps and empowers developers to build their app ideas more easily, without taking on all of the cost burden for compute. It’s a win-win for everyone involved.

### Installation

```bash
bun add @genesis-xyz/ai
```

Add this script to the `<head>` tag of your site:

```html
<script src="https://unpkg.com/@passes/polyfill@^0.1.5"></script>
```

### Usage

```typescript
import { requestOpenAIAPI } from '@genesis-xyz/ai';
import { OpenAI } from 'openai';

// Request the user to "Sign In With OpenAI"
const openai = new OpenAI(await requestOpenAIAPI());

const chat = await openai.chat.completions.create({
  model: 'gpt-4',
  stream: true,
  messages: [{ role: 'user', content: 'Hello OpenAI!' }],
});
```

## FAQ
### 1. How does the system work?

a. There are two main parts to the system:
    i. **Requesting an OpenAI API key from the user**
        1. When a user first signs up for your app, a new tab opens and requests the user to enter their OpenAI API key and secure it with a Passkey.
        2. The API key is encrypted and stored for easy future access.
        3. Your app gets an `apiKey` and `baseURL` that it can use to configure the `openai` SDK.

    ii. **Proxying the OpenAI API**
        1. Your app sends requests to the provided `baseURL`, which is a proxy to OpenAI's API.
        2. The proxy sends requests to OpenAI with the user's OpenAI API key.
        3. Responses from OpenAI are streamed to your app.
### 2. How is user data secured?

a. Genesis takes a several approaches to secure user data:
    i. **Encrypted API key handling**. User API keys are wrapped in JWTs, meaning the key is never directly exposed to the reverse proxy or transmitted over the network in plain text.
    
    ii. **Reverse proxy layer**. Genesis creates a secure intermediary layer for processing incoming requests, decrypting the user API key, and forwarding the request to OpenAI for validation         and processing. The reverse proxy allows the client to use the full functionality of the OpenAI API, while not ever handling the user API key.
