import crypto from 'crypto';

/**
 * Generates a unique email address.
 * @returns {string} - A unique email address.
 */
function generateUniqueEmail(): string {
    return `email-${crypto.randomUUID()}@example.com`;
}

export default generateUniqueEmail;