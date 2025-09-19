"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BrainCircuit, BookOpen, HeartPulse, ClipboardList, MessageCircle } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const menuItems = [
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/resources", label: "Resources", icon: ClipboardList },
    { href: "/mood-tracker", label: "Mood Tracker", icon: HeartPulse },
    { href: "/education", label: "Learn", icon: BookOpen },
]

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/chat" className="flex items-center gap-2.5 text-xl font-semibold font-headline text-sidebar-foreground hover:text-sidebar-primary transition-colors">
                    <div className="bg-primary text-primary-foreground p-2 rounded-md">
                        <BrainCircuit className="h-6 w-6" />
                    </div>
                    <span>MitraMind</span>
                </Link>
            </SidebarHeader>
            <SidebarMenu>
                {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href} legacyBehavior passHref>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.href}
                                className="w-full justify-start"
                            >
                                <a>
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </a>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </Sidebar>
    )
}
