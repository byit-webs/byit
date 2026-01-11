import { useState } from 'react';

export default function ProjectCarousel() {
  const [currDeg, setCurrDeg] = useState(0);

  const rotate = (direction) => {
    if (direction === 'next') {
      setCurrDeg(prev => prev - 90);
    } else {
      setCurrDeg(prev => prev + 90);
    }
  };

  const projects = [
    { title: "E-Commerce Tech", color: "from-blue-500 to-cyan-500" },
    { title: "Restaurante Gourmet", color: "from-orange-500 to-red-500" },
    { title: "Bufete Legal", color: "from-slate-700 to-slate-900" },
    { title: "Startup SaaS", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="w-full py-24 overflow-hidden relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl font-bold text-white mb-4">Proyectos Realizados</h2>
        <p className="text-gray-400">Resultados reales. Velocidad real.</p>
      </div>

      {/* AUMENTO DE TAMAÑO:
         - Altura del contenedor: h-[450px] móvil / h-[600px] PC
         - Tamaño tarjeta: w-[320px] móvil / w-[600px] PC
      */}
      <div className="relative w-full h-[450px] md:h-[600px] flex justify-center items-center perspective-1000">
        <div 
          className="relative w-[320px] md:w-[600px] h-[240px] md:h-[400px] preserve-3d transition-transform duration-700 ease-out"
          style={{ transform: `rotateY(${currDeg}deg)` }}
        >
          {projects.map((proj, index) => (
            <div 
              key={index}
              className="absolute inset-0 bg-[#080808] border border-white/10 rounded-xl p-4 shadow-2xl flex flex-col items-center justify-center gap-4 backface-hidden"
              style={{ 
                // Aumentada la profundidad Z para separar las tarjetas más grandes
                transform: `rotateY(${index * 90}deg) translateZ(300px)`, 
                // En PC la profundidad es aún mayor
                '@media (min-width: 768px)': { transform: `rotateY(${index * 90}deg) translateZ(450px)` }
              }}
            >
              {/* UI Ventana */}
              <div className="w-full h-6 bg-white/5 rounded-t-lg flex items-center px-2 gap-1.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              
              {/* Contenido Visual */}
              <div className={`w-full h-full rounded-lg bg-gradient-to-br ${proj.color} opacity-20 flex items-center justify-center relative overflow-hidden group`}>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                 <h3 className="text-3xl font-bold text-white drop-shadow-lg relative z-10">{proj.title}</h3>
              </div>
              
              <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="flex justify-center gap-8 mt-12">
        <button onClick={() => rotate('prev')} className="p-3 rounded-full bg-white/5 hover:bg-primary text-white transition-all hover:scale-110 border border-white/10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
        <button onClick={() => rotate('next')} className="p-3 rounded-full bg-white/5 hover:bg-primary text-white transition-all hover:scale-110 border border-white/10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        
        /* Media queries inline para que funcione el translateZ dinámico */
        @media (max-width: 768px) { 
            .preserve-3d > div { transform: rotateY(var(--tw-rotate-y)) translateZ(220px) !important; } 
        }
        @media (min-width: 769px) { 
            .preserve-3d > div { transform: rotateY(var(--tw-rotate-y)) translateZ(420px) !important; } 
        }
      `}</style>
    </div>
  );
}