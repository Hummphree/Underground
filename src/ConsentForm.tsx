import React from 'react';
import { FileText } from 'lucide-react';

const ConsentForm: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-12 animate-in fade-in duration-1000">

            <div className="space-y-4">
                <h1 className="flex items-center gap-4 text-4xl md:text-5xl font-black uppercase italic text-accent-primary bg-grunge-black px-6 py-3 w-fit rotate-[-1deg]">
                    <FileText className="w-8 h-8" /> CONSENT FORM
                </h1>
                <p className="text-foreground/60 font-bold uppercase italic tracking-widest text-sm">
                    Below Ground Ink — Kane, PA
                </p>
            </div>

            <div className="bg-grunge-black border-8 border-grunge-black relative rotate-[0.5deg] hover:rotate-0 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-2 bg-accent-primary animate-pulse" />

                <div className="p-8 md:p-12 space-y-10 text-foreground/80 font-bold text-sm leading-relaxed uppercase tracking-wide">

                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-accent-primary font-black uppercase italic text-xl tracking-widest border-b-4 border-accent-primary/20 pb-2">
                            I. VOLUNTARY CONSENT
                        </h2>
                        <p>
                            I, the undersigned, voluntarily consent to receive a tattoo from an artist at Below Ground Ink. I understand that tattooing is an invasive procedure and agree to undergo the procedure of my own free will.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-accent-primary font-black uppercase italic text-xl tracking-widest border-b-4 border-accent-primary/20 pb-2">
                            II. HEALTH & MEDICAL DISCLOSURE
                        </h2>
                        <p>
                            I confirm that I am in good health and am not under the influence of alcohol or drugs. I acknowledge and disclose the following conditions if applicable:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-foreground/60 ml-4">
                            <li>Heart condition or blood pressure issues</li>
                            <li>Diabetes or immune system disorders</li>
                            <li>Blood-thinning medications (e.g., aspirin, warfarin)</li>
                            <li>History of keloid scarring</li>
                            <li>Skin conditions such as psoriasis or eczema</li>
                            <li>Pregnancy or breastfeeding</li>
                            <li>Epilepsy or seizure disorders</li>
                            <li>Hemophilia or bleeding disorders</li>
                        </ul>
                        <p>
                            I agree to disclose any other conditions that may affect the tattooing process to my artist prior to the session.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-accent-primary font-black uppercase italic text-xl tracking-widest border-b-4 border-accent-primary/20 pb-2">
                            III. ALLERGY DISCLAIMER
                        </h2>
                        <p>
                            I understand that tattoo inks, soaps, and aftercare products used during and after the procedure may contain ingredients that could cause allergic reactions. I have disclosed all known allergies to my artist. Below Ground Ink is not liable for allergic reactions that occur as a result of undisclosed allergies.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-accent-primary font-black uppercase italic text-xl tracking-widest border-b-4 border-accent-primary/20 pb-2">
                            IV. RISK ACKNOWLEDGMENT
                        </h2>
                        <p>
                            I understand and accept that tattooing involves certain risks, including but not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-foreground/60 ml-4">
                            <li>Infection if aftercare instructions are not followed properly</li>
                            <li>Allergic reaction to ink pigments or aftercare products</li>
                            <li>Scarring or keloid formation</li>
                            <li>Fading or distortion over time</li>
                            <li>Variation in final appearance due to skin type</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-accent-primary font-black uppercase italic text-xl tracking-widest border-b-4 border-accent-primary/20 pb-2">
                            V. AFTERCARE RESPONSIBILITY
                        </h2>
                        <p>
                            I agree to follow all aftercare instructions provided by my artist. I understand that proper aftercare is critical to the healing process and that failure to follow instructions may result in infection, fading, or damage to the tattoo. Below Ground Ink is not responsible for complications arising from improper aftercare.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-accent-primary font-black uppercase italic text-xl tracking-widest border-b-4 border-accent-primary/20 pb-2">
                            VI. AGE VERIFICATION
                        </h2>
                        <p>
                            I confirm that I am 18 years of age or older and have valid government-issued photo identification to prove my age. I understand that tattooing minors is illegal and that Below Ground Ink reserves the right to refuse service if valid ID cannot be produced.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-accent-primary font-black uppercase italic text-xl tracking-widest border-b-4 border-accent-primary/20 pb-2">
                            VII. LIABILITY WAIVER
                        </h2>
                        <p>
                            I release Below Ground Ink, its artists, and staff from any and all liability, claims, demands, and causes of action arising out of or related to the tattooing service, including complications resulting from pre-existing medical conditions, undisclosed allergies, or failure to follow aftercare instructions.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-accent-primary font-black uppercase italic text-xl tracking-widest border-b-4 border-accent-primary/20 pb-2">
                            VIII. DESIGN APPROVAL
                        </h2>
                        <p>
                            I have reviewed and approved the final tattoo design, placement, and size before the procedure began. I understand that tattoos are permanent and that I am solely responsible for the design I have chosen. Refunds are not issued once the tattooing process has begun.
                        </p>
                    </section>

                    <div className="pt-8 border-t-4 border-accent-primary/20 space-y-3 text-foreground/40 text-xs tracking-widest italic">
                        <p>* THIS CONSENT FORM IS PRESENTED FOR INFORMATIONAL PURPOSES ON THIS PAGE.</p>
                        <p>* YOU WILL BE ASKED TO SIGN A PHYSICAL COPY AT YOUR APPOINTMENT.</p>
                        <p>* BELOW GROUND INK — KANE, PA</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsentForm;
