'use client';

import APP_CONFIG from '@/utils/config';
import styles from './styles.module.scss';
import { BookOpen, Cookie, Scale, ShieldCheck, Info, ExternalLink } from 'lucide-react';

export default function PrivacyInfo() {
    return (
        <section className={styles.privacyWrapper}>

            <div className={styles.heading}>
                <h1>Privacy Policy</h1>
               
                <p>
                    At <strong>{APP_CONFIG.appName}</strong>, your privacy is important. This page explains how we handle data on our website. Short version: <strong>we do not collect personal information from visitors</strong>. You can play games here without signing up or providing personal details.
                </p>
            </div>

            <div className={styles.cardGrid}>
                <div className={styles.card}>
                    <ShieldCheck className={styles.icon} />
                    <strong>We do not collect data</strong>
                </div>
                <div className={styles.card}>
                    <Cookie className={styles.icon} />
                    <strong>Third-party cookies</strong>
                </div>
                <div className={styles.card}>
                    <Scale className={styles.icon} />
                    <strong>Third-party games</strong>
                </div>
                <div className={styles.card}>
                    <BookOpen className={styles.icon} />
                    <strong>Contact & support</strong>
                </div>
            </div>

            <div className={styles.infoBox}>
                <h4>No personal data collected</h4>
                <p>
                    We do not ask for or store names, emails, payment details, or any other personal information. There are no user accounts or profiles on our site — you simply visit and play.
                </p>
            </div>

            <div className={styles.infoBoxBlue}>
                <div className={styles.header}>
                    <h4>Games provided by third parties</h4>
                    <Info className={styles.infoIcon} />
                </div>
                <p>
                    The games displayed on this site are created and hosted by third-party developers or platforms. When you play a game, that third-party provider may collect information necessary for the game to function (for example, to load assets, save progress, or serve ads). Any data collection by game providers is governed by their own privacy policies — we recommend reviewing them if you want details about how a particular game handles data.
                </p>

                <div className={styles.note}>
                    <Info className={styles.infoIcon} />
                    <span>
                        We are not responsible for the privacy practices of third-party game providers or advertising networks.
                    </span>
                </div>
            </div>

            <div className={styles.infoBox}>
                <h4>Cookies and advertising</h4>
                <p>
                    Our website itself does not set tracking cookies for analytics or profiling. However, third-party partners (such as game hosts or ad networks) may use cookies or similar technologies when their content runs on our pages. Those cookies are controlled by the third parties and not by us. You can manage or block cookies through your browser settings.
                </p>
            </div>

            <div className={styles.infoBoxBlue}>
                <div className={styles.header}>
                    <h4>Children</h4>
                    <Info className={styles.infoIcon} />
                </div>
                <p>
                    We do not knowingly collect personal information from children. If you believe a child has provided personal information to a third-party game provider via our site, please contact that provider directly.
                </p>
            </div>

            <div className={styles.infoBox}>
                <h4>Contact us</h4>
                <p>
                    If you have questions about this policy, contact us at:
                </p>
                <ul>
                    <li>Email: <strong>resilient.tech001@gmail.com</strong></li>
                </ul>
           
            </div>

           
        </section>
    );
}
