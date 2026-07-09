import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const SchibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"],
});

const MartianMono = Martian_Mono({
    variable: "--font-martian-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dev Event",
    description:
        "The Dev Event is a conference for developers to learn, share, and connect with each other.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "min-h-screen",
                "antialiased",
                SchibstedGrotesk.variable,
                MartianMono.variable,
                "font-sans",
                geist.variable,
            )}
        >
            <body className="min-h-full flex flex-col">
                <NavBar />
                <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
                    <LightRays
                        raysColor="#5dfeca"
                        raysSpeed={1.5}
                        lightSpread={0.9}
                        rayLength={1.4}
                        followMouse={true}
                        mouseInfluence={0.02}
                        noiseAmount={0.0}
                        distortion={0.01}
                    />
                </div>
                <main>{children}</main>
            </body>
        </html>
    );
}
