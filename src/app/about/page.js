'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';


const slides = [
  {
    title: 'We let the world play',
    content:
      'Because play is how we learn. That&#39;s why we&#39;re creating the ultimate online playground. Free and open to all. Wanna play?',
    bgClass: 'section1',
    hasButton: true,
    buttonLabel: "Let's roll!",
  },
  {
    title: 'Easy access for all',
    content: 'Millions of players. Two lines of code. Better ads.',
    bgClass: 'section2',
    hasButton: true,
    buttonLabel: 'Try it now!',
  },
  {
    title: 'Original content',
    content: 'We work with top brands for exclusive experiences.',
    bgClass: 'section3',
    hasButton: false,
  },
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollTimeout = useRef(null);

  const handleWheel = (e) => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      if (e.deltaY > 50 && currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else if (e.deltaY < -50 && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    }, 100);
  };

  const handleButtonClick = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSlide]);

  return (
    <div className={styles.wrapper}>
      {/* Floating shapes shared across all slides */}
      <div className={styles.floatingBackground}>
        <div className={styles.floatingCircleLarge}></div>
        <div className={styles.floatingSquare}></div>
        <div className={styles.floatingCircleSmall}></div>
      </div>

      <div className={styles.header}>
  <Link href="/" passHref>
    <h1 className={styles.logo} style={{ cursor: 'pointer' }}>poki</h1>
  </Link>
</div>


      <div
        className={styles.slider}
        style={{ transform: `translateY(-${currentSlide * 100}vh)` }}
      >
        {slides.map((slide, idx) => (
          <section
            key={idx}
            className={`${styles.slide} ${styles[slide.bgClass]}`}
          >
            <div className={styles.content}>
              <h1>{slide.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: slide.content }} />
              {slide.hasButton && (
                <button
                  className={styles.rollButton}
                  onClick={handleButtonClick}
                >
                  {slide.buttonLabel}
                  <svg
                    className={styles.arrowIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className={styles.dots}>
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${
              currentSlide === idx ? styles.activeDot : ''
            }`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}
