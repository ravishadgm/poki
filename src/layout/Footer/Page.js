"use client";

import images from "@/assets/images";
import styles from "./Footer.module.scss";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={`${styles.footerRoot} ${styles.footer}`}>
            <div className={styles.innerSection}>
                <div className={styles.logoSection}>
                    <a
                        href="https://your-target-url.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src={images.Logo}
                            alt="Poki Logo"
                            className={styles.logo}
                        />
                    </a>
                    <span>Let the world play</span>
                </div>

                <div className={styles.linksSection}>
                    <div className={styles.linkColumn}>
                        <a href="/about">About</a>
                        <a href="/privacy">Privacy Center</a>
                        <a href="/contact">Contact</a>
                    </div>
                </div>
            </div>

            <div className={styles.bottomText}>
                <span>POKI – A-491B2A1D | SDK - 38619F</span>
            </div>
        </footer>
    );
}
