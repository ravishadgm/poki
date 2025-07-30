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
                fill
                className={styles.imgCard}
                quality={100}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
            <span>{cat.title}</span>
          </div>
        ))}
      </div>

      <div className={styles.secondCards}>
        {smallGameModel.map((item, idx) => (
          <div
            className={styles.smallGameCard}
            key={idx}
            onClick={() => handleCategoryClick(item.slug)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.imageCard}>
              <Image
                src={item.img}
                alt={item.title}
                fill
                priority
                className={styles.imageCardImg}
                sizes="(max-width: 480px) 60px, (max-width: 768px) 80px, 80px"
              />
            </div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}