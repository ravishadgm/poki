"use client";
import styles from './styles.module.scss';
import { Pencil, PhoneCall, MapPin } from "lucide-react";
import Image from 'next/image';
import Images from '../../../public/images/index';
import APP_CONFIG from '@/utils/config';

export default function GetInTouch() {
    return (
        <section className={styles.mainContainer}>
            <div className={styles.contactWrapper}>
                <h2>Get in touch</h2>
                <div className={styles.contactContainer}>
                    <div className={styles.contactItem}>
                        <Pencil className={styles.icon} />
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=resilient.tech001@gmail.com"
                            target="_blank">
                            <strong>resilient.tech001@gmail.com</strong>
                        </a>
                        <p>Have a question or need our privacy details in a different language? Just ask!</p>
                    </div>

                    <div className={styles.contactItem}>
                        <PhoneCall className={styles.icon} />
                        <a href="tel:+919825805271">
                            <strong>+91 98258 05271</strong>
                        </a>
                        <p>We’re here for you – fluent in English and we’ll gladly try our best with other languages.</p>
                    </div>

                    <div className={styles.contactItem}>
                        <MapPin className={styles.icon} />
                        <strong>{APP_CONFIG.appName} B.V.</strong>
                        <p>119, Royal Arcade, Surat, Gujarat<br />The India</p>
                    </div>

                </div>

            </div>
            <div className={styles.footerImage}>
                <Image
                    src={Images.privacyFooter}
                    alt="Header Background"
                    fill
                />
            </div>
        </section>
    );
}
