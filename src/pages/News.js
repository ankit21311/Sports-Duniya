import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import styles from '../styles/News.module.scss';

// Mock data fetch - in a real app, this would be replaced with actual API calls
const getStaticProps = async () => {
    // Simulating fetching data from an API
    const articles = [
        {
            id: 1,
            image: '/images/seattle-orcas.jpg',
            category: 'Cricket',
            title: 'Seattle Orcas: Know All About Players, Owners, Captains & More',
            description: 'Check out Seattle Orcas owners, captains, players, coaches.',
            date: '10 June 2025',
            featured: true
        },
        {
            id: 2,
            image: '/images/bangladesh-singapore.jpg',
            category: 'Football',
            title: 'Bangladesh 1-2 Singapore Player Ratings: Clinical Lions Edge Out Bengals',
            score: {team1: '1', team2: '2'},
            date: '10 June 2025'
        },
        {
            id: 3,
            image: '/images/wtc-final.jpg',
            category: 'Cricket',
            title: 'Australia, South Africa Announce Playing XI For WTC Final 2025',
            date: '10 June 2025'
        },
        {
            id: 4,
            image: '/images/hong-kong-india.jpg',
            category: 'Football',
            title: 'Hong Kong 1–0 India Player Ratings: Hong Kong Edge past Blue Tigers',
            score: {team1: '1', team2: '0'},
            date: '10 June 2025'
        },
        {
            id: 5,
            image: '/images/toss-prediction.jpg',
            category: 'Cricket',
            title: 'Today Toss Prediction: Who Will Win Today\'s Toss in SS vs TGC IPL 2025?',
            date: '10 June 2025'
        },
        {
            id: 6,
            image: '/images/dream11-prediction.jpg',
            category: 'Cricket',
            title: 'EL vs HAV Dream11 Prediction: Dream11 Team Today, Fantasy Cricket Tips',
            date: '10 June 2025'
        },
        {
            id: 7,
            image: '/images/zelda-games.jpg',
            category: 'Gaming',
            title: 'Top 15 Legend of Zelda Games Ranked',
            date: '10 June 2025'
        },
        {
            id: 8,
            image: '/images/neymar.jpg',
            category: 'Football',
            title: 'Who is Neymar Jr\'s Wife Bruna Biancardi?',
            date: '08 June 2025'
        },
        {
            id: 9,
            image: '/images/premier-league.jpg',
            category: 'Football',
            title: 'PSR Premier League: A Full Breakdown Of Premier League Financial Rules',
            date: '08 June 2025'
        },
        {
            id: 10,
            image: '/images/spalletti.jpg',
            category: 'Football',
            title: 'Who Is Luciano Spalletti? Breaking Down His Tactical Philosophy',
            description: 'Luciano Spalletti has been sacked from his head coach role at the Italy national football team and...',
            date: '10 June 2025'
        },
        {
            id: 11,
            image: '/images/muslim-footballers.jpg',
            category: 'Football',
            title: 'Top 10 Muslim Footballers in the World (2025)',
            date: '08 June 2025'
        },
        {
            id: 12,
            image: '/images/young-players.jpg',
            category: 'Football',
            title: 'Top 10 Best Young Players in the World 2025 | Ranked',
            date: '08 June 2025'
        }
    ];

    return {
        props: {
            articles
        }
    };
};

const News = ({articles: initialArticles}) => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const articlesPerPage = 6;

    // Simulate getStaticProps for client-side rendering
    useEffect(() => {
        const fetchData = async () => {
            const {props} = await getStaticProps();
            setArticles(props.articles);
        };

        fetchData();
    }, []);

    // Filter articles by category
    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(article => article.category === selectedCategory);

    // Get current articles for pagination
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Featured articles for the top section
    const featuredArticles = articles.filter(article => article.featured);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page when changing category
    };

    // Categories list
    const categories = ['All', 'Cricket', 'Football', 'Gaming'];

    return (
        <div className={styles.newsPage}>
            <Header/>

            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Latest Sports News</h1>

                    {/* Category Filter */}
                    <div className={styles.categoryFilter}>
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Featured Articles */}
                    {currentPage === 1 && featuredArticles.length > 0 && (
                        <div className={styles.featuredSection}>
                            <h2 className={styles.sectionTitle}>Featured Stories</h2>
                            <div className={styles.featuredGrid}>
                                {featuredArticles.map(article => (
                                    <div key={article.id} className={styles.featuredArticle}>
                                        <NewsCard
                                            image={article.image}
                                            category={article.category}
                                            title={article.title}
                                            description={article.description}
                                            showScore={!!article.score}
                                            score={article.score}
                                            showDate={!!article.date}
                                            date={article.date}
                                            featured={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className={styles.contentWrapper}>
                        {/* News Articles Grid */}
                        <div className={styles.articlesSection}>
                            <div className={styles.articlesGrid}>
                                {currentArticles.map(article => (
                                    <NewsCard
                                        key={article.id}
                                        image={article.image}
                                        category={article.category}
                                        title={article.title}
                                        description={article.description}
                                        showScore={!!article.score}
                                        score={article.score}
                                        showDate={!!article.date}
                                        date={article.date}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            <Pagination
                                articlesPerPage={articlesPerPage}
                                totalArticles={filteredArticles.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        </div>

                        {/* Sidebar */}
                        <Sidebar/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default News;
