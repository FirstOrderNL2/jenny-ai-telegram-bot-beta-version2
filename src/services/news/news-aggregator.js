export class NewsAggregator {
  constructor(newsService) {
    this.newsService = newsService;
  }

  async getDailySummary() {
    try {
      const categories = ['BITCOIN', 'ETHEREUM', 'MARKET_ANALYSIS'];
      const allNews = [];

      for (const category of categories) {
        const news = await this.newsService.getLatestNews(category, 3);
        allNews.push(...news);
      }

      // Sort by date and remove duplicates
      return Array.from(new Map(
        allNews.map(item => [item.title, item])
      ).values()).sort((a, b) => 
        new Date(b.pubDate) - new Date(a.pubDate)
      );
    } catch (error) {
      throw new Error('Failed to aggregate news');
    }
  }
}