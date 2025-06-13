import React from 'react';
import styles from '../styles/NewsSection.module.scss';

const NewsCard = ({image, category, title, description, showScore, score, showDate, date}) => {
    return (
        <div className={styles.newsCard}>
            <div className={styles.newsImage}>
                <img src={image} alt={title}/>
                <span className={`${styles.category} ${styles[category.toLowerCase()]}`}>{category}</span>
            </div>
            <div className={styles.newsContent}>
                <h3>{title}</h3>
                {description && <p>{description}</p>}

                {showScore && (
                    <div className={styles.matchScore}>
                        <span className={styles.team}>{score.team1}</span>
                        <span className={styles.score}>-</span>
                        <span className={styles.team}>{score.team2}</span>
                    </div>
                )}

                {showDate && (
                    <div className={styles.newsDate}>
                        <i className="far fa-calendar"></i>
                        <span>{date}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const NewsSection = () => {
    const news = [
        {
            id: 1,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=640,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/cms-post/st-1749574627241.webp',
            category: 'Cricket',
            title: 'Seattle Orcas: Know All About Players, Owners, Captains & More',
            description: 'Check out Seattle Orcas owners, captains, players, coaches, records, stats, performances, and more.',
            showScore: false,
            showDate: true,
            date: '10 June 2025'
        },
        {
            id: 2,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=1920,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/cms-post/Player%20Rating%20%20%284%29-1749569164529.webp',
            category: 'Football',
            title: 'Bangladesh 1-2 Singapore Player Ratings: Clinical Lions Edge Out Bengals',
            showScore: true,
            score: {
                team1: '1',
                team2: '2'
            },
            showDate: true,
            date: '10 June 2025'
        },
        {
            id: 3,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=1920,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/cms-post/What%20Will%20Be%20The%20Playing%20XI%20For%20AUS%20vs%20SA%20WTC%20Final%202025-1749460402216.webp',
            category: 'Cricket',
            title: 'Australia, South Africa Announce Playing XI For WTC Final 2025',
            showScore: false,
            showDate: true,
            date: '10 June 2025'
        },
        {
            id: 4,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=640,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/cms-post/Predection%20-%202025-06-08T031735.180-1749332915717.webp',
            category: 'Football',
            title: 'Slovakia U21 vs Spain U21 Prediction, Preview, Team News and More',
            description: 'Get Slovakia U21 vs Spain U21 prediction, preview, injury news & other details. Explore predicted lineups, form guide, and more.',
            showScore: false,
            showDate: true,
            date: '10 June 2025'
        },
        {
            id: 5,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=1920,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/cms-post/SS%20vs%20TGC%20Toss%20Prediction%20%282%29-1749559715642.webp',
            category: 'Cricket',
            title: 'Today Toss Prediction: Who Will Win Today\'s Toss in SS vs TGC Fantasy',
            showScore: false,
            showDate: true,
            date: '10 June 2025'
        },
        {
            id: 6,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=1920,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/cms-post/Gaming%20News-1749563693676.webp',
            category: 'Gaming',
            title: 'Top 15 Legend of Zelda Games Ranked',
            showScore: false,
            showDate: true,
            date: '10 June 2025'
        },
        {
            id: 7,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=1920,onerror=redirect/https://cms.sportsdunia.com/wp-content/uploads/2024/12/Ney-FI.webp',
            category: 'Football',
            title: 'Who is Neymar Jr\'s Wife Bruna Biancardi?',
            showScore: false,
            showDate: true,
            date: '08 June 2025'
        },
        {
            id: 8,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=1920,onerror=redirect/https://cms.sportsdunia.com/wp-content/uploads/2024/10/AnalysisStatic-5.webp',
            category: 'Football',
            title: 'PSR Premier League: A Full Breakdown Of Premier League Financial Rules',
            showScore: false,
            showDate: true,
            date: '08 June 2025'
        },
        {
            id: 9,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=1920,onerror=redirect/https://cms.sportsdunia.com/wp-content/uploads/2025/02/red-card-1.webp',
            category: 'Football',
            title: 'Top 10 Muslim Footballers in the World (2025)',
            showScore: false,
            showDate: true,
            date: '08 June 2025'
        }
    ];

    return (
        <section className={styles.news}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>All Top News</h2>
                    <div className={styles.viewMore}>
                        <i className="fas fa-angle-right"></i>
                    </div>
                </div>

                <div className={styles.newsGrid}>
                    {news.map((item) => (
                        <NewsCard
                            key={item.id}
                            image={item.image}
                            category={item.category}
                            title={item.title}
                            description={item.description}
                            showScore={item.showScore}
                            score={item.score}
                            showDate={item.showDate}
                            date={item.date}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
