import React, {useState, useEffect} from 'react';
import styles from '../styles/LiveScoresTicker.module.scss';

const LiveScoresTicker = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sample live scores data based on the image
    const liveScores = [
        {
            league: 'BRA CB',
            date: 'Jun 13',
            homeTeam: {name: 'VTO', logo: '🇧🇷'},
            awayTeam: {name: 'CRZ', logo: '🇧🇷'},
            homeScore: 0,
            awayScore: 0,
            status: 'FT'
        },
        {
            league: 'BRA CB',
            date: 'Jun 13',
            homeTeam: {name: 'BRA', logo: '🇧🇷'},
            awayTeam: {name: 'BAH', logo: '🇧🇷'},
            homeScore: 0,
            awayScore: 3,
            status: 'FT'
        },
        {
            league: 'BRA CB',
            date: 'Jun 13',
            homeTeam: {name: 'FOR', logo: '🇧🇷'},
            awayTeam: {name: 'STS', logo: '🇧🇷'},
            homeScore: 2,
            awayScore: 3,
            status: 'FT'
        },
        {
            league: 'BRA CB',
            date: 'Jun 13',
            homeTeam: {name: 'GRE', logo: '🇧🇷'},
            awayTeam: {name: 'CTH', logo: '🇧🇷'},
            homeScore: 1,
            awayScore: 1,
            status: 'FT'
        },
        {
            league: 'BRA CB',
            date: 'Jun 13',
            homeTeam: {name: 'SAO', logo: '🇧🇷'},
            awayTeam: {name: 'VAG', logo: '🇧🇷'},
            homeScore: 1,
            awayScore: 3,
            status: 'FT'
        },
        {
            league: 'BRA CB',
            date: 'Jun 13',
            homeTeam: {name: 'AMN', logo: '🇺🇸'},
            awayTeam: {name: 'INL', logo: '🇺🇸'},
            homeScore: 2,
            awayScore: 0,
            status: 'FT'
        },
        {
            league: 'USA MLS',
            date: 'Jun 13',
            homeTeam: {name: 'NYC', logo: '🇺🇸'},
            awayTeam: {name: 'ATL', logo: '🇺🇸'},
            homeScore: 4,
            awayScore: 0,
            status: 'FT'
        },
        {
            league: 'E. U21',
            date: 'Jun 13',
            homeTeam: {name: 'CZE', logo: '🇨🇿'},
            awayTeam: {name: 'ENG', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿'},
            homeScore: 2,
            awayScore: 1,
            status: 'FT'
        }
    ];

    const [showLiveButton, setShowLiveButton] = useState(true);
    const [showAllMatches, setShowAllMatches] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex >= liveScores.length - 4 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [liveScores.length]);

    const getVisibleMatches = () => {
        const matches = [];
        for (let i = 0; i < 4; i++) {
            matches.push(liveScores[(currentIndex + i) % liveScores.length]);
        }
        return matches;
    };

    return (
        <div className={styles.liveScoresTicker}>
            <div className={styles.tickerContainer}>
                {showLiveButton && (
                    <div className={styles.liveButton}>
                        <span className={styles.liveDot}></span>
                        Live
                    </div>
                )}

                <div className={styles.scoresContainer}>
                    {getVisibleMatches().map((match, index) => (
                        <div key={`${match.league}-${match.homeTeam.name}-${index}`} className={styles.matchCard}>
                            <div className={styles.matchHeader}>
                                <span className={styles.league}>{match.league}</span>
                                <span className={styles.date}>{match.date}</span>
                            </div>

                            <div className={styles.matchDetails}>
                                <div className={styles.team}>
                                    <span className={styles.teamLogo}>{match.homeTeam.logo}</span>
                                    <span className={styles.teamName}>{match.homeTeam.name}</span>
                                </div>

                                <div className={styles.score}>
                                    <span className={styles.homeScore}>{match.homeScore}</span>
                                </div>

                                <div className={styles.status}>{match.status}</div>

                                <div className={styles.score}>
                                    <span className={styles.awayScore}>{match.awayScore}</span>
                                </div>

                                <div className={styles.team}>
                                    <span className={styles.teamLogo}>{match.awayTeam.logo}</span>
                                    <span className={styles.teamName}>{match.awayTeam.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.allMatchesButton} onClick={() => setShowAllMatches(!showAllMatches)}>
                    All Matches
                </div>
            </div>

            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{
                        width: `${((currentIndex + 1) / liveScores.length) * 100}%`
                    }}
                ></div>
            </div>
        </div>
    );
};

export default LiveScoresTicker;