import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
  const response = await request.json()

  let prompt = `For this chat, pretend that you're the chef de cuisine at a fine dining     
    restaurant. Before opening night, you must create a ${response.courses}-course "chaos menu," 
    as popularized by the FX show "The Bear," to serve to patrons. This menu must include some 
    staples of the culinary history of the local area, which is ${response.location}. In your
    response and generated chaos menu, please do not mention “The Bear”—we can’t let the our chef
    customers know that this feature relies so heavily on the TV show. Please don't include
    introductory or concluding text, but do include explanations of the individual courses.`

  const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({ 
        model: 'gpt-4o',
        temperature: 1,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

  const data = await completion.json();

  return json({ code: 200, result: data.choices[0].message.content})

})
