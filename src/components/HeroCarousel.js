import React, {useState, useEffect, useRef} from 'react';
import styles from '../styles/HeroCarousel.module.scss';

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const slidesRef = useRef([]);

    const slides = [
        {
            id: 1,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=3840,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/sd-website-images/Desktop-Banner/_Web%20view%20Category%20Banners%20%20%281240%20x%20247%20px%29%20%2817%29-1748874809532.webp',
            alt: 'Sports Dunia Banner 1',
        },
        {
            id: 2,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=3840,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/sd-website-images/Desktop-Banner/_Web%20view%20Category%20Banners%20%20%281240%20x%20247%20px%29%20%2816%29-1748874754711.webp',
            alt: 'Sports Dunia Banner 2',
        },
        {
            id: 3,
            image: 'https://www.sportsdunia.com/cdn-cgi/image/width=3840,onerror=redirect/https://cms-sportsdunia-prod.s3.ap-southeast-2.amazonaws.com/sd-website-images/Desktop-Banner/_Web%20view%20Category%20Banners%20%20%281240%20x%20247%20px%29%20%2818%29-1748874839929.webp',
            alt: 'Sports Dunia Banner 3',
        },
    ];

    useEffect(() => {
        // Wait for images to load before starting the carousel
        Promise.all(
            slides.map(slide => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.src = slide.image;
                });
            })
        ).then(() => {
            setIsLoaded(true);
        });

        const interval = setInterval(() => {
            if (isLoaded) {
                setCurrentSlide((prevSlide) =>
                    prevSlide === slides.length - 1 ? 0 : prevSlide + 1
                );
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length, isLoaded]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className={styles.hero}>
            <div className={styles.slider}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        ref={el => slidesRef.current[index] = el}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                    >
                        <img src={slide.image} alt={slide.alt}/>
                        <div className={styles.slideOverlay}>
                            <div className={styles.slideContent}>
                            </div>
                        </div>
                    </div>
                ))}
                <div className={styles.slideIndicator}>
                    {slides.map((slide, index) => (
                        <span
                            key={slide.id}
                            className={index === currentSlide ? styles.active : ''}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroCarousel;
