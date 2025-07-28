"use client";

import styles from './GameDescription.module.scss';
import Image from 'next/image';


const GameDescription = ({ game }) => {
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.left}>
                <p className={styles.breadcrumb}>POKI &gt; {game.category.toUpperCase()} &gt; {game.name.toUpperCase()}</p>
                <h1>{game.name}</h1>

                <p className={styles.description}>{game.description}</p>

                <div className={styles.tags}>
                    {game.tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                    ))}
                </div>
            </div>
            <div className={styles.right}>
                <Image src={game.image} alt={game.name} width={300} height={300} className={styles.rightImage} />
            </div>

        </div>
    );
};

export default GameDescription;
