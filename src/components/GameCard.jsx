import { Play } from 'lucide-react';
import { motion } from 'motion/react';

export function GameCard({ game, onClick }) {
  return (
    <motion.div
      whileHover={{ x: -4, y: -4 }}
      whileTap={{ x: 0, y: 0 }}
      className="group relative flex flex-col brutal-border bg-[#050505] cursor-pointer transition-shadow hover:brutal-shadow-cyan"
      onClick={() => onClick(game)}
    >
      <div className="aspect-[4/3] w-full border-b-2 border-white relative overflow-hidden bg-zinc-900">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/seed/${game.id}/400/300`;
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center mix-blend-overlay">
        </div>
        <div className="absolute bottom-4 right-4 brutal-border bg-neon-yellow text-black p-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
          <Play className="w-6 h-6 fill-current" />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-xl uppercase tracking-tight">{game.title}</h3>
          <span className="font-mono text-xs bg-white text-black px-2 py-1 uppercase font-bold">
            {game.category}
          </span>
        </div>
        <p className="text-sm text-zinc-400 font-mono line-clamp-2 mt-auto">{game.description}</p>
      </div>
    </motion.div>
  );
}
