"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useRecentGames } from "@/contexts/RecentGamesContext";
import { ChevronLeft } from 'lucide-react';
import Images from "../../../public/images/index";
import { useRouter } from "next/navigation";
import { games, filterCategories } from "@/dataStore/categories";

const SearchDrawer = ({ setOpenDrawer }) => {
    const { recentGames, addToRecentGames } = useRecentGames();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (searchQuery && searchQuery !== debouncedSearchQuery) {
            setIsSearching(true);
        }

        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
            setIsSearching(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery]);


    const getFilteredGames = () => {
        let filtered = games;

        if (selectedCategory) {
            filtered = filtered.filter(game =>
                game.category?.toLowerCase() === selectedCategory.toLowerCase() ||
                game.tags?.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
            );
        }

        if (debouncedSearchQuery.trim()) {
            filtered = filtered.filter(game =>
                game.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                game.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                game.tags?.some(tag => tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
            );
        }

        const uniqueGamesMap = new Map();
        filtered.forEach(game => {
            if (!uniqueGamesMap.has(game.slug)) {
                uniqueGamesMap.set(game.slug, game);
            }
        });

        return Array.from(uniqueGamesMap.values());
    };


    const filteredGames = getFilteredGames();

    const handleCategoryClick = (categoryTitle) => {
        setSelectedCategory(categoryTitle);
        setSearchQuery(categoryTitle);
        setDebouncedSearchQuery(categoryTitle);
        setIsSearching(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (selectedCategory && e.target.value !== selectedCategory) {
            setSelectedCategory("");
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setDebouncedSearchQuery("");
        setSelectedCategory("");
        setIsSearching(false);
    };

    const getPlaceholder = () => {
        if (selectedCategory) {
            return selectedCategory;
        }
        return "What are you playing today?";
    };

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
                        placeholder={getPlaceholder()}
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div className={styles.iconRight} onClick={searchQuery ? handleClearSearch : undefined}>
                        {isSearching ? (
                            <div className={styles.spinner}></div>
                        ) : searchQuery ? (
                            <X size={28} />
                        ) : (
                            <Search size={28} />
                        )}
                    </div>
                </div>
                <div>
                    <button className={styles.closeBtn} onClick={() => setOpenDrawer(false)}>
                        <ChevronLeft size={30} />
                    </button>
                </div>
            </div>

            <div className={styles.filterButtons}>
                {filterCategories.map((category, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleCategoryClick(category.title)}
                        className={selectedCategory === category.title ? styles.activeFilter : ''}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            {(debouncedSearchQuery || selectedCategory) && (
                <div className={styles.section}>
                    <div className={styles.heading}>
                        {filteredGames.length > 0
                            ? `${filteredGames.length} games found`
                            : (
                                <div className={styles.noGameFound}>
                                    <p className={styles.noResultText}>Hmm, nothing’s coming up for that.</p>
                                    <p className={styles.noResultSubText}>Try a different search or play one of these great games.</p>
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.gameList}>
                        {filteredGames.map((game, idx) => (
                            <div className={styles.card} key={idx} onClick={() => handleGameClick(game)}>
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
            )}

            {!debouncedSearchQuery && !selectedCategory && (
                <div className={styles.section}>
                    <div className={styles.heading}>Popular this week</div>
                    <div className={styles.gameList}>
                        {games.map((game, idx) => (
                            <div className={styles.card} key={idx} onClick={() => handleGameClick(game)}>
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
            )}

            {!debouncedSearchQuery && !selectedCategory && recentGames.length > 0 && (
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
