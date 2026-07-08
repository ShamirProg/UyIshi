import { useState } from 'react';
import WorldRollCardsGame from './components/WorldRollCardsGame';
import AdminDashboardPanel from './components/AdminDashboardPanel';

export default function App() {
  const [view, setView] = useState('game'); 

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="bg-slate-800 p-2 flex justify-center gap-4 border-b border-slate-700 text-xs">
        <button 
          onClick={function() { setView('game'); }} 
          className={`px-3 py-1 rounded font-bold ${view === 'game' ? 'bg-amber-500 text-slate-900' : 'bg-slate-700'}`}
        >
          🎮 Game View
        </button>
        <button 
          onClick={function() { setView('admin'); }} 
          className={`px-3 py-1 rounded font-bold ${view === 'admin' ? 'bg-amber-500 text-slate-900' : 'bg-slate-700'}`}
        >
          🛠️ Admin Panel
        </button>
      </div>

      {view === 'game' ? <WorldRollCardsGame /> : <AdminDashboardPanel />}
    </div>
  );
}