'use client';

import APP_CONFIG from '@/utils/config';
import styles from './styles.module.scss';
import { BookOpen, Cookie, Scale, ShieldCheck, Info, Circle, ExternalLink } from 'lucide-react';


export default function PrivacyInfo() {
    return (
        <section className={styles.privacyWrapper}>

            <div className={styles.heading}>
                <h1>Everything you need to know about privacy</h1>
                <p>
                    It’s important for you to know how online privacy works. That’s why we
                    won’t bore you with complicated explanations but make it easy to understand what
                    happens with the information we collect from you. Start exploring and learn what you need.
                </p>
            </div>
            <div className={styles.cardGrid}>
                <div className={styles.card}>
                    <ShieldCheck className={styles.icon} />
                    <strong>Why we use your data</strong>
                </div>
                <div className={styles.card}>
                    <Cookie className={styles.icon} />
                    <strong>How we use cookies</strong>
                </div>
                <div className={styles.card}>
                    <Scale className={styles.icon} />
                    <strong>Your privacy rights</strong>
                </div>
                <div className={styles.card}>
                    <BookOpen className={styles.icon} />
                    <strong>Our website rules</strong>
                </div>
            </div>

            <div className={styles.infoBox}>
                <h4>Cookie settings</h4>
                <p>
                    Our website uses cookies to provide a better experience, keep track of page visits and game performance,
                    and show personalized ads.
                </p>
            </div>

            <div className={styles.infoBoxBlue}>
                <div className={styles.header}>
                    <h4>Local version of {APP_CONFIG.appName}</h4>
                    <Info className={styles.infoIcon} />
                </div>
                <p>
                    Your <strong>IP address</strong> tells us from where you visit so we can show you the local version of our
                    website. This version follows all local privacy rules, including the age requirements for playing games on {APP_CONFIG.appName}. If you use a <strong>VPN</strong>, connection you may not see your country’s version.
                    It’s important to see info that matches your country, as it might affect your privacy rights and how we inform you about this. Not sure it’s correct? Contact us—We’re here to help.
                </p>
                <div className={styles.note}>
                    <Info className={styles.infoIcon} />
                    <span>
                        Depending on your location, there might be an age requirement for using {APP_CONFIG.appName}. Click the button to go to the age rules.
                    </span>
                </div>
            </div>
        </section>
    );
}
