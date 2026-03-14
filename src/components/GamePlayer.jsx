import { ArrowLeft, Maximize2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';

export function GamePlayer({ game, onBack }) {
  const iframeRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full max-w-7xl mx-auto w-full"
    >
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 brutal-border bg-white text-black px-4 py-2 font-mono text-sm uppercase font-bold hover:bg-neon-cyan transition-colors brutal-shadow-pink"
        >
          <ArrowLeft className="w-4 h-4" />
          Return
        </button>
        
        <div className="flex items-center gap-4">
          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 brutal-border bg-[#050505] text-white px-4 py-2 font-mono text-sm uppercase hover:bg-neon-yellow hover:text-black transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Popout
          </a>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 brutal-border bg-neon-pink text-black px-4 py-2 font-mono text-sm uppercase font-bold hover:bg-white transition-colors brutal-shadow-cyan"
          >
            <Maximize2 className="w-4 h-4" />
            Fullscreen
          </button>
        </div>
      </div>

      <div className="brutal-border bg-black w-full h-[75vh] min-h-[500px] relative brutal-shadow-cyan mb-8">
        <iframe
          ref={iframeRef}
          src={game.url}
          title={game.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; gamepad"
          allowFullScreen
        ></iframe>
      </div>

      <div className="brutal-border bg-zinc-900 p-8">
        <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{game.title}</h1>
            <div className="font-mono text-neon-cyan text-sm uppercase tracking-widest">
              // {game.category}
            </div>
          </div>
        </div>
        
        <p className="text-zinc-300 font-mono text-lg max-w-3xl leading-relaxed mb-8">
          {game.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {game.tags.map(tag => (
            <span key={tag} className="px-3 py-1 brutal-border text-neon-yellow font-mono text-xs uppercase">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
