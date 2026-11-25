# Contact form backend / CORS deployment note

The new website's contact form has been connected to the Cloudflare Worker URL used by the previous website:

`https://blixtoys-enquiry-api.developer-dad.workers.dev/`

The browser sends the same JSON field names used by the existing enquiry integration (`name`, `company`, `email`, `phone`, `project`, `quantity`, `message`, `consent`, `website`, `sourcePage`). The current new-site form does not expose an estimated-quantity field, so `quantity` is submitted as an empty string; no form layout or fields were changed.

## CORS

CORS response headers are controlled by the Worker, not by static HTML/JavaScript. The previous ZIP contained the frontend integration and the deployed Worker URL, but did **not** include the Worker source or its deployed CORS configuration. The website ZIP therefore cannot directly change the live Worker’s allowed-origin setting.

In the Cloudflare Worker configuration/code, ensure:
- `Access-Control-Allow-Origin` exactly matches the origin serving this site (including `https://` and `www` if applicable; do not use a path).
- `Access-Control-Allow-Methods` includes `POST, OPTIONS`.
- `Access-Control-Allow-Headers` includes `Content-Type`.
- The Worker responds to `OPTIONS` preflight with a successful status and those CORS headers.
- The same CORS headers are included on actual `POST` success and error responses.

For GitHub Pages custom-domain deployment, allow the exact production origin(s) used by the site. For local testing, separately allow the local server origin (for example `http://localhost:8000`). Do not use `Access-Control-Allow-Origin: *` with credentialed requests.

If the deployed Worker already has the correct CORS configuration, the restored endpoint and integration should work without a backend redeployment. If the browser still reports a CORS error, update/redeploy the Worker itself.
