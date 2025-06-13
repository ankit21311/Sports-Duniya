import React from 'react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import styles from '../styles/Categories.module.scss';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: 'Football',
            icon: 'football-ball',
            image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Latest news, transfers, match reports and opinions on football',
            count: 1250
        },
        {
            id: 2,
            name: 'Cricket',
            icon: 'cricket',
            image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Cricket news, match updates, player statistics and analysis',
            count: 987
        },
        {
            id: 3,
            name: 'IPL',
            icon: 'trophy',
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=1920,onerror=redirect/https://sdprodstorage.blob.core.windows.net/sd-cms-prod/cms-post/MOST%20RUNS%20IN%20IPL-1749016835874.webp',
            description: 'Indian Premier League updates, team news and match predictions',
            count: 754
        },
        {
            id: 4,
            name: 'WNBA',
            icon: 'basketball-ball',
            image: 'https://images.unsplash.com/photo-1594623930572-300a3011d9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Women\'s National Basketball Association news and player updates',
            count: 421
        },
        {
            id: 5,
            name: 'NBA',
            icon: 'basketball-ball',
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=640,onerror=redirect/https://sdprodstorage.blob.core.windows.net/sd-cms-prod/featured-image/Luka%20Doncic%20fi-1749561740175.webp',
            description: 'NBA news, player transfers, game analysis and highlights',
            count: 895
        },
        {
            id: 6,
            name: 'Gaming',
            icon: 'gamepad',
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=640,onerror=redirect/https://sdprodstorage.blob.core.windows.net/sd-cms-prod/featured-image/gaming-console-1749823456789.webp',
            description: 'Gaming news, reviews, tips and strategies across platforms',
            count: 633
        },
        {
            id: 7,
            name: 'Esports',
            icon: 'trophy',
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=640,onerror=redirect/https://sdprodstorage.blob.core.windows.net/sd-cms-prod/featured-image/esports-tournament-1749823456790.webp',
            description: 'Esports tournaments, team news and competitive gaming updates',
            count: 578
        },
        {
            id: 8,
            name: 'Tennis',
            icon: 'tennis-ball',
            image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Tennis news, tournament updates and player rankings',
            count: 345
        },
        {
            id: 9,
            name: 'Formula 1',
            icon: 'flag-checkered',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Formula 1 race updates, driver news and team developments',
            count: 412
        },
        {
            id: 10,
            name: 'College Basketball',
            icon: 'basketball-ball',
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=640,onerror=redirect/https://sdprodstorage.blob.core.windows.net/sd-cms-prod/featured-image/Cooper%20Flagg%20Duke-1749702496156.webp',
            description: 'College basketball news, player highlights and tournament updates',
            count: 289
        },
        {
            id: 11,
            name: 'Boxing',
            icon: 'fist-raised',
            image: 'https://images.unsplash.com/photo-1544717684-582285020302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Boxing matches, fighter profiles and championship updates',
            count: 376
        },
        {
            id: 12,
            name: 'Baseball',
            icon: 'baseball-ball',
            image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'MLB news, player stats and season highlights',
            count: 523
        }
    ];

    // Statistics for visual display
    const stats = [
        {label: 'Categories', value: '12+'},
        {label: 'Articles', value: '10K+'},
        {label: 'Writers', value: '50+'},
        {label: 'Daily Readers', value: '500K+'}
    ];

    return (
        <div className={styles.categoriesPage}>
            <Header/>

            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.pageHeader}>
                        <h1 className={styles.pageTitle}>Explore By Categories</h1>
                        <p className={styles.pageDescription}>
                            Discover the latest news, updates, and analysis across various sports and gaming categories
                        </p>
                    </div>

                    {/* Stats counters */}
                    <div className={styles.statsSection}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statItem}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Categories grid */}
                    <div className={styles.categoriesGrid}>
                        {categories.map(category => (
                            <CategoryCard
                                key={category.id}
                                name={category.name}
                                icon={category.icon}
                                image={category.image}
                                description={category.description}
                                count={category.count}
                            />
                        ))}
                    </div>

                    {/* Popular Topics */}
                    <div className={styles.popularTopics}>
                        <h2 className={styles.sectionTitle}>Popular Topics</h2>
                        <div className={styles.topicTags}>
                            {['Premier League', 'IPL 2025', 'NBA Playoffs', 'Champions League',
                                'FIFA World Cup', 'Wimbledon', 'UFC', 'Formula 1', 'Roland Garros',
                                'NFL', 'MLB', 'WWE', 'Olympics', 'NHL', 'La Liga'].map((topic, index) => (
                                <span key={index} className={styles.topicTag}>{topic}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Categories;
