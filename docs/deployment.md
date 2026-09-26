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

Enquiries are not sent until SMTP is configured on the server. Without it, the form says delivery is unavailable and offers the visitor’s own email programme.

Set these only on the server, never in the browser bundle:

```
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
MAIL_FROM
```

`MAIL_FROM` must be an address the mail service is allowed to send from. The recipient is fixed in code as nrinternationalexport@gmail.com. The visitor’s email is used as Reply-To.

The in-memory rate limit is for a single server process. A host that runs more than one instance needs a shared limiter.

## Domain

Set `NEXT_PUBLIC_SITE_URL` to the real https origin before launch. Until it is set, the site asks search engines not to index it. Privacy and terms stay noindex even after that, until they are approved.
