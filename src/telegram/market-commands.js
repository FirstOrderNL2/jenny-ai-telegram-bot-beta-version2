import { handleError } from '../utils/error-handler.js';
import { NewsFormatter } from '../services/news/news-formatter.js';
import { formatPrice, formatPriceChange } from '../utils/price-formatter.js';

export function setupMarketCommands(bot, marketService, newsService) {
  const newsFormatter = new NewsFormatter();

  // Top 10 cryptocurrencies command
  bot.onText(/\/top10/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      bot.sendChatAction(chatId, 'typing');
      
      const top10 = await marketService.getTop10();
      const response = formatTop10Response(top10);
      
      bot.sendMessage(chatId, response);
    } catch (error) {
      console.error('Top 10 command error:', error);
      handleError(bot, chatId, error);
    }
  });

  // Global market overview command
  bot.onText(/\/market/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      bot.sendChatAction(chatId, 'typing');
      
      const metrics = await marketService.getGlobalMetrics();
      const response = formatMarketResponse(metrics);
      
      bot.sendMessage(chatId, response);
    } catch (error) {
      console.error('Market command error:', error);
      handleError(bot, chatId, error);
    }
  });

  // News command
  bot.onText(/\/news/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      bot.sendChatAction(chatId, 'typing');
      
      const hours = 6;
      const newsData = await newsService.getLatestNews(hours);
      const formattedResponse = newsFormatter.formatNewsResponse(newsData, hours);
      
      bot.sendMessage(chatId, formattedResponse);
    } catch (error) {
      console.error('News command error:', error);
      handleError(bot, chatId, error);
    }
  });
}

function formatTop10Response(top10) {
  const header = '📊 加密货币市值排行榜 (前10名)\n\n';
  
  const coins = top10.map((coin, index) => {
    const changeEmoji = coin.change24h >= 0 ? '📈' : '📉';
    return `${index + 1}. ${coin.symbol}\n` +
           `   💰 价格: $${coin.price}\n` +
           `   ${changeEmoji} 24h: ${formatPriceChange(coin.change24h)}`;
  }).join('\n\n');
  
  return header + coins;
}

function formatMarketResponse(metrics) {
  return `🌍 全球加密货币市场概况\n\n` +
         `📊 总市值: $${metrics.totalMarketCap}\n` +
         `📈 24h成交量: $${metrics.totalVolume24h}\n` +
         `🔶 比特币占比: ${metrics.btcDominance}%\n` +
         `💠 以太坊占比: ${metrics.ethDominance}%`;
}