'use client';

import styles from './styles.module.scss';
import { BookOpen, Cookie, Scale, ShieldCheck, Info, Circle, ExternalLink } from 'lucide-react';


export default function TermsConditionInfo() {
    return (
        <section className={styles.privacyWrapper}>

            <div className={styles.heading}>
                <h1>Play by the Rules: Terms & Conditions</h1>
                <p>
                    Welcome to Poki. By accessing or using our website, you agree to these Terms & Conditions. Please read them carefully before using our services. If you do not agree, you need to stop using our website right away.
                </p>
            </div>


            <div className={styles.infoBox}>
                <h4>Third-Party Content & Ads</h4>
                <p>Poki hosts games from independent developers and may display third-party ads.</p>
                <p>We are not responsible for the content, accuracy, or safety of third-party sites you may visit through ads or external links.</p>
            </div>

            <div className={styles.infoBoxBlue}>
                <div className={styles.header}>
                    <h4>Local version of Poki</h4>
                    <Info className={styles.infoIcon} />
                </div>
                <p>
                    Your <strong>IP address</strong> tells us from where you visit so we can show you the local version of our
                    website. This version follows all local privacy rules, including the age requirements for playing games on Poki. If you use a <strong>VPN</strong>, connection you may not see your country’s version.
                    It’s important to see info that matches your country, as it might affect your privacy rights and how we inform you about this. Not sure it’s correct? Contact us—We’re here to help.
                </p>
                <div className={styles.note}>
                    <Info className={styles.infoIcon} />
                    <span>
                        Depending on your location, there might be an age requirement for using Poki. Click the button to go to the age rules.
                    </span>
                </div>
            </div>
        </section>
    );
}
