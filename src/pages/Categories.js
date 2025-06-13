import React from 'react';
import Header from '../components/Header';
import LiveScoresTicker from '../components/LiveScoresTicker';
import CategoryCard from '../components/CategoryCard';
import styles from '../styles/Categories.module.scss';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: 'Football',
            icon: 'football-ball',
            image: 'https://img.freepik.com/free-photo/soccer-players-action-professional-stadium_654080-1130.jpg',
            description: 'Latest news, transfers, match reports and opinions on football',
            count: 1250
        },
        {
            id: 2,
            name: 'Cricket',
            icon: 'cricket',
            image: 'https://img.freepik.com/free-photo/cricket-player-field-action_53876-63345.jpg',
            description: 'Cricket news, match updates, player statistics and analysis',
            count: 987
        },
        {
            id: 3,
            name: 'IPL',
            icon: 'trophy',
            image: 'https://assets.bcci.tv/bcci-static-assets/ipl-2024/images/ipl-home-banner-640x480.webp',
            description: 'Indian Premier League updates, team news and match predictions',
            count: 754
        },
        {
            id: 4,
            name: 'WNBA',
            icon: 'basketball-ball',
            image: 'https://cdn.vox-cdn.com/thumbor/YUZ5VAhIBMzjqLV0jqk3gEGpdJU=/0x0:3047x2031/1200x800/filters:focal(1218x264:1698x744)/cdn.vox-cdn.com/uploads/chorus_image/image/70086884/1351609063.0.jpg',
            description: 'Women\'s National Basketball Association news and player updates',
            count: 421
        },
        {
            id: 5,
            name: 'NBA',
            icon: 'basketball-ball',
            image: 'https://cdn.nba.com/manage/2023/11/GettyImages-1812727572-1-1-1568x882.jpg',
            description: 'NBA news, player transfers, game analysis and highlights',
            count: 895
        },
        {
            id: 6,
            name: 'Gaming',
            icon: 'gamepad',
            image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg',
            description: 'Gaming news, reviews, tips and strategies across platforms',
            count: 633
        },
        {
            id: 7,
            name: 'Esports',
            icon: 'trophy',
            image: 'https://cdn.esportsinsider.com/2020/04/Esports-Tournament-770x434.jpg',
            description: 'Esports tournaments, team news and competitive gaming updates',
            count: 578
        },
        {
            id: 8,
            name: 'Tennis',
            icon: 'tennis-ball',
            image: 'https://media.cnn.com/api/v1/images/stellar/prod/230711104839-01-wimbledon-2023-0710.jpg',
            description: 'Tennis news, tournament updates and player rankings',
            count: 345
        },
        {
            id: 9,
            name: 'Formula 1',
            icon: 'flag-checkered',
            image: 'https://cdn-5.motorsport.com/images/amp/2jXZXRx0/s1000/formula-1-bahrain-gp-2023-max-.jpg',
            description: 'Formula 1 race updates, driver news and team developments',
            count: 412
        },
    ];

    // Statistics for visual display
    const stats = [
        {label: 'Categories', value: '15+'},
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
                    <LiveScoresTicker/>

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
