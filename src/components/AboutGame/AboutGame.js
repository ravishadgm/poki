'use client';

import GameDescription from '@/components/common/GameDescription/GameDescription';
import Images from '@/assets/images/index';

const gamesData = {
    'stupid-zombies': {
        name: 'Stupid Zombies',
        creator: 'MarketJS',
        rating: 4.3,
        votes: 478226,
        image: Images.Zombie,
        category: 'Puzzle Games',
        description: `Stupid Zombies is a puzzle zombie shooting game developed by MarketJS. In this game, you’ll fight against zombies by aiming correctly with your gun and shooting bullets with rebounds. Work on your angles to score the highest number of zombie kills in the least amount of bullets. Go ahead and demonstrate the power of your aim!`,
        howToPlay: 'Tap the screen to shoot',
        aboutCreator: 'Stupid Zombies is created by MarketJS. Play their other casual games on Poki:',
        creatorLinks: [
            { name: 'Power Badminton', url: '#' },
            { name: 'Ludo Hero', url: '#' },
            { name: 'Super Girl Story', url: '#' }
        ],
        tags: ['SKILL GAMES', 'MOUSE GAMES', 'ZOMBIE GAMES', 'PUZZLE GAMES', 'SHOOTING GAMES', 'PHYSICS GAMES', 'MOBILE GAMES']
    }
};

const AboutGame = ({ slug = 'stupid-zombies' }) => {
    const game = gamesData[slug];

    return game ? <GameDescription game={game} /> : <div>Game Not Found</div>;
};

export default AboutGame;
