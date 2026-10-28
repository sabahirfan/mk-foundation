# Mubashir Kaleem Foundation website

The website of the Mubashir Kaleem Foundation (MK Foundation), a charity founded in memory of
Mubashir Ahmad Kaleem Sulehri, a school teacher from Pakistan. It raises money in the UK and abroad
for orphans, hungry families, children's education and basic medical care in Pakistan.

Built with Next.js (static export), Tailwind CSS v4 and shadcn/ui, and hosted on GitHub Pages.

## Working on the site

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
npx serve out    # preview the built site
```

## Where to change things

| What | File |
|---|---|
| Name, domain, contact details, bank and PayPal details, registration status | `content/site.ts` |
| The four causes, giving amounts and payment references | `content/causes.ts` |
| His story, the About page and the team | `content/story.ts` |
| Areas we work in and annual reports | `app/transparency/page.tsx` |
| Colours, fonts and the exercise-book styling | `app/globals.css` |

Anything set to `null` in `content/site.ts` is hidden on the site until it is filled in. The site
never shows placeholder bank or payment details.

When the charity is registered, change `registration` in `content/site.ts` to:

```ts
registration: { kind: "registered", charityNumber: "1234567", regulator: "Charity Commission for England and Wales" },
```

The footer, Donate page and donation policy update automatically.

## Before launch

- [ ] Set the domain: the `SITE_URL` repository variable (see below) and the fallback `url` in `content/site.ts`. Canonical links and the sitemap use it.
- [ ] Add the foundation's email and WhatsApp number in `content/site.ts`
- [ ] Add the bank account details in `content/site.ts` (a dedicated account in the foundation's name)
- [ ] Add the PayPal donate link in `content/site.ts`
- [ ] Add a Web3Forms access key in `content/site.ts` to turn on the contact form
- [ ] Confirm the giving amounts in `content/causes.ts` with the people delivering the work
- [ ] Personalise his story in `content/story.ts`, and add a portrait to `public/images/`
- [ ] Check every promise on the site can be kept (visiting families, 30-day refunds, publishing spending)
- [ ] Only set `acceptsZakat: true` once Zakat is kept in a separate fund

## Search engines

Each page sets its own title, description, canonical URL and social card through `pageMetadata()` in
`lib/seo.ts`. Search titles and descriptions for the four causes live in `content/causes.ts`, and the
home page's in `content/site.ts` (`seo`). Structured data (the foundation, the website and breadcrumbs)
is in `components/site/json-ld.tsx`.

After the site is live on its domain:

1. Add the domain to [Google Search Console](https://search.google.com/search-console) as a URL-prefix
   property, choose the **HTML tag** method, and put the `content` value in `verification.google` in
   `content/site.ts`. Push, then press **Verify**.
2. In Search Console, submit `https://<your-domain>/sitemap.xml` under **Sitemaps**.
3. Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters) (`verification.bing`). Bing
   results also power DuckDuckGo.
4. Add the foundation’s social profile links to `social` in `content/site.ts`.
5. Check the structured data with Google’s [Rich Results Test](https://search.google.com/test/rich-results).

## Deploying to GitHub Pages

Every push to `main` builds the site and publishes it through `.github/workflows/deploy.yml`.

One-time setup:

1. Push this repository to GitHub.
2. In the repository settings, under **Pages**, set **Source** to **GitHub Actions**.
3. Under **Settings → Secrets and variables → Actions → Variables**, add `SITE_URL` with the full
   domain, e.g. `https://www.mkfoundation.org`.
4. Under **Pages → Custom domain**, enter the domain and save. (A `CNAME` file isn't needed when
   deploying with Actions.)
5. At the domain registrar, add these DNS records:
   - `A` records for the apex domain: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records for the apex domain: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` record for `www` pointing to `<your-github-username>.github.io`
6. Verify the domain in your GitHub account or organisation settings under **Pages**. This stops
   anyone else from using it.
7. Once the certificate is issued, tick **Enforce HTTPS**.
