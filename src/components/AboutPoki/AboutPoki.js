"use client"

import styles from './styles.module.scss';
import Link from 'next/link';
import { popularCategory } from "@/dataStore/categories";

const AboutPoki = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <h5>ABOUT POKI</h5>
                <h2>Free Online Games</h2>
                <p>
                    Poki has the best free online games selection and offers the most fun experience to play alone or with friends.
                    We offer instant play to all our games without downloads, login, popups or other distractions.
                    Our games are playable on desktop, tablet and mobile so you can enjoy them at home or on the road.
                    Every month over 90 million gamers from all over the world play their favorite games on Poki.
                </p>

                <h2>Our game selection</h2>
                <p>
                    Game developers release fun <Link href="#">New Games</Link> on our platform on a daily basis.
                    Our most popular games include hits like
                    <Link href="#"> Subway Surfers</Link>, <Link href="#">Temple Run 2</Link>,
                    <Link href="#"> Stickman Hook</Link> and <Link href="#">Rodeo Stampede</Link>.
                    These games are only playable on Poki. We also have online classics like
                    <Link href="#"> Moto X3M</Link>, <Link href="#"> Venge.io</Link>,
                    <Link href="#"> Dino Game</Link>, <Link href="#"> Smash Karts</Link>,
                    <Link href="#"> 2048</Link>, <Link href="#"> Penalty Shooters 2</Link> and
                    <Link href="#"> Bad Ice-Cream</Link> to play for free. In total we offer more than 1000 game titles.
                </p>

                <h2>Start playing</h2>
                <p>
                    Unsure what game to play? Start your game discovery on our homepage or pick a game from any of these popular categories:
                </p>
                <ul>
                    {popularCategory.map((cat, idx) => (
                        <li key={idx}>
                            <Link href={cat.href}>{cat.title}</Link>
                        </li>
                    ))}
                </ul>

                <h2>What is Poki?</h2>
                <p>
                    Poki is based in Amsterdam and has a team of 50 people working on our gaming platform.
                    Our goal is to create the ultimate online playground. Free and open to all.
                    Read more about the platform we are building on our <Link href="#">company</Link> page.
                    If you are a game developer looking to achieve success for your game on web, discover what we offer and get in touch via
                    <Link href="#"> Poki for Developers</Link>.
                </p>
            </div>
        </div>
    );
};

export default AboutPoki;
