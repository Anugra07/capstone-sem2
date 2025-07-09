import express from 'express';
const router = express.Router();

// No-cache middleware for all /api/ai requests
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

router.get('/', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `I am a first-time traveler going from ${from} to ${to}. Please provide the following:\n1. The cheapest way to travel in detailed, step-by-step instructions so that even a child could follow.\n2. A well-structured list of local homestays or PG accommodations at the destination with brief descriptions.\n3. A list of affordable local eateries at the destination, highlighting their specialties.`
                }
              ],
              role: 'user'
            }
          ]
        })
      }
    );
    const data = await geminiResponse.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ answer: text });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to fetch travel options' });
  }
});

router.post('/', async (req, res) => {
  const { from, to, startDate, endDate, duration, preferences, budget, groupSize } = req.body;
  if (!from || !to) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Build enhanced prompt
  const prompt = `I am a first-time traveler going from ${from} to ${to}.

Here are my trip details:
- Dates: ${startDate || 'Not specified'} to ${endDate || 'Not specified'}
- Duration: ${duration || 'Not specified'}
- Preferences: ${preferences && preferences.length ? preferences.join(', ') : 'None'}
- Budget: ₹${budget || 'Not specified'}
- Group size: ${groupSize || 'Not specified'}

Please provide the following:
1. The cheapest way to travel in detailed, step-by-step instructions so that even a child could follow.
2. A well-structured list of local homestays or PG accommodations at the destination with brief descriptions.
3. A list of affordable local eateries at the destination, highlighting their specialties.`;

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ],
              role: 'user'
            }
          ]
        })
      }
    );
    const data = await geminiResponse.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ answer: text });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to fetch travel options' });
  }
});

export default router; 