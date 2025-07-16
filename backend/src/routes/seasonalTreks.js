import express from 'express';
const router = express.Router();

function parseGeminiTreks(text) {
  const treks = [];
  const trekBlocks = text.split(/\n\d+\.\s/).slice(1); // Split by numbered list
  trekBlocks.forEach(block => {
    const nameMatch = block.match(/\*\*Name:\*\*\s*(.*)/);
    const regionMatch = block.match(/\*\*State\/Region:\*\*\s*(.*)/);
    const startMatch = block.match(/\*\*Where to Start:\*\*\s*(.*)/);
    const difficultyMatch = block.match(/\*\*Difficulty Level:\*\*\s*(.*)/);
    const tipsMatch = block.match(/\*\*Tips:\*\*\s*([\s\S]*?)(?=\n\n|$)/);

    treks.push({
      name: nameMatch ? nameMatch[1].trim() : '',
      region: regionMatch ? regionMatch[1].trim() : '',
      start: startMatch ? startMatch[1].trim() : '',
      difficulty: difficultyMatch ? difficultyMatch[1].trim() : '',
      tip: tipsMatch ? tipsMatch[1].replace(/\d+\.\s*/g, '').replace(/\n/g, ' ').trim() : ''
    });
  });
  return treks;
}

router.post('/', async (req, res) => {
  const { season } = req.body;
  if (!season) {
    return res.status(400).json({ error: 'Season is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'AI service not configured' });
  }

  // Build the prompt for Gemini
  const prompt = `List 5 of the best treks in India for the ${season} season. For each trek, provide:\n- Name\n- State/Region\n- Where to start the trek from\n- Difficulty level (Easy/Moderate/Hard)\n- 1-2 tips for trekkers`;

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
    console.log('Gemini AI response:', text);
    const treks = parseGeminiTreks(text);
    res.json({ treks });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to fetch trek recommendations' });
  }
});

export default router;