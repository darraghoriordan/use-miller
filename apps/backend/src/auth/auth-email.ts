import nodemailer from "nodemailer";

function hasSmtpConfiguration(): boolean {
    return Boolean(
        process.env.SMTP_EMAIL_HOST &&
        process.env.SMTP_EMAIL_USERNAME &&
        process.env.SMTP_EMAIL_PASSWORD &&
        process.env.EMAIL_SENDER_ADDRESS,
    );
}

function isEmailDeliveryEnabled(): boolean {
    return process.env.EMAIL_SYNC_SEND_ENABLED === "true";
}

export async function sendAuthenticationEmail({
    to,
    subject,
    text,
}: {
    to: string;
    subject: string;
    text: string;
}): Promise<void> {
    const senderAddress = process.env.EMAIL_SENDER_ADDRESS;
    if (!isEmailDeliveryEnabled()) {
        if (process.env.NODE_ENV === "production") {
            throw new Error(
                "EMAIL_SYNC_SEND_ENABLED must be true for authentication email in production",
            );
        }
        // Surface one-time auth links without requiring local email infrastructure.
        console.info(`[auth email] ${subject} for ${to}: ${text}`);
        return;
    }
    if (!hasSmtpConfiguration() || !senderAddress) {
        if (process.env.NODE_ENV === "production") {
            throw new Error(
                "SMTP configuration is required for authentication email",
            );
        }
        // Local development remains usable before an email provider is added.
        console.info(`[auth email] ${subject} for ${to}: ${text}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_EMAIL_HOST,
        port: Number.parseInt(process.env.SMTP_EMAIL_PORT ?? "587", 10),
        secure: process.env.SMTP_EMAIL_SECURE === "true",
        auth: {
            user: process.env.SMTP_EMAIL_USERNAME,
            pass: process.env.SMTP_EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: {
            name: process.env.EMAIL_SENDER_NAME ?? "Miller",
            address: senderAddress,
        },
        to,
        subject,
        text,
    });
}
