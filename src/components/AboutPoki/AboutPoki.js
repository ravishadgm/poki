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
          At {APP_CONFIG.appName}, you’ll find a wide variety of free online
          games designed for a smooth and enjoyable experience, whether you like
          playing alone or together with friends
        </p>
        <p>
          No matter if you’re at home or traveling, you can enjoy{" "}
          {APP_CONFIG.appName} games on desktop, mobile, and tablets without
          restrictions. New titles are added regularly by game developers,
          ensuring there’s always something exciting to discover.
        </p>
        <p>
          Our catalog includes hundreds of popular and classic titles — from
          endless runners and racing games to puzzles, shooters, and casual
          favorites. If you’re not sure where to begin, check out our homepage
          or explore one of our most popular categories to find your next
          favorite.
        </p>
        <p>
          {APP_CONFIG.appName} was created to be a free and open online
          playground for everyone. Our mission is simple: to make gaming
          accessible, fun, and enjoyable for players everywhere.
        </p>
        <p>
          If you’re a game developer interested in sharing your game with a
          wider audience, we’d love to hear from you. Get in touch through our
          contact page to learn more about how
          {APP_CONFIG.appName} can help bring your game to players around the
          world.
        </p>
      </div>
    </div>
  );
};

export default AboutPoki;
