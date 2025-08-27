'use client';

import APP_CONFIG from '@/utils/config';
import styles from './styles.module.scss';
import { BookOpen, Cookie, Scale, ShieldCheck, Info, Circle, ExternalLink } from 'lucide-react';


export default function PrivacyInfo() {
    return (
        <section className={styles.privacyWrapper}>

            <div className={styles.heading}>
                <h1>All You Need to Know About Privacy</h1>
                <p>
                    We think it’s important for you to know how online privacy works. That’s why we keep everything clear and simple, without confusing terms. Here, you’ll find a straightforward explanation of how we manage the information we collect from you. Dive in and see what really matters for your privacy.
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
                    We use cookies to improve your experience, track page visits, measure game performance, and display ads tailored to you.
                </p>
            </div>

            <div className={styles.infoBoxBlue}>
                <div className={styles.header}>
                    <h4>Local version of {APP_CONFIG.appName} </h4>
                    <Info className={styles.infoIcon} />
                </div>
                <p>
                    Your <strong>IP address</strong> helps us know where you are located so we can show you the version of our website that is right for your country. This version follows all local privacy rules, including any age requirements to play games on {APP_CONFIG.appName} . If you are using a <strong>VPN</strong>, you might not see the version that matches your country. It is important to see information that applies to your country because it can affect your privacy rights and how we give you important updates. If you are not sure if this is correct, you can contact us—we are here to help.
                </p>
                <div className={styles.note}>
                    <Info className={styles.infoIcon} />
                    <span>
                        Depending on where you are from, there might be an age rule for using {APP_CONFIG.appName} .
                    </span>
                </div>
            </div>
        </section>
    );
}
