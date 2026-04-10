import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, User, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { cn } from "./lib/utils";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "dummy_key" });

export function RizviChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Hi! I am Rizvi, your College Buzz assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Build history for context
      const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Rizvi'}: ${m.text}`).join('\n');
      const prompt = `You are Rizvi, a helpful and friendly AI assistant for the "College Buzz" campus platform. 
Keep your answers concise and helpful.
Chat History:
${history}
User: ${userText}
Rizvi:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm not sure how to respond to that." }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Rizvi Chatbot"
        className={cn(
          "fixed bottom-6 right-6 p-4 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white rounded-full shadow-[0_8px_24px_rgba(168,85,247,0.4)] hover:scale-105 hover:shadow-[0_12px_32px_rgba(168,85,247,0.5)] transition-all z-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/50",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-80 sm:w-96 bg-surface-lowest rounded-2xl shadow-[0_20px_60px_-15px_rgba(53,37,205,0.2)] border border-outline-variant/20 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right z-50",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
        style={{ height: '500px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold">Rizvi</h3>
              <p className="text-xs opacity-80">College Buzz Assistant</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat"
            className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-surface-low text-on-surface" : "bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              <div className={cn(
                "px-4 py-2 rounded-2xl max-w-[75%] text-sm",
                msg.role === 'user' 
                  ? "bg-primary text-on-primary rounded-tr-sm" 
                  : "bg-surface-lowest border border-outline-variant/20 text-on-surface rounded-tl-sm shadow-sm"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-surface-lowest border border-outline-variant/20 text-on-surface rounded-tl-sm shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                <span className="text-xs text-on-surface-variant">Rizvi is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-surface-lowest border-t border-outline-variant/20">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Rizvi..."
              className="flex-1 bg-surface-low rounded-full py-2.5 px-4 text-sm outline-none border border-transparent focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send Message"
              className="p-2.5 bg-primary text-on-primary rounded-full hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
