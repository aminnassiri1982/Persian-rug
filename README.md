# The Nain Pair — Lot 01

A single-page auction site for a monumental Nain carpet: hero, long-form history, gallery,
catalogue specifications, provenance timeline, bidding instructions and an enquiry form.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no framework. Open
`index.html` in a browser and it runs.

```
index.html                  the whole page — every section is commented
assets/css/style.css        all styling; colours and type live in :root at the top
assets/js/main.js           countdown, gallery lightbox, nav, form
assets/images/              your photographs go here — see assets/images/README.md
content/story.md            a writing template for the history
```

## Getting it live

The fastest route is GitHub Pages:

1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` (or this branch), folder `/ (root)` → **Save**

A minute later the page is at `https://<user>.github.io/<repo>/`. Any custom domain you
own can be pointed at it from the same screen.

## The five things to edit

Everything you need to change is marked `EDIT ME` in `index.html`.

1. **The closing date.** Line with `data-auction-end` on the `<section class="auction">`.
   Use `YYYY-MM-DDTHH:MM:SS` plus your UTC offset, e.g. `2026-11-14T18:00:00-05:00`.
   The countdown, the closing line and the sticky bar all read from it.
2. **Your email address.** `data-inquiry-email` on the enquiry form.
3. **The story.** The `<article class="story">` section. Draft it in `content/story.md` first.
4. **The catalogue entry.** The specifications table, the provenance timeline and the FAQ
   all have placeholders in italics.
5. **The photographs.** See `assets/images/README.md` for the filenames and shooting notes.

## Collecting enquiries properly

With no back end, the form composes an email in the visitor's own mail client. That works
everywhere, but you lose anyone who doesn't have mail configured in their browser.

To have enquiries land in your inbox directly, create a form at
[Formspree](https://formspree.io) or [Basin](https://usebasin.com), then in `index.html`:

```html
<form id="inquiry-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

and delete the `submit` handler at the bottom of `assets/js/main.js`. The field names
(`name`, `email`, `phone`, `interest`, `message`) already match what those services expect.

## A note on the provenance claims

The page presents the ownership history as *related by the current owner*, invites buyers
to commission an independent appraisal, and offers a provenance file to registered bidders.
Keep that framing. At this price level, claims about earlier owners are the first thing a
serious buyer's advisor will test, and stating plainly what is documented and what is family
account is what makes the documented part believable.

## Design notes

- **Type** — Cormorant Garamond for display, Inter for anything the eye reads as an
  interface. Auction-catalogue conventions: small caps eyebrows, wide letter-spacing, rules
  instead of boxes.
- **Colour** — ivory paper, ink, Nain indigo and a single gold accent. Nothing else, so the
  carpet supplies all of the colour on the page.
- **Restraint** — one accent colour, one weight of rule, no shadows, no rounded corners.
  A luxury lot page competes with a printed catalogue, not with a storefront.
- Fully responsive, keyboard-navigable, honours `prefers-reduced-motion`, and prints
  cleanly to PDF (the page furniture drops out) if you want a leave-behind.
