"use client";

import APP_CONFIG from "@/utils/config";
import images from "../../../public/images/index";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={`${styles.footerRoot} ${styles.footer}`}>
            <div className={styles.innerSection}>
                <div className={styles.logoSection}>
                    <Link href="/">
                        <Image
                            src={images.Logo}
                            alt={`${APP_CONFIG.appName} Logo`} 

                            className={styles.logo}
                        />
                    </Link>
                    <span>Let the world play</span>
                </div>

                <div className={styles.linksSection}>
                    <div className={styles.linkColumn}>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/privacy">Privacy Center</Link>
                        <Link href="/terms-and-condition">Terms & Condition</Link>
                    </div>
                </div>
            </div>

            
        </footer>
    );
}
