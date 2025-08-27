"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import styles from "./styles.module.scss";
import { Search, X, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecentGames } from "@/contexts/RecentGamesContext";
import { getGames } from "@/services/gameService";
import Images from "../../../public/images/index";
import APP_CONFIG from "@/utils/config";

const SearchDrawer = ({ setOpenDrawer }) => {
  const router = useRouter();
  const { recentGames, addToRecentGames } = useRecentGames();

  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const debounceTimer = useRef(null);
  const didLogRef = useRef({
    fetchGames: false,
    debounce: false,
    categories: false,
    filter: false,
  });

  useEffect(() => {
    const fetchGames = async () => {
      if (!didLogRef.current.fetchGames) {
        didLogRef.current.fetchGames = true;
      }

      try {
        const data = await getGames();
        setGames(data || []);
      } catch (error) {
        setGames([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    if (!didLogRef.current.debounce) {
      didLogRef.current.debounce = true;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (searchQuery !== debouncedQuery) setIsSearching(true);

    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  const categories = useMemo(() => {
    if (!didLogRef.current.categories) {
      didLogRef.current.categories = true;
    }

    const unique = [...new Set(games.map((g) => g.category))];
    return unique.map((slug) => ({
      slug,
      title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    }));
  }, [games]);

  const filteredGames = useMemo(() => {
    if (!didLogRef.current.filter) {
      didLogRef.current.filter = true;
    }

    let result = [...games];

    if (selectedCategory) {
      const catSlug = categories.find(
        (c) => c.title === selectedCategory
      )?.slug;
      result = result.filter((g) => g.category === catSlug);
    }

    if (debouncedQuery.trim() && debouncedQuery !== selectedCategory) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q)
      );
    }

    const seen = new Set();
    return result.filter((g) => {
      if (seen.has(g.slug)) return false;
      seen.add(g.slug);
      return true;
    });
  }, [games, debouncedQuery, selectedCategory, categories]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (selectedCategory && val !== selectedCategory) setSelectedCategory("");
  };

  const handleCategoryClick = (title) => {
    const isSame = selectedCategory === title;
    setSelectedCategory(isSame ? "" : title);
    setSearchQuery(isSame ? "" : title);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setDebouncedQuery("");
    setIsSearching(false);
  };

  const handleGameClick = (game) => {
    router.push(`/home/${game.slug}`);
    setTimeout(() => {
      addToRecentGames({
        title: game.title,
        slug: game.slug,
        image: game.thumbnail,
        video: game.video,
        thumbnail: game.thumbnail,
      });
    }, 600);
  };

  const placeholder = selectedCategory || "What are you playing today?";
  const hasFilters = debouncedQuery || selectedCategory;
  const popularGames = games.slice(0, 6);

  if (isLoading) {
    return (
      <div className={styles.drawer}>
        <div className={styles.nav}>
          <button
            className={styles.closeBtn}
            onClick={() => setOpenDrawer(false)}
          >
            <ChevronLeft size={30} />
          </button>
        </div>
        <div className={styles.loading}>Loading games...</div>
      </div>
    );
  }

  return (
    <div className={styles.drawer}>
      <div className={styles.nav}>
        <div className={styles.searchContainer}>
          <div className={styles.iconLeft} onClick={() => setOpenDrawer(false)}>
            <div className={styles.mobileCloseIcon}>
              <ChevronLeft size={24} />
            </div>
            <Image
              src={Images.SmallLogo}
              alt={`${APP_CONFIG.appName} Logo`}
              width={38}
              height={38}
            />
          </div>

          <input
            type="text"
            placeholder={placeholder}
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div
            className={styles.iconRight}
            onClick={searchQuery ? handleClearSearch : undefined}
          >
            {isSearching ? (
              <div className={styles.spinner} />
            ) : searchQuery ? (
              <X size={28} />
            ) : (
              <Search size={28} />
            )}
          </div>
        </div>
        <button
          className={styles.closeBtn}
          onClick={() => setOpenDrawer(false)}
        >
          <ChevronLeft size={30} />
        </button>
      </div>

      {/* Category Filters */}
      <div className={styles.filterButtons}>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.title)}
            className={
              selectedCategory === cat.title ? styles.activeFilter : ""
            }
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Filtered Games */}
      {hasFilters && (
        <div className={styles.section}>
          <div className={styles.heading}>
            {filteredGames.length > 0 ? (
              `${filteredGames.length} games found`
            ) : (
              <div className={styles.noGameFound}>
                <p className={styles.noResultText}>
                  Hmm, nothing is coming up for that.
                </p>
                <p className={styles.noResultSubText}>
                  Try a different search or play one of these great games.
                </p>
              </div>
            )}
          </div>
          <div className={styles.gameList}>
            {filteredGames.map((game) => (
              <GameCard
                key={`filtered-${game.slug}`}
                game={game}
                onClick={handleGameClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popular Games */}
      {!hasFilters && (
        <div className={styles.section}>
          <div className={styles.heading}>Popular this week</div>
          <div className={styles.gameList}>
            {popularGames.map((game, idx) => (
              <GameCard key={idx} game={game} onClick={handleGameClick} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Games */}
      {!hasFilters && recentGames.length > 0 && (
        <div className={styles.section}>
          <div className={styles.headingTwo}>Recently played</div>
          <div className={styles.gameList}>
            {recentGames.map((game, idx) => (
              <GameCard
                key={idx}
                game={{
                  ...game,
                  thumbnail: game.image || game.thumbnail,
                }}
                onClick={handleGameClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDrawer;

const GameCard = ({ game, onClick }) => (
  <div className={styles.card} onClick={() => onClick(game)}>
    {game.thumbnail && (
      <Image
        src={game.thumbnail}
        alt={game.title}
        className={styles.image}
        width={100}
        height={100}
        loading="lazy"
      />
    )}
    {game.video && (
      <video
        src={game.video}
        className={styles.video}
        muted
        loop
        autoPlay
        playsInline
        preload="none"
      />
    )}
    <div className={styles.gradientOverlay}></div>
    <p>{game.title}</p>
  </div>
);
