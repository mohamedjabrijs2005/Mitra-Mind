import { ChatClient } from "@/components/chat/chat-client";

export default function ChatPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Confidential Chat</h1>
        <p className="text-muted-foreground mt-2">
          A safe space to talk about what's on your mind. Your conversation is private and anonymous.
        </p>
      </header>
      <ChatClient />
    </div>
  );
}
