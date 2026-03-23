import { useState, useRef, useEffect } from 'react';
import { Mic, Send, Sparkles, Bell, TrendingDown, TrendingUp, StopCircle, Volume2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
  audioUrl?: string;
}

export function AskMyET() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'user',
      text: 'How is the semiconductor supply chain affecting automotive startups in Southeast Asia this quarter?',
      timestamp: '10:42 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const messageText = textOverride || input;
    if (!messageText.trim()) return;

    const userMsg: Message = {
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Use search grounding for up-to-date info as requested
      const response = await geminiService.searchGrounding(messageText);

      const aiMsg: Message = {
        role: 'ai',
        text: response.text || 'I am sorry, I could not process that request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setIsLoading(true);
          try {
            const transcription = await geminiService.transcribeAudio(base64Audio, 'audio/webm');
            if (transcription) {
              handleSend(transcription);
            }
          } catch (error) {
            console.error('Transcription error:', error);
          } finally {
            setIsLoading(false);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playTTS = async (text: string, index: number) => {
    if (isSpeaking === index) return;
    setIsSpeaking(index);
    try {
      const audioUrl = await geminiService.textToSpeech(text);
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.onended = () => setIsSpeaking(null);
        audio.play();
      } else {
        setIsSpeaking(null);
      }
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-surface-container-low flex justify-between items-center px-6 h-16 w-full fixed top-0 z-40 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <span className="font-headline italic text-2xl tracking-tight text-primary">MyET</span>
        </div>
        <div className="flex items-center gap-6">
          <Bell className="w-5 h-5 text-on-surface-variant cursor-pointer" />
          <div className="h-8 w-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNXABWhgMgkmaiqoO58-aAe5D1ym1mZFDw1HRddpu6upJw7bXcXL0QP5oouZ7p9o0XaTLqd5NHChIwj81Xp6TT6Ts76Wg56Kaho9FpGs4fTl83HFmFt5CVfLcNtP-vrx57AommunqHvBEqwN7ZBxbTTAtKWBz55ahi7Tm64mZvWH2TLgXXoIYnneaqRFXK9KCRdWGGw2BotbOa5H_gG9fMjcPuUzt-F1Lpu7WxDhURTsO2sAsn3ihVIAl2FsqpIM4aZaOsAesrTA" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </nav>

      <main ref={scrollRef} className="flex-1 pt-20 pb-32 px-6 max-w-4xl mx-auto w-full overflow-y-auto no-scrollbar">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant bg-surface-container-low px-3 py-1">Context Analysis</span>
          <span className="text-xs text-on-surface-variant italic">Based on your recent activity</span>
        </div>

        <div className="space-y-12">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? "flex flex-col items-end w-full" : "flex flex-col gap-8"}>
              {msg.role === 'user' ? (
                <>
                  <div className="max-w-[85%] bg-surface-container px-6 py-4 rounded-lg">
                    <p className="text-lg font-body leading-relaxed text-on-surface">{msg.text}</p>
                  </div>
                  <span className="font-label text-[10px] text-on-surface-variant mt-2 px-1">{msg.timestamp}</span>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-6 flex justify-between items-start">
                    <div>
                      <h2 className="font-headline text-3xl text-on-surface leading-tight">Intelligence Ledger Response</h2>
                    </div>
                    <button 
                      onClick={() => playTTS(msg.text, idx)}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        isSpeaking === idx ? "text-primary animate-pulse" : "text-on-surface-variant hover:text-primary"
                      )}
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="bg-surface-container-low p-8 rounded-sm prose prose-invert max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Initial Mock Response Structure for Visual Fidelity */}
          {messages.length === 1 && (
            <div className="flex flex-col gap-8">
              <div className="border-l-2 border-primary pl-6">
                <h2 className="font-headline text-3xl text-on-surface leading-tight">Supply Chain Resilience & Regional Headwinds</h2>
                <p className="font-label text-sm text-primary mt-1 tracking-wide uppercase">Sector: Automotive Tech • Region: SE Asia</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                <div className="md:col-span-2 bg-surface-container-low p-8">
                  <h3 className="font-headline text-xl mb-4 italic">Executive Summary</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    The shift from "just-in-time" to "just-in-case" inventory models has increased capital expenditure for early-stage automotive startups by <span className="text-primary font-medium">18% year-on-year</span>. While regional chip fabrication in Malaysia offers a buffer, specialized logic units remain constrained.
                  </p>
                </div>
                <div className="bg-surface-container-high p-8 flex flex-col justify-between">
                  <div>
                    <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Lead Entity</span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-headline text-2xl text-on-surface">VinFast</span>
                      <TrendingDown className="w-4 h-4 text-error" />
                    </div>
                  </div>
                  <div className="mt-6 border-t border-outline-variant/20 pt-4">
                    <span className="font-label text-[10px] uppercase text-on-surface-variant">Risk Rating</span>
                    <div className="text-xl font-label text-primary">MODERATE</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center gap-2 text-primary animate-pulse">
              <SparklesIcon className="w-5 h-5" />
              <span className="font-label text-xs uppercase tracking-widest">Analyzing markets...</span>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-24 left-0 w-full px-6 z-40 pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <div className={cn(
            "relative glass-panel rounded-full border flex items-center px-6 py-4 shadow-2xl transition-all",
            isRecording ? "border-error bg-error/10" : "border-primary/20"
          )}>
            <SparklesIcon className="w-6 h-6 text-primary mr-4" />
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant w-full font-body text-base" 
              placeholder={isRecording ? "Listening..." : "Ask anything about markets, startups, or your interests"}
              type="text"
              disabled={isRecording}
            />
            <div className="flex items-center gap-3 ml-4">
              <button 
                onClick={isRecording ? stopRecording : startRecording}
                className={cn(
                  "p-2 rounded-full transition-all",
                  isRecording ? "text-error animate-pulse scale-110" : "text-on-surface-variant hover:text-primary"
                )}
              >
                {isRecording ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => handleSend()}
                className="bg-primary hover:bg-primary-dim text-on-primary font-label text-[10px] font-bold uppercase tracking-tighter px-4 py-1.5 rounded-full transition-transform active:scale-95"
              >
                QUERY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ fill: 'currentColor' }}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  );
}
