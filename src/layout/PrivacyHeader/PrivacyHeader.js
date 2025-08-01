import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import styles from './styles.module.scss';
import Images from '../../../public/images/index';

const PrivacyHeader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.backgroundContainer}>
                <Image
                    src={Images.privacyHeader}
                    alt="Header Background"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <Image src={Images.Logo} alt="Logo" width={60} height={45} />
                    <span>Privacy Center</span>
                </div>
                <Link href="/" className={styles.link}>
                    Exit <ExternalLink size={16} />
                </Link>
            </div>
        </div>

    );
};

export default PrivacyHeader;