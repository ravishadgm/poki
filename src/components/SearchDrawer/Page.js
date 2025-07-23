import React from "react";
import styles from "./Searchbar.module.scss";
import { Search } from "lucide-react";
import Image from "next/image";

import { ChevronLeft } from 'lucide-react';
import images from "@/assets/images";

const SearchDrawer = ({ setOpenDrawer }) => {


    const games = [
        {
            title: 'Game1',
            image: images.Game1,
            video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
        },
        {
            title: 'Game2',
            image: Images.Game2,
            video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
        },
        {
            title: 'Game3',
            image: Images.Game3,
            video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
        },
        {
            title: 'Game4',
            image: Images.Game4,
            video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
        },
        {
            title: 'Game5',
            image: Images.Game1,
            video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
        },
        {
            title: 'Game6',
            image: Images.Game2,
            video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
        },
    ];

    const games2 = [
        {
            title: 'Game1',
            image: Images.Game1,
            video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
        },
        {
            title: 'Game2',
            image: Images.Game2,
            video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
        },
    ]


    return (
        <div className={styles.drawer}>
            <div className={styles.nav}>
                <div className={styles.searchContainer}>
                    <div className={styles.iconLeft} onClick={() => setOpenDrawer(false)}>
                        <div className={styles.mobileCloseIcon} onClick={() => setOpenDrawer(false)}>
                            <ChevronLeft size={24} />
                        </div>
                        <Image
                            src={Images.SmallLogo}
                            alt="Poki Small Logo"
                            width={38}
                            height={38}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="What are you playing today?"
                        className={styles.searchInput}
                    />
                    <div className={styles.iconRight}>
                        <Search size={28} />
                    </div>
                </div>
                <div>
                    <button className={styles.closeBtn} onClick={() => setOpenDrawer(false)}>
                        <ChevronLeft size={30} />
                    </button>
                </div>
            </div>

            <div className={styles.filterButtons}>
                <button>2 Player Games</button>
                <button>Car Games</button>
                <button>Obby Games</button>
                <button>Shooting Games</button>
                <button>Minecraft Games</button>
                <button>Adventure Games</button>
            </div>

            <div className={styles.section}>
                <div className={styles.heading}>Popular this week</div>
                <div className={styles.gameList}>
                    {games.map((game, idx) => (
                        <div className={styles.card} key={idx}>
                            <Image
                                src={game.image}
                                alt={game.title}
                                className={styles.image}
                                width={100}
                                height={100}
                            />
                            <video
                                src={game.video}
                                className={styles.video}
                                muted
                                loop
                                autoPlay
                                playsInline
                                preload="none"
                            />
                            <div className={styles.gradientOverlay}></div>
                            <p>{game.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.headingTwo}>Recent played</div>
                <div className={styles.gameList}>
                    {games2.map((game, idx) => (
                        <div className={styles.card} key={idx}>
                            <Image
                                src={game.image}
                                alt={game.title}
                                className={styles.image}
                                width={100}
                                height={100}
                            />
                            <video
                                src={game.video}
                                className={styles.video}
                                muted
                                loop
                                autoPlay
                                playsInline
                                preload="none"
                            />
                            <div className={styles.gradientOverlay}></div>
                            <p>{game.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchDrawer;
