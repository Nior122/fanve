import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

const PORT = 3001;

app.post('/api/generate-bio', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
      httpOptions: {
        apiVersion: '',
        baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a seductive bio for ${name}.`,
    });

    res.json({ bio: response.text?.trim() || '' });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Failed to generate bio' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});
