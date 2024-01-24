## Sign In With AI

Request an OpenAI API to make requests on behalf of your user's OpenAI account. Your app, their API usage.

The user's OpenAI API keys will not be shared with your app. Instead, your app will receive an encrypted `apiKey` and a `baseURL` to a proxy to the OpenAI API which uses your user's API keys.

### Installation

```bash
bun add @genesis-xyz/ai
```

Add this script to the `<head>` tag of your site:

```html
<script src="https://unpkg.com/@passes/polyfill@^0.1.5"></script>
```

### Usage

`requestOpenAIAPI` returns the following type, which may be passed directly to the `OpenAI` sdk constructor.

```typescript
type RequestOpenAIAPIResult = {
  apiKey: string;
  baseURL: string;
};
```

#### With the `openai` sdk: 

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

#### With client-side `fetch`:

```typescript
import { requestOpenAIAPI } from '@genesis-xyz/ai';
import { OpenAI } from 'openai';

// Request the user to "Sign In With OpenAI"
const { baseURL, apiKey } = await requestOpenAIAPI();

// Use fetch to request the OpenAI API
const result = await fetch(`${baseURL}/chat/completions`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello OpenAI!' }],
  }),
})
```


## FAQ

<details>
  <summary>1. Why does this product exist?</summary>
  
  **Because we believe it should be easier for developers to experiment and build new concepts for AI apps. **
    
  For each new app they build, developers currently need to manage the cost of using the OpenAI API. Apps that leverage cutting-edge models like GPT-4 can carry large costs if usage grows and the overhead costs can really add up if the developer is shipping many AI apps, but still searching for product-market fit. 
    
  As a result, it’s becoming increasingly common to allow users to paste their personal [OpenAI API key directly into the app](https://x.com/steveruizok/status/1730519276233076954?s=20). Not only is this a terrible security practice, it’s also super annoying for users to manually paste their API key in every new app that they want to try. 
    
  So by offering a safe & simple product for users to sign in with their own OpenAI API key, Genesis provides a safer way for users to try more AI apps and empowers developers to build apps more easily, without taking on all of the cost burden for compute. It’s a win-win for everyone involved.
</details>

<details>
  <summary>2. How does it work?</summary>

  **Requesting an OpenAI API key from the user**
      1. When a user first signs up for your app, a new tab opens and requests the user to enter their OpenAI API key and secure it with a Passkey.
      2. The API key is encrypted and stored for easy future access.
      3. Your app gets an `apiKey` and `baseURL` that it can use to configure the `openai` SDK.
  
  **Proxying the the OpenAI API**
      1. Your app sends requests to the provided `baseURL`, which is a proxy to OpenAI's API.
      2. The proxy sends requests to OpenAI with the user's OpenAI API key.
      3. Responses from OpenAI are streamed to your app.
</details>

<details>
  <summary>3. How is user data secured?</summary>
  
  - **Encrypted API keys**. User API keys are wrapped in (encrypted) JWTs for both storage and transmission, meaning the key is never directly exposed to the requesting site or transmitted over the network in plain text.
  - **Reverse proxy**. Genesis hosts a secure intermediary layer for proxying OpenAI API requests, which handles decrypting the user's API key, and forwarding the request to OpenAI. The reverse proxy allows the client to use the full functionality of the OpenAI API (including streaming) without ever handling the user API key.
</details>


## For users: how do I get an OpenAI API key?

For now, it’s a manual process:

1. If you already have an OpenAI account, sign in [on the developer platform](https://platform.openai.com/). If not, sign up for an account here.
    
   <img width="1512" alt="oai-dev-platform" src="https://github.com/genesis-xyz/ai/assets/1638987/0c450c17-9968-4704-92dc-bba72dc099f6">
    
2. To get an API key, click the [lock icon](https://platform.openai.com/api-keys) in the left-side toolbar.
    
    <img width="1512" alt="dev-platform-sidebar-toggle" src="https://github.com/genesis-xyz/ai/assets/1638987/4870456b-7d51-4e21-94f6-d24628346de1">

3. You’ll see all of the API keys that you’ve created on this page. To create a new API key, select `Create new secret key`, give it a name, and then copy the API key that appears. 
    - Note: any previously created API keys can’t be retrieved from this page, so be sure to save the key when you create it.
    
    <img width="1512" alt="api-key-list" src="https://github.com/genesis-xyz/ai/assets/1638987/6d67ff7c-2986-41a4-9de2-f900516793d3">
    
4. Paste the API key in Genesis and approve the request.
    
    <img width="1728" alt="genesis-request" src="https://github.com/genesis-xyz/ai/assets/1638987/50edcd88-dbee-4bc4-b3d6-e80262d43de0">
