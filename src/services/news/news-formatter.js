import { formatDate } from '../../utils/date-formatter.js';

export class NewsFormatter {
  formatNewsResponse(newsData, hours) {
    const sections = [
      this.#formatHeader(hours),
      this.#formatSummary(newsData.summary),
      this.#formatArticles(newsData.articles)
    ];

    return sections.filter(Boolean).join('\n\n');
  }

  #formatHeader(hours) {
    return `📰 近${hours}小时加密货币要闻`;
  }

  #formatSummary(summary) {
    if (!summary) {
      return null;
    }

    const points = summary.split('\n').filter(Boolean);
    const formattedPoints = points.map((point, index) => {
      if (point.startsWith('市场趋势') || 
          point.startsWith('重大事件') || 
          point.startsWith('监管动态') || 
          point.startsWith('行业发展')) {
        return `\n${point}`;
      }
      return `${index + 1}. ${point.trim()}`;
    });

    return `📊 市场综述：\n${formattedPoints.join('\n')}`;
  }

  #formatArticles(articles) {
    if (!articles?.length) {
      return null;
    }

    const header = '📋 详细新闻：';
    const formattedArticles = articles.map((article, index) => (
      `${index + 1}. ${article.title}\n` +
      `⏰ ${formatDate(article.pubDate)}`
    ));

    return [header, ...formattedArticles].join('\n\n');
  }
}