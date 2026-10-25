import React, { useState } from 'react';

interface MinecraftButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'green' | 'teal' | 'dark' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const MinecraftButton: React.FC<MinecraftButtonProps> = ({
  children,
  onClick,
  variant = 'teal',
  size = 'md',
  className = '',
  icon,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isSwinging, setIsSwinging] = useState(false);

  const handleClick = () => {
    // Generate Minecraft-style block particles
    const colors = variant === 'green'
      ? ['#10B981', '#059669', '#34D399', '#065F46']
      : variant === 'teal'
      ? ['#14B8A6', '#2DD4BF', '#0D9488', '#042F2E']
      : variant === 'amber'
      ? ['#F59E0B', '#FBBF24', '#D97706', '#78350F']
      : ['#334155', '#475569', '#64748B', '#1E293B'];

    const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 40 - 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
    setIsSwinging(true);

    setTimeout(() => setParticles([]), 700);
    setTimeout(() => setIsSwinging(false), 400);

    if (onClick) onClick();
  };

  const variantStyles = {
    teal: 'bg-[#0D9488] hover:bg-[#14B8A6] text-white border-t-2 border-l-2 border-[#5EEAD4] shadow-[0_5px_0_0_#042F2E,0_8px_16px_rgba(13,148,136,0.35)]',
    green: 'bg-[#10B981] hover:bg-[#34D399] text-white border-t-2 border-l-2 border-[#6EE7B7] shadow-[0_5px_0_0_#064E3B,0_8px_16px_rgba(16,185,129,0.35)]',
    dark: 'bg-[#1E293B] hover:bg-[#334155] text-white border-t-2 border-l-2 border-[#475569] shadow-[0_5px_0_0_#020617,0_8px_16px_rgba(0,0,0,0.3)]',
    amber: 'bg-[#D97706] hover:bg-[#F59E0B] text-white border-t-2 border-l-2 border-[#FCD34D] shadow-[0_5px_0_0_#78350F,0_8px_16px_rgba(217,119,6,0.35)]',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-5 py-2.5 text-sm rounded-lg',
    lg: 'px-8 py-3.5 text-base rounded-xl font-bold',
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={`relative inline-flex items-center justify-center gap-2 font-display font-bold tracking-wide uppercase transition-all duration-75 active:translate-y-1 active:shadow-[0_1px_0_0_#042F2E] cursor-pointer select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      >
        {icon && (
          <span className={`inline-block transition-transform duration-200 ${isSwinging ? '-rotate-45 scale-125' : ''}`}>
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>

      {/* Minecraft Block Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute pointer-events-none w-2.5 h-2.5 rounded-[1px] animate-voxel-pop"
          style={{
            backgroundColor: p.color,
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            boxShadow: '1px 1px 0 rgba(0,0,0,0.4)',
          }}
        />
      ))}
    </div>
  );
};
