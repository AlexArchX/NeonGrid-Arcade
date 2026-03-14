import { Search, Terminal } from 'lucide-react';

export function Header({ searchQuery, onSearchChange, onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b-4 border-white bg-[#050505] px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden brutal-border p-2 hover:bg-neon-cyan hover:text-black transition-colors">
          <Terminal className="w-6 h-6" />
        </button>
        <div className="hidden lg:flex items-center gap-3 text-neon-cyan">
          <Terminal className="w-8 h-8" />
          <span className="text-2xl font-black tracking-tighter uppercase">NeonGrid</span>
        </div>
      </div>

      <div className="flex-1 max-w-xl ml-8">
        <div className="relative brutal-border bg-black flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-neon-pink" />
          <input
            type="text"
            className="w-full bg-transparent py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 font-mono focus:outline-none focus:bg-zinc-900 transition-colors"
            placeholder="> SEARCH_GAMES..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
