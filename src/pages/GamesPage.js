import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';
import styles from '../styles/Games.module.scss';

const GamesPage = () => {
    // Define game categories
    const gameCategories = [
        'All Games', 'NBA 2K', 'WWE 2K', 'FC Mobile', 'FIFA', 'EA FC',
        'Call of Duty', 'PUBG', 'Fortnite', 'Minecraft', 'League of Legends', 'Valorant'
    ];

    // State for active category
    const [activeCategory, setActiveCategory] = useState('All Games');

    // Esports tournament data (simulating PandaScore API data)
    const esportsTournaments = [
        {
            id: 1,
            name: 'VALORANT Champions Tour 2025',
            game: 'Valorant',
            logo: 'https://img.esportspedia.com/images/thumb/c/c0/VCT_2023_Logo.png/600px-VCT_2023_Logo.png',
            startDate: '2025-06-01',
            endDate: '2025-07-15',
            status: 'ongoing',
            prizePool: '$2,000,000',
            teams: 16,
            matches: [
                {
                    id: 101,
                    team1: {
                        name: 'Sentinels',
                        logo: 'https://img.esportspedia.com/images/thumb/3/37/Sentinels_2023_logo.png/600px-Sentinels_2023_logo.png',
                        score: 2
                    },
                    team2: {
                        name: 'Cloud9',
                        logo: 'https://img.esportspedia.com/images/thumb/1/10/Cloud9_2021_full_lightmode.png/600px-Cloud9_2021_full_lightmode.png',
                        score: 0
                    },
                    status: 'completed',
                    time: '2025-06-10T18:00:00Z'
                },
                {
                    id: 102,
                    team1: {
                        name: 'Fnatic',
                        logo: 'https://img.esportspedia.com/images/thumb/e/ed/Fnatic_2020_full_logo.png/600px-Fnatic_2020_full_logo.png',
                        score: 2
                    },
                    team2: {
                        name: 'Team Liquid',
                        logo: 'https://img.esportspedia.com/images/thumb/d/d3/Team_Liquid_2020_full_logo.png/600px-Team_Liquid_2020_full_logo.png',
                        score: 1
                    },
                    status: 'completed',
                    time: '2025-06-11T16:00:00Z'
                },
                {
                    id: 103,
                    team1: {
                        name: 'LOUD',
                        logo: 'https://img.esportspedia.com/images/thumb/c/c1/LOUD_2021_full_logo.png/600px-LOUD_2021_full_logo.png',
                        score: null
                    },
                    team2: {
                        name: 'DRX',
                        logo: 'https://img.esportspedia.com/images/thumb/c/c8/DRX_2021_full_logo.png/600px-DRX_2021_full_logo.png',
                        score: null
                    },
                    status: 'upcoming',
                    time: '2025-06-15T19:00:00Z'
                }
            ]
        },
        {
            id: 2,
            name: 'League of Legends World Championship 2025',
            game: 'League of Legends',
            logo: 'https://img.esportspedia.com/images/thumb/9/98/Worlds_2022_logo.png/600px-Worlds_2022_logo.png',
            startDate: '2025-09-25',
            endDate: '2025-11-04',
            status: 'upcoming',
            prizePool: '$2,225,000',
            teams: 24,
            matches: [
                {
                    id: 201,
                    team1: {
                        name: 'T1',
                        logo: 'https://img.esportspedia.com/images/thumb/c/c8/T1_logo.png/600px-T1_logo.png',
                        score: null
                    },
                    team2: {
                        name: 'Gen.G',
                        logo: 'https://img.esportspedia.com/images/thumb/e/e3/Gen.G_logo.png/600px-Gen.G_logo.png',
                        score: null
                    },
                    status: 'upcoming',
                    time: '2025-09-26T16:00:00Z'
                }
            ]
        },
        {
            id: 3,
            name: 'The International 2025',
            game: 'Dota 2',
            logo: 'https://img.esportspedia.com/images/thumb/d/da/The_International_2022.png/600px-The_International_2022.png',
            startDate: '2025-08-15',
            endDate: '2025-08-30',
            status: 'upcoming',
            prizePool: '$40,000,000+',
            teams: 20,
            matches: []
        }
    ];

    // Live streaming data (simulating Twitch API data)
    const liveStreams = [
        {
            id: 1,
            game: 'Valorant',
            title: 'VALORANT Champions Tour 2025: Americas League Week 5 Day 2',
            streamer: 'VALORANT',
            viewers: 145879,
            thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_valorant-440x248.jpg',
            profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/valorant-profile_image-8afa4adc3661e3e8-50x50.png',
            streamUrl: 'https://www.twitch.tv/valorant'
        },
        {
            id: 2,
            game: 'League of Legends',
            title: 'LCS Summer 2025 - Week 6 Day 2',
            streamer: 'LCS',
            viewers: 98562,
            thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_lcs-440x248.jpg',
            profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/lcs-profile_image-2a599d3c6a754bc0-50x50.png',
            streamUrl: 'https://www.twitch.tv/lcs'
        },
        {
            id: 3,
            game: 'Counter-Strike 2',
            title: 'BLAST Premier: Spring Finals 2025',
            streamer: 'BLAST TV',
            viewers: 87345,
            thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_blasttv-440x248.jpg',
            profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0e8b5aed-b2ae-4548-9e06-7163da8a826a-profile_image-50x50.png',
            streamUrl: 'https://www.twitch.tv/blasttv'
        },
        {
            id: 4,
            game: 'Fortnite',
            title: 'FNCS 2025 Global Championship - Day 3',
            streamer: 'Fortnite',
            viewers: 76234,
            thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_fortnite-440x248.jpg',
            profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/fortnite-profile_image-9f24b0c593c4aad0-50x50.png',
            streamUrl: 'https://www.twitch.tv/fortnite'
        },
        {
            id: 5,
            game: 'Dota 2',
            title: 'ESL One Birmingham 2025 - Playoffs Day 2',
            streamer: 'ESL_Dota2',
            viewers: 65432,
            thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_dota2-440x248.jpg',
            profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/esl_dota2-profile_image-a8df56a8f86c9bd9-50x50.jpeg',
            streamUrl: 'https://www.twitch.tv/esl_dota2'
        }
    ];

    // Gaming news feed data (simulating GameSpot/IGN/Polygon API data)
    const gamingNewsFeed = [
        {
            id: 1,
            title: "Rockstar Confirms GTA 6 Release Window, First Trailer Breaks Records",
            excerpt: "Rockstar Games has officially confirmed that Grand Theft Auto VI will release in Fall 2025, ending years of speculation. The announcement trailer has already broken viewing records across all platforms.",
            source: "IGN",
            sourceIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/IGN_Logo.svg/1280px-IGN_Logo.svg.png",
            author: "Ryan McCaffrey",
            publishDate: "2025-06-01T14:30:00Z",
            image: "https://assetsio.reedpopcdn.com/gta-6-trailer-1.jpg?width=1200&height=630&fit=crop&enable=upscale&auto=webp",
            url: "https://www.ign.com/articles/gta-6-release-window-confirmed",
            category: "News",
            tags: ["GTA 6", "Rockstar Games", "Release Date"]
        },
        {
            id: 2,
            title: "The Elder Scrolls 6 Development Update: Bethesda Shares New Details",
            excerpt: "Bethesda Game Studios director Todd Howard has shared new information about The Elder Scrolls 6, confirming that the game is now in full production following the release of Starfield.",
            source: "GameSpot",
            sourceIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Gamespot_logo.svg/1280px-Gamespot_logo.svg.png",
            author: "Eddie Makuch",
            publishDate: "2025-05-28T18:15:00Z",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            url: "https://www.gamespot.com/articles/elder-scrolls-6-development-update",
            category: "News",
            tags: ["Elder Scrolls 6", "Bethesda", "Development"]
        },
        {
            id: 3,
            title: "PlayStation 6 Specs Leaked: What We Know So Far",
            excerpt: "Alleged technical specifications for Sony's next-generation PlayStation 6 console have leaked online, suggesting a significant leap in processing power and new features for the upcoming hardware.",
            source: "Polygon",
            sourceIcon: "https://cdn.vox-cdn.com/uploads/chorus_asset/file/22518200/polygon.png",
            author: "Nicole Carpenter",
            publishDate: "2025-06-05T12:00:00Z",
            image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            url: "https://www.polygon.com/playstation-6-specs-leak",
            category: "Hardware",
            tags: ["PlayStation 6", "Sony", "Leaks", "Hardware"]
        },
        {
            id: 4,
            title: "Elden Ring DLC 'Shadow of the Erdtree' Review: FromSoftware's Masterpiece Gets Even Better",
            excerpt: "Our comprehensive review of Elden Ring's massive expansion 'Shadow of the Erdtree'. Does it live up to the hype and the legacy of the base game? We dive deep into the new content.",
            source: "IGN",
            sourceIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/IGN_Logo.svg/1280px-IGN_Logo.svg.png",
            author: "Mitchell Saltzman",
            publishDate: "2025-05-20T09:00:00Z",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            url: "https://www.ign.com/articles/elden-ring-shadow-of-the-erdtree-dlc-review",
            category: "Reviews",
            tags: ["Elden Ring", "FromSoftware", "DLC", "Review"]
        },
        {
            id: 5,
            title: "Call of Duty: Black Ops 6 Multiplayer Hands-On: The Biggest Changes Coming This Year",
            excerpt: "We got early access to Call of Duty: Black Ops 6's multiplayer mode. Here's everything new, changed, and improved in this year's entry to the blockbuster shooter franchise.",
            source: "GameSpot",
            sourceIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Gamespot_logo.svg/1280px-Gamespot_logo.svg.png",
            author: "Phil Hornshaw",
            publishDate: "2025-06-03T16:45:00Z",
            image: "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-REVEAL-FULL-TOUT.jpg",
            url: "https://www.gamespot.com/articles/call-of-duty-black-ops-6-multiplayer-preview",
            category: "Previews",
            tags: ["Call of Duty", "Black Ops 6", "Multiplayer", "Preview"]
        },
        {
            id: 6,
            title: "Nintendo Switch 2 Officially Announced: Release Date, Price, and Launch Games",
            excerpt: "Nintendo has finally unveiled its next-generation console, the Nintendo Switch 2. Here's everything we know about the hardware, pricing, and the impressive lineup of launch titles.",
            source: "Polygon",
            sourceIcon: "https://cdn.vox-cdn.com/uploads/chorus_asset/file/22518200/polygon.png",
            author: "Ana Diaz",
            publishDate: "2025-06-10T10:30:00Z",
            image: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image01",
            url: "https://www.polygon.com/nintendo-switch-2-announcement",
            category: "News",
            tags: ["Nintendo Switch 2", "Nintendo", "Console", "Hardware"]
        }
    ];

    // Gaming news data with online images
    const gamingNews = [
        {
            id: 1,
            image: 'https://assets.2k.com/1a6ngf98576c/5Zw0VO5oPeUEgMwOppyVsl/9cb988e5e1bff6b235a48d150adcec1b/NBA2K24_SEASON8_COURTSIDE_REPORT_THUMBNAIL_1920X1080.jpg',
            category: 'NBA 2K25',
            title: 'NBA 2K25 Pro Tournament: Top Players to Watch This Season',
            date: '27 May 2025',
            excerpt: 'Our esports analysts break down the rising stars and veteran players to watch in this year\'s NBA 2K25 professional circuit.'
        },
        {
            id: 2,
            image: 'https://cdn.2k.com/1a6ngf98576c/7qFGhGvOYVJe8aqIpLEZvz/c2a2c0f1d2e6d7ebf3f4bf6f5c5d4e3f/WWE_2K24_Screenshot_Cody_Rhodes_vs_Roman_Reigns_4K.jpg',
            category: 'WWE 2K25',
            title: 'WWE 2K25 Championship Series Qualifiers Begin Next Week',
            date: '12 May 2025',
            excerpt: 'The road to the WWE 2K25 World Championship begins with regional qualifiers starting next week. Here\'s how to watch and who to follow.'
        },
        {
            id: 3,
            image: 'https://media.contentapi.ea.com/content/dam/ea/fc/fc-24/images/2023/07/fc24-gen5-gameplay-hero-xl.jpg.adapt.crop16x9.1455w.jpg',
            category: 'FC Mobile',
            title: 'FC Mobile Global Challenge: Asian Teams Dominate Group Stage',
            date: '10 June 2025',
            excerpt: 'Asian teams show surprising dominance in the FC Mobile Global Challenge group stages, with Korean and Japanese squads leading their brackets.'
        },
        {
            id: 4,
            image: 'https://assets.2k.com/1a6ngf98576c/5Zw0VO5oPeUEgMwOppyVsl/9cb988e5e1bff6b235a48d150adcec1b/NBA2K24_SEASON8_COURTSIDE_REPORT_THUMBNAIL_1920X1080.jpg',
            category: 'NBA 2k Mobile',
            title: 'NBA 2K Mobile Tournament Expands to Include College Players',
            date: '17 May 2025',
            excerpt: 'The NBA 2K Mobile Championship Series announces expansion to include collegiate players in special exhibition matches and talent development program.'
        },
        {
            id: 5,
            image: 'https://cdn.2k.com/1a6ngf98576c/7qFGhGvOYVJe8aqIpLEZvz/c2a2c0f1d2e6d7ebf3f4bf6f5c5d4e3f/WWE_2K24_Screenshot_Cody_Rhodes_vs_Roman_Reigns_4K.jpg',
            category: 'WWE 2K25',
            title: 'WWE 2K25 WrestleMania Virtual Tournament Draws Record Viewership',
            date: '10 April 2025',
            excerpt: 'The virtual WrestleMania tournament in WWE 2K25 breaks previous viewership records with over 2 million concurrent viewers across streaming platforms.'
        },
        {
            id: 6,
            image: 'https://media.contentapi.ea.com/content/dam/ea/fc/fc-24/images/2023/07/fc24-gen5-gameplay-hero-xl.jpg.adapt.crop16x9.1455w.jpg',
            category: 'EAFC 25',
            title: 'EA FC 25 Pro League Announces New Team Draft System',
            date: '10 June 2025',
            excerpt: 'The EA FC 25 Professional League introduces an innovative team draft system for the upcoming season to balance competition and create exciting matchups.'
        },
        {
            id: 7,
            image: 'https://assets.2k.com/1a6ngf98576c/5Zw0VO5oPeUEgMwOppyVsl/9cb988e5e1bff6b235a48d150adcec1b/NBA2K24_SEASON8_COURTSIDE_REPORT_THUMBNAIL_1920X1080.jpg',
            category: 'NBA 2K25',
            title: 'NBA 2K25 League Expansion: Four New Franchises Announced',
            date: '07 May 2025',
            excerpt: 'The NBA 2K League announces expansion with four new franchise teams joining the competition for the upcoming season.'
        },
        {
            id: 8,
            image: 'https://cdn.2k.com/1a6ngf98576c/7qFGhGvOYVJe8aqIpLEZvz/c2a2c0f1d2e6d7ebf3f4bf6f5c5d4e3f/WWE_2K24_Screenshot_Cody_Rhodes_vs_Roman_Reigns_4K.jpg',
            category: 'WWE 2K25',
            title: 'WWE 2K25 International Cup: European Teams Dominate Quarterfinals',
            date: '08 April 2025',
            excerpt: 'European teams show surprising strength in the WWE 2K25 International Cup, claiming six of eight quarterfinal spots in the prestigious tournament.'
        },
        {
            id: 9,
            image: 'https://media.contentapi.ea.com/content/dam/ea/fc/fc-24/images/2023/07/fc24-gen5-gameplay-hero-xl.jpg.adapt.crop16x9.1455w.jpg',
            category: 'FC Mobile',
            title: 'FC Mobile Champions League Finals Set for Paris Showdown',
            date: '10 June 2025',
            excerpt: 'The FC Mobile Champions League Finals will take place in Paris next month, featuring the top eight teams from around the world competing for the $1M prize pool.'
        },
        {
            id: 10,
            image: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7be4a8c30e088e7720/Valorant_2022_E5A2_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png',
            category: 'Valorant',
            title: 'Valorant Champions 2025: Group Stage Draw Reveals Exciting Matchups',
            date: '15 June 2025',
            excerpt: 'The group stage draw for Valorant Champions 2025 creates several high-profile matchups between regional rivals and international powerhouses.'
        },
        {
            id: 11,
            image: 'https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/mw3/meta/game-overview/mw3-game-overview-s6-meta-desktop.jpg',
            category: 'Call of Duty',
            title: 'Call of Duty League Announces Major Format Changes for 2026 Season',
            date: '18 June 2025',
            excerpt: 'The Call of Duty League reveals significant format changes for the 2026 season, including expanded rosters and a new tournament structure.'
        },
        {
            id: 12,
            image: 'https://cdn2.unrealengine.com/fortnite-chapter-4-season-4-key-art-3840x2160-2e8161e8a65c.jpg',
            category: 'Fortnite',
            title: 'Fortnite World Cup Returns with Record $10M Prize Pool',
            date: '20 June 2025',
            excerpt: 'Epic Games announces the return of the Fortnite World Cup with a record-breaking $10 million prize pool and expanded qualification paths for aspiring competitors.'
        }
    ];

    // Filter news based on active category
    const filteredNews = activeCategory === 'All Games'
        ? gamingNews
        : gamingNews.filter(item =>
            item.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

    // Latest gaming news articles
    const latestGamingNews = [
        {
            id: 1,
            title: 'NBA 2K25 Championship Tournament Kicks Off This Weekend',
            image: 'https://assets.2k.com/1a6ngf98576c/7JhpRWhCFyIwIgEYMYiISU/f66d5e82c70a40b17a2938c9c5a76d3a/NBA2K25_Championship_Tournament.jpg',
            category: 'ESPORTS',
            publishDate: 'June 15, 2025',
            excerpt: 'The highly anticipated NBA 2K25 Championship Tournament begins this weekend with 32 top players competing for a $250,000 prize pool. Follow our live coverage of all the action and exclusive player interviews.',
            url: 'https://nba.2k.com/'
        },
        {
            id: 2,
            title: 'WWE 2K25 Introduces New Combat Mechanics in Latest Update',
            image: 'https://cdn.2k.com/1a6ngf98576c/4KjGhRvTYpLe9bqWpMeZvA/d3b4c5f2e1d0c9b8a7f6e5d4c3b2a1f0/WWE_2K25_Combat_Mechanics.jpg',
            category: 'UPDATE',
            publishDate: 'June 12, 2025',
            excerpt: 'The latest patch for WWE 2K25 brings revolutionary combat mechanics and introduces five new wrestlers to the roster. Our analysis shows how these changes will impact competitive play and tournament strategies.',
            url: 'https://wwe.2k.com/'
        },
        {
            id: 3,
            title: 'EA FC 25 World Cup Mode: Everything You Need to Know',
            image: 'https://media.contentapi.ea.com/content/dam/ea/fc/fc-25/images/2024/07/fc25-world-cup-mode-stadium-xl.jpg.adapt.crop16x9.1455w.jpg',
            category: 'TOURNAMENT',
            publishDate: 'June 10, 2025',
            excerpt: 'EA Sports has unveiled the highly anticipated World Cup mode for EA FC 25. Our comprehensive guide covers all the new features, national teams, and tournament structure that will define this year\'s virtual football competition.',
            url: 'https://www.ea.com/games/ea-sports-fc'
        },
        {
            id: 4,
            title: 'Call of Duty Championship Series Announces $2M Prize Pool',
            image: 'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750&dpr=1',
            category: 'ESPORTS',
            publishDate: 'June 8, 2025',
            excerpt: 'The Call of Duty Championship Series has announced its biggest prize pool ever for the upcoming season. Teams from around the world will compete in Modern Warfare III tournaments with new qualification paths for amateur players.',
            url: 'https://www.callofduty.com/'
        },
        {
            id: 5,
            title: 'Valorant Pro League Expands to Include 12 New Teams',
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            category: 'ESPORTS',
            publishDate: 'June 5, 2025',
            excerpt: 'Riot Games has announced a major expansion to the Valorant Pro League, adding 12 new teams and increasing the total prize pool to $5 million for the upcoming season. New regional qualifiers will begin next month.',
            url: 'https://playvalorant.com/'
        },
        {
            id: 6,
            title: 'Fortnite Summer Tournament Series Announced with Celebrity Players',
            image: 'https://cdn2.unrealengine.com/fortnite-summer-tournament-battle-royale-3840x2160-5f7d9e1a8b6c.jpg',
            category: 'TOURNAMENT',
            publishDate: 'June 3, 2025',
            excerpt: 'Epic Games has revealed details for the Fortnite Summer Tournament Series, featuring celebrity players, exclusive in-game rewards, and weekly competitions throughout July and August. Registration opens next week for all skill levels.',
            url: 'https://www.epicgames.com/fortnite/'
        }
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

                    {/* Latest Gaming News Section */}
                    <div className={styles.featuredGamesSection}>
                        <h2 className={styles.sectionTitle}>Latest Esports Updates</h2>
                        <div className={styles.featuredGamesGrid}>
                            {latestGamingNews.map(article => (
                                <div key={article.id} className={styles.newsArticleCard}>
                                    <div className={styles.articleImageContainer}>
                                        <img src={article.image} alt={article.title} className={styles.articleImage}/>
                                        <div className={styles.articleCategory}>{article.category}</div>
                                    </div>
                                    <div className={styles.articleContent}>
                                        <div className={styles.articleMeta}>
                                            <div className={styles.articleDate}>
                                                {article.publishDate}
                                            </div>
                                        </div>
                                        <h3 className={styles.articleTitle}>{article.title}</h3>
                                        <p className={styles.articleExcerpt}>{article.excerpt}</p>
                                        <div className={styles.articleFooter}>
                                            <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.viewMoreButton}>
                                                View Article <i className="fas fa-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Streaming Integration */}
                    <div className={styles.liveStreamingSection}>
                        <h2 className={styles.sectionTitle}>
                            <i className={`fas fa-broadcast-tower ${styles.liveIcon}`}></i> Live Streams
                        </h2>
                        <div className={styles.liveStreamsGrid}>
                            {liveStreams.map(stream => (
                                <a 
                                    href={stream.streamUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={styles.streamCard} 
                                    key={stream.id}
                                >
                                    <div className={styles.streamThumbnailContainer}>
                                        <img 
                                            src={stream.thumbnail} 
                                            alt={stream.title} 
                                            className={styles.streamThumbnail}
                                        />
                                        <div className={styles.liveIndicator}>
                                            <span className={styles.liveText}>LIVE</span>
                                            <span className={styles.viewerCount}>
                                                <i className="fas fa-user"></i> {stream.viewers.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.streamInfo}>
                                        <div className={styles.streamerInfo}>
                                            <img 
                                                src={stream.profileImage} 
                                                alt={stream.streamer} 
                                                className={styles.streamerImage}
                                            />
                                            <span className={styles.streamerName}>{stream.streamer}</span>
                                        </div>
                                        <h3 className={styles.streamTitle}>{stream.title}</h3>
                                        <div className={styles.streamGame}>{stream.game}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className={styles.viewMoreContainer}>
                            <a href="https://www.twitch.tv/directory/game" target="_blank" rel="noopener noreferrer" className={styles.viewMoreButton}>
                                View More Streams <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>

                    {/* Gaming Stats Section */}
                    <div className={styles.statsSection}>
                        <h2 className={styles.sectionTitle}>Gaming Community Stats</h2>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>2.5M+</div>
                                <div className={styles.statLabel}>Active Gamers</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>15K+</div>
                                <div className={styles.statLabel}>Gaming Articles</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>500+</div>
                                <div className={styles.statLabel}>Game Reviews</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>24/7</div>
                                <div className={styles.statLabel}>Live Coverage</div>
                            </div>
                        </div>
                    </div>

                    {/* Gaming News Feed Section */}
                    <div className={styles.gamingNewsFeedSection}>
                        <h2 className={styles.sectionTitle}>
                            <i className={`fas fa-newspaper ${styles.newsIcon}`}></i> Latest Gaming News
                        </h2>

                        <div className={styles.newsFeedFilters}>
                            <div className={styles.filterButtons}>
                                <button className={`${styles.filterButton} ${styles.active}`}>All News</button>
                                <button className={styles.filterButton}>News</button>
                                <button className={styles.filterButton}>Reviews</button>
                                <button className={styles.filterButton}>Previews</button>
                                <button className={styles.filterButton}>Hardware</button>
                            </div>
                            <div className={styles.sourceFilters}>
                                <span className={styles.sourceLabel}>Sources:</span>
                                <div className={styles.sourceButtons}>
                                    <button className={`${styles.sourceButton} ${styles.active}`}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/IGN_Logo.svg/1280px-IGN_Logo.svg.png" alt="IGN" />
                                    </button>
                                    <button className={`${styles.sourceButton} ${styles.active}`}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Gamespot_logo.svg/1280px-Gamespot_logo.svg.png" alt="GameSpot" />
                                    </button>
                                    <button className={`${styles.sourceButton} ${styles.active}`}>
                                        <img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22518200/polygon.png" alt="Polygon" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.newsFeedGrid}>
                            {gamingNewsFeed.map(article => (
                                <a 
                                    key={article.id} 
                                    href={article.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={styles.newsArticleCard}
                                >
                                    <div className={styles.articleImageContainer}>
                                        <img 
                                            src={article.image} 
                                            alt={article.title} 
                                            className={styles.articleImage}
                                        />
                                        <div className={styles.articleCategory}>{article.category}</div>
                                    </div>
                                    <div className={styles.articleContent}>
                                        <div className={styles.articleMeta}>
                                            <div className={styles.articleSource}>
                                                <img 
                                                    src={article.sourceIcon} 
                                                    alt={article.source} 
                                                    className={styles.sourceImage}
                                                />
                                                <span>{article.source}</span>
                                            </div>
                                            <div className={styles.articleDate}>
                                                {new Date(article.publishDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                        <h3 className={styles.articleTitle}>{article.title}</h3>
                                        <p className={styles.articleExcerpt}>{article.excerpt}</p>
                                        <div className={styles.articleFooter}>
                                            <div className={styles.articleAuthor}>
                                                <i className="fas fa-user-edit"></i> {article.author}
                                            </div>
                                            <div className={styles.articleTags}>
                                                {article.tags.slice(0, 2).map((tag, index) => (
                                                    <span key={index} className={styles.articleTag}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className={styles.newsFeedActions}>
                            <button className={styles.loadMoreButton}>
                                Load More Articles <i className="fas fa-sync-alt"></i>
                            </button>
                            <a href="#" className={styles.allNewsButton}>
                                View All Gaming News <i className="fas fa-arrow-right"></i>
                            </a>
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

                    {/* Esports Schedule & Results Section */}
                    <div className={styles.esportsSection}>
                        <h2 className={styles.sectionTitle}>
                            <i className={`fas fa-trophy ${styles.trophyIcon}`}></i> Esports Schedule & Results
                        </h2>

                        <div className={styles.tournamentTabs}>
                            {esportsTournaments.map(tournament => (
                                <div key={tournament.id} className={styles.tournamentTab}>
                                    <div className={styles.tournamentHeader}>
                                        <div className={styles.tournamentLogoContainer}>
                                            <img 
                                                src={tournament.logo} 
                                                alt={tournament.name} 
                                                className={styles.tournamentLogo}
                                            />
                                        </div>
                                        <div className={styles.tournamentHeaderInfo}>
                                            <h3 className={styles.tournamentName}>{tournament.name}</h3>
                                            <div className={styles.tournamentMeta}>
                                                <span className={styles.tournamentGame}>{tournament.game}</span>
                                                <span className={styles.tournamentDates}>
                                                    {new Date(tournament.startDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} - 
                                                    {new Date(tournament.endDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                                                </span>
                                            </div>
                                            <div className={styles.tournamentStats}>
                                                <div className={styles.tournamentStat}>
                                                    <i className="fas fa-dollar-sign"></i>
                                                    <span>{tournament.prizePool}</span>
                                                </div>
                                                <div className={styles.tournamentStat}>
                                                    <i className="fas fa-users"></i>
                                                    <span>{tournament.teams} Teams</span>
                                                </div>
                                                <div className={`${styles.tournamentStatus} ${styles[tournament.status]}`}>
                                                    {tournament.status === 'ongoing' ? 'LIVE' : tournament.status.toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {tournament.matches.length > 0 ? (
                                        <div className={styles.matchesList}>
                                            <h4 className={styles.matchesTitle}>
                                                {tournament.status === 'ongoing' ? 'Recent & Upcoming Matches' : 'Scheduled Matches'}
                                            </h4>
                                            {tournament.matches.map(match => (
                                                <div key={match.id} className={`${styles.matchCard} ${styles[match.status]}`}>
                                                    <div className={styles.matchTime}>
                                                        {match.status === 'upcoming' ? (
                                                            <div className={styles.upcomingTime}>
                                                                {new Date(match.time).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                                                                <span className={styles.matchHour}>
                                                                    {new Date(match.time).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className={styles.completedLabel}>FINAL</div>
                                                        )}
                                                    </div>

                                                    <div className={styles.matchTeams}>
                                                        <div className={styles.teamContainer}>
                                                            <div className={styles.teamLogo}>
                                                                <img src={match.team1.logo} alt={match.team1.name} />
                                                            </div>
                                                            <div className={styles.teamName}>{match.team1.name}</div>
                                                            {match.status === 'completed' && (
                                                                <div className={`${styles.teamScore} ${match.team1.score > match.team2.score ? styles.winner : ''}`}>
                                                                    {match.team1.score}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className={styles.versusContainer}>
                                                            {match.status === 'upcoming' ? 'VS' : '-'}
                                                        </div>

                                                        <div className={styles.teamContainer}>
                                                            <div className={styles.teamLogo}>
                                                                <img src={match.team2.logo} alt={match.team2.name} />
                                                            </div>
                                                            <div className={styles.teamName}>{match.team2.name}</div>
                                                            {match.status === 'completed' && (
                                                                <div className={`${styles.teamScore} ${match.team2.score > match.team1.score ? styles.winner : ''}`}>
                                                                    {match.team2.score}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className={styles.matchActions}>
                                                        {match.status === 'upcoming' ? (
                                                            <button className={styles.reminderButton}>
                                                                <i className="far fa-bell"></i> Remind
                                                            </button>
                                                        ) : (
                                                            <button className={styles.highlightsButton}>
                                                                <i className="fas fa-play-circle"></i> Highlights
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            <div className={styles.viewAllContainer}>
                                                <button className={styles.viewAllButton}>
                                                    View All Matches <i className="fas fa-chevron-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.noMatchesContainer}>
                                            <div className={styles.noMatchesMessage}>
                                                <i className="fas fa-calendar-alt"></i>
                                                <p>Match schedule will be announced soon</p>
                                            </div>
                                            <button className={styles.notifyButton}>
                                                <i className="far fa-bell"></i> Get Notified
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={styles.esportsActions}>
                            <a href="#" className={styles.viewAllTournamentsButton}>
                                View All Tournaments <i className="fas fa-arrow-right"></i>
                            </a>
                            <a href="#" className={styles.teamRankingsButton}>
                                Team Rankings <i className="fas fa-list-ol"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default GamesPage;
