import React, { useState } from 'react';
import GlassCard from './components/GlassCard';
import { Skull, Zap, Send } from 'lucide-react';
import type { ContactFields, ContactErrors } from './utils/sanitize';
import {
    validateContactForm,
    sanitizeText,
    isValid,
} from './utils/sanitize';

const EMPTY_FIELDS: ContactFields = { name: '', email: '', message: '' };
const EMPTY_ERRORS: ContactErrors = {};

const Contact: React.FC = () => {
    const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS);
    const [errors, setErrors] = useState<ContactErrors>(EMPTY_ERRORS);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
        // Clear the relevant error on change
        if (errors[name as keyof ContactErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateContactForm(fields);
        if (!isValid(validationErrors)) {
            setErrors(validationErrors);
            return;
        }

        // Build sanitized payload — safe to send to a backend
        const payload = {
            name: sanitizeText(fields.name),
            email: fields.email.trim(),
            message: sanitizeText(fields.message),
        };

        // TODO: replace with actual fetch/email-service call
        console.log('[Contact] Sanitized submission payload:', payload);
        setSubmitted(true);
        setFields(EMPTY_FIELDS);
        setErrors(EMPTY_ERRORS);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-20 py-12 animate-in fade-in duration-700">
            <div className="text-center space-y-6">
                <div className="inline-block bg-grunge-black p-4 rotate-[-3deg]">
                    <Skull className="w-12 h-12 text-accent-primary" />
                </div>
                <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary py-4 px-8 rotate-1 inline-block">
                    THE <span className="text-foreground">RIDER</span>
                </h1>
                <p className="text-foreground font-black text-xl uppercase tracking-widest italic pt-4">
                    SUBMIT YOUR DEMANDS. NO FLUFF.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-1 space-y-8">
                    <GlassCard className="space-y-6 bg-grunge-black border-accent-primary" withTape>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-black uppercase tracking-widest text-accent-primary">ENCRYPTED LINE</h4>
                            <p className="text-2xl font-black italic text-foreground leading-none">555-RIOR-INK</p>
                        </div>
                    </GlassCard>

                    <GlassCard className="space-y-6 bg-accent-secondary border-grunge-black" withTape>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-black uppercase tracking-widest text-grunge-black/60">THE DROPBOX</h4>
                            <p className="text-xl font-black italic text-grunge-black break-all leading-none">DEMOS@UNDERGROUND.VOID</p>
                        </div>
                    </GlassCard>
                </div>

                <div className="md:col-span-2 relative">
                    <div className="absolute -inset-4 border-4 border-grunge-black rotate-1 pointer-events-none" />
                    <GlassCard className="h-full">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full gap-6 py-12 text-center">
                                <Zap className="w-16 h-16 text-accent-primary fill-current" />
                                <p className="text-3xl font-black italic uppercase tracking-tighter text-foreground">
                                    SIGNAL RECEIVED.
                                </p>
                                <p className="text-foreground/60 font-bold uppercase tracking-widest text-sm">
                                    WE'LL BE IN TOUCH.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="grunge-button mt-4 px-8 py-3 text-sm"
                                >
                                    SEND ANOTHER
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="contact-name"
                                            className="text-xs font-black uppercase tracking-widest text-grunge-black/40 ml-1"
                                        >
                                            CODENAME
                                        </label>
                                        <input
                                            id="contact-name"
                                            name="name"
                                            type="text"
                                            value={fields.name}
                                            onChange={handleChange}
                                            maxLength={100}
                                            autoComplete="name"
                                            placeholder="WHO ARE YOU?"
                                            aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                            className={`w-full bg-grunge-black/5 border-b-8 px-4 py-4 text-xl font-black italic uppercase outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-grunge-black focus:border-accent-primary'}`}
                                        />
                                        {errors.name && (
                                            <p id="contact-name-error" role="alert" className="text-xs font-bold text-red-500 uppercase tracking-wide ml-1 mt-1">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="contact-email"
                                            className="text-xs font-black uppercase tracking-widest text-grunge-black/40 ml-1"
                                        >
                                            COMM LINK
                                        </label>
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            value={fields.email}
                                            onChange={handleChange}
                                            maxLength={254}
                                            autoComplete="email"
                                            placeholder="EMAIL/PHONE"
                                            aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                            className={`w-full bg-grunge-black/5 border-b-8 px-4 py-4 text-xl font-black italic uppercase outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-grunge-black focus:border-accent-primary'}`}
                                        />
                                        {errors.email && (
                                            <p id="contact-email-error" role="alert" className="text-xs font-bold text-red-500 uppercase tracking-wide ml-1 mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label
                                        htmlFor="contact-message"
                                        className="text-xs font-black uppercase tracking-widest text-grunge-black/40 ml-1"
                                    >
                                        THE VISION (KEEP IT RAW)
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={6}
                                        value={fields.message}
                                        onChange={handleChange}
                                        maxLength={2000}
                                        placeholder="WHAT'S THE GIG?"
                                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                        className={`w-full bg-grunge-black/5 border-b-8 px-4 py-4 text-xl font-black italic uppercase outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-grunge-black focus:border-accent-primary'}`}
                                    />
                                    {errors.message && (
                                        <p id="contact-message-error" role="alert" className="text-xs font-bold text-red-500 uppercase tracking-wide ml-1 mt-1">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>
                                <button type="submit" className="grunge-button w-full py-6 text-2xl flex items-center justify-center gap-4 group">
                                    SEND THE SIGNAL <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </form>
                        )}
                    </GlassCard>
                </div>
            </div>

            <div className="pt-20 text-center">
                <div className="inline-flex items-center gap-4 bg-grunge-black p-4 rotate-1">
                    <Zap className="w-6 h-6 text-accent-primary fill-current" />
                    <span className="font-black uppercase italic tracking-widest text-xs">Response time varies by intensity</span>
                </div>
            </div>
        </div>
    );
};

export default Contact;
