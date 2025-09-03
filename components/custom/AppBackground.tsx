import { ReactNode } from "react";

interface AppBackgroundProps {
  children: ReactNode;
}

export default function AppBackground({ children }: AppBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-indigo-950 to-purple-950 overflow-hidden">
    {/* Stars */}
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 3}s`
          }}
        />
      ))}
    </div>
    
    {/* Nebula clouds */}
    <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    
    {/* Shooting stars */}
    {/* <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-white to-transparent animate-ping delay-2000"></div>
    <div className="absolute bottom-40 right-20 w-24 h-px bg-gradient-to-r from-yellow-200 to-transparent animate-ping delay-3000"></div> */}
    
    <div className="relative z-10">{children}</div>
  </div>
  );
}