import React from 'react';
import styles from './styles.module.scss';
import Header from '@/layout/Header/Page';


const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <h2>Get in touch ✉️</h2>
        <p>Have a question about Poki?</p>
        <p>We’d love to hear from you! 🤗</p>
        <p>
          Send us a message and we’ll get back to you as soon as possible:{" "}
          <a href="mailto:hello@poki.com">hello@poki.com</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
