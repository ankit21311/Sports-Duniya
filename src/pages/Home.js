import React from 'react';
import Header from '../components/Header';
import LiveScoresTicker from '../components/LiveScoresTicker';
import HeroCarousel from '../components/HeroCarousel';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.scss';

const Home = () => {
    const [activeCategory, setActiveCategory] = React.useState('All');

    const categories = [
        'All',
        'Cricket',
        'Football',
        'Tennis',
        'Basketball',
        'Formula 1',
        'Golf',
        'Rugby',
        'Boxing'
    ];

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className={styles.main}>
            <Header/>
            <div className={styles.pageContent}>
                <HeroCarousel/>
                <LiveScoresTicker/>

                <div className={styles.container}>
                    <div className={styles.categoriesSection}>
                        <div className={styles.categoryTabs}>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`${styles.categoryTab} ${activeCategory === category ? styles.active : ''}`}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <NewsSection/>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
