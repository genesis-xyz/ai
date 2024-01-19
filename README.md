## "Sign In With OpenAI"

Request an OpenAI API to make requests on behalf of your user's OpenAI account. Your app, their API usage.

The user's OpenAI API keys will not be shared with your app. Instead, your app will receive an `apiKey` and `baseURL` for a proxy to the OpenAI API which uses your user's API keys.

### Installation

```bash
bun add @genesis-xyz/ai
```

Add this script to the `<head>` tag of your site:

```html
<script src="https://unpkg.com/@passes/polyfill@^0.1.4"></script>
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