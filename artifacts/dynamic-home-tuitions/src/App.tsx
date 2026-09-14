import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, BookOpen, BriefcaseBusiness, Check, ChevronDown, ChevronRight, Clock3, GraduationCap, HeartHandshake, Instagram, Laptop, Lightbulb, Linkedin, MapPin, Menu, MessageCircle, Phone, Play, Quote, Send, Sparkles, Star, Target, Users, X, Youtube } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();
const phoneDisplay = '083741 53731';
const phoneHref = 'tel:08374153731';
const mapsHref = 'https://www.google.com/maps/dir/?api=1&destination=Door+No+1%2C+Mudigonda+Renuka+Nilayam%2C+311%2F1%2C+near+Gandhi+Bomma+Center%2C+Kanuru%2C+Vijayawada%2C+Andhra+Pradesh+520007%2C+India';
const whatsappHref = 'https://wa.me/918374153731';

type IconComponent = typeof BookOpen;

const navLinks = [
  ['home', 'Home'],
  ['about', 'About Us'],
  ['courses', 'Courses'],
  ['modes', 'Learning Modes'],
  ['why-us', 'Why Us'],
  ['testimonials', 'Testimonials'],
  ['contact', 'Contact'],
] as const;

const services: { title: string; description: string; icon: IconComponent; accent: string }[] = [
  { title: 'Home Tuition', description: 'A teacher who comes to your child, with lessons shaped around their pace.', icon: Users, accent: 'sky' },
  { title: 'Institute Classes', description: 'Small, focused groups that make every question welcome and every hour count.', icon: BookOpen, accent: 'yellow' },
  { title: 'Online Classes', description: 'Live, interactive coaching that keeps learning moving from wherever you are.', icon: Laptop, accent: 'coral' },
  { title: 'One-to-One Attention', description: 'Clear feedback, consistent practice, and a plan built for one learner.', icon: Target, accent: 'lavender' },
];

const courses: { title: string; description: string; subjects: string; icon: IconComponent; number: string; featured?: boolean }[] = [
  { number: '01', title: 'School Academics', description: 'Build strong fundamentals and steady confidence from primary years to Class 12.', subjects: 'CBSE • ICSE • State Board', icon: GraduationCap },
  { number: '02', title: 'IIT-JEE', description: 'Concept-first preparation with the practice rhythm serious aspirants need.', subjects: 'Physics • Chemistry • Mathematics', icon: Lightbulb, featured: true },
  { number: '03', title: 'NEET', description: 'Structured science coaching that turns a long syllabus into a clear weekly plan.', subjects: 'Physics • Chemistry • Biology', icon: Sparkles },
  { number: '04', title: 'Engineering & B.Sc.', description: 'Targeted support for degree subjects, assignments, and examination readiness.', subjects: 'All major subjects', icon: BriefcaseBusiness },
  { number: '05', title: 'Commerce', description: 'Make numbers, markets, and accounts feel logical — not intimidating.', subjects: 'Accounts • Economics • Business Studies', icon: ArrowUp },
  { number: '06', title: 'Medical & Other Courses', description: 'Personalised academic help for every ambitious learning path.', subjects: 'Ask us about your subject', icon: HeartHandshake },
];

const reasons: { title: string; description: string; icon: IconComponent }[] = [
  { title: 'Personalised Learning Plans', description: 'No two learners are treated the same. We start with where your child is and plan the next right step.', icon: Target },
  { title: 'Experienced Faculty', description: 'Teachers who know their subjects and know how to make them feel approachable.', icon: GraduationCap },
  { title: 'Small Batch Sizes', description: 'More room to ask, explain, revisit, and genuinely understand.', icon: Users },
  { title: 'Regular Progress Tracking', description: 'Simple, honest updates help parents see what is improving and what needs attention.', icon: ArrowUp },
  { title: 'Flexible Learning Options', description: 'At home, at our institute, or online — choose the setting that helps your child thrive.', icon: Laptop },
  { title: 'Result-Oriented Approach', description: 'We pair strong concepts with consistent practice so effort has somewhere to go.', icon: Sparkles },
];

const steps = [
  { number: '01', title: 'Tell us your goal', description: 'Share your child’s class, subjects, strengths, and the areas you want to improve.' },
  { number: '02', title: 'Meet the right teacher', description: 'We recommend a faculty member and learning mode that fit your needs.' },
  { number: '03', title: 'Start with a clear plan', description: 'Lessons begin with practical milestones, a comfortable rhythm, and room to ask.' },
  { number: '04', title: 'Watch confidence grow', description: 'Regular feedback keeps the family aligned and the learner moving forward.' },
];

