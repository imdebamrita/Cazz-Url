import Hero from '@/components/landing/Hero';
import { NavBar } from '@/components/layout/Navbar';
import { Footer } from '@/components/landing/Footer';
import { UseCasesSection } from '@/components/landing/UseCasesSection';
import { AnalyticsPreviewSection } from '@/components/landing/AnalyticsPreviewSection';
import { CTASection } from '@/components/landing/CTASection';
import SystemDesignSection from '@/components/landing/SystemDesignSection';

export default function LandingPage() {
    return (
        <>
            <NavBar />
            <Hero />
            <UseCasesSection />
            <AnalyticsPreviewSection />
            <CTASection />
            <Footer />
        </>
    );
}
