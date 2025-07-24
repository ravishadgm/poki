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
        { img: Images.GameCard1, title: "ACTION GAMES" },
        { img: Images.GameCard2, title: "BOARD GAMES" },
    ];

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

                {/* <div className={styles.smallgridWrapper}>
                    {smallGameModel.map((item, idx) => (
                        <div className={styles.smallGameCard} key={idx}>
                            <Image
                                src={item.img}
                                alt={item.title}
                                className={styles.image}
                            />
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div> */}
                <div className={styles.smallgridWrapper}>
                    {smallGameModel.map((item, idx) => (
                        <div className={styles.smallGameCard} key={idx}>
                            <Image
                                src={item.img}
                                alt={item.title}
                                className={styles.image}

                                style={{ objectFit: "contain" }}
                            />
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
