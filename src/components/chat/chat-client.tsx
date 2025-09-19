"use client";

import { useState, useRef, useEffect } from "react";
import { getEmpatheticResponseAction } from "@/app/(app)/chat/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Loader2, Send, User, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export function ChatClient() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: "Hello! I'm Mitra, your AI wellness companion. How are you feeling today? Feel free to share what's on your mind. I'm here to listen." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPanicButton, setShowPanicButton] = useState(false);
    const [isCrisisAlertOpen, setIsCrisisAlertOpen] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setShowPanicButton(false);

        const response = await getEmpatheticResponseAction(input);

        if (response.inDistress) {
            setShowPanicButton(true);
        }

        const aiMessage: Message = { role: 'ai', content: response.aiResponse };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    return (
        <>
            <Card className="h-[calc(100vh-12rem)] flex flex-col">
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : '')}>
                                {message.role === 'ai' && (
                                    <Avatar className="bg-primary/20 text-primary shrink-0">
                                        <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("max-w-md rounded-lg px-4 py-3 shadow-sm", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                                {message.role === 'user' && (
                                    <Avatar className="bg-accent/20 text-accent-foreground shrink-0">
                                        <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-4">
                                <Avatar className="bg-primary/20 text-primary shrink-0">
                                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted rounded-lg px-4 py-3 flex items-center shadow-sm">
                                    <Loader2 className="h-5 w-5 text-muted-foreground animate-spin"/>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <CardContent className="p-4 border-t">
                    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
                        {showPanicButton && (
                             <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => setIsCrisisAlertOpen(true)}
                                className="shrink-0"
                                aria-label="Panic Button"
                            >
                                <AlertTriangle className="h-5 w-5" />
                            </Button>
                        )}
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message here..."
                            rows={1}
                            className="flex-1 resize-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                            <Send className="h-4 w-4"/>
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <AlertDialog open={isCrisisAlertOpen} onOpenChange={setIsCrisisAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Immediate Support Needed?</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div>
                                <p>It seems like you might be in distress. Please reach out to a professional who can support you. Here are some resources that can help right now:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li><strong>AASRA:</strong> <a href="tel:+919820466726" className="underline">+91-9820466726</a></li>
                                    <li><strong>Vandrevala Foundation:</strong> <a href="tel:18602662345" className="underline">1860-2662-345</a> or <a href="tel:18002333330" className="underline">1800-2333-330</a></li>
                                    <li><strong>iCALL:</strong> <a href="tel:02225521111" className="underline">022-25521111</a></li>
                                </ul>
                                <p className="mt-2">If you are in immediate danger, please call your local emergency services.</p>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsCrisisAlertOpen(false)}>
                            Close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
