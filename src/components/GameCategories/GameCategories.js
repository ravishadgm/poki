"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Images from "../../../public/images/index";
import { categories, smallGameModel } from "@/dataStore/categories";

export default function GameCategories() {
    return (
        <section>
            <div className={styles.gridWrapper}>
                {categories?.map((cat, idx) => (
                    <div key={idx} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={cat.img}
                                alt={cat.title}
                                width={120}
                                height={120}
                                className={styles.imgCard}
                                quality={100}
                            />
                        </div>
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
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={80}
                                height={80}
                                className={styles.imageCard}
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
