import React from 'react';

export const MetricsStrip: React.FC = () => {
  return (
    <section className="py-20 bg-foreground relative overflow-hidden text-background">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Stat 1 */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-teal font-display">
              <span>100%</span>
            </div>
            <div className="text-background/70 text-sm md:text-base">
              Offline & Local Execution
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-coral font-display">
              <span>&lt; 8ms</span>
            </div>
            <div className="text-background/70 text-sm md:text-base">
              Incremental Parse Hot-Updates
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gold font-display">
              <span>59 / 59</span>
            </div>
            <div className="text-background/70 text-sm md:text-base">
              Passing Automated Tests
            </div>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-teal font-display">
              <span>2,000+</span>
            </div>
            <div className="text-background/70 text-sm md:text-base">
              Files Supported Per Island
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
