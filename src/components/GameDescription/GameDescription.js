"use client";

import styles from './styles.module.scss';
import Image from 'next/image';
import { categories } from "@/dataStore/categories";
import { useRouter } from "next/navigation";

const GameDescription = ({ game }) => {
    const router = useRouter();

    const handleCategoryClick = (slug) => {
        router.push(`/categories/${slug}`);
    };

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.left}>
                <p className={styles.breadcrumb}>POKI &gt; {game.category.toUpperCase()} &gt; {game.name.toUpperCase()}</p>
                <h1>{game.name}</h1>

                <p className={styles.description}>{game.description}</p>

                {/* <div className={styles.tags}>
                    {categories.slice(-5).map((tag, i) => (
                        <span key={i} onClick={() => handleCategoryClick(tag.slug)}>
                            {tag.title}
                        </span>
                    ))}
                </div> */}
                <div className={styles.tags}>
                    <span onClick={() => handleCategoryClick(game.category)}>
                        {game.category.toUpperCase()}
                    </span>
                </div>
            </div>
            <div className={styles.right}>
                <Image src={game.image} alt={game.name} width={300} height={300} className={styles.rightImage} />
            </div>

        </div >
    );
};

export default GameDescription;
