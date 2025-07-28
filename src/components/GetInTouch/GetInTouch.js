"use client";
import styles from './GetInTouch.module.scss';
import { Pencil, Phone, MapPin } from "lucide-react";

export default function GetInTouch() {
    return (
        <section className={styles.contactWrapper}>
            <h2>Get in touch</h2>
            <div className={styles.contactContainer}>
                <div className={styles.contactItem}>
                    <Pencil className={styles.icon} />
                    <strong>privacy@poki.com</strong>
                    <p>Ask a question or request our privacy information in another language.</p>
                </div>

                <div className={styles.contactItem}>
                    <Phone className={styles.icon} />
                    <strong>+31 20 2800 870</strong>
                    <p>Reach out to us – we speak English, Dutch and will do our best with other languages.</p>
                </div>

                <div className={styles.contactItem}>
                    <MapPin className={styles.icon} />
                    <strong>Poki B.V.</strong>
                    <p>Spul 10, 1012 WZ Amsterdam,<br />The Netherlands</p>
                </div>
            </div>
        </section>
    );
}
