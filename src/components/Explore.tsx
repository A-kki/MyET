import { Search, Bell, Bookmark, Share2, Compass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function Explore() {
  const slides = [
    {
      id: 1,
      title: "The Robotics Shift in Last Mile Logistics",
      dek: "Autonomous micro-hubs are reducing delivery emissions by 60% in urban centers.",
      interest: "Emerging Tech",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFnKCh7CR-zmmFCB7BCsZaf2hKUUZATwPkivwSiJBaGcxVMlBLlzw7rC223LmAvfEHUyf-ltu_pDWyWj0xvJpS-2zhyTe6bUqzMSGnSWFusMAK0JVkTjWH0mob3n_7gjKv3BU6Mti2Vuj9HW9nWaOwW7vp3etixhtu-ddB8WKo2WGls2G96PqcGnGRHuQcT32YURk9iSY_SxiPcLlv32INrcGqi5rml7oWfUSLefv42lrsqpMew4EXTUt_5Lqtahd0KjUkOtCSDA"
    },
    {
      id: 2,
      title: "The Capital Efficient Era",
      dek: "How Indian SaaS companies reach $100M ARR with 40% less capital than the US.",
      interest: "Indian Startups",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARCWRpiDZGglTcJnUYIFnUANAxC2Rx5jcLFmEZz8mF-hICQolqXFuDiSTqSL1Zza7P6bOc9v4r2MeXiZnzdNuzwEBOYsoAIQcJXmHhErBJpNKwMMw8yQhqrSnYxCq_VYrhe3OurOO5naj5lZrnW8XCyE7JSqmBwx8eKKJaHQWLKjqDQYPXf37n8YmcjINPsQwXwgVw3mxUhWUIPoD6Lh1I0C5n2L48DKXPFK3LxyN2cXCK-XCTVxYBm8IH24NlYPYPbOlqRhbghw"
    }
  ];

  return (
    <div className="h-screen overflow-hidden bg-black">
      <header className="fixed top-0 left-0 w-full z-50 px-6 h-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-4">
          <h1 className="font-headline italic text-2xl tracking-tight text-primary">MyET</h1>
        </div>
        <div className="flex gap-6 items-center">
          <button className="font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors">Following</button>
          <div className="flex flex-col items-center">
            <button className="font-label text-xs uppercase tracking-widest text-white font-bold">For You</button>
            <div className="h-0.5 w-4 bg-primary mt-1"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-white" />
          <Bell className="w-5 h-5 text-white" />
        </div>
      </header>

      <main className="h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
        {slides.map((slide) => (
          <section key={slide.id} className="h-screen w-full snap-start relative">
            <img 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover" 
              src={slide.image} 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end px-6 pb-28">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="max-w-[80%]"
              >
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary bg-black/40 backdrop-blur-md px-2 py-1 mb-3 inline-block">
                  Based on your interest in {slide.interest}
                </span>
                <h2 className="font-headline text-3xl font-bold text-white mb-2 leading-tight">{slide.title}</h2>
                <p className="font-body text-on-surface-variant text-sm italic mb-4">{slide.dek}</p>
              </motion.div>
            </div>

            <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
              <ActionButton icon={Compass} label="Deep Dive" active />
              <ActionButton icon={Bookmark} label="Save" />
              <ActionButton icon={Share2} label="Share" />
              <ActionButton icon={Sparkles} label="Ask MyET" active />
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

function ActionButton({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <button className={`w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all active:scale-95 ${active ? 'bg-white/10 text-primary border border-primary/30' : 'bg-white/10 text-white'}`}>
        <Icon className="w-6 h-6" style={active ? { fill: 'currentColor' } : {}} />
      </button>
      <span className="font-label text-[9px] uppercase tracking-tighter text-on-surface-variant">{label}</span>
    </div>
  );
}
