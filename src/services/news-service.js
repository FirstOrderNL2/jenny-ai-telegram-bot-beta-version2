import Parser from 'rss-parser';
import { NEWS_FEEDS } from '../config/news-feeds.js';
import { NewsAggregator } from './news/news-aggregator.js';
import { NewsSummarizer } from './news/news-summarizer.js';

export class NewsService {
  constructor(openAiKey) {
    this.parser = new Parser();
    this.feeds = NEWS_FEEDS;
    this.aggregator = new NewsAggregator(this);
    this.summarizer = new NewsSummarizer(openAiKey);
  }

  async getLatestNews(category = 'BITCOIN', limit = 5) {
    try {
      const feed = await this.parser.parseURL(this.feeds[category]);
      return feed.items
        .slice(0, limit)
        .map(item => ({
          title: item.title,
          pubDate: new Date(item.pubDate).toLocaleString()
        }));
    } catch (error) {
      throw new Error('Failed to fetch news');
    }
  }

  async getDailySummary() {
    try {
      const articles = await this.aggregator.getDailySummary();
      const summary = await this.summarizer.generateSummary(articles);
      
      return {
        summary,
        articles: articles.slice(0, 5)
      };
    } catch (error) {
      throw new Error('Failed to generate daily summary');
    }
  }
}