import OpenAI from 'openai';

export class NewsSummarizer {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateSummary(articles) {
    try {
      const content = articles
        .map(article => article.title)
        .join('\n');

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "You are a crypto news analyst. Summarize the key developments from these headlines in 3-4 concise bullet points. Focus on market trends, significant events, and potential impacts."
        }, {
          role: "user",
          content: content
        }]
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Summary generation failed:', error);
      return null;
    }
  }
}