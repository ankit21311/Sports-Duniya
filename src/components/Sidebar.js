import React from 'react';
import styles from '../styles/Sidebar.module.scss';

const Sidebar = () => {
    // Trending topics data
    const trendingTopics = [
        {id: 1, title: 'UEFA Champions League Final', category: 'Football'},
        {id: 2, title: 'IPL 2025 Playoffs', category: 'Cricket'},
        {id: 3, title: 'Wimbledon 2025', category: 'Tennis'},
        {id: 4, title: 'Formula 1 Monaco GP', category: 'Racing'},
        {id: 5, title: 'NBA Finals', category: 'Basketball'}
    ];

    // Popular tags
    const popularTags = [
        'Football', 'Cricket', 'Champions League', 'Premier League', 'IPL',
        'Real Madrid', 'Manchester United', 'Virat Kohli', 'Tennis', 'NBA'
    ];

    // Most viewed articles
    const mostViewed = [
        {
            id: 1,
            image: '/images/most-viewed1.jpg',
            title: 'Top 10 Best Footballers in the World 2025',
            date: '05 June 2025'
        },
        {
            id: 2,
            image: '/images/most-viewed2.jpg',
            title: 'IPL 2025: Complete List of Retained Players',
            date: '08 June 2025'
        },
        {
            id: 3,
            image: '/images/most-viewed3.jpg',
            title: 'Champions League Final Preview: Real Madrid vs Bayern Munich',
            date: '09 June 2025'
        }
    ];

    return (
        <aside className={styles.sidebar}>
            {/* Trending Topics */}
            <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Trending Topics</h3>
                <ul className={styles.trendingList}>
                    {trendingTopics.map(topic => (
                        <li key={topic.id} className={styles.trendingItem}>
                            <span className={styles.topicCategory}>{topic.category}</span>
                            <span className={styles.topicTitle}>{topic.title}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Popular Tags */}
            <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Popular Tags</h3>
                <div className={styles.tagsContainer}>
                    {popularTags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>

            {/* Most Viewed Articles */}
            <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Most Viewed</h3>
                <div className={styles.mostViewedList}>
                    {mostViewed.map(article => (
                        <div key={article.id} className={styles.mostViewedItem}>
                            <div className={styles.mostViewedImage}>
                                <img src={article.image} alt={article.title}/>
                            </div>
                            <div className={styles.mostViewedInfo}>
                                <h4>{article.title}</h4>
                                <div className={styles.mostViewedDate}>
                                    <i className="far fa-calendar"></i>
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Subscription */}
            <div className={`${styles.sidebarSection} ${styles.newsletterSection}`}>
                <h3 className={styles.sidebarTitle}>Subscribe to Newsletter</h3>
                <p>Stay updated with the latest sports news and updates.</p>
                <form className={styles.newsletterForm}>
                    <input type="email" placeholder="Your email address"/>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </aside>
    );
};

export default Sidebar;