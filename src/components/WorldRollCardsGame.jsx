import { useState } from 'react';
import { RotateCcw, Shield, SkipForward } from 'lucide-react';

// O'yinni sinab ko'rish uchun tasodifiy chiqadigan soxta ma'lumotlar bazasi
const mockPoolData = [
  {
    country: "Brazil",
    year: 2002,
    availablePlayers: [
      { id: "b1", name: "Ronaldo", position: "ST", ovr: 94 },
      { id: "b2", name: "Ronaldinho", position: "CAM", ovr: 91 },
      { id: "b3", name: "Rivaldo", position: "LW", ovr: 90 }
    ]
  },
  {
    country: "France",
    year: 2018,
    availablePlayers: [
      { id: "f1", name: "K. Mbappé", position: "RW", ovr: 89 },
      { id: "f2", name: "A. Griezmann", position: "CAM", ovr: 88 },
      { id: "f3", name: "N. Kanté", position: "CM1", ovr: 89 }
    ]
  },
  {
    country: "Argentina",
    year: 2022,
    availablePlayers: [
      { id: "a1", name: "Lionel Messi", position: "RW", ovr: 93 },
      { id: "a2", name: "A. Di María", position: "LW", ovr: 87 },
      { id: "a3", name: "R. De Paul", position: "CM2", ovr: 85 }
    ]
  },
  {
    country: "Portugal",
    year: 2016,
    availablePlayers: [
      { id: "p1", name: "C. Ronaldo", position: "ST", ovr: 92 },
      { id: "p2", name: "Nani", position: "LW", ovr: 83 },
      { id: "p3", name: "Pepe", position: "CB1", ovr: 88 }
    ]
  }
];

