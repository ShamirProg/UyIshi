import { useState } from 'react';
import { Database, Calendar, Users } from 'lucide-react';

export default function AdminDashboardPanel() {
  const [activeTab, setActiveTab] = useState('cards');
  const [newCard, setNewCard] = useState({ name: '', position: 'ST', country: '', year: 2026, ovr: 80 });

  // Haqiqiy API so'rovisiz lokal simulyatsiya qilish
  function submitCreateCard(e) {
    e.preventDefault();
    alert("Muvaffaqiyatli bajarildi!\nO'yinchi: " + newCard.name + " (" + newCard.ovr + ") muvaffaqiyatli saqlandi.");
    setNewCard({ name: '', position: 'ST', country: '', year: 2026, ovr: 80 });
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
        <h1 className="text-lg font-black tracking-wide text-amber-400 flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-400" /> WORLDROLLCARDS Admin System Panel
        </h1>
        <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full font-bold">Authorized Mode Only</span>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'cards' && (
          <section className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-md">
            <h2 className="text-md font-bold mb-3 text-slate-300 border-b border-slate-800 pb-2">Create New Card Entry (Database CRUD)</h2>
            <form onSubmit={submitCreateCard} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Player Real Name</label>
                <input 
                  type="text" value={newCard.name} 
                  onChange={function(e) { setNewCard({ ...newCard, name: e.target.value }); }}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none focus:border-amber-500" 
                  placeholder="e.g. Lionel Messi" required 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">National Country Identity</label>
                  <input 
                    type="text" value={newCard.country}
                    onChange={function(e) { setNewCard({ ...newCard, country: e.target.value }); }}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none" 
                    placeholder="Argentina" required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Historic Year Parameter</label>
                  <input 
                    type="number" value={newCard.year}
                    onChange={function(e) { setNewCard({ ...newCard, year: parseInt(e.target.value) || 2026 }); }}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Position Assignment</label>
                  <select 
                    value={newCard.position} 
                    onChange={function(e) { setNewCard({ ...newCard, position: e.target.value }); }}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none"
                  >
                    <option value="GK">GK</option>
                    <option value="LB">LB</option>
                    <option value="CB">CB</option>
                    <option value="RB">RB</option>
                    <option value="CM">CM</option>
                    <option value="CAM">CAM</option>
                    <option value="LW">LW</option>
                    <option value="ST">ST</option>
                    <option value="RW">RW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Overall Power Score (OVR)</label>
                  <input 
                    type="number" min="1" max="99" value={newCard.ovr}
                    onChange={function(e) { setNewCard({ ...newCard, ovr: parseInt(e.target.value) || 80 }); }}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none" 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-amber-500 text-slate-950 font-black text-sm py-2 rounded shadow hover:bg-amber-400 tracking-wider mt-2 transition">
                COMMIT CARD REPOSITORY SAVED ENTRY
              </button>
            </form>
          </section>
        )}

        {activeTab === 'events' && (
          <section className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-md">
            <h2 className="text-md font-bold mb-3 text-slate-300 border-b border-slate-800 pb-2">Campaign Event Configuration Panel</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Event Campaign Title" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm" />
              <textarea placeholder="Event Description Banner Notice Text details..." className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm h-20" />
              <button className="w-full bg-emerald-500 text-slate-950 font-bold text-sm py-2 rounded">LAUNCH LIVE EVENT SEASON</button>
            </div>
          </section>
        )}

        {activeTab === 'users' && (
          <section className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-md">
            <h2 className="text-md font-bold mb-3 text-slate-300 border-b border-slate-800 pb-2">User Operation Audit Log & Restrictions Management</h2>
            <div className="border border-slate-800 rounded divide-y divide-slate-800 text-xs">
              <div className="p-2 flex justify-between items-center bg-slate-950/40">
                <span>User ID: 89124 (cr7_master) — OVR: 95</span>
                <button className="bg-red-500 text-white font-bold px-2 py-0.5 rounded scale-90">BAN USER</button>
              </div>
              <div className="p-2 flex justify-between items-center bg-slate-950/40">
                <span>User ID: 52144 (messi_fan) — OVR: 94</span>
                <button className="bg-red-500 text-white font-bold px-2 py-0.5 rounded scale-90">BAN USER</button>
              </div>
            </div>
          </section>
        )}
      </main>

      <nav className="bg-slate-900 border-t border-slate-800 p-2 flex justify-around items-center shrink-0">
        <button 
          onClick={function() { setActiveTab('cards'); }} 
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${activeTab === 'cards' ? 'text-amber-400' : 'text-slate-400'}`}
        >
          <Database className="w-5 h-5" /> Cards Catalog
        </button>
        <button 
          onClick={function() { setActiveTab('events'); }} 
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${activeTab === 'events' ? 'text-amber-400' : 'text-slate-400'}`}
        >
          <Calendar className="w-5 h-5" /> Events Setup
        </button>
        <button 
          onClick={function() { setActiveTab('users'); }} 
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${activeTab === 'users' ? 'text-amber-400' : 'text-slate-400'}`}
        >
          <Users className="w-5 h-5" /> Users List
        </button>
      </nav>
    </div>
  );
}