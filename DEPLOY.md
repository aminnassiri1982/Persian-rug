# Deploying to Cloudflare Pages

This is a plain static site. There is nothing to compile — `index.html` sits at the repo
root and the browser loads it directly.

## Settings that work

In **Cloudflare dashboard → Workers & Pages → your project → Settings → Build**:

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave completely empty)* |
| Build output directory | `/` |
| Root directory | `/` |
| Production branch | `main` |

That's it. Cloudflare uploads the repo as-is.

## If the build fails

A static site with no build command should never fail. When it does, it is almost always
one of these three:

**1. "Missing script: build" / "npm ERR!"**
Cloudflare is running a build command against a repo that has no build system. Either clear
the build command entirely, or leave it as `npm run build` — this repo now ships a
`package.json` whose `build` script simply copies the site into `dist/`, so either
configuration succeeds.

**2. "Output directory not found"**
The output directory is set to something that doesn't exist, usually `dist` or `public`
left over from a framework preset. Set it to `/`. If you'd rather keep `dist`, set the
build command to `npm run build` and this repo will produce that folder for you.

**3. "Branch not found" / no deployment is triggered at all**
The production branch is set to a branch that doesn't exist. Check
**Settings → Build → Branch control** and make sure the production branch matches a real
branch name in the repository.

## If the repository doesn't appear in Cloudflare's list

The Cloudflare GitHub App is installed per-repository, and it does not automatically pick
up repositories created after installation. Go to
**GitHub → Settings → Applications → Cloudflare Pages → Configure**, and either select this
repository or switch the app to **All repositories**. Then re-check Cloudflare's dropdown.

## Reading the build log

Cloudflare's log tells you which of the above it is in the first ten lines. Open
**your project → Deployments → the failed deployment → View build log**, and look for the
first line beginning `Failed:` or `Error:`. That line names the cause directly.

## The alternative, if Cloudflare stays stubborn

GitHub Pages serves this repo with no build system at all:
**Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
The site appears at `https://aminnassiri1982.github.io/Persian-rug/` within a minute or two.
You can point a custom domain at either host later.
