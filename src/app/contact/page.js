import React from 'react';
import styles from './styles.module.scss';
import Header from '@/layout/Header/Page';
import APP_CONFIG from '@/utils/config';


const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <h2>Get in touch ✉️</h2>
        <p>Curious about {APP_CONFIG.appName} or have a question?</p>
        <p>We’re always happy to connect with you!!🤗</p>
        <p>
          Reach out to us and we’ll reply as quickly as we can :
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=resilient.tech001@gmail.com"
            target="_blank"
          > resilient.tech001@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
