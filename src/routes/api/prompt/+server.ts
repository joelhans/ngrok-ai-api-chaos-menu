import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
  const query = await request.json()

  let prompt = `For this chat, pretend that you're the chef de cuisine at a fine dining     
    restaurant and must create a new "chaos menu" (as popularized by the FX TV show 
    "The Bear"). The menu must have the following qualities: - A personality of 
    ${query.personality}. - ${query.courses} courses. - Based on one or more culinary traditions
    of ${query.location}. In your response, do not mention "The Bear," and do not include
    any introductiory or concluding text—just the courses and a 100-word description of each.
    If any of the above qualities are missing or not realistic, like a negative number of courses
    or a location of "the moon," return an error message beginning with 'Error:'.`

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

  if ( data.choices[0].message.content.includes('Error:') ) {
    return json({ status: 400, message: `Try again please.`})
  } else {
    return json({ status: 200, result: data.choices[0].message.content })
  }
})
