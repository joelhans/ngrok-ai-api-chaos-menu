import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

let openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

import { json } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
  const response = await request.json()

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: response.prompt }],
    model: 'gpt-3.5-turbo',
  });

  return json({ code: 200, result: completion.choices[0].message.content})

})
