export function setupJennyCommand(bot, openAIService) {
  bot.onText(/\/jenny (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const question = match[1];
    
    try {
      await bot.sendChatAction(chatId, 'typing');
      const response = await openAIService.getResponse(question);
      await bot.sendMessage(chatId, response);
    } catch (error) {
      console.error('Jenny command error:', error);
      bot.sendMessage(chatId, "Sorry, I couldn't process your question. Please try again later.");
    }
  });
}