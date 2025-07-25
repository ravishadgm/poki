"use client";

import Image from "next/image";
import styles from "./SmallGameGrid.module.scss";
import Images from "@/assets/images/index";

export default function SmallGameGrid() {
    const categories = [
        { img: Images.GameCard1, title: "2 PLAYER GAMES" },
        { img: Images.GameCard2, title: "GAMES FOR GIRLS" },
        { img: Images.GameCard3, title: "PUZZLE GAMES" },
        { img: Images.GameCard4, title: "MULTIPLAYER GAMES" },
        { img: Images.GameCard5, title: "SHOOTING GAMES" },
        { img: Images.GameCard6, title: "CAR GAMES" },
    ];

    const smallGameModel = [
        { img: Images.smallCard1, title: "OBBY GAMES" },
        { img: Images.smallCard2, title: "BRAINPOT GAMES" },
        { img: Images.smallCard3, title: "TYCOON GAMES" },
        { img: Images.smallCard4, title: "ADVENTURE GAMES" },
        { img: Images.smallCard5, title: "SKILL GAMES" },
        { img: Images.smallCard6, title: "MOBILE GAMES" },
        { img: Images.smallCard7, title: "DYNOSAUR GAMES" },
        { img: Images.GameCard2, title: "COOKING GAMES" },
        { img: Images.GameCard1, title: "OBBY GAMES" },
        { img: Images.GameCard2, title: "BRAINPOT GAMES" },
        { img: Images.smallCard1, title: "OBBY GAMES" },
        { img: Images.smallCard2, title: "BRAINPOT GAMES" },
        { img: Images.smallCard3, title: "TYCOON GAMES" },
        { img: Images.smallCard4, title: "ADVENTURE GAMES" },
        { img: Images.smallCard5, title: "SKILL GAMES" },
        { img: Images.smallCard6, title: "MOBILE GAMES" },
        { img: Images.smallCard7, title: "DYNOSAUR GAMES" },
        { img: Images.GameCard2, title: "COOKING GAMES" },
        { img: Images.GameCard1, title: "OBBY GAMES" },
        { img: Images.GameCard2, title: "BRAINPOT GAMES" },
        { img: Images.smallCard1, title: "OBBY GAMES" },
        { img: Images.smallCard2, title: "BRAINPOT GAMES" },
        { img: Images.smallCard3, title: "TYCOON GAMES" },
        { img: Images.smallCard4, title: "ADVENTURE GAMES" },
        { img: Images.smallCard5, title: "SKILL GAMES" },
        { img: Images.smallCard6, title: "MOBILE GAMES" },
        { img: Images.smallCard7, title: "DYNOSAUR GAMES" },
        { img: Images.GameCard2, title: "COOKING GAMES" },
        { img: Images.GameCard1, title: "OBBY GAMES" },
        { img: Images.GameCard2, title: "BRAINPOT GAMES" },
    ];

    // const smallBox = [
    //     { img: Images.smallCard1, title: "OBBY GAMES" },
    //     { img: Images.smallCard2, title: "BRAINPOT GAMES" },
    //     { img: Images.smallCard3, title: "TYCOON GAMES" },
    //     { img: Images.smallCard4, title: "ADVENTURE GAMES" },
    //     { img: Images.smallCard5, title: "SKILL GAMES" },
    //     { img: Images.smallCard6, title: "MOBILE GAMES" },
    //     { img: Images.smallCard7, title: "DYNOSAUR GAMES" },
    //     { img: Images.GameCard2, title: "COOKING GAMES" },
    //     { img: Images.GameCard1, title: "OBBY GAMES" },
    //     { img: Images.GameCard2, title: "BRAINPOT GAMES" },
    //     { img: Images.smallCard1, title: "OBBY GAMES" },
    //     { img: Images.smallCard2, title: "BRAINPOT GAMES" },
    //     { img: Images.smallCard3, title: "TYCOON GAMES" },
    //     { img: Images.smallCard4, title: "ADVENTURE GAMES" },
    //     { img: Images.smallCard5, title: "SKILL GAMES" },
    //     { img: Images.smallCard6, title: "MOBILE GAMES" },
    //     { img: Images.smallCard7, title: "DYNOSAUR GAMES" },
    //     { img: Images.GameCard2, title: "COOKING GAMES" },
    //     { img: Images.GameCard1, title: "OBBY GAMES" },
    //     { img: Images.GameCard2, title: "BRAINPOT GAMES" },
    //     { img: Images.smallCard1, title: "OBBY GAMES" },
    //     { img: Images.smallCard2, title: "BRAINPOT GAMES" },
    //     { img: Images.smallCard3, title: "TYCOON GAMES" },
    //     { img: Images.smallCard4, title: "ADVENTURE GAMES" },
    // ];

    return (
        <section>
            <div className={styles.gridWrapper}>
                {categories.map((cat, idx) => (
                    <div key={idx} className={styles.card}>
                        <Image
                            src={cat.img}
                            alt={cat.title}
                            width={100}
                            height={100}
                            className={styles.image}
                        />
                        <span>{cat.title}</span>
                    </div>
                ))}
                <div className={styles.smallCard}>
                    <Image
                        src={Images.GameCard7}
                        alt="Poki Kids"
                        className={styles.imgCard}
                    />
                </div>
            </div>


            <div>
                <div className={styles.secondCards}>
                    {smallGameModel.map((item, idx) => (
                        <div className={styles.smallGameCard} key={idx}>
                            <Image
                                src={item.img}
                                alt={item.title}
                                className={styles.imageCard}
                                height={70}
                                width={0}
                                style={{ objectFit: "contain" }}
                            />
                            <span>{item.title}</span>
                        </div>
                    ))}


                </div>

                {/* <div className={styles.infoCard}>
                    {smallBox.map((items, idx) => {
                        return (
                            <div className={styles.smallGameCard} key={idx}>
                                <Image
                                    src={items.img}
                                    alt={items.title}
                                    className={styles.imageCard}
                                    height={70}
                                    width={70}
                                    style={{ objectFit: "contain" }}
                                />
                                <span>{items.title}</span>
                            </div>
                        );
                    })}
                </div> */}
            </div>
        </section >
    );
}
