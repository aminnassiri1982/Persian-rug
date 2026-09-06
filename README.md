# The Nain Pair

A single-page site for a monumental Nain carpet, offered for sale by the family: hero,
specifications with the carpet's palette, gallery, the family history, the second carpet,
provenance timeline, and a contact block.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no framework. Open
`index.html` in a browser and it runs.

```
index.html                  the whole page — every section is commented
assets/css/style.css        all styling; colours and type live in :root at the top
assets/js/main.js           gallery lightbox, nav, scroll behaviour, form
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

1. **The contact number.** Amin, 310-592-6293. It appears in the bar under the hero, the
   closing contact block, the sticky bar and the footer — search `3105926293` to find
   every instance. The `href` is `tel:+13105926293`; the visible text uses non-breaking
   hyphens so the number never splits across a line.
2. **The remaining catalogue gaps.** Four facts are still marked in italics because only
   you have them: knot density (raj / KPSI), the signature if the carpet is signed, and the
   restoration and washing history (in the Specifications table and again in the FAQ).
3. **The story.** The `<article class="story">` section carries the family account as
   dictated: the grandfather's purchase, the retired cartoon, the second carpet, the 2018
   shipment. Rewrite freely — `content/story.md` is a scratch copy.
4. **The second carpet.** The `#the-pair` section states the claim and, separately, what
   the photograph does and does not establish. Keep those two things apart; it is what
   makes the claim credible to a buyer's advisor.
5. **The photographs.** See `assets/images/README.md` for filenames and shooting notes.

## Enquiries

There is no form and no back end. Every route to contact is a `tel:` link to
310-592-6293 — the bar under the hero, the closing contact block, the sticky bar and the
footer. On a phone each dials directly.

If you later want written enquiries too, add a `mailto:` link beside the number rather than
re-introducing a form — a form on a page like this collects mostly spam.

## A note on the provenance claims

The page keeps two things apart on purpose:

- **The family line** — grandfather's purchase, inheritance, the 2018 shipment — is stated
  directly, because it is first-hand.
- **The second carpet** — the Shah, Rafsanjani, the presidential complex, Farah Pahlavi's
  search — is stated as family account, and the section carrying the press photograph says
  in as many words what that photograph does and does not establish.

Keep that separation. At this price a buyer's advisor tests the ownership claims first, and
saying plainly which parts are documented is what makes the documented parts believable.
Presenting the photograph as outright proof would invite exactly the scrutiny that sinks it.

**Before the page goes public, settle the rights to that photograph.** It is a press image
from a Jerusalem Post article, reproduced here with the publication, date and author
credited. Credit is not a licence. Either obtain permission, or replace the image with a
link to the article and describe what it shows — the argument survives either way.

## Design notes

- **Type** — Cormorant Garamond for display, Inter for anything the eye reads as an
  interface. Fine-catalogue conventions: small caps eyebrows, wide letter-spacing, rules
  instead of boxes.
- **Colour** — ivory paper, ink, Nain indigo and a single gold accent. Nothing else, so the
  carpet supplies all of the colour on the page.
- **Restraint** — one accent colour, one weight of rule, no shadows, no rounded corners.
  A page like this competes with a printed catalogue, not with a storefront.
- Fully responsive, keyboard-navigable, honours `prefers-reduced-motion`, and prints
  cleanly to PDF (the page furniture drops out) if you want a leave-behind.
