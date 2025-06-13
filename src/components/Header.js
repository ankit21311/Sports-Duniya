import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/Header.module.scss';

const Header = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
        if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (searchOpen) setSearchOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle search functionality
        console.log('Search query:', searchQuery);
        // Reset search after submitting
        setSearchQuery('');
        setSearchOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img
                            src="https://www.sportsdunia.com/cdn-cgi/image/width=256,onerror=redirect/svgs/sd/sd-logo.svg"
                            alt="Sports Dunia"
                        />
                    </Link>
                </div>

                <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
                    <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <nav className={`${styles.navigation} ${mobileMenuOpen ? styles.active : ''}`}>
                    <ul>
                        <li><Link to="/" className={styles.navLink}>Home</Link></li>
                        <li><Link to="/news" className={styles.navLink}>News</Link></li>
                        <li><Link to="/categories" className={styles.navLink}>Categories</Link></li>
                        <li><Link to="/gaming" className={styles.navLink}>Gaming</Link></li>
                        <li className={styles.mobileOnly}><Link to="/about" className={styles.navLink}>About</Link></li>
                        <li className={styles.mobileOnly}><Link to="/contact" className={styles.navLink}>Contact</Link>
                        </li>
                    </ul>
                </nav>

                <div className={styles.searchContainer}>
                    <div className={`${styles.searchBox} ${searchOpen ? styles.active : ''}`}>
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </div>
                    <div className={styles.searchIcon} onClick={toggleSearch}>
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
