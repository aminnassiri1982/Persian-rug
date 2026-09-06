# Deploying

This is a plain static site. `index.html` sits at the repo root and the browser loads it
directly — there is nothing to compile.

---

# Cloudflare

## Is it a Worker or a Pages project?

These are different products under one "Workers & Pages" heading, and they fail
differently. Look at the application row in the dashboard:

- **"No active routes"**, a *requests* chart, a `*.workers.dev` address → it is a **Worker**.
- A `*.pages.dev` address and a *Deployments* tab → it is a **Pages project**.

`persian-rug` is a Worker. `wrangler.jsonc` in this repo configures it: with `assets` set
and no `main` entry point it is an assets-only Worker, so Cloudflare uploads `dist/` and
serves it with no script to run. `build.command` produces `dist/` first.

If the dashboard has its own build command set for this Worker, clear it or set it to
`npm run build`; leave the deploy command as `npx wrangler deploy`.

A Worker build failing *before* this config existed is expected — there was no wrangler
configuration and no Worker script for it to deploy.

## Pages instead — Route A, Cloudflare pulls from Git

If you would rather run this as a Pages project than a Worker, delete the `persian-rug`
Worker and create a new application with **Pages → Connect to Git**. Note that a
`wrangler.jsonc` containing Workers-only fields will make a *Pages* build fail validation —
so if you switch to Pages, delete `wrangler.jsonc` or replace its contents with
`{ "name": "persian-rug", "pages_build_output_dir": "./dist" }`.

**Settings → Build:**

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave completely empty)* |
| Build output directory | `/` |
| Root directory | `/` |
| Production branch | `main` |

## Route B — GitHub pushes to Cloudflare (when Route A won't connect)

`.github/workflows/deploy-cloudflare.yml` in this repo deploys to Cloudflare Pages from
GitHub Actions. It does not use Cloudflare's Git integration at all, so it is unaffected by
whatever is stopping that integration from firing. Three steps:

**1. Create the Pages project.** Cloudflare dashboard → **Workers & Pages → Create →
Pages → Upload assets**. Name it exactly **`persian-rug`**. Upload anything to get past the
first screen — the workflow overwrites it on the next push.

**2. Get an API token.** [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
→ **Create Token** → use the **Edit Cloudflare Workers** template, or a custom token with
the **Account → Cloudflare Pages → Edit** permission. Copy the token — it is shown once.
Your **Account ID** is in the right-hand sidebar of any dashboard page, and in the URL
after `dash.cloudflare.com/`.

**3. Add both as repository secrets.** GitHub → this repo → **Settings → Secrets and
variables → Actions → New repository secret**:

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | the account ID from step 2 |

Then push, or run it by hand from the **Actions** tab → *Deploy to Cloudflare Pages* →
**Run workflow**. The Actions log shows exactly what happened, which is the part Cloudflare's
own integration does not give you when it silently does nothing.

## Troubleshooting

### Nothing happens at all — no deployment is ever triggered

The repository and Cloudflare are not actually connected. In order of likelihood:

1. **The project is a "Direct Upload" project.** Direct Upload projects never watch a Git
   repository, and Cloudflare does not let you convert one to a Git-connected project. Check
   **your project → Settings**: if there is no *Git repository* row, this is it. Fix: create
   a **new** project with **Connect to Git**, or use Route B above.
2. **The Cloudflare GitHub App cannot see this repository.** The app is installed
   per-repository and does **not** pick up repositories created after installation — and
   this repository was created after. Go to **GitHub → Settings → Applications → Cloudflare
   Pages → Configure**, then either add `Persian-rug` or switch to **All repositories**.
3. **The production branch does not exist.** Check **Settings → Build → Branch control**.
   This repository has two branches: `main` and `claude/watch-auction-page-design-5zhh9i`.
4. **The project is connected to a different repository or a different Cloudflare account.**
   Worth ruling out — check the *Git repository* row names `aminnassiri1982/Persian-rug`.

### A build runs but fails

For a static site with no build command, it is one of three things:

- **"Missing script: build" / npm errors** — Cloudflare is running a build command against a
  repo with no build system. Either clear the build command, or leave `npm run build`: this
  repo ships a `package.json` whose `build` script copies the site into `dist/`, so both
  configurations succeed.
- **"Output directory not found"** — usually `dist` or `public` left over from a framework
  preset. Set it to `/`, or set the build command to `npm run build` and this repo will
  produce `dist/` for you.
- **"Branch not found"** — the production branch does not match a real branch name.

### Reading the build log

**Your project → Deployments → the failed deployment → View build log.** The first line
beginning `Failed:` or `Error:` names the cause directly.

---

# GitHub Pages (no tokens, one dropdown)

If Cloudflare stays stubborn, this gets the site live with no credentials at all.

**Settings → Pages → Build and deployment → Source: `GitHub Actions`.**

That is the whole setup. `.github/workflows/deploy-pages.yml` then publishes on every push
to `main`, and the site appears at `https://aminnassiri1982.github.io/Persian-rug/` a minute
or so later.

That one dropdown cannot be automated. Creating a Pages site requires administration
rights, which `GITHUB_TOKEN` cannot be granted no matter what `permissions:` the workflow
declares — the API answers *"Resource not accessible by integration"*. A person has to flip
it once; everything after that is automatic.

**Simpler alternative, if you would rather not use the workflow at all:**
**Settings → Pages → Source: Deploy from a branch → Branch `main` / `(root)` → Save.**
GitHub then serves the repository directly with no build. The only cost is that the 15 MB
of originals in `photos-original/` are served too — harmless, since nothing links to them,
but it makes the site heavier to clone. Deploying via the workflow publishes `dist/`, which
leaves them out.

A custom domain can be pointed at either host later, so neither choice locks you in.
