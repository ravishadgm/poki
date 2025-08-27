'use client';

import APP_CONFIG from '@/utils/config';
import styles from './styles.module.scss';
import { Info } from 'lucide-react';

export default function TermsConditionInfo() {
    return (
        <section className={styles.privacyWrapper}>

            <div className={styles.heading}>
                <h1>Play by the Rules: Terms & Conditions</h1>
                <p>
                    Welcome to {APP_CONFIG.appName}. By accessing or using our website, you agree to these Terms & Conditions. 
                    Please read them carefully before using our services. If you do not agree, you should stop using our website.
                </p>
            </div>

            <div className={styles.infoBox}>

                <div className={styles.section}>
                    <h4>Accounts & Access</h4>
                    <p>
                        Most games on {APP_CONFIG.appName} can be played without creating an account. 
                        If any future feature requires an account, users are responsible for keeping their login details safe. 
                        {APP_CONFIG.appName} reserves the right to suspend or restrict access for misuse or violation of these Terms.
                    </p>
                </div>

                <div className={styles.section}>
                    <h4>Third-Party Games & Ads</h4>
                    <p>
                        {APP_CONFIG.appName} provides access to games created and hosted by third-party developers and may 
                        display advertisements from external networks. 
                    </p>
                    <p>
                        We are not responsible for the content, functionality, or policies of third-party games, ads, or external websites 
                        you may access through our platform. Playing those games or interacting with ads is at your own discretion.
                    </p>
                </div>

                <div className={styles.section}>
                    <h4>Limitation of Liability</h4>
                    <p>
                        The services and games on {APP_CONFIG.appName} are provided “as is” without guarantees of availability, 
                        performance, or error-free operation.
                    </p>
                    <p>
                        We are not liable for damages, losses, or issues resulting from the use of our website, third-party games, or advertisements.
                    </p>
                </div>

                <div className={styles.section}>
                    <h4>Changes to These Terms</h4>
                    <p>
                        We may update these Terms & Conditions from time to time. Updates will be posted here, and continued 
                        use of {APP_CONFIG.appName} means you accept the revised terms.
                    </p>
                </div>
            </div>

            <div className={styles.infoBoxBlue}>
                <div className={styles.header}>
                    <h4>Important Notice</h4>
                    <Info className={styles.infoIcon} />
                </div>
                <p>
                    Some games or ads shown on {APP_CONFIG.appName} may be subject to age restrictions depending on your country’s laws. 
                    By using our site, you confirm that you meet the minimum age required in your region to play online games or view ads.
                </p>
                <div className={styles.note}>
                    <Info className={styles.infoIcon} />
                    <span>
                        If you are unsure about local rules, please check your country’s regulations before using our site.
                    </span>
                </div>
            </div>
        </section>
    );
}
