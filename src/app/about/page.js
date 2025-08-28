"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { slides } from "@/dataStore/categories";
import APP_CONFIG from "@/utils/config";
import Images from "../../../public/images/index";
import Image from "next/image";

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollTimeout = useRef(null);
  const touchStartY = useRef(null);

  // Desktop scroll
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

  // Mobile touch swipe
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1); // swipe up
      } else if (deltaY < 0 && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1); // swipe down
      }
    }
  };

  const handleButtonClick = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    // Optional: disable native scroll on mobile
    const preventScroll = (e) => e.preventDefault();
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "";
    };
  }, [currentSlide]);

  return (
    <div className={styles.wrapper}>
      {/* Floating shared shapes */}
      <div className={styles.floatingBackground}>
        <div className={styles.floatingCircleLarge}></div>
        <div className={styles.floatingSquare}></div>
        <div className={styles.floatingCircleSmall}></div>
      </div>

      <div className={styles.header}>
        <Link href="/" passHref>
          <Image
            src={Images.Logo}
            alt={`${APP_CONFIG.appName} Logo`}
            className={styles.logo}
          />
          {/* <h1 className={styles.logo} style={{ cursor: 'pointer' }}>{APP_CONFIG.appName}</h1> */}
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
              currentSlide === idx ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}
