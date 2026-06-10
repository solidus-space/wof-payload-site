# Content Models for the WOF Payload CMS Migration

Analysis of the current WordPress sites — [womenofthefuture.co.uk](https://womenofthefuture.co.uk),
[esg.womenofthefuture.co.uk](https://esg.womenofthefuture.co.uk) and
[kindnessrules.co.uk](https://kindnessrules.co.uk) — and the Payload collections we'll need to
migrate them.

## What the current sites contain

### womenofthefuture.co.uk (main site)

- Standard WP **pages** (Home, About, Our Community, News & Press, Sponsorship, Cookie Policy…).
- **Posts** organised by category: `awards`, `ambassadors`, `network`, `summit`, `press`,
  `uncategorized`.
- Custom post type `connectedprograms` — the nine "connected programmes":
  Podcast, WOF UK Awards, WOF Southeast Asia, WOF Summit, WOF Network, Ambassadors Programme,
  50 Rising Stars in ESG, Kindness Campaign (UK), Kindness Campaign (APAC).
- Custom post type `wofpsupporters` — VIP supporters/patrons with profile pages
  (e.g. HRH The Duchess of Edinburgh, Cherie Blair CBE KC).
- Logo showcases (`lshowcase`) for sponsors/partners (Aviva, PwC, NTT, FT, Saïd Business School…).
- Testimonial quotes, impact statistics ("x% agreed the programme impacted their confidence…"),
  and a newsletter signup.

### esg.womenofthefuture.co.uk (50 Rising Stars in ESG)

Awards microsite: About, Contact, nomination timeline, plus custom types:

- `categories_criteria` — award categories with judging criteria.
- `candidateyear_taxonomies` — winners/alumnae grouped by year (e.g. "2025 Alumnae").

### kindnessrules.co.uk (Kindness & Leadership, 50 Leading Lights)

Campaign site with regional editions (UK, Asia Pacific), eligibility criteria, a nomination
timeline, leader quotes/testimonials (Jürgen Klopp, Alan Jope…), research booklet downloads and
"in association with" partner logos.

## Recommended Payload collections

Already in place: `users`, `media`.

### Core (as anticipated in the issue)

1. **`pages`** — flexible layout-builder pages (hero, rich text, stats, logo grids, testimonial
   blocks, CTA/newsletter blocks). Fields: title, slug, blocks layout, SEO meta, `site` select
   (main / esg / kindness) so one Payload instance can serve all three domains.
2. **`posts`** — news/blog. Fields: title, slug, hero image, rich text, excerpt, published date,
   relationship to `categories` (awards, ambassadors, network, summit, press), author, SEO meta.
3. **`people`** — award winners, alumnae, shortlistees, judges, supporters/patrons and
   ambassadors. Fields: name, photo, bio, role/title, organisation, type select
   (winner / shortlisted / judge / supporter / ambassador / team), social links, and
   relationships to `awards` (edition + category they won/were shortlisted in).
4. **`schools`** — Ambassadors programme participants. Fields: name, logo, location/region,
   contact, linked ambassadors (`people`), notes on visits/events.

### Additional models identified from the sites

5. **`programmes`** — replaces the `connectedprograms` CPT. Fields: name, logo, strapline,
   description, external URL (for the microsites), order, sponsor relationship.
6. **`awards`** (award editions) — one document per award programme + year
   (e.g. "WOF Awards UK 2023", "AWA 2023", "50 Rising Stars in ESG 2025",
   "50 Leading Lights APAC 2026"). Fields: programme relationship, year, region,
   headline sponsor, key dates / nomination timeline (array), nomination form URL,
   status (nominations open / shortlist / winners announced).
7. **`award-categories`** — replaces ESG's `categories_criteria`. Fields: name, description,
   judging/eligibility criteria (rich text), programme relationship. Winners are linked from
   `people` via (edition, category) pairs.
8. **`partners`** — sponsors and partners (replaces the `lshowcase` logo walls). Fields: name,
   logo, URL, tier (headline / sponsor / association / educational partner), and which
   programmes/sites they appear on.
9. **`testimonials`** — quotes used across all three sites. Fields: quote, attribution name,
   role/organisation, photo, optional relationship to `people`, site/programme tags.
10. **`events`** — receptions, judging days, summits, corporate visits (currently buried in
    posts). Fields: title, date, location, description, programme relationship, gallery.
    Optional at first — these can stay as posts initially and be split out later.

### Globals (singletons)

- **`header` / `footer`** per site — nav links, social links, legal text.
- **`site-settings`** — newsletter form config, default SEO, impact statistics shown on the
  homepage.

### Suggested relationships at a glance

```
programmes 1—* awards (editions) 1—* award-categories
awards *—* people (winners / shortlist, with category + year)
schools *—* people (ambassadors)
partners *—* programmes
posts *—1 categories, *—* people (tagged)
```

### Migration notes

- WordPress REST API is enabled (`/wp-json/wp/v2/...`) on the main site, so posts, pages,
  `connectedprograms` and `wofpsupporters` can be exported programmatically; media should be
  pulled from `wp-content/uploads` into the S3-backed `media` collection.
- `wofpsupporters` documents fold into `people` with `type: supporter`.
- ESG `candidateyear_taxonomies` map to `people` + `awards` (edition per year).
- Use a `site`/tenant field (or Payload's multi-tenant plugin) rather than separate instances,
  since the three domains share people, partners and branding.
