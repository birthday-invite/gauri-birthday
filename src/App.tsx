import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';
import RSVPForm from './components/RSVPForm';
import ScrollFrames from './components/ScrollFrames';



function App() {
  return (
    <div className="w-full min-h-screen relative overflow-x-hidden font-body selection:bg-party-yellow selection:text-white">






      {/* Blur removed. Gradient kept lightly for text contrast if needed */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent to-white/10 pointer-events-none"></div>

      {/* Layer 1.5: Scroll-based Frames Animation */}
      <ScrollFrames />

      <main className="relative z-10 w-full max-w-4xl mx-auto pt-4">
        <HeroSection />
        <InfoSection />
        <RSVPForm />
      </main>

      <footer className="w-full text-center py-6 pb-10 text-party-purple font-party text-2xl relative z-10 drop-shadow-md">
        <p className="bg-white/60 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
          Made with ❤️ for Gauri!
        </p>
      </footer>
    </div>
  );
}

export default App;
