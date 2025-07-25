"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const RecentGamesContext = createContext();

export const useRecentGames = () => {
    const context = useContext(RecentGamesContext);
    if (!context) {
        throw new Error('useRecentGames must be used within a RecentGamesProvider----------------------');
    }
    return context;
};

export const RecentGamesProvider = ({ children }) => {
    const [recentGames, setRecentGames] = useState([]);

    useEffect(() => {
        const savedRecentGames = localStorage.getItem('recentGames');
        if (savedRecentGames) {
            try {
                setRecentGames(JSON.parse(savedRecentGames));
            } catch (error) {
                console.error('Error parsing recent games from localStorage-------------:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (recentGames.length > 0) {
            localStorage.setItem('recentGames', JSON.stringify(recentGames));
        }
    }, [recentGames]);

    const addToRecentGames = (game) => {
        setRecentGames(prevRecentGames => {
            const filteredGames = prevRecentGames.filter(
                recentGame => recentGame.slug !== game.slug
            );

            const updatedGames = [game, ...filteredGames].slice(0, 2);

            return updatedGames;
        });
    };

    const clearRecentGames = () => {
        setRecentGames([]);
        localStorage.removeItem('recentGames');
    };

    return (
        <RecentGamesContext.Provider value={{
            recentGames,
            addToRecentGames,
            clearRecentGames
        }}>
            {children}
        </RecentGamesContext.Provider>
    );
};