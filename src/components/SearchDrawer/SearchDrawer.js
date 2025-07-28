"use client";

import styles from "./Searchbar.module.scss";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRecentGames } from "@/contexts/RecentGamesContext";
import { ChevronLeft } from 'lucide-react';
import Images from "../../../public/images/index";
import { useRouter } from "next/navigation";

const games = [
    {
        title: '4 Winds',
        slug: '4-winds',
        image: Images.GameOne,
        video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
    },
    {
        title: 'Marble Shooter',
        slug: 'marble-shooter',
        image: Images.GameTwo,
        video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
    },
    {
        title: 'Rotate Puzzle',
        slug: "rotate-puzzle",
        image: Images.GameThree,
        video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
    },
    {
        title: 'Street Hidden Object',
        slug: "street-hidden-object",
        image: Images.GameFour,
        video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
    },
    {
        title: '4 Winds',
        slug: '4-winds',
        image: Images.GameOne,
        video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
    },
    {
        title: 'Marble Shooter',
        slug: 'marble-shooter',
        image: Images.GameTwo,
        video: 'https://v.poki-cdn.com/6c430da8-91f5-4fb3-9b40-77d349535dd9/thumbnail.1x1.vp9.mp4',
    },
];


const SearchDrawer = ({ setOpenDrawer }) => {
    const { recentGames, addToRecentGames } = useRecentGames();
    const router = useRouter();

    const handleGameClick = (game) => {
        router.push(`/home/${game.slug}`);
        setTimeout(() => {
            addToRecentGames({
                title: game.title,
                slug: game.slug,
                image: game.image || game.thumbnail,
                video: game.video,
                thumbnail: game.thumbnail
            });
        }, 600);
    };

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
                        <div className={styles.card} key={idx} onClick={() => handleGameClick(game)} >
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
            {recentGames.length > 0 && (
                <div className={styles.section}>
                    <div className={styles.headingTwo}>Recent played</div>
                    <div className={styles.gameList}>
                        {recentGames.map((game, idx) => (
                            <div className={styles.card}
                                key={`recent-${game.slug}-${idx}`}
                                onClick={() => handleGameClick(game)}
                            >
                                <Image
                                    src={game.image || game.thumbnail}
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
            )}
        </div >
    );
};

export default SearchDrawer;
