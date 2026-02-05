import { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

// ========================================
// TYPES & INTERFACES
// ========================================
interface Course {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  image: string;
  description: string;
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  accolades: string[];
}

interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  location: string;
}

// ========================================
// DATA
// ========================================
const courses: Course[] = [
  {
    id: '1',
    title: 'Sourdough Mastery',
    subtitle: 'The Ancient Art of Fermentation',
    duration: '12 Weeks',
    level: 'Foundation to Mastery',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=80',
    description: 'Master the living culture. From building your first starter to crafting loaves with complex flavor profiles that rival century-old bakeries.',
  },
  {
    id: '2',
    title: 'Viennoiserie',
    subtitle: 'The Poetry of Lamination',
    duration: '8 Weeks',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1558326434-7598fb43e772?w=800&auto=format&fit=crop&q=80',
    description: 'Perfect the 27-layer fold. Buttery, flaky, ethereal—transform simple dough into architectural marvels of pastry.',
  },
  {
    id: '3',
    title: 'Pâtisserie Codex',
    subtitle: 'French Classical Foundations',
    duration: '10 Weeks',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80',
    description: 'The complete methodology. Creams, tarts, entremets—decode the secrets passed down through generations of Parisian masters.',
  },
];

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Marie Laurent',
    title: 'Lead Sourdough Instructor',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&auto=format&fit=crop&q=80',
    bio: 'Former head baker at Tartine. Pioneer of wild fermentation techniques using heritage grains sourced from Singaporean farms.',
    accolades: ['Tartine Bakery Alum', 'James Beard Nominee'],
  },
  {
    id: '2',
    name: 'Kenji Sato',
    title: 'Viennoiserie Master',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
    bio: 'Gold medalist at Coupe du Monde de la Boulangerie. Trained in Lyon and Tokyo, now based in Singapore.',
    accolades: ['World Champion 2019', 'MOF Finalist'],
  },
  {
    id: '3',
    name: 'Sarah Chen',
    title: 'Pâtisserie Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
    bio: 'Michelin-starred pastry chef blending French classicism with Southeast Asian terroir. Singapore native, Paris trained.',
    accolades: ['Michelin Star', 'Asia\'s 50 Best'],
  },
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    text: 'The Sourdough Mastery course transformed my understanding of fermentation entirely. My loaves now rival the best artisan bakeries in Singapore.',
    author: 'Sarah Mitchell',
    role: 'Home Baker',
    location: 'Melbourne, AU',
  },
  {
    id: '2',
    text: 'After the Viennoiserie course, I opened my own café on Keong Saik Road. The lamination techniques taught here are truly world-class.',
    author: 'James Kim',
    role: 'Café Owner',
    location: 'Singapore',
  },
  {
    id: '3',
    text: 'The community is incredible—bakers from 30+ countries sharing knowledge. The live sessions with Chef Laurent changed everything for me.',
    author: 'Elena Petrova',
    role: 'Pastry Chef',
    location: 'Berlin, DE',
  },
];

// ========================================
// CUSTOM HOOKS
// ========================================
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}

// ========================================
// COMPONENTS
// ========================================

// Decorative Corner Flourish
function CornerFlourish({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-[-1]',
  };

  return (
    <svg
      className={cn(
        'absolute w-16 h-16 text-codex-gold opacity-40',
        position === 'tl' && 'top-0 left-0',
        position === 'tr' && 'top-0 right-0',
        position === 'bl' && 'bottom-0 left-0',
        position === 'br' && 'bottom-0 right-0',
        transforms[position]
      )}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 32 Q16 32 16 16 Q16 0 32 0" />
      <path d="M0 48 Q24 48 24 24 Q24 0 48 0" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}

// Geometric Pattern Decoration
function GeometricPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="peranakan" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-codex-gold" />
          <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-codex-terracotta" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#peranakan)" />
      </svg>
    </div>
  );
}

