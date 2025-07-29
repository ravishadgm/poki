"use client";

import Image from "next/image";
import styles from "./SmallGameGrid.module.scss";
import Images from "../../../public/images/index";

export default function SmallGameGrid() {
    const categories = [
        { img: "/images/GameType.playboy.jpg", title: "2 PLAYER GAMES" },
        { img: "/images/playboy.jpg", title: "GAMES FOR GIRLS" },
        { img: "/images/GameType.playboy.jpg", title: "PUZZLE GAMES" },
        { img: "/images/playboy.jpg", title: "MULTIPLAYER GAMES" },
        { img: "/images/playboy.jpg", title: "SHOOTING GAMES" },
        { img: "/images/playboy.jpg", title: "CAR GAMES" },

    ];

    const smallGameModel = [
        { img: "/images/playboy.jpg", title: "BRAINPOT GAMES" },
        { img: "/images/playboy.jpg", title: "OBBY GAMES" },
        { img: "/images/playboy.jpg", title: "DYNOSAUR GAMES" },
        { img: "/images/playboy.jpg", title: "COOKING GAMES" },
        { img: "/images/playboy.jpg", title: "TYCOON GAMES" },
        { img: "/images/playboy.jpg", title: "ADVENTURE GAMES" },

        { img: "/images/playboy.jpg", title: "SKILL GAMES" },
        { img: "/images/playboy.jpg", title: "MOBILE GAMES" },
        { img: "/images/playboy.jpg", title: "COOL GAMES" },
        { img: "/images/playboy.jpg", title: "GAMES FOR BOYS" },
        { img: "/images/playboy.jpg", title: "PLATFORM GAMES" },
        { img: "/images/playboy.jpg", title: "ONLINE GAMES" },

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
