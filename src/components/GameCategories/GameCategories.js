"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Images from "../../../public/images/index";

export default function GameCategories() {
    const categories = [
        { img: "/images/GameType.playboy.png", title: "2 PLAYER GAMES" },
        { img: "/images/playboy.png", title: "GAMES FOR GIRLS" },
        { img: "/images/GameType.playboy.png", title: "PUZZLE GAMES" },
        { img: "/images/playboy.png", title: "MULTIPLAYER GAMES" },
        { img: "/images/playboy.png", title: "SHOOTING GAMES" },
        { img: "/images/playboy.png", title: "CAR GAMES" },

    ];

    const smallGameModel = [
        { img: "/images/playboy.png", title: "BRAINPOT GAMES" },
        { img: "/images/playboy.png", title: "OBBY GAMES" },
        { img: "/images/playboy.png", title: "DYNOSAUR GAMES" },
        { img: "/images/playboy.png", title: "COOKING GAMES" },
        { img: "/images/playboy.png", title: "TYCOON GAMES" },
        { img: "/images/playboy.png", title: "ADVENTURE GAMES" },

        { img: "/images/playboy.png", title: "SKILL GAMES" },
        { img: "/images/playboy.png", title: "MOBILE GAMES" },
        { img: "/images/playboy.png", title: "COOL GAMES" },
        { img: "/images/playboy.png", title: "GAMES FOR BOYS" },
        { img: "/images/playboy.png", title: "PLATFORM GAMES" },
        { img: "/images/playboy.png", title: "ONLINE GAMES" },

    ]


    return (
        <section>
            <div className={styles.gridWrapper}>
                {categories?.map((cat, idx) => (
                    <div key={idx} className={styles.card}>
                        {/* {cat.img && (
                            <Image
                                src={cat.img}
                                alt={cat.title}
                                width={100}
                                height={100}
                                className={styles.image}
                            />
                        )}
                        */}

                        {cat.img && (
                            <img
                                src={cat.img}
                                alt={cat.title}
                                className={styles.image}
                            />
                        )}
                        <span>{cat.title}</span>
                    </div>
                ))}
                <div className={styles.smallCard}>
                    <Image
                        src={Images.GameCard7}
                        alt="Poki Kids"
                        width={120}
                        height={120}
                        className={styles.imgCard}
                        quality={100}
                    />
                </div>
            </div>


            <div>
                <div className={styles.secondCards}>
                    {smallGameModel.map((item, idx) => (
                        <div className={styles.smallGameCard} key={idx}>
                            {/* <Image
                                src={item.img}
                                alt={item.title}
                                className={styles.imageCard}
                                style={{ objectFit: "contain" }}
                            /> */}
                            <img
                                src={item.img}
                                alt={item.title}
                                className={styles.imageCard}
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
