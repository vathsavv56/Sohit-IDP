import axios from 'axios';

// Helper function to call Gemini API
const callGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is missing in environment variables');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  const response = await axios.post(
    url,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};

// @desc    Generate a polished description for an achievement
// @route   POST /api/ai/generate-description
// @access  Private
export const generateDescription = async (req, res) => {
  try {
    const { title, category } = req.body;
    
    if (!title || !category) {
      return res.status(400).json({ message: 'Title and category are required' });
    }

    const prompt = `You are a helpful assistant for a student achievement tracker. 
    A student wants to add an achievement with the title "${title}" in the category "${category}".
    Write a short, polished, professional 2-3 sentence description for this achievement. 
    Make it sound impressive but realistic. Return ONLY the description text, no extra conversational text.`;

    const generatedText = await callGemini(prompt);
    
    res.json({ description: generatedText.trim() });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: 'AI Generation failed' });
  }
};

// @desc    Suggest goals based on user achievements
// @route   POST /api/ai/suggest-goals
// @access  Private
export const suggestGoals = async (req, res) => {
  try {
    const { userCategories } = req.body; // Array of categories the user has achievements in
    
    const prompt = `A student has achievements in the following categories: ${userCategories.join(', ') || 'None yet'}. 
    Suggest 3 specific, actionable new goals or activities they could pursue to broaden their skills or deepen their current interests. 
    Format as a simple bulleted list with no bold text. Keep it concise.`;

    const generatedText = await callGemini(prompt);
    
    res.json({ suggestions: generatedText.trim() });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: 'AI Generation failed' });
  }
};
// @desc    Chat with AI Mentor
// @route   POST /api/ai/chat
// @access  Private
export const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const prompt = `You are an upbeat, helpful AI mentor embedded in a student achievement tracker. Keep answers very concise (1-3 sentences max).
Use a professional yet enthusiastic tone.
Context from user: ${context || 'General inquiry'}
User: ${message}
You:`;

    const generatedText = await callGemini(prompt);
    
    res.json({ text: generatedText.trim() });
  } catch (error) {
    console.error('AI Chat Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'AI Chat failed', error: error.response?.data?.error?.message || error.message });
  }
};
