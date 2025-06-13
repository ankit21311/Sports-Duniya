import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerMain}>
                <div className={styles.container}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerLeft}>
                            <Link to="/" className={styles.logo}>
                                <img
                                    src="https://www.sportsdunia.com/cdn-cgi/image/width=256,onerror=redirect/svgs/sd/sd-logo.svg"
                                    alt="Sports Dunia"/>
                            </Link>
                            <p className={styles.description}>
                                Welcome to <Link to="/" className={styles.siteLink}>Sportsdunia</Link>, Your Ultimate
                                Destination for Sports News, Insights & Engagements.
                            </p>
                            <div className={styles.googleNewsContainer}>
                                <a href="https://news.google.com/publications/CAAqBwgKMPqCoAswjoGyAw" target="_blank"
                                   rel="noopener noreferrer" className={styles.googleNewsLink}>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUfXkFR4FpWi62-7YpoWh1nvgWkf_3DTwhPw&s"
                                        alt="Google News" className={styles.googleNewsImage}/>
                                </a>
                            </div>
                        </div>

                        <div className={styles.footerRight}>
                            <div className={styles.footerSection}>
                                <h3 className={styles.sectionTitle}>Quick Links</h3>
                                <div className={styles.linksGrid}>
                                    <Link to="/">Home</Link>
                                    <Link to="/about">About Us</Link>
                                    <Link to="/news">All News</Link>
                                    <Link to="/privacy-policy">Privacy Policy</Link>
                                    <Link to="/fixtures">Fixtures</Link>
                                    <Link to="/careers">Careers</Link>
                                    <Link to="/leagues">Leagues</Link>
                                    <Link to="/sitemap">Sitemap</Link>
                                    <Link to="/editorial">Editorial</Link>
                                    <Link to="/dmca">DMCA</Link>
                                    <Link to="/contact">Contact Us</Link>
                                </div>
                            </div>

                            <div className={styles.footerSection}>
                                <h3 className={styles.sectionTitle}>Categories</h3>
                                <div className={styles.linksGrid}>
                                    <Link to="/football">Football</Link>
                                    <Link to="/cricket">Cricket</Link>
                                    <Link to="/ipl">IPL</Link>
                                    <Link to="/nba">NBA</Link>
                                    <Link to="/esports">Esports</Link>
                                    <Link to="/wnba">WNBA</Link>
                                    <Link to="/gaming">Gaming</Link>
                                    <Link to="/sports-guide">Sports Guide</Link>
                                    <Link to="/exclusives">Exclusives</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <div className={styles.container}>
                    <p>All images used are for editorial purposes only. License solely with Getty/Source.</p>
                    <p>Copyright © 2025 <Link to="/" className={styles.siteLink}>Sportsdunia</Link>. All rights
                        reserved.</p>
                    <p>The information contained in <Link to="/" className={styles.siteLink}>Sportsdunia</Link> may not
                        be published, broadcast, rewritten, or redistributed without the prior written authority
                        of <Link to="/" className={styles.siteLink}>Sportsdunia</Link>.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
