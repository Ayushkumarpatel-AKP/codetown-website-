import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsStrip } from './components/MetricsStrip';
import { Features } from './components/Features';
import { ProductPreview } from './components/ProductPreview';
import { HowItWorks } from './components/HowItWorks';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { InstallModal } from './components/InstallModal';

export const App: React.FC = () => {
  const [installModalOpen, setInstallModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-teal selection:text-foreground">
      <Navbar onOpenInstall={() => setInstallModalOpen(true)} />
      
      <main className="flex-grow">
        <Hero onOpenInstall={() => setInstallModalOpen(true)} />
        <MetricsStrip />
        <Features />
        <ProductPreview />
        <HowItWorks onOpenInstall={() => setInstallModalOpen(true)} />
        <FinalCTA onOpenInstall={() => setInstallModalOpen(true)} />
      </main>

      <Footer />

      <InstallModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
      />
    </div>
  );
};

export default App;
