export function setupHelpCommand(bot) {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const message = 
      `Here's how to use my commands:

Main Commands:
• /price [crypto] - Check any cryptocurrency price
• /top10 - View top 10 cryptocurrencies
• /market - Check global market overview
• /news - Latest crypto news
• /jenny [question] - Ask me anything about crypto

Examples:
• /price bitcoin
• /price ethereum
• /jenny What is blockchain?

Try these commands now!`;
    
    bot.sendMessage(chatId, message);
  });
}