import React from 'react';
import styles from '../styles/NewsCard.module.scss';

const NewsCard = ({image, category, title, description, showScore, score, showDate, date, featured = false}) => {
    return (
        <div className={`${styles.newsCard} ${featured ? styles.featured : ''}`}>
            <div className={styles.newsImage}>
                <img src={image} alt={title}/>
                <span className={`${styles.category} ${styles[category.toLowerCase()]}`}>{category}</span>
            </div>
            <div className={styles.newsContent}>
                <h3 className={styles.title}>{title}</h3>
                {description && <p className={styles.description}>{description}</p>}

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

                <div className={styles.readMore}>
                    <span>Read More</span>
                    <i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;