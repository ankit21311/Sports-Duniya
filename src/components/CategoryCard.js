import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/CategoryCard.module.scss';

const CategoryCard = ({name, icon, image, description, count}) => {
    return (
        <Link to={`/category/${name.toLowerCase()}`} className={styles.categoryCard}>
            <div className={styles.cardImage}>
                <img src={image} alt={name}/>
                <div className={styles.overlay}></div>
                <i className={`fas fa-${icon} ${styles.categoryIcon}`}></i>
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.categoryName}>{name}</h3>
                <p className={styles.categoryDescription}>{description}</p>
                <div className={styles.articleCount}>
                    <span>{count}</span> Articles
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
