import React, { useState } from 'react';
import {
  FileCode,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Zap,
  EyeOff,
  Hammer,
  GitFork,
  BarChart3,
  Sun,
  Moon,
  Settings,
  Plus,
  Minus,
  Crosshair,
  Sparkles,
} from 'lucide-react';

interface BuildingNode {
  id: string;
  name: string;
  district: string;
  filePath: string;
  lines: number;
  imports: number;
  fanIn: number;
  status: 'hub' | 'normal' | 'warning';
  statusBadge: string;
  warningMessage?: string;
  badgeColor: string;
  heightPx: number;
  spriteUrl: string;
  x: number;
  y: number;
}

// User-perfected non-overlapping layout coordinates
const BUILDINGS: BuildingNode[] = [
  {
    id: 'src-ext',
    name: 'src/extension.ts',
    district: 'src',
    filePath: 'src/extension.ts',
    lines: 480,
    imports: 14,
    fanIn: 22,
    status: 'hub',
    statusBadge: 'CORE HUB',
    badgeColor: '#8B5CF6',
    heightPx: 92,
    spriteUrl: '/assets/sprites/buildings/bld_office_tall_blue_a.png',
    x: 361,
    y: 145,
  },
  {
    id: 'src-tests',
    name: 'tests/suite/extension.test.ts',
    district: 'tests',
    filePath: 'tests/suite/extension.test.ts',
    lines: 240,
    imports: 7,
    fanIn: 3,
    status: 'normal',
    statusBadge: 'PASS (59/59)',
    badgeColor: '#0284C7',
    heightPx: 68,
    spriteUrl: '/assets/sprites/buildings/bld_firestation_a.png',
    x: 309,
    y: 175,
  },
  {
    id: 'src-layout',
    name: 'src/layout/engine.ts',
    district: 'layout',
    filePath: 'src/layout/engine.ts',
    lines: 340,
    imports: 8,
    fanIn: 9,
    status: 'normal',
    statusBadge: 'NORMAL',
    badgeColor: '#3B82F6',
    heightPx: 72,
    spriteUrl: '/assets/sprites/buildings/bld_house_tall_blue_a.png',
    x: 324,
    y: 257,
  },
  {
    id: 'src-utils',
    name: 'src/utils/metrics.ts',
    district: 'utils',
    filePath: 'src/utils/metrics.ts',
    lines: 185,
    imports: 4,
    fanIn: 12,
    status: 'normal',
    statusBadge: 'NORMAL',
    badgeColor: '#06B6D4',
    heightPx: 70,
    spriteUrl: '/assets/sprites/buildings/bld_office_medium_blue_a.png',
    x: 388,
    y: 293,
  },
  {
    id: 'src-analysis',
    name: 'src/analysis/adapters.ts',
    district: 'analysis',
    filePath: 'src/analysis/adapters.ts',
    lines: 390,
    imports: 6,
    fanIn: 11,
    status: 'normal',
    statusBadge: 'NORMAL',
    badgeColor: '#EF4444',
    heightPx: 76,
    spriteUrl: '/assets/sprites/buildings/bld_apartments_brickbrown_a.png',
    x: 382,
    y: 205,
  },
  {
    id: 'bugtown-err',
    name: 'demos/bugtown/parser.py',
    district: 'bugtown',
    filePath: 'demos/bugtown/parser.py',
    lines: 160,
    imports: 2,
    fanIn: 1,
    status: 'warning',
    statusBadge: 'L42 ERROR',
    warningMessage: 'Line 42: Indentation mismatch [masked parser]',
    badgeColor: '#DC2626',
    heightPx: 64,
    spriteUrl: '/assets/sprites/buildings/bld_clinic_a_damaged.png',
    x: 443,
    y: 241,
  },
  {
    id: 'src-webview',
    name: 'src/webview/client.ts',
    district: 'webview',
    filePath: 'src/webview/client.ts',
    lines: 420,
    imports: 5,
    fanIn: 7,
    status: 'normal',
    statusBadge: 'NORMAL',
    badgeColor: '#10B981',
    heightPx: 70,
    spriteUrl: '/assets/sprites/buildings/bld_apartments_brickwhite_a.png',
    x: 191,
    y: 187,
  },
];

interface PropNode {
  id: string;
  x: number;
  y: number;
  spriteUrl: string;
  widthPx: number;
  heightPx: number;
}

