// This file is /api/run-model.js
// It runs securely on Vercel's server.

export default async function handler(request, response) {
  const { input_text } = await request.json();
  const HF_TOKEN = process.env.HF_TOKEN; // Gets your token from Vercel
  const API_URL = "https://medalami1-my-ai-api.hf.space";

  try {
    const hf_response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + HF_TOKEN
      },
      body: JSON.stringify({ input_text: input_text }),
    });

    if (!hf_response.ok) {
      throw new Error(`Hugging Face API error: ${hf_response.status}`);
    }

    const data = await hf_response.json();
    response.status(200).json(data);
    
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
