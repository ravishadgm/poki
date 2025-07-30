"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Images from "../../../public/images/index";
import { categories, smallGameModel } from "@/dataStore/categories";
import { useRouter } from "next/navigation";

export default function GameCategories() {
  const router = useRouter();

  const handleCategoryClick = (slug) => {
    router.push(`/categories/${slug}`);
  };

  return (
    <section>
      <div className={styles.gridWrapper}>
        {categories?.map((cat, idx) => (
          <div
            key={idx}
            className={styles.card}
            onClick={() => handleCategoryClick(cat.slug)}
            style={{ cursor: "pointer" }}
          >
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
      </div>

      <div>
        <div className={styles.secondCards}>
          {smallGameModel.map((item, idx) => (
            <div
              className={styles.smallGameCard}
              key={idx}
              onClick={() => handleCategoryClick(item.slug)}
              style={{ cursor: "pointer" }}
            >
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
