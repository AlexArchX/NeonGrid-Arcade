import { useState, useMemo } from 'react';
import { games } from './data/games';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GameGrid } from './components/GameGrid';
import { GamePlayer } from './components/GamePlayer';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category));
    return Array.from(cats).sort();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedGame(null);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 lg:pl-80 flex flex-col min-h-screen">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (selectedGame) setSelectedGame(null);
          }}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-6 sm:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            {selectedGame ? (
              <GamePlayer 
                key="player" 
                game={selectedGame} 
                onBack={() => setSelectedGame(null)} 
              />
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-12 border-b-4 border-white pb-6">
                  <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
                    {selectedCategory === 'All' ? 'SYSTEM_CATALOG' : `${selectedCategory}_MODULES`}
                  </h1>
                  <p className="font-mono text-neon-cyan text-lg">
                    {searchQuery 
                      ? `> FILTERING_RESULTS: "${searchQuery}"` 
                      : '> INITIALIZING_UNBLOCKED_GAMES_PROTOCOL...'}
                  </p>
                </div>
                <GameGrid 
                  games={filteredGames} 
                  onGameSelect={setSelectedGame} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
