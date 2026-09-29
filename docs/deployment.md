# Run and deploy

From the `web` folder:

```
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```
npm run build
npm start
```

## Mail

Contact and quote enquiries are sent with [Resend](https://resend.com) to contact@nrinternationalexport.com. SMTP is an optional fallback used only when `RESEND_API_KEY` is empty. With neither configured, the form says delivery is unavailable and offers the visitor’s own email programme.

Set these only on the server (`.env` locally, or the host’s environment settings), never in the browser bundle:

```
RESEND_API_KEY      Resend API key (re_...)
MAIL_FROM           Sender, e.g. "NR International Export <enquiries@nrinternationalexport.com>"
ENQUIRY_TO_EMAIL    Recipient, defaults to contact@nrinternationalexport.com (business.enquiryEmail)
SMTP_HOST / SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASS   optional fallback
```

Resend setup:

1. Add the domain nrinternationalexport.com in Resend and add the DNS records it shows (SPF, DKIM). Wait until it is verified.
2. Create an API key with sending access and put it in `RESEND_API_KEY`.
3. `MAIL_FROM` must use the verified domain. Before verification, only Resend’s test sender `onboarding@resend.dev` works, and it can only deliver to the Resend account owner’s address.
4. Make sure contact@nrinternationalexport.com is a real mailbox or forward.

The visitor’s email is used as Reply-To, so replying from the inbox goes straight to the buyer. Restart `npm run dev` after editing `.env`.

The in-memory rate limit is for a single server process. A host that runs more than one instance needs a shared limiter.

## Domain

Set `NEXT_PUBLIC_SITE_URL` to the real https origin before launch. Until it is set, the site asks search engines not to index it. Privacy and terms stay noindex even after that, until they are approved.
