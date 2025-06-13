import React, {useState} from 'react';
import Header from '../components/Header';
import LiveScoresTicker from '../components/LiveScoresTicker';
import NewsCard from '../components/NewsCard';
import styles from '../styles/Games.module.scss';

const GamesPage = () => {
    // Define game categories
    const gameCategories = [
        'All Games', 'NBA 2K', 'WWE 2K', 'FC Mobile', 'FIFA', 'EA FC',
        'Call of Duty', 'PUBG', 'Fortnite', 'Minecraft', 'League of Legends'
    ];

    // State for active category
    const [activeCategory, setActiveCategory] = useState('All Games');

    // Gaming news data with online images
    const gamingNews = [
        {
            id: 1,
            image: 'https://cdn.nba.com/manage/2023/09/nba-2k24-kobe-1568x881.jpg',
            category: 'NBA 2K25',
            title: 'NBA 2K25 Contact Dunk: How To Activate and All Requirements',
            date: '27 May 2025'
        },
        {
            id: 2,
            image: 'https://cdn.wwe.com/f/styles/gallery_img_l/public/all/2022/05/2K22_LAUNCH_SCREENSHOT_15--7988f22e6bf47bb09ece1e5ae3b65eed.jpg',
            category: 'WWE 2K25',
            title: 'WWE 2K25 Best General Managers: Top Picks for MyGM Mode',
            date: '12 May 2025'
        },
        {
            id: 3,
            image: 'https://img.youtube.com/vi/4v7VlYwaMQ8/maxresdefault.jpg',
            category: 'FC Mobile',
            title: 'FC Mobile Aqua vs Inferno Players Released',
            date: '10 June 2025'
        },
        {
            id: 4,
            image: 'https://assets.myket.ir/screenshots/xlarge/com.ea.gp.nbamobile/9387c517-9de4-4afa-8503-9bc56d324c58.png',
            category: 'NBA 2k Mobile',
            title: 'NBA 2K Mobile Codes: All New Update Redeem Codes List (May 2025)',
            date: '17 May 2025'
        },
        {
            id: 5,
            image: 'https://cdn.wwe.com/f/styles/og_image/public/2021/03/wm-media-banner--c63c7538428f4596c31ef464c5f4a28a.png',
            category: 'WWE 2K25',
            title: 'WWE 2K25 WrestleMania Trailer Revealed: First Look at Epic Showcase Mode',
            date: '10 April 2025'
        },
        {
            id: 6,
            image: 'https://cdn.realsport101.com/images/ncavvykf/realsport-production/a22d3dc41c0e38b0ab382013ecefd7d215649cb4-1920x1080.png',
            category: 'EAFC 25',
            title: 'FC 25 Shapeshifters Players Leaked: Find Out Which Players Were Revealed',
            date: '10 June 2025'
        },
        {
            id: 7,
            image: 'https://cdn.nba.com/manage/2020/09/nba-2k21-personalization-1-1568x882.jpg',
            category: 'NBA 2K25',
            title: 'NBA 2K25 Mods: Top 10 Mods You Should Try',
            date: '07 May 2025'
        },
        {
            id: 8,
            image: 'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2022/07/12/wwe-2k23-header.jpg',
            category: 'WWE 2K25',
            title: 'WWE 2K25 How to Unlock All Wrestlers: Complete Guide to Unlocking Characters',
            date: '08 April 2025'
        },
        {
            id: 9,
            image: 'https://a.espncdn.com/photo/2023/1024/r1247827_1296x729_16-9.jpg',
            category: 'FC Mobile',
            title: 'FC Mobile UCL RTTF Best XI Released: Find Out the List of All Players',
            date: '10 June 2025'
        }
    ];

    // Filter news based on active category
    const filteredNews = activeCategory === 'All Games'
        ? gamingNews
        : gamingNews.filter(item =>
            item.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

    // Featured games (showing game covers with ratings)
    const featuredGames = [
        {
            id: 1,
            title: 'NBA 2K25',
            image: 'https://cdn.nba.com/manage/2023/07/NBA-2K24-KOAT-Edition-Box-Art-16-1568x882.jpg',
            rating: 4.5,
            platform: 'PS5, Xbox Series X, PC'
        },
        {
            id: 2,
            title: 'WWE 2K25',
            image: 'https://cdn.wwe.com/f/styles/og_image/public/2023/01/13---2k23-cover-athlete-16x9.jpg',
            rating: 4.2,
            platform: 'PS5, Xbox Series X, PC'
        },
        {
            id: 3,
            title: 'EA FC 25',
            image: 'https://cdn.realsport101.com/images/ncavvykf/realsport-production/0b9a99a01f34c760a99536903579a2fbc21bf732-1280x720.png',
            rating: 4.7,
            platform: 'PS5, Xbox Series X, PC, Switch'
        },
    ];

    return (
        <div className={styles.gamesPage}>
            <Header/>

            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.pageHeader}>
                        <h1 className={styles.pageTitle}>Gaming & Esports</h1>
                        <p className={styles.pageDescription}>
                            Get the latest updates, tips, and news for your favorite video games and esports
                        </p>
                    </div>
                    <LiveScoresTicker/>

                    {/* Game category tabs */}
                    <div className={styles.categoryTabsContainer}>
                        <div className={styles.categoryTabs}>
                            {gameCategories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`${styles.categoryTab} ${activeCategory === category ? styles.active : ''}`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured games carousel */}
                    <div className={styles.featuredGamesSection}>
                        <h2 className={styles.sectionTitle}>Featured Games</h2>
                        <div className={styles.featuredGamesGrid}>
                            {featuredGames.map(game => (
                                <div key={game.id} className={styles.gameCard}>
                                    <div className={styles.gameImageContainer}>
                                        <img src={game.image} alt={game.title} className={styles.gameImage}/>
                                    </div>
                                    <div className={styles.gameInfo}>
                                        <h3 className={styles.gameTitle}>{game.title}</h3>
                                        <div className={styles.gamePlatform}>{game.platform}</div>
                                        <div className={styles.gameRating}>
                                            <div className={styles.stars}>
                                                {[...Array(5)].map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className={`fas fa-star ${i < Math.floor(game.rating) ? styles.filled : i < game.rating ? styles.halfFilled : ''}`}
                                                    ></i>
                                                ))}
                                            </div>
                                            <span>{game.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gaming News Grid */}
                    <div className={styles.gamesNewsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                {activeCategory === 'All Games' ? 'Latest Gaming News' : `${activeCategory} News`}
                            </h2>
                            <span className={styles.articleCount}>{filteredNews.length} Articles</span>
                        </div>

                        <div className={styles.gamesNewsGrid}>
                            {filteredNews.map(article => (
                                <NewsCard
                                    key={article.id}
                                    image={article.image}
                                    category={article.category}
                                    title={article.title}
                                    showDate={true}
                                    date={article.date}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Esports Section */}
                    <div className={styles.esportsSection}>
                        <h2 className={styles.sectionTitle}>Top Esports Tournaments</h2>
                        <div className={styles.tournamentList}>
                            <div className={styles.tournament}>
                                <div className={styles.tournamentLogo}>
                                    <img
                                        src="https://cdn1.dotesports.com/wp-content/uploads/2021/09/16075530/Worlds-2021-1.jpg"
                                        alt="LoL Worlds"/>
                                </div>
                                <div className={styles.tournamentInfo}>
                                    <h3>League of Legends World Championship</h3>
                                    <p>The annual professional tournament hosted by Riot Games</p>
                                    <div className={styles.tournamentDate}>Oct 15 - Nov 20, 2025</div>
                                </div>
                            </div>

                            <div className={styles.tournament}>
                                <div className={styles.tournamentLogo}>
                                    <img
                                        src="https://cdn.oneesports.gg/cdn-data/2023/08/Dota2_TheInternational2023_TI12_logo.jpg"
                                        alt="The International"/>
                                </div>
                                <div className={styles.tournamentInfo}>
                                    <h3>The International - Dota 2 Championships</h3>
                                    <p>The annual esports world championship for Dota 2</p>
                                    <div className={styles.tournamentDate}>August 5 - August 15, 2025</div>
                                </div>
                            </div>

                            <div className={styles.tournament}>
                                <div className={styles.tournamentLogo}>
                                    <img
                                        src="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/5/27/uy7cgy8tr6hos5yvjgz2/pgl-major-antwerp-2022-navi-vs-faze-clan"
                                        alt="CS2 Major"/>
                                </div>
                                <div className={styles.tournamentInfo}>
                                    <h3>Counter-Strike 2 Major Championship</h3>
                                    <p>Valve-sponsored CS2 tournament featuring top teams worldwide</p>
                                    <div className={styles.tournamentDate}>June 20 - July 2, 2025</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GamesPage;
