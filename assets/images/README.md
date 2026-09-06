# Photographs

## What is on the page now

These are your photographs, cropped, resized to a web-sensible size and optimised. The
originals are untouched in `photos-original/` at the repo root, so nothing is lost and any
of these can be regenerated.

| File | Where it appears | From |
|---|---|---|
| `hero.jpg` | Full-screen hero | `DSC_0583` |
| `rug-field-border.jpg` | Gallery, large tile | `DSC_0583` |
| `rug-medallion.jpg` | Gallery | `DSC_0564` |
| `rug-medallion-angle.jpg` | Gallery | `DSC_0570` |
| `rug-field-raking.jpg` | The Story, and gallery | `DSC_0575` |
| `rug-fringe-reverse.jpg` | The Story, and gallery | `DSC_0579` |
| `rug-measure.jpg` | Specifications sidebar, and gallery | `DSC_0585` |
| `rug-full-01.jpg` | The Story, wide figure, and gallery | `IMG-2604`, cropped |
| `rug-full-02.jpg` | Gallery, wide tile | `IMG-2605`, cropped |
| `the-pair-press-photo.jpg` | The Second Carpet | the Jerusalem Post screenshot, cropped to the press photograph. **Rights not cleared — see the note in the root README before publishing.** |

The two full-carpet shots were cropped to the carpet and its immediate surround — the
parked cars, the street and the wheelie bin are out of frame.

`DSC_0583 (1).JPG` was a byte-for-byte duplicate of `DSC_0583.JPG` and was dropped.

## Worth shooting when you can

The page is complete without these, but each one answers a question a serious buyer will
ask, and the layout has room for them:

1. **The whole carpet, straight on and from height.** The two full shots are taken at an
   angle from standing height, so the borders converge and the true proportion is hard to
   read. From a first-floor window or a tall ladder, camera parallel to the ground, you get
   the shot that a catalogue leads with. This is the single highest-value photograph left
   to take.
2. **The signature cartouche**, if the carpet is signed. Usually woven into one end of the
   field or the outer border. If it is signed, this is the second most valuable photograph
   you can produce.
3. **The reverse, flat and evenly lit**, showing knot density across a hand's width. Lay a
   coin or a ruler beside it for scale. `rug-fringe-reverse.jpg` shows the back at the
   fringe, but not the knotting itself.
4. **The carpet indoors**, in a furnished room. Every image currently on the page is
   outdoors on concrete. One interior shot changes how the carpet is read.
5. **Any wear, repair or fade, photographed honestly.** Counter-intuitive, but it is what
   makes the rest of the description credible.

## Replacing or adding an image

Keep the filenames above and just overwrite the file — the page picks it up with no other
change. To add a new one, copy any `<figure class="gallery-item">` block in `index.html`
and point its `src` at the new file.

Export at about 2000 px on the long edge, JPEG quality 80. Anything under roughly 600 KB
keeps the page fast.
