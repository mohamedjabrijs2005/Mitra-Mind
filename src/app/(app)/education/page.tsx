import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const educationContent = [
    {
        title: "What is Mental Health Stigma?",
        content: "Mental health stigma refers to the societal disapproval, or when society places shame on people who live with a mental illness or seek help for emotional distress. In India, this can be particularly strong due to cultural beliefs, lack of awareness, and social pressures. Stigma can prevent individuals from seeking help, which can worsen their condition."
    },
    {
        title: "Why is it important to talk about mental health?",
        content: "Openly discussing mental health helps to break down stigma and create a more supportive environment. It normalizes the experience of mental health challenges, encouraging people to seek help without fear of judgment. Talking can also be a powerful first step towards healing and recovery."
    },
    {
        title: "Common Misconceptions in India",
        content: "A common misconception is that mental illness is a sign of personal weakness or a result of a 'fault' in character. Another is that it's caused by supernatural forces or a lack of faith. These beliefs are harmful and scientifically incorrect. Mental illnesses are medical conditions, just like diabetes or heart disease, and they are treatable."
    },
    {
        title: "How can I support someone with a mental health concern?",
        content: "Listen without judgment, offer your support, and encourage them to seek professional help. Educate yourself about their condition. Small acts of kindness and showing that you care can make a huge difference. Avoid using dismissive language like 'just cheer up' or 'it's all in your head'."
    },
];

export default function EducationPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'education-hero');
    return (
        <div className="container mx-auto max-w-4xl py-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline tracking-tight">Understanding Mental Health</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Information to help challenge stigma and promote a culture of understanding and support in India.
                </p>
            </header>
            
            {heroImage && (
                <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        width={1200}
                        height={400}
                        className="w-full object-cover"
                        data-ai-hint={heroImage.imageHint}
                    />
                </div>
            )}

            <Accordion type="single" collapsible className="w-full bg-card p-4 rounded-lg shadow">
                {educationContent.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className={index === educationContent.length - 1 ? "border-b-0" : ""}>
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