const testimonials = [
  { quote: 'The biggest change was not just in marks — it was seeing my daughter raise her hand and ask questions again.', name: 'Parent of a Class 9 student', detail: 'School Academics', initials: 'P9' },
  { quote: 'The weekly structure made JEE preparation feel possible. We always knew what had been covered and what came next.', name: 'Student, Class 12', detail: 'IIT-JEE preparation', initials: 'S12' },
  { quote: 'We wanted patient, local support near Kanuru. The one-to-one attention has made study time much calmer at home.', name: 'Parent of a Class 6 student', detail: 'Home Tuition', initials: 'P6' },
  { quote: 'My concepts in accounts finally started connecting. The explanations are clear and the practice is consistent.', name: 'B.Com student', detail: 'Commerce', initials: 'BC' },
];

const faqs = [
  ['Which classes and subjects do you cover?', 'We support school academics from primary levels through Class 12, as well as IIT-JEE, NEET, Engineering, B.Sc., Commerce, Medical, and other subject-specific needs. Tell us your exact class and subject and we will guide you.'],
  ['Do you provide home tuition in Kanuru?', 'Yes. Home tuition is one of our core learning modes for families in Kanuru and nearby Vijayawada areas. We match a suitable teacher based on the learner’s class, subjects, and preferred schedule.'],
  ['How do online classes work?', 'Online classes are live and interactive, not recorded lessons left to complete alone. Your child can ask questions in real time, work through examples with the teacher, and follow a clear practice plan.'],
  ['How are teachers selected?', 'We look for subject strength, communication, patience, and the ability to meet a learner at their current level. We then recommend a fit based on your child’s goals and learning style.'],
  ['Can I request a demo or consultation?', 'Absolutely. Call, WhatsApp, or use the contact form to share a few details. We will help you understand the right next step before you commit to a schedule.'],
  ['How do you track student progress?', 'Teachers use regular practice, feedback, and milestone conversations to track understanding. Parents receive clear updates about progress and the next areas of focus.'],
  ['What are your class timings and fees?', 'Timings and fees depend on the course, learning mode, class level, and frequency. Contact us for a practical recommendation tailored to your requirements.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className={`reveal max-w-2xl ${light ? 'text-white' : ''}`}>
      <p className={`eyebrow mb-4 ${light ? 'text-sky-200' : 'text-primary'}`}>{eyebrow}</p>
      <h2 className="font-display text-balance text-4xl leading-[1.04] sm:text-5xl">{title}</h2>
      {body && <p className={`mt-5 max-w-xl text-base leading-7 ${light ? 'text-sky-100/80' : 'text-muted-foreground'}`}>{body}</p>}
    </div>
  );
}

