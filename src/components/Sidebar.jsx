import { Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Sidebar({ categories, selectedCategory, onSelectCategory, isOpen, onClose }) {
  const sidebarContent = (
    <div className="flex h-full flex-col border-r-4 border-white bg-[#050505] p-6">
      <div className="flex items-center justify-between mb-12 lg:hidden">
        <div className="flex items-center gap-3 text-neon-cyan">
          <Terminal className="w-8 h-8" />
          <span className="text-2xl font-black tracking-tighter uppercase">NeonGrid</span>
        </div>
        <button onClick={onClose} className="brutal-border p-2 hover:bg-neon-pink hover:text-black transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="font-mono text-neon-yellow text-sm mb-4 uppercase tracking-widest">
        // Categories
      </div>

      <nav className="flex-1 space-y-3">
        {['All', ...categories].map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => {
                onSelectCategory(category);
                onClose();
              }}
              className={`
                w-full text-left px-4 py-3 font-mono uppercase text-sm brutal-border transition-all
                ${isSelected 
                  ? 'bg-neon-cyan text-black brutal-shadow-pink translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-transparent text-white hover:bg-white hover:text-black'}
              `}
            >
              {isSelected ? '> ' : ''}{category}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto brutal-border p-4 bg-zinc-900">
        <div className="font-mono text-neon-pink text-xs uppercase mb-2">System Status</div>
        <div className="font-mono text-white text-xs">ONLINE / UNBLOCKED</div>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-80 lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
        {sidebarContent}
      </div>
    </>
  );
}
