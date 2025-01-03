import { setupStartCommand } from '../commands/start.js';
import { setupHelpCommand } from '../commands/help.js';
import { setupPriceCommand } from '../handlers/price.js';
import { setupMarketCommand } from '../handlers/market.js';
import { setupTop10Command } from '../handlers/top10.js';
import { setupJennyCommand } from '../handlers/jenny.js';
import { setupNewsCommand } from '../handlers/news.js';

export function setupHandlers(bot, services) {
  setupStartCommand(bot);
  setupHelpCommand(bot);
  setupPriceCommand(bot, services.cryptoService, services.giphyService);
  setupMarketCommand(bot, services.cryptoService);
  setupTop10Command(bot, services.cryptoService);
  setupJennyCommand(bot, services.openAIService);
  setupNewsCommand(bot, services.newsService, services.giphyService);
}