function AppShell() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [formValues, setFormValues] = useState({ name: '', phone: '', course: '', message: '' });
  const [showTop, setShowTop] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.12 });
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id));
    }, { rootMargin: '-24% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    navLinks.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentTestimonial = useMemo(() => testimonials[testimonialIndex], [testimonialIndex]);

  const goToContact = (course = '') => {
    setSelectedCourse(course);
    setFormValues((current) => ({ ...current, course }));
    setMenuOpen(false);
    scrollToId('contact');
  };

  const updateField = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormError('');
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValues.name.trim() || !formValues.phone.trim() || !formValues.course.trim()) {
      setFormError('Please add your name, phone number, and the course you are interested in.');
      setFormSent(false);
      return;
    }
    if (formValues.phone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      setFormSent(false);
      return;
    }
    setFormError('');
    setFormSent(true);
    formRef.current?.querySelector('button[type="submit"]')?.scrollIntoView({ block: 'nearest' });
  };

  const previousTestimonial = () => setTestimonialIndex((index) => (index - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () => setTestimonialIndex((index) => (index + 1) % testimonials.length);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#092642]/95 text-white backdrop-blur-xl">
        <div className="section-shell flex h-[74px] items-center justify-between gap-5">
          <button data-testid="button-logo" onClick={() => scrollToId('home')} className="group flex items-center gap-3 text-left" aria-label="Dynamic Home Tuitions home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f8d36b] text-[#092642] shadow-lg transition-transform group-hover:-rotate-6">
              <BookOpen size={20} strokeWidth={2.5} />
            </span>
            <span>
              <span className="block font-display text-lg leading-none">Dynamic</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.2em] text-sky-200">Home Tuitions</span>
            </span>
          </button>
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {navLinks.map(([id, label]) => (
              <button data-testid={`nav-${id}`} key={id} onClick={() => scrollToId(id)} className={`rounded-full px-3 py-2 text-[12px] font-semibold transition-colors ${activeSection === id ? 'bg-white/12 text-[#f8d36b]' : 'text-sky-100/80 hover:bg-white/8 hover:text-white'}`}>
                {label}
              </button>
            ))}
          </nav>
          <a data-testid="link-header-call" href={phoneHref} className="hidden items-center gap-2 rounded-full border border-sky-200/30 px-4 py-2 text-xs font-bold text-sky-100 transition-colors hover:border-[#f8d36b] hover:text-[#f8d36b] sm:flex">
            <Phone size={14} /> {phoneDisplay}
          </a>
          <button data-testid="button-mobile-menu" onClick={() => setMenuOpen((open) => !open)} className="rounded-lg p-2 text-sky-100 lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/10 bg-[#092642] px-5 pb-5 pt-3 lg:hidden" aria-label="Mobile navigation">
            {navLinks.map(([id, label]) => (
              <button data-testid={`mobile-nav-${id}`} key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }} className="block w-full border-b border-white/10 py-3 text-left text-sm font-semibold text-sky-100">
                {label}
              </button>
            ))}
            <a data-testid="link-mobile-call" href={phoneHref} className="mt-4 flex items-center gap-2 text-sm font-bold text-[#f8d36b]"><Phone size={15} /> Call {phoneDisplay}</a>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden bg-[#092642] pt-[74px] text-white">
          <div className="hero-grid absolute inset-0 opacity-60" />
          <div className="hero-orb absolute -right-36 -top-36 h-[480px] w-[480px] rounded-full bg-[#1769d2]/35 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#f8d36b]/10 blur-3xl" />
          <div className="section-shell relative grid min-h-[670px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
            <div className="reveal is-visible max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-sky-100/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.13em] text-sky-100">
                <span className="h-2 w-2 rounded-full bg-[#f8d36b]" /> Trusted Learning Partner Since 2022
              </div>
              <h1 className="font-display text-balance text-[3.35rem] leading-[.96] tracking-[-.035em] sm:text-6xl lg:text-[5.5rem]">
                Your Child’s <span className="text-[#f8d36b]">Brighter</span><br /> Future Starts Here.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-sky-100/80 sm:text-lg">
                Personalised, result-oriented coaching that helps learners understand deeply, improve steadily, and walk into every exam with more confidence.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button data-testid="button-explore-courses" onClick={() => scrollToId('courses')} className="group inline-flex items-center gap-3 rounded-full bg-[#f8d36b] px-5 py-3.5 text-sm font-bold text-[#092642] shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5">
                  Explore Courses <ArrowDownRight size={17} className="transition-transform group-hover:rotate-45" />
                </button>
                <button data-testid="button-hero-contact" onClick={() => goToContact()} className="inline-flex items-center gap-3 rounded-full border border-sky-100/30 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10">
                  Contact Us <ArrowRight size={17} />
                </button>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-white/10 pt-5 text-xs text-sky-100/70">
                <span className="flex items-center gap-2"><Check size={15} className="text-[#f8d36b]" /> Concept-first teaching</span>
                <span className="flex items-center gap-2"><Check size={15} className="text-[#f8d36b]" /> Flexible learning modes</span>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[500px] lg:ml-auto">
              <div className="absolute -left-7 top-10 hidden w-36 -rotate-6 rounded-2xl border border-white/15 bg-[#113c65]/80 p-4 backdrop-blur sm:block">
                <p className="font-display text-3xl text-[#f8d36b]">4.9</p>
                <div className="mt-1 flex gap-0.5 text-[#f8d36b]"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                <p className="mt-2 text-[10px] leading-4 text-sky-100/70">A learning space families recommend</p>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border-[7px] border-white/10 bg-[#dff4ff] shadow-float">
                <img src="/teacher-student-study.jpg" alt="Teacher helping a student study at a desk" className="aspect-[4/4.6] w-full object-cover" />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-[#092642]/90 p-4 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f8d36b]">The Dynamic Difference</p>
                  <p className="mt-1 font-display text-xl text-white">Small steps. Strong foundations.</p>
                </div>
              </div>
              <p className="pointer-events-none absolute -bottom-14 -right-8 hidden font-display text-[4.4rem] leading-none text-white/8 sm:block">Learn</p>
            </div>
          </div>
          <div className="section-shell relative flex items-center justify-between border-t border-white/10 py-5 text-[10px] font-bold uppercase tracking-[.2em] text-sky-100/50">
            <span>Kanuru, Vijayawada</span>
            <span className="pulse-line hidden h-px w-28 bg-[#f8d36b] sm:block" />
            <span>Learn <span className="text-[#f8d36b]">•</span> Improve <span className="text-[#f8d36b]">•</span> Succeed</span>
          </div>
        </section>

        <section className="relative z-10 -mt-1 bg-[#f7fbfd] py-7">
          <div className="section-shell grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div data-testid={`service-card-${index}`} key={service.title} className="reveal group rounded-2xl border border-[#d9e9f1] bg-white p-5 shadow-card transition-transform hover:-translate-y-1">
                  <div className={`mb-5 grid h-10 w-10 place-items-center rounded-xl ${service.accent === 'yellow' ? 'bg-[#fff4c9] text-[#8a6500]' : service.accent === 'coral' ? 'bg-[#ffe6dd] text-[#a94d2f]' : service.accent === 'lavender' ? 'bg-[#ece9ff] text-[#5b54a0]' : 'bg-[#dff4ff] text-[#1769d2]'}`}><Icon size={19} /></div>
                  <h3 className="font-display text-xl text-[#092642]">{service.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="about" className="scroll-mt-20 bg-[#f7fbfd] py-24 sm:py-32">
          <div className="section-shell grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
            <div className="reveal relative">
              <div className="absolute -left-4 -top-5 h-28 w-28 rounded-full border border-[#f8d36b]/70" />
              <div className="relative rounded-[2rem] bg-[#c9eafa] p-5 sm:p-8">
                <div className="rounded-[1.5rem] bg-[#1769d2] p-7 text-white sm:p-9">
                  <p className="eyebrow text-sky-100/70">Since 2022</p>
                  <p className="mt-16 font-display text-5xl leading-none sm:text-7xl">A little<br /><span className="text-[#f8d36b]">more</span> possible.</p>
                  <div className="mt-16 flex items-end justify-between border-t border-white/20 pt-5">
                    <p className="max-w-[160px] text-xs leading-5 text-sky-100/80">Because every child deserves to feel capable before they are asked to feel exceptional.</p>
                    <ArrowDownRight size={35} className="text-[#f8d36b]" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="About Dynamic" title="Learning That Makes a Difference" body="Dynamic Home Tuitions is a premium education and coaching center in Kanuru, Vijayawada. We make learning personal, structured, and genuinely encouraging — so progress is not a surprise at the end of the year, but something a learner can feel every week." />
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-[#d7e7ee] pt-8 sm:grid-cols-4">
                {[
                  ['2022', 'Founded with purpose'],
                  ['4+', 'Learning modes'],
                  ['6', 'Course pathways'],
                  ['1:1', 'Attention that matters'],
                ].map(([value, label], index) => (
                  <div data-testid={`stat-${index}`} key={label} className="reveal reveal-delay-1">
                    <p className="font-display text-3xl text-[#1769d2]">{value}</p>
                    <p className="mt-1 text-[11px] font-semibold leading-4 text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <button data-testid="button-about-contact" onClick={() => goToContact()} className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#1769d2] transition-colors hover:text-[#092642]">Talk to our team <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

        <section id="courses" className="scroll-mt-20 bg-[#eaf6fc] py-24 sm:py-32">
          <div className="section-shell">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Find your path" title="The right support for the next big step." body="From stronger school foundations to focused entrance preparation, our courses are built around clarity, consistency, and the learner in front of us." />
              <p className="max-w-[200px] text-sm leading-6 text-muted-foreground">Not sure where to start? <button data-testid="button-course-guidance" onClick={() => goToContact()} className="font-bold text-[#1769d2] underline decoration-[#f8d36b] decoration-2 underline-offset-4">Ask for guidance.</button></p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => {
                const Icon = course.icon;
                return (
                  <article data-testid={`course-card-${index}`} key={course.title} className={`reveal group relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.5rem] border p-6 transition-all hover:-translate-y-1 hover:shadow-float ${course.featured ? 'border-[#1769d2] bg-[#1769d2] text-white' : 'border-[#cce3ef] bg-white text-[#092642]'}`}>
                    <div className="flex items-start justify-between">
                      <span className={`font-mono text-xs font-bold ${course.featured ? 'text-sky-100/60' : 'text-[#1769d2]/55'}`}>{course.number}</span>
                      <span className={`grid h-10 w-10 place-items-center rounded-xl ${course.featured ? 'bg-white/15 text-[#f8d36b]' : 'bg-[#dff4ff] text-[#1769d2]'}`}><Icon size={19} /></span>
                    </div>
                    <h3 className="mt-10 font-display text-2xl">{course.title}</h3>
                    <p className={`mt-3 text-sm leading-6 ${course.featured ? 'text-sky-100/80' : 'text-muted-foreground'}`}>{course.description}</p>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-7">
                      <p className={`text-[10px] font-bold uppercase leading-4 tracking-[.11em] ${course.featured ? 'text-[#f8d36b]' : 'text-[#1769d2]'}`}>{course.subjects}</p>
                      <button data-testid={`button-enquire-${index}`} onClick={() => goToContact(course.title)} aria-label={`Enquire about ${course.title}`} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform group-hover:rotate-[-45deg] ${course.featured ? 'bg-[#f8d36b] text-[#092642]' : 'bg-[#092642] text-white'}`}><ArrowUp size={16} /></button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="modes" className="scroll-mt-20 bg-white py-24 sm:py-32">
          <div className="section-shell grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <SectionHeading eyebrow="Learning modes" title="Learning should fit real life." body="Different learners need different settings. Choose the mode that feels most supportive for your child right now — we can always adjust as they grow." />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['At Home', 'Comfortable, focused support in familiar surroundings.', Users],
                ['At Our Institute', 'A focused study environment in the heart of Kanuru.', BookOpen],
                ['Live Online', 'Interactive lessons without the commute.', Laptop],
                ['One-to-One', 'Undivided attention for a specific goal or subject.', Target],
              ].map(([title, description, Icon], index) => {
                const ModeIcon = Icon as IconComponent;
                return (
                  <button data-testid={`mode-card-${index}`} key={title as string} onClick={() => goToContact(title as string)} className="reveal group rounded-2xl border border-[#dcecf3] bg-[#f7fbfd] p-6 text-left transition-all hover:-translate-y-1 hover:border-[#1769d2]/40 hover:bg-[#eaf6fc]">
                    <span className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#1769d2] shadow-sm"><ModeIcon size={18} /></span><ArrowUp size={17} className="text-[#1769d2] transition-transform group-hover:rotate-45" /></span>
                    <span className="mt-9 block font-display text-2xl text-[#092642]">{title as string}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{description as string}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why-us" className="scroll-mt-20 bg-[#092642] py-24 text-white sm:py-32">
          <div className="section-shell">
            <SectionHeading eyebrow="Why families choose us" title="A serious approach, with a human feel." body="Good coaching is not only about getting an answer right. It is about giving a learner the confidence to stay with a difficult question." light />
            <div className="mt-14 grid gap-x-10 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div data-testid={`reason-${index}`} key={reason.title} className="reveal border-t border-white/15 py-7">
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#f8d36b]"><Icon size={18} /></span>
                      <div><h3 className="font-display text-xl">{reason.title}</h3><p className="mt-2 text-sm leading-6 text-sky-100/65">{reason.description}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-8">
              <p className="font-display text-2xl text-sky-100">Small steps become big confidence.</p>
              <button data-testid="button-why-us-contact" onClick={() => goToContact()} className="inline-flex items-center gap-2 rounded-full bg-[#f8d36b] px-5 py-3 text-sm font-bold text-[#092642] transition-transform hover:-translate-y-0.5">Start a conversation <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

        <section className="bg-[#f7fbfd] py-24 sm:py-32">
          <div className="section-shell">
            <SectionHeading eyebrow="A simple beginning" title="How it works" body="No complicated onboarding. Just a thoughtful first conversation and a plan your child can actually follow." />
            <div className="mt-14 grid gap-0 md:grid-cols-4">
              {steps.map((step, index) => (
                <div data-testid={`step-${index}`} key={step.number} className="reveal relative border-l border-[#c9dfe9] pb-10 pl-6 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-8 md:pt-7">
                  <span className="absolute -left-[10px] top-0 grid h-5 w-5 place-items-center rounded-full bg-[#f8d36b] text-[9px] font-bold text-[#092642] md:-top-[10px] md:left-0">{index + 1}</span>
                  <p className="font-mono text-xs font-bold text-[#1769d2]/60">{step.number}</p>
                  <h3 className="mt-7 font-display text-2xl text-[#092642]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="scroll-mt-20 bg-[#dff4ff] py-24 sm:py-32">
          <div className="section-shell grid items-center gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <SectionHeading eyebrow="Words from learners & families" title="Progress sounds different for everyone." body="These are sample/demo testimonials to show the kinds of experiences families value. They are not verified testimonials." />
            <div className="reveal relative rounded-[1.75rem] bg-white p-7 shadow-card sm:p-10">
              <Quote size={41} className="text-[#f8d36b]" fill="currentColor" strokeWidth={1} />
              <p data-testid="text-current-testimonial" className="mt-6 max-w-2xl font-display text-2xl leading-[1.2] text-[#092642] sm:text-3xl">“{currentTestimonial.quote}”</p>
              <div className="mt-9 flex flex-col justify-between gap-5 border-t border-[#dcecf3] pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#092642] text-xs font-bold text-[#f8d36b]">{currentTestimonial.initials}</span>
                  <div><p className="text-sm font-bold text-[#092642]">{currentTestimonial.name}</p><p className="mt-1 text-xs text-muted-foreground">{currentTestimonial.detail} · Sample/demo</p></div>
                </div>
                <div className="flex items-center gap-1 text-[#e3ac13]" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((star) => <Star data-testid={`testimonial-star-${star}`} key={star} size={15} fill="currentColor" />)}
                </div>
              </div>
              <div className="mt-7 flex items-center justify-between">
                <div className="flex gap-1.5">{testimonials.map((testimonial, index) => <button data-testid={`testimonial-dot-${index}`} key={testimonial.initials} onClick={() => setTestimonialIndex(index)} aria-label={`Show testimonial ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === testimonialIndex ? 'w-8 bg-[#1769d2]' : 'w-1.5 bg-[#b9d8e7]'}`} />)}</div>
                <div className="flex gap-2"><button data-testid="button-testimonial-previous" onClick={previousTestimonial} className="grid h-9 w-9 place-items-center rounded-full border border-[#cfe3ec] text-[#1769d2] transition-colors hover:bg-[#eaf6fc]" aria-label="Previous testimonial"><ArrowLeft size={16} /></button><button data-testid="button-testimonial-next" onClick={nextTestimonial} className="grid h-9 w-9 place-items-center rounded-full bg-[#1769d2] text-white transition-colors hover:bg-[#092642]" aria-label="Next testimonial"><ArrowRight size={16} /></button></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="section-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <SectionHeading eyebrow="Questions, answered" title="A clearer yes starts with better information." body="Still deciding? Here are answers to the questions parents ask us most often." />
            <div className="reveal divide-y divide-[#dcecf3] border-y border-[#dcecf3]">
              {faqs.map(([question, answer], index) => {
                const isOpen = faqOpen === index;
                return (
                  <div data-testid={`faq-item-${index}`} key={question}>
                    <button data-testid={`button-faq-${index}`} onClick={() => setFaqOpen(isOpen ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left" aria-expanded={isOpen}>
                      <span className="font-display text-lg text-[#092642]">{question}</span>
                      <ChevronDown size={19} className={`shrink-0 text-[#1769d2] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && <p data-testid={`text-faq-answer-${index}`} className="max-w-2xl pb-6 pr-9 text-sm leading-6 text-muted-foreground">{answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-[#eaf6fc] py-24 sm:py-32">
          <div className="section-shell grid gap-12 lg:grid-cols-[.84fr_1.16fr]">
            <div className="reveal">
              <p className="eyebrow mb-4 text-[#1769d2]">Let’s make a plan</p>
              <h2 className="font-display text-balance text-4xl leading-[1.04] text-[#092642] sm:text-5xl">The next step can be a simple conversation.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">Tell us a little about your child and what you are looking for. We’ll help you find the right course, teacher, and learning mode.</p>
              <div className="mt-9 space-y-5">
                <a data-testid="link-contact-phone" href={phoneHref} className="flex items-center gap-4 text-[#092642] transition-colors hover:text-[#1769d2]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#1769d2] shadow-sm"><Phone size={17} /></span><span><span className="block text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Call us</span><span className="mt-1 block font-semibold">{phoneDisplay}</span></span></a>
                <a data-testid="link-contact-location" href={mapsHref} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#092642] transition-colors hover:text-[#1769d2]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#1769d2] shadow-sm"><MapPin size={17} /></span><span><span className="block text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Visit us</span><span className="mt-1 block max-w-[300px] text-sm font-semibold leading-5">Door No 1, Mudigonda Renuka Nilayam, 311/1, near Gandhi Bomma Center, Kanuru, Vijayawada, Andhra Pradesh 520007, India</span></span></a>
                <div className="flex items-center gap-4 text-[#092642]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#1769d2] shadow-sm"><Clock3 size={17} /></span><span><span className="block text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Hours</span><span className="mt-1 block text-sm font-semibold">Mon – Sat · By appointment</span></span></div>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                <a data-testid="button-call-now" href={phoneHref} className="inline-flex items-center gap-2 rounded-full bg-[#092642] px-4 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"><Phone size={15} /> Call Now</a>
                <a data-testid="button-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#1769d2]/30 bg-white px-4 py-3 text-sm font-bold text-[#1769d2] transition-colors hover:border-[#1769d2]"><MessageCircle size={15} /> WhatsApp Us</a>
                <a data-testid="button-directions" href={mapsHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#1769d2]/30 bg-white px-4 py-3 text-sm font-bold text-[#1769d2] transition-colors hover:border-[#1769d2]"><MapPin size={15} /> Get Directions</a>
              </div>
            </div>
            <form data-testid="contact-form" ref={formRef} onSubmit={submitForm} className="reveal rounded-[1.75rem] border border-[#cbe3ee] bg-white p-6 shadow-card sm:p-9">
              <div className="flex items-center justify-between gap-4 border-b border-[#dcecf3] pb-5"><div><p className="font-display text-2xl text-[#092642]">Start here.</p><p className="mt-1 text-xs text-muted-foreground">We’ll get back to you with the right next step.</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f8d36b] text-[#092642]"><Send size={17} /></span></div>
              {formSent ? (
                <div data-testid="status-form-success" className="flex min-h-[320px] flex-col items-center justify-center text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#dff4ff] text-[#1769d2]"><Check size={25} /></span>
                  <h3 className="mt-5 font-display text-3xl text-[#092642]">Message received.</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Thank you, {formValues.name}. This demo form is complete — please call or WhatsApp us for a real-time response.</p>
                  <button data-testid="button-send-another" type="button" onClick={() => setFormSent(false)} className="mt-7 text-sm font-bold text-[#1769d2] underline underline-offset-4">Send another enquiry</button>
                </div>
              ) : (
                <div className="mt-7 space-y-5">
                  {formError && <p data-testid="status-form-error" className="rounded-xl bg-[#fff0eb] px-4 py-3 text-sm font-semibold text-[#a94d2f]" role="alert">{formError}</p>}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className="mb-2 block text-xs font-bold text-[#092642]">Your name</span><input data-testid="input-name" value={formValues.name} onChange={(event) => updateField('name', event.target.value)} className="h-12 w-full rounded-xl border border-[#cfe3ec] bg-[#f7fbfd] px-4 text-sm outline-none transition-colors focus:border-[#1769d2] focus:ring-2 focus:ring-[#1769d2]/10" placeholder="Parent or student name" /></label>
                    <label className="block"><span className="mb-2 block text-xs font-bold text-[#092642]">Phone number</span><input data-testid="input-phone" type="tel" value={formValues.phone} onChange={(event) => updateField('phone', event.target.value)} className="h-12 w-full rounded-xl border border-[#cfe3ec] bg-[#f7fbfd] px-4 text-sm outline-none transition-colors focus:border-[#1769d2] focus:ring-2 focus:ring-[#1769d2]/10" placeholder="10-digit phone number" /></label>
                  </div>
                  <label className="block"><span className="mb-2 block text-xs font-bold text-[#092642]">I’m interested in</span><select data-testid="select-course" value={selectedCourse || formValues.course} onChange={(event) => { setSelectedCourse(event.target.value); updateField('course', event.target.value); }} className="h-12 w-full rounded-xl border border-[#cfe3ec] bg-[#f7fbfd] px-4 text-sm text-[#092642] outline-none transition-colors focus:border-[#1769d2] focus:ring-2 focus:ring-[#1769d2]/10"><option value="">Select a course or learning mode</option>{courses.map((course) => <option key={course.title} value={course.title}>{course.title}</option>)}<option value="Home Tuition">Home Tuition</option><option value="Online Classes">Online Classes</option><option value="One-to-One Attention">One-to-One Attention</option></select></label>
                  <label className="block"><span className="mb-2 block text-xs font-bold text-[#092642]">A little more (optional)</span><textarea data-testid="input-message" value={formValues.message} onChange={(event) => updateField('message', event.target.value)} className="min-h-[105px] w-full resize-y rounded-xl border border-[#cfe3ec] bg-[#f7fbfd] px-4 py-3 text-sm outline-none transition-colors focus:border-[#1769d2] focus:ring-2 focus:ring-[#1769d2]/10" placeholder="Class, subjects, preferred mode, or any question..." /></label>
                  <button data-testid="button-submit-contact" type="submit" className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#1769d2] px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#092642]">Send enquiry <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
                  <p className="text-center text-[10px] leading-4 text-muted-foreground">By submitting, you are asking our team to contact you about Dynamic Home Tuitions.</p>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#061c32] pt-16 text-white">
        <div className="section-shell grid gap-12 pb-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div><button data-testid="button-footer-logo" onClick={() => scrollToId('home')} className="flex items-center gap-3 text-left"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f8d36b] text-[#092642]"><BookOpen size={19} /></span><span><span className="block font-display text-lg leading-none">Dynamic</span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.2em] text-sky-200">Home Tuitions</span></span></button><p className="mt-6 max-w-xs text-sm leading-6 text-sky-100/60">Learn • Improve • Succeed. Personalised education and coaching for brighter futures in Kanuru, Vijayawada.</p><div className="mt-6 flex gap-2"><a data-testid="link-instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-sky-100/70 transition-colors hover:border-[#f8d36b] hover:text-[#f8d36b]" aria-label="Instagram"><Instagram size={15} /></a><a data-testid="link-youtube" href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-sky-100/70 transition-colors hover:border-[#f8d36b] hover:text-[#f8d36b]" aria-label="YouTube"><Youtube size={15} /></a><a data-testid="link-linkedin" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-sky-100/70 transition-colors hover:border-[#f8d36b] hover:text-[#f8d36b]" aria-label="LinkedIn"><Linkedin size={15} /></a></div></div>
          <div><p className="eyebrow text-sky-200/50">Explore</p><div className="mt-5 space-y-3">{navLinks.slice(0, 4).map(([id, label]) => <button data-testid={`footer-nav-${id}`} key={id} onClick={() => scrollToId(id)} className="block text-sm text-sky-100/65 transition-colors hover:text-white">{label}</button>)}</div></div>
          <div><p className="eyebrow text-sky-200/50">Courses</p><div className="mt-5 space-y-3">{courses.slice(0, 4).map((course) => <button data-testid={`footer-course-${course.number}`} key={course.number} onClick={() => goToContact(course.title)} className="block text-left text-sm text-sky-100/65 transition-colors hover:text-white">{course.title}</button>)}</div></div>
          <div><p className="eyebrow text-sky-200/50">Find us</p><a data-testid="link-footer-address" href={mapsHref} target="_blank" rel="noreferrer" className="mt-5 block max-w-xs text-sm leading-6 text-sky-100/65 transition-colors hover:text-white">Door No 1, Mudigonda Renuka Nilayam, 311/1, near Gandhi Bomma Center, Kanuru, Vijayawada, Andhra Pradesh 520007, India</a><a data-testid="link-footer-phone" href={phoneHref} className="mt-4 block text-sm font-bold text-[#f8d36b]">{phoneDisplay}</a></div>
        </div>
        <div className="border-t border-white/10"><div className="section-shell flex flex-col justify-between gap-2 py-5 text-[11px] text-sky-100/45 sm:flex-row"><span>© 2026 Dynamic Home Tuitions. All rights reserved.</span><span>Built for learners who are ready to grow.</span></div></div>
      </footer>

      {showTop && <button data-testid="button-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#f8d36b] text-[#092642] shadow-float transition-transform hover:-translate-y-1" aria-label="Back to top"><ArrowUp size={18} /></button>}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={AppShell} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;