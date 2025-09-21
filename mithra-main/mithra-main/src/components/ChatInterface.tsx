import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Heart } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Mitra, your AI companion for mental wellness. I'm here to listen, support, and help you navigate your thoughts and feelings. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getContextualResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Sad/depressed keywords
    if (message.includes('sad') || message.includes('depressed') || message.includes('down') || message.includes('lonely')) {
      const sadResponses = [
        "I'm really sorry you're feeling this way. It's brave of you to share these feelings with me. What's been weighing on your heart lately?",
        "Sadness is a natural part of the human experience, and it's okay to feel this way. Would you like to talk about what's making you feel down?",
        "I hear the pain in your words. You don't have to go through this alone. What small thing could bring you a tiny bit of comfort right now?"
      ];
      return sadResponses[Math.floor(Math.random() * sadResponses.length)];
    }
    
    // Anxious/worried keywords
    if (message.includes('anxious') || message.includes('worried') || message.includes('stressed') || message.includes('overwhelmed')) {
      const anxiousResponses = [
        "Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Let's work through this together. What's triggering these feelings?",
        "I understand that feeling stressed can be exhausting. Would you like to try a quick breathing exercise, or would you prefer to talk about what's causing your worry?",
        "It sounds like you're carrying a heavy load right now. What's one thing on your mind that we could break down into smaller, manageable pieces?"
      ];
      return anxiousResponses[Math.floor(Math.random() * anxiousResponses.length)];
    }
    
    // Happy/good keywords
    if (message.includes('happy') || message.includes('good') || message.includes('great') || message.includes('excited')) {
      const happyResponses = [
        "I love hearing that you're feeling good! Your positive energy is wonderful. What's bringing you joy today?",
        "That's fantastic! It's beautiful to see you in such a positive space. Would you like to share what's making you feel so happy?",
        "Your happiness is contagious! It's important to celebrate these good moments. What would you like to do to keep this positive energy flowing?"
      ];
      return happyResponses[Math.floor(Math.random() * happyResponses.length)];
    }
    
    // Tired/exhausted keywords  
    if (message.includes('tired') || message.includes('exhausted') || message.includes('drained') || message.includes('sleep')) {
      const tiredResponses = [
        "Being tired can really affect how we feel emotionally. Are you getting enough rest, or is something keeping you from sleeping well?",
        "Physical and mental exhaustion often go hand in hand. What's been demanding most of your energy lately?",
        "Rest is so important for our mental health. Would you like to talk about your sleep routine or what's been draining your energy?"
      ];
      return tiredResponses[Math.floor(Math.random() * tiredResponses.length)];
    }
    
    // Angry/frustrated keywords
    if (message.includes('angry') || message.includes('mad') || message.includes('frustrated') || message.includes('annoyed')) {
      const angryResponses = [
        "It sounds like you're feeling really frustrated right now. Anger can be a signal that something important to you isn't being respected. What's got you feeling this way?",
        "I can sense your frustration. It's okay to feel angry - it's a valid emotion. Would you like to talk about what triggered these feelings?",
        "Anger can be intense and overwhelming. You're in a safe space here. What situation or person has you feeling so frustrated?"
      ];
      return angryResponses[Math.floor(Math.random() * angryResponses.length)];
    }
    
    // Default supportive responses
    const defaultResponses = [
      "I hear you, and your feelings are completely valid. Would you like to share more about what's on your mind?",
      "Thank you for opening up to me. It takes courage to express your feelings. How can I support you right now?",
      "I'm here with you. Sometimes just talking about things can help us process them better. What would help you feel more at ease?",
      "Your mental health journey is unique and important. Every small step you take matters. What's one thing that brought you comfort recently?",
      "I appreciate you trusting me with your thoughts. Remember, it's okay to feel what you're feeling. What would you like to explore together?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Generate contextual AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getContextualResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[500px] flex flex-col bg-gradient-subtle border-primary/20">
      <div className="flex items-center gap-3 p-4 border-b border-primary/10">
        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Mitra AI</h3>
          <p className="text-sm text-muted-foreground">Your Mental Wellness Companion</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-gradient-primary'
              }`}>
                {message.isUser ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <div
                className={`max-w-[70%] p-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-card border border-primary/20 mr-4'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-card border border-primary/20 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-primary/10">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 border-primary/20 focus:border-primary/40"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-primary hover:shadow-elegant text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};