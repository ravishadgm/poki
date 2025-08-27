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
                    Welcome to {APP_CONFIG.appName} . By accessing or using our website, you agree to these Terms & Conditions. Please read them carefully before using our services. If you do not agree, you need to stop using our website right away.
                </p>
            </div>

            <div className={styles.infoBox}>

                <div className={styles.section}>
                    <h4>Accounts & Access</h4>
                    <p>Most games on {APP_CONFIG.appName}  can be played without an account.</p>
                    <p>If you choose to create an account, you must keep your login information safe.</p>
                    <p>{APP_CONFIG.appName}  reserves the right to suspend or terminate accounts that violate these Terms.</p>
                </div>

                <div className={styles.section}>
                    <h4>Third-Party Content & Ads</h4>
                    <p>{APP_CONFIG.appName}  hosts games from independent developers and may display third-party ads.</p>
                    <p>We are not responsible for the content, accuracy, or safety of third-party sites you may visit through ads or external links.</p>
                </div>

                <div className={styles.section}>
                    <h4>Limitation of Liability</h4>
                    <p>{APP_CONFIG.appName}  provides games “as is” without any guarantees of availability or error-free experience.</p>
                    <p>We are not liable for any damages, data loss, or issues caused by using our website or third-party games.</p>
                </div>

                <div className={styles.section}>
                    <h4>Changes to These Terms</h4>
                    <p>We may update these Terms & Conditions from time to time. Any changes will be posted here, and continued use of {APP_CONFIG.appName}  means you accept the updated terms.</p>
                </div>
            </div>

            <div className={styles.infoBoxBlue}>
                <div className={styles.header}>
                    <h4>Local version of roky</h4>
                    <Info className={styles.infoIcon} />
                </div>
                <p>
                    Your <strong>IP address</strong> helps us know where you are located so we can show you the version of our website that is right for your country. This version follows all local privacy rules, including any age requirements to play games on roky. If you are using a <strong>VPN</strong>, you might not see the version that matches your country. It is important to see information that applies to your country because it can affect your privacy rights and how we give you important updates. If you are not sure if this is correct, you can contact us—we are here to help.
                </p>
                <div className={styles.note}>
                    <Info className={styles.infoIcon} />
                    <span>
                        Depending on where you are from, there might be an age rule for using roky.
                    </span>
                </div>
            </div>
        </section>
    );
}