// Navigation
function Navigation() {
  const scrolled = useNavScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'glass-dark py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <span className="font-display text-2xl lg:text-3xl font-semibold text-codex-cream tracking-tight">
              L'Artisan
            </span>
            <span className="text-codex-gold text-3xl leading-none animate-pulse-gold">.</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-10">
            {['Courses', 'Mentors', 'Testimonials', 'Codex'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative text-sm font-medium tracking-widest uppercase text-codex-silver hover:text-codex-gold transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-codex-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button className="hidden lg:block btn-codex">
            <span>Begin Journey</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-codex-cream p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-codex-ash pt-6">
            <ul className="space-y-4">
              {['Courses', 'Mentors', 'Testimonials', 'Codex'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block text-lg text-codex-silver hover:text-codex-gold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop&q=80"
          alt="Artisan bread"
          className="w-full h-full object-cover opacity-30 image-cinematic"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-codex-void via-codex-void/80 to-codex-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-codex-void via-transparent to-codex-void/50" />
      </div>

      {/* Geometric Pattern */}
      <GeometricPattern />

      {/* Floating Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-codex-gold rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-down">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-codex-gold" />
          <span className="text-codex-gold text-sm tracking-[0.3em] uppercase font-medium">
            Est. Singapore 2024
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-codex-gold" />
        </div>

        {/* Main Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] mb-8">
          <span className="animate-fade-in-up block animate-hidden" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            The Artisan's
          </span>
          <span 
            className="animate-fade-in-up block text-gradient-gold animate-hidden mt-2" 
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            Codex
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="max-w-2xl mx-auto text-lg md:text-xl text-codex-silver leading-relaxed mb-12 animate-fade-in-up animate-hidden"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          Where centuries of baking wisdom converge with digital mastery. 
          Learn from world-renowned artisans. Transform passion into excellence.
        </p>

        {/* CTAs */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-hidden"
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          <button className="btn-codex btn-codex-filled">
            <span>Explore Courses</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="btn-codex">
            <span>Download Syllabus</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in-up animate-hidden"
          style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
        >
          <span className="text-xs tracking-widest uppercase text-codex-mist">Scroll to Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-codex-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}

// Courses Section
function Courses() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="courses" className="relative py-32 lg:py-40" ref={ref}>
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-codex-charcoal/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className={cn(
            "inline-block text-codex-gold text-sm tracking-[0.3em] uppercase font-medium mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Curated Paths
          </span>
          <h2 className={cn(
            "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Master the <span className="text-gradient-gold">Ancient Craft</span>
          </h2>
          <p className={cn(
            "text-lg text-codex-silver leading-relaxed transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            From sourdough fermentation to delicate pâtisserie, each course is a journey 
            through technique, science, and artistry—designed by master artisans.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <article
              key={course.id}
              className={cn(
                "group relative bg-codex-charcoal border border-codex-ash overflow-hidden transition-all duration-700 card-hover-lift",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Corner Flourishes */}
              <CornerFlourish position="tl" />
              <CornerFlourish position="br" />

              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 image-cinematic"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-codex-charcoal via-codex-charcoal/20 to-transparent" />
                
                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-codex-void/80 backdrop-blur-sm border border-codex-gold/30">
                  <span className="text-xs tracking-widest uppercase text-codex-gold">{course.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-8">
                <span className="text-xs tracking-widest uppercase text-codex-terracotta mb-2 block">
                  {course.level}
                </span>
                <h3 className="font-display text-2xl font-semibold mb-2 text-codex-cream group-hover:text-codex-gold transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-codex-gold-light italic mb-4">{course.subtitle}</p>
                <p className="text-codex-silver text-sm leading-relaxed mb-6">
                  {course.description}
                </p>
                
                {/* Link */}
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-codex-gold text-sm font-medium tracking-wide group/link"
                >
                  <span>View Syllabus</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 border border-codex-gold/30" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Mentors Section
function Mentors() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="mentors" className="relative py-32 lg:py-40 bg-codex-charcoal" ref={ref}>
      <GeometricPattern />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className={cn(
            "inline-block text-codex-gold text-sm tracking-[0.3em] uppercase font-medium mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Expert Guidance
          </span>
          <h2 className={cn(
            "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Learn from <span className="text-gradient-gold">Masters</span>
          </h2>
          <p className={cn(
            "text-lg text-codex-silver leading-relaxed transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            World-renowned artisans from Michelin-starred kitchens and 
            legendary bakeries, now teaching exclusively through L'Artisan.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {mentors.map((mentor, index) => (
            <div
              key={mentor.id}
              className={cn(
                "group text-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative mx-auto w-48 h-48 mb-8">
                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-full border border-codex-gold/30 scale-110 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute inset-0 rounded-full border border-codex-gold/20 scale-125 group-hover:scale-150 transition-transform duration-700" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-codex-gold">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 image-cinematic"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="font-display text-2xl font-semibold mb-1 text-codex-cream group-hover:text-codex-gold transition-colors">
                {mentor.name}
              </h3>
              <p className="text-codex-gold text-sm tracking-wide mb-4">{mentor.title}</p>
              <p className="text-codex-silver text-sm leading-relaxed mb-4 max-w-xs mx-auto">
                {mentor.bio}
              </p>
              
              {/* Accolades */}
              <div className="flex flex-wrap justify-center gap-2">
                {mentor.accolades.map((accolade) => (
                  <span
                    key={accolade}
                    className="px-3 py-1 text-xs tracking-wide uppercase bg-codex-ash/50 border border-codex-smoke text-codex-mist"
                  >
                    {accolade}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="relative py-32 lg:py-40" ref={ref}>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className={cn(
            "inline-block text-codex-gold text-sm tracking-[0.3em] uppercase font-medium mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Voices of the Craft
          </span>
          <h2 className={cn(
            "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Transforming <span className="text-gradient-gold">Artisans</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={testimonial.id}
              className={cn(
                "relative p-8 bg-codex-charcoal border-l-2 border-codex-gold transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Quote Mark */}
              <span className="absolute -top-4 left-6 font-display text-8xl text-codex-gold/10 leading-none select-none">
                "
              </span>
              
              <p className="relative text-codex-cream italic leading-relaxed mb-6 z-10">
                "{testimonial.text}"
              </p>
              
              <footer>
                <cite className="not-italic">
                  <span className="block font-semibold text-codex-gold">{testimonial.author}</span>
                  <span className="text-sm text-codex-silver">
                    {testimonial.role} • {testimonial.location}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lead Magnet / Newsletter Section
function Newsletter() {
  const { ref, isVisible } = useScrollAnimation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1500);
  };

  return (
    <section id="codex" className="relative py-32 lg:py-40 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-codex-ash via-codex-charcoal to-codex-void" />
      <GeometricPattern />
      
      {/* Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-codex-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
        {/* Corner Decorations */}
        <div className="absolute inset-8 pointer-events-none hidden lg:block">
          <CornerFlourish position="tl" />
          <CornerFlourish position="tr" />
          <CornerFlourish position="bl" />
          <CornerFlourish position="br" />
        </div>

        <span className={cn(
          "inline-block text-codex-gold text-sm tracking-[0.3em] uppercase font-medium mb-4 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          Begin Your Journey
        </span>

        <h2 className={cn(
          "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          The Sourdough <span className="text-gradient-gold">Codex</span>
        </h2>

        <p className={cn(
          "text-lg text-codex-silver leading-relaxed mb-10 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          Receive our comprehensive 32-page guide covering starter creation, 
          feeding schedules, troubleshooting, and your first loaf recipe—completely free.
        </p>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className={cn(
            "relative transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {isSubmitted ? (
            <div className="py-6 px-8 bg-codex-gold/10 border border-codex-gold/30">
              <p className="text-codex-gold font-medium">
                ✓ Welcome to the Codex. Check your inbox for the guide.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 bg-codex-void border border-codex-smoke text-codex-cream placeholder:text-codex-mist focus:outline-none focus:border-codex-gold transition-colors"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-codex btn-codex-filled disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Get Free Guide'}</span>
                {!isSubmitting && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </form>

        <p className={cn(
          "mt-6 text-sm text-codex-mist transition-all duration-700 delay-400",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          Join 12,000+ artisan bakers from Singapore and beyond.
        </p>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Explore',
      links: ['All Courses', 'Mentors', 'Workshops', 'Community'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Contact'],
    },
    {
      title: 'Connect',
      links: ['Instagram', 'YouTube', 'Pinterest', 'Twitter/X'],
    },
  ];

  return (
    <footer className="relative bg-codex-void border-t border-codex-ash pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-flex items-center gap-2 mb-6">
              <span className="font-display text-3xl font-semibold text-codex-cream tracking-tight">
                L'Artisan
              </span>
              <span className="text-codex-gold text-3xl leading-none">.</span>
            </a>
            <p className="text-codex-silver leading-relaxed max-w-sm">
              Elevating home baking to professional excellence through 
              digital education. Based in Singapore, teaching the world.
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-display text-lg font-semibold text-codex-cream mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-codex-mist hover:text-codex-gold transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-gold mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-codex-mist">
          <p>© {currentYear} L'Artisan Baking Atelier. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Crafted with</span>
            <span className="text-codex-gold">◆</span>
            <span>in Singapore</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ========================================
// MAIN APP
// ========================================
export function App() {
  return (
    <div className="min-h-screen bg-codex-void text-codex-cream">
      <Navigation />
      <main>
        <Hero />
        <Courses />
        <Mentors />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