const PROPS: PropNode[] = [
  { id: 'pine-1', x: 420, y: 135, spriteUrl: '/assets/sprites/props/prop_tree_pine_tall.png', widthPx: 30, heightPx: 42 },
  { id: 'pine-2', x: 490, y: 195, spriteUrl: '/assets/sprites/props/prop_tree_pine_medium.png', widthPx: 26, heightPx: 36 },
  { id: 'tree-1', x: 245, y: 155, spriteUrl: '/assets/sprites/props/prop_tree_common_large.png', widthPx: 32, heightPx: 40 },
  { id: 'tree-2', x: 260, y: 265, spriteUrl: '/assets/sprites/props/prop_tree_common_large.png', widthPx: 30, heightPx: 38 },
  { id: 'flower-1', x: 350, y: 220, spriteUrl: '/assets/sprites/props/prop_flowers_pink.png', widthPx: 18, heightPx: 18 },
  { id: 'flower-2', x: 415, y: 260, spriteUrl: '/assets/sprites/props/prop_flowers_yellow.png', widthPx: 18, heightPx: 18 },
  { id: 'lamp-1', x: 335, y: 165, spriteUrl: '/assets/sprites/props/prop_lightpole_a.png', widthPx: 14, heightPx: 30 },
  { id: 'lamp-2', x: 355, y: 245, spriteUrl: '/assets/sprites/props/prop_lightpole_a.png', widthPx: 14, heightPx: 30 },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const HeroIsometricScene: React.FC = () => {
  const [showRelations, setShowRelations] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [zoom, setZoom] = useState(0.95);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingNode>(BUILDINGS[4]); // Default: src/analysis/adapters.ts
  const [buildKey, setBuildKey] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Trigger Minecraft block drop-in rebuild animation
  const handleBuildCity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBuildKey((prev) => prev + 1);

    const colors = ['#10B981', '#34D399', '#059669', '#FBBF24', '#38BDF8'];
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 70,
      y: (Math.random() - 0.5) * 50 - 15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 700);

    setToastMessage('🔨 City compiled in 6.4ms · 7 modules placed');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.8));
  const handleZoomReset = () => setZoom(0.95);

  // Quick lookup helper for relations
  const bldMap = Object.fromEntries(BUILDINGS.map((b) => [b.id, b]));

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      {/* Outer Card Container */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm overflow-hidden transition-all duration-300">
        
        {/* Top Header Bar with Clean Aligned Action Controls */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-100 bg-white/95 relative z-40 gap-2">
          {/* Left: Brand + Repo Name (Never truncated) */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-slate-200/50">
              <img
                src="/assets/brand/icon.png"
                alt="CodeTown"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span className="font-display font-bold text-foreground text-xs sm:text-sm tracking-tight whitespace-nowrap">
                CodeTown
              </span>
              <span className="text-slate-300 font-light text-xs hidden sm:inline">|</span>
              <span className="font-mono text-[11px] sm:text-xs text-muted-foreground hidden sm:flex items-center gap-1 whitespace-nowrap">
                repo: <span className="text-emerald-500 font-bold">codetown</span>
              </span>
            </div>
          </div>

          {/* Right: Interactive Top Bar Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Build City Minecraft-style Button */}
            <div className="relative inline-block">
              <button
                onClick={handleBuildCity}
                className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-teal hover:bg-teal-600 active:scale-95 text-white font-display font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                title="Drop in buildings with Minecraft block animations"
              >
                <Hammer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Build City</span>
                <span className="sm:hidden">Build</span>
              </button>

              {/* Minecraft Particles Burst */}
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="absolute pointer-events-none w-2 h-2 rounded-[1px] animate-voxel-pop z-50"
                  style={{
                    backgroundColor: p.color,
                    left: `calc(50% + ${p.x}px)`,
                    top: `calc(50% + ${p.y}px)`,
                    boxShadow: '1px 1px 0 rgba(0,0,0,0.3)',
                  }}
                />
              ))}
            </div>

            {/* Relations Toggle Button */}
            <button
              onClick={() => setShowRelations(!showRelations)}
              className={`px-2 sm:px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                showRelations
                  ? 'bg-slate-100 text-teal-600 border-teal/40 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Dependency Lines"
            >
              <GitFork className="w-3.5 h-3.5 text-teal" />
              <span className="hidden sm:inline">Relations</span>
            </button>

            {/* Stats Toggle Button */}
            <button
              onClick={() => setShowStats(!showStats)}
              className={`px-2 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                showStats
                  ? 'bg-slate-100 text-foreground border-slate-300 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Stat Badges"
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden md:inline">Stats</span>
            </button>

            {/* Day / Night Segmented Toggle */}
            <div
              onClick={() => setIsNight(!isNight)}
              className="flex items-center p-0.5 rounded-lg border border-slate-200 bg-slate-100 cursor-pointer shadow-inner"
              title={isNight ? 'Switch to Day Mode' : 'Switch to Cyberpunk Night Mode'}
            >
              <div
                className={`p-1 sm:p-1.5 rounded-md transition-all ${
                  !isNight ? 'bg-amber-100 text-amber-600 shadow-xs' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div
                className={`p-1 sm:p-1.5 rounded-md transition-all ${
                  isNight ? 'bg-slate-900 text-teal shadow-xs' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            {/* Settings Gear */}
            <button
              onClick={() => {
                setToastMessage('⚙️ CodeTown Layout Engine: 2:1 Isometric · Zero Overlap');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="p-1.5 sm:p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              title="CodeTown Engine Info"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs px-4 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Isometric Viewport */}
        <div
          className={`relative w-full h-[330px] sm:h-[370px] lg:h-[390px] overflow-hidden flex items-center justify-center transition-colors duration-500 ${
            isNight
              ? 'bg-gradient-to-b from-[#060A14] via-[#091122] to-[#04070D]'
              : 'bg-gradient-to-b from-[#F0FDF4] via-[#F8FAFC] to-[#E2E8F0]'
          }`}
        >
          {/* Zoomable & Animatable Island Canvas */}
          <div
            key={buildKey}
            className={`relative w-[660px] h-[430px] flex-shrink-0 transition-transform duration-300 ease-out origin-center ${
              buildKey > 0 ? 'animate-island-build' : ''
            }`}
            style={{
              transform: `scale(${zoom})`,
            }}
          >
            {/* SVG Base: Clean Grass Island Platform & Paved Roads */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 660 430"
            >
              <defs>
                {/* Grass Surface Gradient */}
                <linearGradient id="islandGrass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isNight ? '#14532D' : '#34D399'} />
                  <stop offset="50%" stopColor={isNight ? '#0F4424' : '#22C55E'} />
                  <stop offset="100%" stopColor={isNight ? '#052E16' : '#15803D'} />
                </linearGradient>

                {/* Left Cliff Shading */}
                <linearGradient id="cliffLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isNight ? '#29180C' : '#854D0E'} />
                  <stop offset="60%" stopColor={isNight ? '#1E1209' : '#713F12'} />
                  <stop offset="100%" stopColor={isNight ? '#0C0603' : '#451A03'} />
                </linearGradient>

                {/* Right Cliff Shading */}
                <linearGradient id="cliffRight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isNight ? '#1C1109' : '#78350F'} />
                  <stop offset="60%" stopColor={isNight ? '#140B05' : '#5E2B08'} />
                  <stop offset="100%" stopColor={isNight ? '#080402' : '#3B1302'} />
                </linearGradient>
              </defs>

              {/* 1. Lush Emerald Grass Island Top Diamond */}
              <polygon
                points="330,75 580,200 330,325 80,200"
                fill="url(#islandGrass)"
                stroke={isNight ? '#166534' : '#86EFAC'}
                strokeWidth="2"
              />

              {/* 2. Left Cliff Drop Face */}
              <polygon
                points="80,200 330,325 330,375 80,250"
                fill="url(#cliffLeft)"
                stroke={isNight ? '#1A0E06' : '#5E2808'}
                strokeWidth="1"
              />

              {/* 3. Right Cliff Drop Face */}
              <polygon
                points="330,325 580,200 580,250 330,375"
                fill="url(#cliffRight)"
                stroke={isNight ? '#150B05' : '#451D04'}
                strokeWidth="1"
              />

              {/* Strata Bands on Cliff Faces */}
              <g stroke={isNight ? '#150A04' : '#522405'} strokeWidth="1.5" opacity="0.6">
                <line x1="80" y1="220" x2="330" y2="345" />
                <line x1="80" y1="235" x2="330" y2="360" />
                <line x1="330" y1="345" x2="580" y2="220" />
                <line x1="330" y1="360" x2="580" y2="235" />
              </g>

              {/* 4. Paved Asphalt Roads & Street Grid */}
              <g
                stroke={isNight ? '#1E293B' : '#475569'}
                strokeWidth="18"
                strokeLinecap="round"
                opacity={isNight ? '0.75' : '0.9'}
              >
                {/* Main Avenue 1 */}
                <line x1="436" y1="128" x2="190" y2="251" />
                {/* Cross Avenue 2 */}
                <line x1="210" y1="140" x2="456" y2="263" />
              </g>

              {/* Yellow Dashed Centerlines */}
              <g
                stroke={isNight ? '#38BDF8' : '#FBBF24'}
                strokeWidth="2"
                strokeDasharray="5 3"
                opacity="0.95"
              >
                <line x1="436" y1="128" x2="190" y2="251" />
                <line x1="210" y1="140" x2="456" y2="263" />
              </g>

              {/* Intersection Zebra Crossing */}
              <g stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" opacity="0.8">
                <line x1="315" y1="188" x2="340" y2="200" />
              </g>

              {/* 5. Dynamic Dependency Relations Lines */}
              {showRelations && bldMap['src-ext'] && (
                <g className="relation-laser">
                  {/* Extension Hub -> Analysis */}
                  {bldMap['src-analysis'] && (
                    <path
                      d={`M ${bldMap['src-ext'].x} ${bldMap['src-ext'].y - 20} Q ${(bldMap['src-ext'].x + bldMap['src-analysis'].x) / 2 + 30} ${(bldMap['src-ext'].y + bldMap['src-analysis'].y) / 2} ${bldMap['src-analysis'].x} ${bldMap['src-analysis'].y - 20}`}
                      fill="none"
                      stroke={isNight ? '#2DD4BF' : '#0D9488'}
                      strokeWidth="3"
                      strokeDasharray="6 3"
                      className="animate-dash-stream"
                    />
                  )}
                  {/* Extension Hub -> Tests */}
                  {bldMap['src-tests'] && (
                    <path
                      d={`M ${bldMap['src-ext'].x} ${bldMap['src-ext'].y - 20} Q ${(bldMap['src-ext'].x + bldMap['src-tests'].x) / 2} ${(bldMap['src-ext'].y + bldMap['src-tests'].y) / 2 - 15} ${bldMap['src-tests'].x} ${bldMap['src-tests'].y - 20}`}
                      fill="none"
                      stroke={isNight ? '#38BDF8' : '#0284C7'}
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                      className="animate-dash-stream"
                    />
                  )}
                  {/* Extension Hub -> Layout */}
                  {bldMap['src-layout'] && (
                    <path
                      d={`M ${bldMap['src-ext'].x} ${bldMap['src-ext'].y - 20} Q ${(bldMap['src-ext'].x + bldMap['src-layout'].x) / 2 - 20} ${(bldMap['src-ext'].y + bldMap['src-layout'].y) / 2 - 10} ${bldMap['src-layout'].x} ${bldMap['src-layout'].y - 20}`}
                      fill="none"
                      stroke={isNight ? '#34D399' : '#059669'}
                      strokeWidth="2.5"
                      strokeDasharray="6 3"
                      className="animate-dash-stream"
                    />
                  )}
                  {/* Extension Hub -> Utils */}
                  {bldMap['src-utils'] && (
                    <path
                      d={`M ${bldMap['src-ext'].x} ${bldMap['src-ext'].y - 20} Q ${(bldMap['src-ext'].x + bldMap['src-utils'].x) / 2 + 20} ${(bldMap['src-ext'].y + bldMap['src-utils'].y) / 2 - 10} ${bldMap['src-utils'].x} ${bldMap['src-utils'].y - 20}`}
                      fill="none"
                      stroke={isNight ? '#22D3EE' : '#0891B2'}
                      strokeWidth="2.5"
                      strokeDasharray="5 2.5"
                      className="animate-dash-stream"
                    />
                  )}
                  {/* Analysis -> Bugtown Warning */}
                  {bldMap['src-analysis'] && bldMap['bugtown-err'] && (
                    <path
                      d={`M ${bldMap['src-analysis'].x} ${bldMap['src-analysis'].y - 20} Q ${(bldMap['src-analysis'].x + bldMap['bugtown-err'].x) / 2} ${(bldMap['src-analysis'].y + bldMap['bugtown-err'].y) / 2 - 10} ${bldMap['bugtown-err'].x} ${bldMap['bugtown-err'].y - 20}`}
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="3"
                      strokeDasharray="4 2"
                      className="animate-dash-stream"
                    />
                  )}
                  {/* Layout -> Webview */}
                  {bldMap['src-layout'] && bldMap['src-webview'] && (
                    <path
                      d={`M ${bldMap['src-layout'].x} ${bldMap['src-layout'].y - 20} Q ${(bldMap['src-layout'].x + bldMap['src-webview'].x) / 2 - 15} ${(bldMap['src-layout'].y + bldMap['src-webview'].y) / 2} ${bldMap['src-webview'].x} ${bldMap['src-webview'].y - 20}`}
                      fill="none"
                      stroke={isNight ? '#C084FC' : '#7C3AED'}
                      strokeWidth="2.5"
                      strokeDasharray="6 3"
                      className="animate-dash-stream"
                    />
                  )}
                </g>
              )}
            </svg>

            {/* Cruising Vehicle: Red Sedan on Avenue 1 */}
            <div
              className="absolute pointer-events-none z-30 animate-car-iso"
              style={{
                left: '320px',
                top: '185px',
              }}
            >
              <img
                src="/assets/sprites/vehicles/veh_sedan_red_SE.png"
                alt="Car"
                className="w-8 h-8 object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Environmental Greenery Props */}
            {PROPS.map((prop) => (
              <div
                key={prop.id}
                className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-none"
                style={{
                  left: `${prop.x}px`,
                  top: `${prop.y}px`,
                  zIndex: Math.round(prop.y),
                }}
              >
                <img
                  src={prop.spriteUrl}
                  alt={prop.id}
                  className={`object-contain filter transition-all ${
                    isNight ? 'brightness-75' : 'brightness-100 drop-shadow-sm'
                  }`}
                  style={{
                    width: `${prop.widthPx}px`,
                    height: `${prop.heightPx}px`,
                  }}
                />
              </div>
            ))}

            {/* Non-overlapping Buildings with Minecraft Drop Animations */}
            {BUILDINGS.map((building, idx) => {
              const isSelected = selectedBuilding.id === building.id;
              const zIndex = isSelected ? 80 : Math.round(building.y);

              return (
                <div
                  key={`${building.id}-${buildKey}`}
                  onClick={() => setSelectedBuilding(building)}
                  className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform duration-200 group animate-minecraft-drop ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                  style={{
                    left: `${building.x}px`,
                    top: `${building.y}px`,
                    zIndex,
                    animationDelay: `${idx * 0.05}s`,
                  }}
                >
                  {/* Selection Ground Glow */}
                  {isSelected && (
                    <div className="absolute inset-0 -bottom-2 rounded-full bg-teal/40 blur-md animate-pulse"></div>
                  )}

                  {/* Floating District Folder Tag */}
                  <div
                    className="absolute -top-5 left-1/2 transform -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-white shadow-md whitespace-nowrap animate-district-float pointer-events-none"
                    style={{ backgroundColor: building.badgeColor }}
                  >
                    <span>📁</span>
                    <span>{building.district}</span>
                  </div>

                  {/* L42 Error Special Warning Badge on Bugtown */}
                  {building.status === 'warning' && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-[#EF4444] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-bounce whitespace-nowrap z-50">
                      <AlertTriangle className="w-2.5 h-2.5 text-white" />
                      <span>L42 Error</span>
                    </div>
                  )}

                  {/* Building Sprite Asset */}
                  <img
                    src={building.spriteUrl}
                    alt={building.name}
                    draggable={false}
                    className={`object-contain transition-all pointer-events-none select-none ${
                      isNight
                        ? building.status === 'hub'
                          ? 'brightness-125 drop-shadow-[0_0_12px_rgba(45,212,191,0.9)]'
                          : 'brightness-85 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]'
                        : 'brightness-100 drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)]'
                    }`}
                    style={{
                      height: `${building.heightPx}px`,
                      maxHeight: '115px',
                    }}
                  />

                  {/* Hover File Pill */}
                  <div
                    className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] font-mono whitespace-nowrap shadow-xs pointer-events-none transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } ${
                      building.status === 'hub'
                        ? 'bg-foreground text-background font-bold'
                        : building.status === 'warning'
                        ? 'bg-red-500 text-white font-bold'
                        : 'bg-card text-foreground border border-border'
                    }`}
                  >
                    {building.name.split('/').pop()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Metric Badge: Execution (Top Left) */}
          {showStats && (
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-40 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between gap-2 text-[8px] sm:text-[9px] font-bold text-slate-500 tracking-wider uppercase">
                  <span>Execution</span>
                  <EyeOff className="w-2.5 h-2.5 text-slate-400" />
                </div>
                <div className="text-sm sm:text-base font-display font-extrabold text-emerald-600 tracking-tight">
                  100% Offline
                </div>
                <div className="text-[9px] text-slate-500 font-medium hidden xs:block">
                  Zero cloud telemetry
                </div>
              </div>
            </div>
          )}

          {/* Floating Metric Badge: Hot Updates (Top Right) */}
          {showStats && (
            <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-40 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between gap-2 text-[8px] sm:text-[9px] font-bold text-slate-500 tracking-wider uppercase">
                  <span>Hot Updates</span>
                  <Zap className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                </div>
                <div className="text-sm sm:text-base font-display font-extrabold text-rose-500 tracking-tight">
                  &lt; 8ms
                </div>
                <div className="text-[9px] text-slate-500 font-medium hidden xs:block">
                  Incremental AST cache
                </div>
              </div>
            </div>
          )}

          {/* Floating Vertical Zoom Controls (Right Side) */}
          <div className="absolute right-2 sm:right-3.5 bottom-12 z-40 flex flex-col gap-1 bg-white/95 backdrop-blur-md p-1 rounded-lg border border-slate-200/90 shadow-sm">
            <button
              onClick={handleZoomIn}
              className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
              title="Zoom In (+)"
            >
              <Plus className="w-3 h-3" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
              title="Zoom Out (-)"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={handleZoomReset}
              className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
              title="Reset Zoom"
            >
              <Crosshair className="w-3 h-3" />
            </button>
          </div>

          {/* Interactive File Inspector HUD (Bottom Left) */}
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-4 z-40 max-w-[85%] sm:max-w-[280px] pointer-events-auto">
            <div className="bg-white/98 backdrop-blur-md rounded-xl p-2 sm:p-2.5 border border-slate-200/90 shadow-lg transition-all duration-200 animate-in fade-in">
              {/* Header: File path + Open Icon */}
              <div className="flex items-center justify-between gap-1.5 border-b border-slate-100 pb-1.5 mb-1.5">
                <div className="flex items-center gap-1.5 truncate">
                  <div className="p-0.5 rounded bg-teal/10 text-teal flex-shrink-0">
                    <FileCode className="w-3 h-3" />
                  </div>
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-800 truncate">
                    {selectedBuilding.filePath}
                  </span>
                </div>
                <a
                  href={`#preview`}
                  className="text-slate-400 hover:text-teal transition-colors flex-shrink-0 p-0.5"
                  title="View in Preview"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px] mb-1.5">
                <div className="bg-slate-50/80 rounded p-1 border border-slate-100">
                  <span className="text-[8px] text-slate-400 block uppercase font-sans">Lines</span>
                  <span className="font-bold text-slate-800 text-[11px]">{selectedBuilding.lines}</span>
                </div>
                <div className="bg-slate-50/80 rounded p-1 border border-slate-100">
                  <span className="text-[8px] text-slate-400 block uppercase font-sans">Imports</span>
                  <span className="font-bold text-teal text-[11px]">{selectedBuilding.imports}</span>
                </div>
                <div className="bg-slate-50/80 rounded p-1 border border-slate-100">
                  <span className="text-[8px] text-slate-400 block uppercase font-sans">Fan-In</span>
                  <span className="font-bold text-rose-500 text-[11px]">{selectedBuilding.fanIn}</span>
                </div>
                <div className="bg-slate-50/80 rounded p-1 border border-slate-100 flex flex-col justify-center items-center">
                  <span className="text-[8px] text-slate-400 block uppercase font-sans">Status</span>
                  <span
                    className={`font-bold text-[8px] px-1 py-0.5 rounded ${
                      selectedBuilding.status === 'warning'
                        ? 'bg-rose-100 text-rose-600'
                        : selectedBuilding.status === 'hub'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {selectedBuilding.statusBadge}
                  </span>
                </div>
              </div>

              {/* Warning message if applicable */}
              {selectedBuilding.warningMessage && (
                <div className="text-[9px] text-rose-600 font-mono bg-rose-50 border border-rose-200 rounded p-1 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5 flex-shrink-0" />
                  <span className="truncate">{selectedBuilding.warningMessage}</span>
                </div>
              )}

              {/* Helper Jump Hint */}
              <div className="text-[9px] text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-teal flex-shrink-0" />
                <span className="truncate">Click any building to inspect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
