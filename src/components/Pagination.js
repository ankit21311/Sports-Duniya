import React from 'react';
import styles from '../styles/Pagination.module.scss';

const Pagination = ({articlesPerPage, totalArticles, paginate, currentPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
        pageNumbers.push(i);
    }

    // Show limited page numbers with dots for pagination
    const renderPageNumbers = () => {
        const maxPagesToShow = 5;

        if (pageNumbers.length <= maxPagesToShow) {
            return pageNumbers.map(number => (
                <li key={number} className={currentPage === number ? styles.active : ''}>
                    <button onClick={() => paginate(number)}>{number}</button>
                </li>
            ));
        }

        let pagesToRender = [];

        // Always show first page
        pagesToRender.push(
            <li key={1} className={currentPage === 1 ? styles.active : ''}>
                <button onClick={() => paginate(1)}>1</button>
            </li>
        );

        // Calculate start and end of visible pages
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(pageNumbers.length - 1, currentPage + 1);

        // Adjust if at the start
        if (currentPage <= 3) {
            endPage = Math.min(maxPagesToShow - 1, pageNumbers.length - 1);
        }

        // Adjust if at the end
        if (currentPage >= pageNumbers.length - 2) {
            startPage = Math.max(2, pageNumbers.length - maxPagesToShow + 2);
        }

        // Add dots before visible pages if needed
        if (startPage > 2) {
            pagesToRender.push(
                <li key="dots-1" className={styles.dots}>
                    <span>...</span>
                </li>
            );
        }

        // Add visible pages
        for (let i = startPage; i <= endPage; i++) {
            pagesToRender.push(
                <li key={i} className={currentPage === i ? styles.active : ''}>
                    <button onClick={() => paginate(i)}>{i}</button>
                </li>
            );
        }

        // Add dots after visible pages if needed
        if (endPage < pageNumbers.length - 1) {
            pagesToRender.push(
                <li key="dots-2" className={styles.dots}>
                    <span>...</span>
                </li>
            );
        }

        // Always show last page
        pagesToRender.push(
            <li
                key={pageNumbers.length}
                className={currentPage === pageNumbers.length ? styles.active : ''}
            >
                <button onClick={() => paginate(pageNumbers.length)}>{pageNumbers.length}</button>
            </li>
        );

        return pagesToRender;
    };

    return (
        <nav className={styles.pagination}>
            <button
                className={`${styles.pageArrow} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <i className="fas fa-chevron-left"></i>
            </button>

            <ul className={styles.pageNumbers}>
                {renderPageNumbers()}
            </ul>

            <button
                className={`${styles.pageArrow} ${currentPage === pageNumbers.length ? styles.disabled : ''}`}
                onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        </nav>
    );
};

export default Pagination;