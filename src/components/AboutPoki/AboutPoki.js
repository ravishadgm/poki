"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { popularCategory } from "@/dataStore/categories";
import APP_CONFIG from "@/utils/config";

const AboutPoki = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h5>ABOUT {APP_CONFIG.appName}</h5>
        <h2>Free Online Games</h2>
        <p>
          {APP_CONFIG.appName} has the best collection of free online games and
          gives the most fun whether you play by yourself or with friends. You
          can play our games right away without needing to download, log in, or
          deal with popups or other interruptions. Our games work on desktops,
          tablets, and phones, so you can enjoy them at home or while you are on
          the go.
        </p>

        <h2>Our game selection</h2>
        <p>
          Every day, game creators add exciting new games to our platform. 
          Some of our top games are popular titles like
          <Link href="#"> Subway Surfers</Link>,{" "}
          <Link href="#">Temple Run 2</Link>,
          <Link href="#"> Stickman Hook</Link> and{" "}
          <Link href="#">Rodeo Stampede</Link>. 
        </p>

        <h2>Start playing</h2>
        <p>
         Not sure which game to play? Begin exploring games on our homepage or choose a game from one of these popular categories.
        </p>
        <ul>
          {popularCategory.map((cat, idx) => (
            <li key={idx}>
              <Link href={cat.href}>{cat.title}</Link>
            </li>
          ))}
        </ul>

        <h2>What is {APP_CONFIG.appName}?</h2>
        <p>
        Our website is an online hub for free games where players of all ages can explore, play, and enjoy a wide variety of titles directly in their browser. With no downloads or sign-ups required, we make gaming fast, fun, and accessible anytime, anywhere. From action and adventure to puzzles and casual favorites, our platform is designed to be a place where everyone can discover something they love and keep coming back for more

        </p>
      </div>
    </div>
  );
};

export default AboutPoki;
