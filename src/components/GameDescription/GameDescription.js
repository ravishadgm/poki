"use client";

import styles from './GameDescription.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

const GameDescription = ({ game }) => {
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <p className={styles.breadcrumb}>POKI &gt; {game.category.toUpperCase()} &gt; {game.name.toUpperCase()}</p>
                    <h1>{game.name}</h1>
                    <div className={styles.meta}>
                        <span>{game.creator}</span>
                        <span><Star size={20} color="#ffd700" />{game.rating} ({game.votes} votes)</span>
                    </div>

                    <p className={styles.description}>{game.description}</p>

                    <h3>How to play:</h3>
                    <p>{game.howToPlay}</p>

                    <h3>About the creator:</h3>
                    <p>
                        {game.aboutCreator}{" "}
                        {game.creatorLinks.map((link, i) => (
                            <span key={i}>
                                <Link href={link.url} target="_blank">{link.name}</Link>{i < game.creatorLinks.length - 1 && ', '}
                            </span>
                        ))}
                    </p>

                    <div className={styles.tags}>
                        {game.tags.map((tag, i) => (
                            <span key={i}>{tag}</span>
                        ))}
                    </div>
                </div>

                <div className={styles.right}>
                    <Image src={game.image} alt={game.name} width={300} height={300} />
                </div>
            </div>
        </div>
    );
};

export default GameDescription;
