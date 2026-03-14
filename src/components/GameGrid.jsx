import { GameCard } from './GameCard';
import { motion } from 'motion/react';

export function GameGrid({ games, onGameSelect }) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 brutal-border bg-zinc-900 text-center">
        <div className="text-6xl mb-6">ðŸ•¹ï¸</div>
        <h2 className="text-2xl font-bold uppercase text-neon-pink mb-2">ERR_NO_GAMES_FOUND</h2>
        <p className="font-mono text-zinc-400">Adjust your search parameters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <GameCard game={game} onClick={onGameSelect} />
        </motion.div>
      ))}
    </div>
  );
}
