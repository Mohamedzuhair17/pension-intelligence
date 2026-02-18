import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mic, Plus, Search, MessageSquare, Copy, ThumbsUp,
  ThumbsDown, Clock, Bot, User, ChevronRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import type { Message } from '@/types';

const suggestedQuestions = [
  'What are the tax benefits of NPS?',
  'How can I withdraw from Tier I?',
  'What is the best fund allocation for my age?',
  'Explain NPS Tier I vs Tier II differences',
];

const mockResponses: Record<string, string> = {
  default: `Based on PFRDA guidelines, here's what you need to know:

**Tax Benefits under NPS:**
- **Section 80CCD(1):** Deduction up to 10% of salary (max ₹1.5 lakh combined with 80C)
- **Section 80CCD(1B):** Additional ₹50,000 exclusive deduction
- **Section 80CCD(2):** Employer contribution up to 14% of salary (Govt) / 10% (Others)

This means you could potentially save up to **₹2 lakh** annually on taxes through NPS contributions.

Would you like me to calculate your specific tax savings based on your contribution amount?`,
};

export default function AssistantPage() {
  const { conversations, currentConversation, addMessage, clearConversation } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [currentConversation]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addMessage(userMsg);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponses.default,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 'High',
        sources: ['PFRDA Circular No. PFRDA/2023/45', 'Income Tax Act Section 80CCD'],
      };
      addMessage(botMsg);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-4 max-w-7xl">
      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-card rounded-2xl border border-border overflow-hidden shrink-0 hidden lg:flex flex-col"
          >
            <div className="p-4 border-b border-border">
              <Button onClick={() => { clearConversation(); }} size="sm" className="w-full gradient-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-1.5" /> New Chat
              </Button>
            </div>
            <div className="p-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search chats..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
              {conversations.map((conv) => (
                <button key={conv.id} className="w-full text-left p-3 rounded-xl hover:bg-secondary transition-colors group">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate">{conv.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate pl-6">{conv.lastMessage}</p>
                  <span className="text-[10px] text-muted-foreground/60 pl-6">{conv.timestamp}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col bg-card rounded-2xl border border-border overflow-hidden">
        {/* Chat header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center">
              <Bot className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-foreground">NPS AI Assistant</h3>
              <span className="text-[11px] text-emerald flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-soft" /> Online
              </span>
            </div>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            <Sparkles className="w-3 h-3 mr-1" /> AI Powered
          </Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentConversation.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">How can I help you today?</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md">
                Ask me anything about NPS — contributions, withdrawals, tax benefits, fund allocation, and more.
                I support Hindi, Tamil, Telugu, and 10+ Indian languages.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    className="text-left p-3 rounded-xl border border-border hover:bg-secondary transition-colors text-sm text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentConversation.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
              <div className={`max-w-[70%] ${msg.role === 'user' ? 'gradient-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3' : 'bg-secondary rounded-2xl rounded-bl-md px-4 py-3'}`}>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content.split('\n').map((line, i) => {
                    const boldParsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return <p key={i} className={i > 0 ? 'mt-1' : ''} dangerouslySetInnerHTML={{ __html: boldParsed }} />;
                  })}
                </div>
                <div className={`flex items-center gap-2 mt-2 text-[10px] ${msg.role === 'user' ? 'text-primary-foreground/50 justify-end' : 'text-muted-foreground'}`}>
                  <Clock className="w-3 h-3" />
                  {msg.timestamp}
                  {msg.confidence && (
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                      {msg.confidence}
                    </Badge>
                  )}
                </div>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1 mt-2">
                    <button className="p-1 rounded hover:bg-background/50 text-muted-foreground"><Copy className="w-3.5 h-3.5" /></button>
                    <button className="p-1 rounded hover:bg-background/50 text-muted-foreground"><ThumbsUp className="w-3.5 h-3.5" /></button>
                    <button className="p-1 rounded hover:bg-background/50 text-muted-foreground"><ThumbsDown className="w-3.5 h-3.5" /></button>
                  </div>
                )}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground font-medium">Sources:</span>
                    {msg.sources.map((src, i) => (
                      <span key={i} className="text-[10px] text-accent ml-1 cursor-pointer hover:underline">{src}</span>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about NPS, contributions, tax benefits..."
                rows={1}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="absolute right-3 bottom-3 text-[10px] text-muted-foreground/50">{input.length}/2000</span>
            </div>
            <button className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="gradient-accent text-accent-foreground h-11 px-5">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
