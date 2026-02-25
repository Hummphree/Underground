/**
 * sanitize.ts
 * Input sanitization and validation utilities for all form submissions.
 * Protects against XSS by stripping HTML tags and enforces field rules
 * before any data is sent downstream.
 */

// ---------------------------------------------------------------------------
// Sanitization primitives
// ---------------------------------------------------------------------------

/** Remove all HTML/XML tags from a string. */
export function stripHtml(value: string): string {
    return value.replace(/<[^>]*>/g, '');
}

/** Trim whitespace and strip HTML in one pass. */
export function sanitizeText(value: string): string {
    return stripHtml(value.trim());
}

// ---------------------------------------------------------------------------
// Regex patterns
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-().+]{7,20}$/;
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------

export interface ContactFields {
    name: string;
    email: string;
    message: string;
}

export interface ContactErrors {
    name?: string;
    email?: string;
    message?: string;
}

export function validateContactForm(fields: ContactFields): ContactErrors {
    const errors: ContactErrors = {};

    const name = sanitizeText(fields.name);
    if (!name) {
        errors.name = 'Name is required.';
    } else if (name.length > 100) {
        errors.name = 'Name must be 100 characters or fewer.';
    }

    const email = fields.email.trim();
    if (!email) {
        errors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = 'Please enter a valid email address.';
    } else if (email.length > 254) {
        errors.email = 'Email must be 254 characters or fewer.';
    }

    const message = sanitizeText(fields.message);
    if (!message) {
        errors.message = 'Message is required.';
    } else if (message.length > 2000) {
        errors.message = 'Message must be 2,000 characters or fewer.';
    }

    return errors;
}

// ---------------------------------------------------------------------------
// Scheduling form
// ---------------------------------------------------------------------------

export interface SchedulingFields {
    name: string;
    email: string;
    phone: string;
    description: string;
    files: File[];
    disclaimerChecked: boolean;
}

export interface SchedulingErrors {
    name?: string;
    email?: string;
    phone?: string;
    description?: string;
    files?: string;
    disclaimerChecked?: string;
}

export function validateSchedulingForm(fields: SchedulingFields): SchedulingErrors {
    const errors: SchedulingErrors = {};

    const name = sanitizeText(fields.name);
    if (!name) {
        errors.name = 'Name is required.';
    } else if (name.length > 100) {
        errors.name = 'Name must be 100 characters or fewer.';
    }

    const email = fields.email.trim();
    if (!email) {
        errors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = 'Please enter a valid email address.';
    } else if (email.length > 254) {
        errors.email = 'Email must be 254 characters or fewer.';
    }

    const phone = fields.phone.trim();
    if (!phone) {
        errors.phone = 'Phone number is required.';
    } else if (!PHONE_REGEX.test(phone)) {
        errors.phone = 'Please enter a valid phone number.';
    }

    const description = sanitizeText(fields.description);
    if (!description) {
        errors.description = 'Description is required.';
    } else if (description.length > 2000) {
        errors.description = 'Description must be 2,000 characters or fewer.';
    }

    for (const file of fields.files) {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            errors.files = `"${file.name}" is not allowed. Please upload PNG, JPG, or PDF files only.`;
            break;
        }
    }

    if (!fields.disclaimerChecked) {
        errors.disclaimerChecked = 'You must agree to the consent form to continue.';
    }

    return errors;
}

/** Returns true when an errors object contains no messages. */
export function isValid(errors: ContactErrors | SchedulingErrors): boolean {
    return Object.values(errors).every((v) => v === undefined);
}