export default function WorldRollCardsGame() {
  const [rollLimit, setRollLimit] = useState(15);
  const [currentRoll, setCurrentRoll] = useState(null); 
  const [teamOvr, setTeamOvr] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [squad, setSquad] = useState({
    GK: null, LB: null, CB1: null, CB2: null, RB: null,
    CM1: null, CM2: null, CAM: null, LW: null, ST: null, RW: null
  });

  // Jamoadagi o'yinchilarning o'rtacha reytingini (OVR) hisoblash
  function calculateTeamOvr(updatedSquad) {
    let totalScore = 0;
    let count = 0;
    const positions = Object.keys(updatedSquad);

    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      if (updatedSquad[pos] !== null) {
        totalScore = totalScore + updatedSquad[pos].ovr;
        count = count + 1;
      }
    }

    if (count === 0) return 0;
    return Math.round(totalScore / count);
  }

  // Tasodifiy davlat va yilni chiqarish
  function handleRoll() {
    const randomIndex = Math.floor(Math.random() * mockPoolData.length);
    setCurrentRoll(mockPoolData[randomIndex]);
  }

  // Tanlovni o'tkazib yuborish (1 ta imkoniyat kamayadi)
  function handleSkip() {
    if (rollLimit <= 0) {
      alert("Sizda roll imkoniyatlari tugadi!");
      return;
    }
    setRollLimit(rollLimit - 1);
    setCurrentRoll(null);
    setSelectedSlot(null);
  }

  // O'yinchini maydondagi tanlangan pozitsiyaga joylashtirish
  function handleSelectPlayer(player) {
    if (!selectedSlot) {
      alert("Iltimos, avval pastki yashil maydondan bitta bo'sh katakni (masalan: ST, LW yoki GK) tanlang!");
      return;
    }

    let newSquad = { ...squad };
    newSquad[selectedSlot] = player;
    setSquad(newSquad);

    // Umumiy OVRni qayta hisoblash
    const newOvr = calculateTeamOvr(newSquad);
    setTeamOvr(newOvr);
    
    // O'yinchi tanlangani uchun limitsiz roll davom etadi, ekran tozalanadi
    setCurrentRoll(null);
    setSelectedSlot(null);
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white p-4 font-sans selection:bg-amber-500">
      {/* Tepadagi ko'rsatkichlar paneli */}
      <div className="flex justify-between items-center bg-slate-800 p-3 rounded-xl border border-slate-700 mb-4 shadow-md">
        <div className="flex items-center gap-2">
          <RotateCcw className="text-amber-400 w-5 h-5 animate-pulse" />
          <span className="text-sm font-semibold text-slate-300">Rolls Left:</span>
          <span className="text-lg font-bold text-amber-400">{rollLimit}</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="text-emerald-400 w-5 h-5" />
          <span className="text-sm font-semibold text-slate-300">Team OVR:</span>
          <span className="text-xl font-black text-emerald-400 tracking-wide">{teamOvr}</span>
        </div>
      </div>

      {/* Taktik futbol maydoni (4-3-3) */}
      <div className="w-full aspect-[3/4] bg-gradient-to-b from-emerald-800 to-emerald-950 rounded-2xl p-4 relative shadow-inner border-2 border-emerald-600 mb-4 overflow-hidden">
        <div className="absolute inset-0 border border-white/10 m-2 pointer-events-none rounded-xl" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 pointer-events-none" />
        
        <div className="h-full flex flex-col justify-between relative z-10">
          {/* Hujumchilar */}
          <div className="flex justify-around">
            {['LW', 'ST', 'RW'].map((pos) => (
              <button 
                key={pos}
                onClick={function() { setSelectedSlot(pos); }}
                className={`w-16 h-20 rounded-lg flex flex-col items-center justify-center border text-xs transition ${selectedSlot === pos ? 'bg-amber-500/30 border-amber-400 scale-105' : 'bg-slate-900/60 border-slate-400'}`}
              >
                <span className="font-bold text-slate-400">{pos}</span>
                <span className="font-semibold text-amber-300 truncate max-w-[60px]">{squad[pos] ? squad[pos].name : 'Empty'}</span>
                {squad[pos] && <span className="text-[10px] bg-amber-500 text-slate-900 px-1 rounded font-black">{squad[pos].ovr}</span>}
              </button>
            ))}
          </div>

          {/* Yarim himoyachilar */}
          <div className="flex justify-around">
            {['CM1', 'CAM', 'CM2'].map((pos) => (
              <button 
                key={pos}
                onClick={function() { setSelectedSlot(pos); }}
                className={`w-16 h-20 rounded-lg flex flex-col items-center justify-center border text-xs transition ${selectedSlot === pos ? 'bg-amber-500/30 border-amber-400 scale-105' : 'bg-slate-900/60 border-slate-400'}`}
              >
                <span className="font-bold text-slate-400">{pos}</span>
                <span className="font-semibold text-amber-300 truncate max-w-[60px]">{squad[pos] ? squad[pos].name : 'Empty'}</span>
                {squad[pos] && <span className="text-[10px] bg-amber-500 text-slate-900 px-1 rounded font-black">{squad[pos].ovr}</span>}
              </button>
            ))}
          </div>

          {/* Himoyachilar */}
          <div className="flex justify-around">
            {['LB', 'CB1', 'CB2', 'RB'].map((pos) => (
              <button 
                key={pos}
                onClick={function() { setSelectedSlot(pos); }}
                className={`w-14 h-18 rounded-lg flex flex-col items-center justify-center border text-xs transition ${selectedSlot === pos ? 'bg-amber-500/30 border-amber-400 scale-105' : 'bg-slate-900/60 border-slate-400'}`}
              >
                <span className="font-bold text-slate-400">{pos}</span>
                <span className="font-semibold text-amber-300 truncate max-w-[55px]">{squad[pos] ? squad[pos].name : 'Empty'}</span>
                {squad[pos] && <span className="text-[10px] bg-amber-500 text-slate-900 px-1 rounded font-black">{squad[pos].ovr}</span>}
              </button>
            ))}
          </div>

          {/* Darvozabon */}
          <div className="flex justify-center">
            <button 
              onClick={function() { setSelectedSlot('GK'); }}
              className={`w-16 h-18 rounded-lg flex flex-col items-center justify-center border text-xs transition ${selectedSlot === 'GK' ? 'bg-amber-500/30 border-amber-400 scale-105' : 'bg-slate-900/60 border-slate-400'}`}
            >
              <span className="font-bold text-slate-400">GK</span>
              <span className="font-semibold text-amber-300 truncate max-w-[60px]">{squad.GK ? squad.GK.name : 'Empty'}</span>
              {squad.GK && <span className="text-[10px] bg-amber-500 text-slate-900 px-1 rounded font-black">{squad.GK.ovr}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Pastki harakatlar boshqaruv paneli */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        {!currentRoll ? (
          <button 
            onClick={handleRoll}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-900 py-3 rounded-xl font-black text-center text-lg shadow-lg tracking-wide transition"
          >
            ROLL NATION & YEAR
          </button>
        ) : (
          <div>
            <div className="text-center mb-3 bg-slate-900/50 py-2 rounded-lg border border-slate-700">
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400 block">Current Pool Result</span>
              <span className="text-xl font-black text-amber-400">{currentRoll.country}</span>
              <span className="text-sm bg-slate-700 text-slate-200 px-2 py-0.5 rounded-full ml-2 font-mono font-bold">{currentRoll.year}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {currentRoll.availablePlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={function() { handleSelectPlayer(player); }}
                  className="bg-slate-900 hover:bg-slate-950 p-2 rounded-lg border border-amber-500/40 hover:border-amber-400 flex flex-col items-center text-center transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full flex items-center justify-center text-slate-900 font-black text-xs shadow mb-1">
                    {player.ovr}
                  </div>
                  <span className="text-xs font-bold text-white block truncate w-full">{player.name}</span>
                  <span className="text-[10px] uppercase font-mono text-amber-400 font-bold mt-0.5">{player.position}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handleSkip}
              className="w-full bg-slate-700 hover:bg-slate-600 active:scale-95 text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <SkipForward className="w-4 h-4" /> Skip Selection (-1 Roll)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}