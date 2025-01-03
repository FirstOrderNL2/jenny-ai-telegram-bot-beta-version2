import axios from 'axios';
import { NEWS_FEEDS } from '../../data/news-sources.js';

export class NewsFetcher {
  async fetchNews(hours = 6) {
    try {
      console.log('Fetching news from CoinGecko API...');
      
      // Fetch general news
      const response = await axios.get(NEWS_FEEDS.CHINESE.GENERAL);
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from API');
      }

      const articles = response.data.map(item => ({
        title: item.title,
        pubDate: new Date(item.published_at),
        url: item.url,
        source: item.source
      }));

      console.log(`Fetched ${articles.length} articles`);
      
      return this.filterRecentArticles(articles, hours);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      
      // Return mock data if API fails
      return this.getMockNews(hours);
    }
  }

  filterRecentArticles(articles, hours) {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    const seen = new Set();
    
    return articles
      .filter(article => {
        try {
          return article.pubDate >= cutoffTime;
        } catch (error) {
          console.error('Invalid date:', error);
          return false;
        }
      })
      .filter(article => {
        if (seen.has(article.title)) return false;
        seen.add(article.title);
        return true;
      })
      .sort((a, b) => b.pubDate - a.pubDate)
      .slice(0, 10);
  }

  getMockNews(hours) {
    const now = new Date();
    return [
      {
        title: "比特币突破45000美元，创下近期新高",
        pubDate: new Date(now - 1000 * 60 * 30), // 30 minutes ago
        source: "CoinGecko"
      },
      {
        title: "以太坊2.0质押量突破300亿美元",
        pubDate: new Date(now - 1000 * 60 * 60), // 1 hour ago
        source: "CoinGecko"
      },
      {
        title: "美国SEC批准比特币现货ETF申请",
        pubDate: new Date(now - 1000 * 60 * 90), // 1.5 hours ago
        source: "CoinGecko"
      }
    ];
  }
}