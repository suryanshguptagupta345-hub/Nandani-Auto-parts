import React, { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, MapPin, Star, Wrench, ShieldCheck, Zap, Disc, 
  ChevronRight, X, Menu, ExternalLink, Sparkles, Navigation, Layers
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

// --- BUSINESS DATA CONSTANTS ---
const BUSINESS = {
  name: "NANDANI AUTO PARTS",
  tagline: "Motorcycle Repair, Genuine Spare Parts & Rider Gear",
  phone: "92468 88147",
  phoneRaw: "+919246888147",
  address: "Aspatal Chauraha Road, near Union Bank, Nautanwa, Uttar Pradesh 273164, India",
  googleRating: 5.0,
  googleReviewsCount: 46,
  googleMapsUrl: "https://www.google.com/searchviewer/10?svid=CAwSHRIbCgNwdnESFENnMHZaeTh4TVhnNE5YUXlORjkzGAo",
};

// SEO Structured Data (LocalBusiness)
const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": BUSINESS.name,
  "image": "https://nandanionline.com/images/storefront.jpg",
  "telephone": BUSINESS.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Aspatal Chauraha Road, near Union Bank",
    "addressLocality": "Nautanwa",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "273164",
    "addressCountry": "IN"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "46"
  }
};

// --- 3D INTERACTIVE ENGINE & BRAKE ASSEMBLY ---
function Three3DAssembly() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <group ref={meshRef} scale={1.6}>
      {/* Brake Rotor Disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.08, 64]} />
        <meshStandardMaterial color="#8899ac" metalness={0.95} roughness={0.15} />
      </mesh>
      
      {/* Inner Metallic Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
        <meshStandardMaterial color="#0066FF" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Caliper Accent */}
      <mesh position={[1.2, 0.2, 0]}>
        <boxGeometry args={[0.6, 0.5, 0.8]} />
        <meshStandardMaterial color="#00D2FF" metalness={0.6} roughness={0.3} emissive="#0047BB" emissiveIntensity={0.3} />
      </mesh>

      {/* Ventilation Cutouts */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <mesh key={i} rotation={[0, (angle * Math.PI) / 180, 0]} position={[Math.cos((angle * Math.PI) / 180) * 1.1, 0, Math.sin((angle * Math.PI) / 180) * 1.1]}>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
    </group>
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Helmet Shop Data featuring provided images
  const helmetsList = [
    { name: "Thunder Alien Yellow Edition", brand: "Studds / Thunder", tag: "POPULAR", img: "/images/helmet-thunder-yellow.jpg", desc: "Aerodynamic full-face helmet with UV visor & high-impact shell." },
    { name: "Thunder Alien Orange Graphics", brand: "Studds / Thunder", tag: "HOT SELLER", img: "/images/helmet-thunder-orange.jpg", desc: "Matte finish with street race decals & ventilation ports." },
    { name: "Sharky Teeth Matte Edition", brand: "Sharky Spec", tag: "NEW ARRIVAL", img: "/images/helmet-sharky.jpg", desc: "Aggressive visual styling with quick-release chin strap." },
    { name: "Trooper RS Modular Helmet", brand: "Trooper Series", tag: "PREMIUM", img: "/images/helmet-trooper.jpg", desc: "Flip-up visor mechanism with airtight noise reduction." },
    { name: "Steelbird Air Full Face", brand: "Steelbird", tag: "CLASSIC", img: "/images/helmet-steelbird.jpg", desc: "Dual visor with high-density EPS lining for max safety." },
  ];

  // Workshop Gallery featuring provided bike images & storefront
  const galleryPhotos = [
    { title: "BMW G310 GS Adventure Service", category: "Performance Service", img: "/images/bmw-gs.jpg", size: "col-span-2 row-span-2" },
    { title: "Jawa 42 Bobber Tuning", category: "Custom & Cruiser", img: "/images/jawa-bobber.jpg", size: "col-span-1 row-span-1" },
    { title: "KTM Duke Performance Check", category: "Street / Naked Bike", img: "/images/ktm-duke.jpg", size: "col-span-1 row-span-1" },
    { title: "Nandani Auto Parts Storefront", category: "Our Nautanwa Workshop", img: "/images/storefront.jpg", size: "col-span-2 row-span-1" },
  ];

  return (
    <div className="min-h-screen font-body text-gray-200 bg-dark-950 selection:bg-electric-500 selection:text-white">
      
      {/* Inject Local Business SEO Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />

      {/* --- STICKY NAVIGATION BAR --- */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-electric-500 shadow-[0_0_15px_rgba(0,102,255,0.4)] group-hover:scale-105 transition-transform">
              <img src="/images/logo.jpg" alt="Nandani Auto Parts Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-heading text-2xl font-bold tracking-wider text-white block leading-none">
                NANDANI <span className="text-electric-400">AUTO PARTS</span>
              </span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold">NAUTANWA • UTTAR PRADESH</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            {['Services', 'Gear & Helmets', 'Work Gallery', 'Location'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="hover:text-electric-400 transition-colors uppercase tracking-wider relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-electric-400 hover:after:w-full after:transition-all"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Call CTA Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS.phoneRaw}`}
              className="glow-button px-6 py-2.5 rounded-full text-white font-heading font-bold tracking-wider flex items-center gap-2 text-sm animate-pulse-glow"
            >
              <Phone size={16} /> CALL {BUSINESS.phone}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-white p-2 glass-pill rounded-lg"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel border-t border-white/10 px-6 py-8 flex flex-col gap-6"
            >
              {['Services', 'Gear & Helmets', 'Work Gallery', 'Location'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-xl uppercase tracking-wider text-white hover:text-electric-400"
                >
                  {item}
                </a>
              ))}
              <a 
                href={`tel:${BUSINESS.phoneRaw}`}
                className="glow-button py-3 text-center rounded-lg text-white font-heading text-lg font-bold tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                <Phone size={18} /> CALL NOW ({BUSINESS.phone})
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
        
        {/* Background Night Shop Image with Dark Gradient Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/storefront.jpg" 
            alt="Nandani Auto Parts Workshop Night View" 
            className="w-full h-full object-cover object-center opacity-30 scale-105 filter blur-[2px]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-transparent to-dark-950"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Pill Rating Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-pill mb-8 glow-border shadow-2xl"
          >
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-white">
              5.0 RATED ON GOOGLE <span className="text-gray-400">({BUSINESS.googleReviewsCount} REVIEWS)</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-wide uppercase leading-tight mb-6"
          >
            PRECISION <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-electric-500 to-cyan-300">REPAIR.</span> <br />
            GENUINE <span className="text-white">PARTS.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-10"
          >
            Nautanwa’s trusted garage for multi-brand motorcycle servicing, authentic spare parts, high-performance tuning & premium riding gear.
          </motion.p>

          {/* Interactive Button Group */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <a 
              href={`tel:${BUSINESS.phoneRaw}`}
              className="w-full sm:w-auto glow-button px-8 py-4 rounded-full text-white font-heading text-lg font-bold tracking-wider flex items-center justify-center gap-3 group"
            >
              <Phone size={20} className="group-hover:rotate-12 transition-transform" />
              CALL NOW: {BUSINESS.phone}
            </a>
            
            <a 
              href={BUSINESS.googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto glass-panel hover:bg-white/10 px-8 py-4 rounded-full text-white font-heading text-lg font-bold tracking-wider flex items-center justify-center gap-3 border border-white/20 transition-all"
            >
              <Navigation size={20} className="text-electric-400" />
              GET DIRECTIONS
            </a>
          </motion.div>

          {/* Quick Feature Pills */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          >
            {[
              { label: "100% Genuine Spare Parts", icon: <ShieldCheck className="text-electric-400" /> },
              { label: "Expert Mechanics", icon: <Wrench className="text-electric-400" /> },
              { label: "Fast Turnaround Time", icon: <Zap className="text-electric-400" /> },
              { label: "Multi-Brand Servicing", icon: <Disc className="text-electric-400" /> }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-xl flex items-center gap-3 border border-white/5">
                {item.icon}
                <span className="text-xs font-semibold text-gray-200">{item.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-electric-400 font-heading tracking-widest text-sm uppercase font-bold">WORKSHOP EXCELLENCE</span>
            <h2 className="font-heading text-4xl sm:text-6xl text-white font-bold tracking-wide uppercase mt-2">
              OUR WORKSHOP <span className="text-electric-400">SERVICES</span>
            </h2>
            <p className="text-gray-400 mt-4">Complete motorcycle diagnostics, maintenance, and replacement using certified tools and original components.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Engine Overhaul & Tuning",
                desc: "Complete engine diagnostics, piston ring replacement, clutch plate fitting, and performance tuning for high-cc bikes.",
                icon: <Wrench className="text-electric-400" size={32} />
              },
              {
                title: "Brake & Suspension System",
                desc: "Disc brake pad changing, hydraulic fluid bleeding, telescopic front fork oil seals, and rear shock absorber replacement.",
                icon: <Disc className="text-electric-400" size={32} />
              },
              {
                title: "Chain & Sprocket Maintenance",
                desc: "Drive chain cleaning, lube, tension adjustment, and full chain-sprocket replacement for smooth power transfer.",
                icon: <Zap className="text-electric-400" size={32} />
              },
              {
                title: "Electrical & Battery Care",
                desc: "Wiring harness inspection, digital meter repairs, LED headlight conversions, and Exide/Amaron battery sales & fitting.",
                icon: <Sparkles className="text-electric-400" size={32} />
              },
              {
                title: "Full Periodic Servicing",
                desc: "Comprehensive 25-point inspection, synthetic engine oil change (Motul/Castrol), air filter cleaning, and pressure wash.",
                icon: <ShieldCheck className="text-electric-400" size={32} />
              },
              {
                title: "Tyre & Wheel Assembly",
                desc: "Tubeless tyre fitting, puncture repairs, alloy wheel alignment, and rim spoke tightening for vintage/cruiser bikes.",
                icon: <Layers className="text-electric-400" size={32} />
              }
            ].map((srv, idx) => (
              <div 
                key={idx}
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-electric-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-electric-500 group-hover:w-full group-hover:opacity-5 transition-all"></div>
                <div className="p-3 glass-pill w-fit rounded-xl mb-6">{srv.icon}</div>
                <h3 className="font-heading text-2xl text-white font-bold mb-3">{srv.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{srv.desc}</p>
                <a 
                  href={`tel:${BUSINESS.phoneRaw}`} 
                  className="inline-flex items-center gap-2 text-electric-400 font-heading text-sm font-bold tracking-wider mt-6 group-hover:text-white transition-colors"
                >
                  BOOK SERVICE <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 3D INTERACTIVE SHOWCASE SECTION --- */}
      <section className="py-20 bg-dark-950 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <span className="text-electric-400 font-heading tracking-widest text-sm uppercase font-bold">3D MECHANICAL ENGINEERING</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-white font-bold tracking-wide uppercase mt-2 leading-tight">
              GENUINE BRAKE & DRIVE <span className="text-electric-400">COMPONENTS</span>
            </h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              We never compromise on safety. Every component fitted at Nandani Auto Parts meets strict OEM specifications, ensuring max heat dissipation and stopping power.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="glass-pill px-4 py-3 rounded-xl flex items-center gap-3">
                <Disc className="text-electric-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-xs text-gray-300 font-semibold">Interactive 3D View (Drag to Rotate)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[420px] glass-panel rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center text-electric-400 font-heading">
                LOADING 3D ENGINE MODULE...
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00D2FF" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#0066FF" />
                <Environment preset="night" />
                <Three3DAssembly />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={8} blur={2} />
              </Canvas>
            </Suspense>
          </div>
    </div>
  );
}

export default App;
        
   
