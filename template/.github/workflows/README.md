# Terrabyte Cross-Project Template Sync System

**Purpose:** Automatically sync updates from the `terrabyte-11ty-template` repo to downstream Terrabyte sites using a GitHub App and secure automation.

## Overview

This system uses:
- A **GitHub App** for secure, scalable authentication
- A **release-based trigger** in the template repo
- A **repository_dispatch** event to notify downstream repos
- A **subtree strategy** to keep `/template` folders up to date with the latest Template release

No personal access tokens. No manual syncing. No CI/CD chaos (hopefully).

## Components

### GitHub App: `terrabyte-template-sync`
- Install on downstream repos (e.g., Terrabyte websites that utilize this template)
- Authenticates via JWT -> access token -> dispatch event

### Template Repo: [`terrabyte-11ty-template`](./README.md)
- Contains `notify-downstream.yml` workflow
- Triggers on release -> sends dispatch to downstream repos

### Downstream Repos
- Contain `update-template.yml` workflow
- Listen for `template-release` dispatch -> pull latest template via subtree

## Setup

### Template Repo

The private key and `notify-downstream.yml` file are already in place. The only thing you need to do is create a new release using semantic versioning (v1.1.0, v1.1.1, etc.). Release titles can be descriptive or playful — versioning lives in the tag.

### Downstream Repo
1. Install GitHub App on the repo
2. Add `.github/workflows/update-template.yml`:
   - Listens for `repository_dispatch`
   - Pulls latest template into `/template` folder
   - Targets `dev` branch first, falls back to `main`
   - Uses `[skip ci]` to avoid triggering deploy workflows

## Caveats & Gotchas

- JWTs expire after 10 minutes — automation handles this, but manual testing must be quick
- App must be installed on each downstream repo — otherwise dispatch will fail silently
- Do not install the app on the template repo — it only sends, not receives
- Avoid copying `.github/workflows/notify-downstream.yml` into downstream repos — it’ll create a loop
- Subtree merges must be squashed — use `--squash` to avoid polluting history

## Scaling to more projects

To add a new Terrabyte site to this automation:
1. Install the GitHub App on the repo
2. Add /template to the repo through the subtree process (we specifically need the `update-template.yml` file)
3. Add the repo name to the `repos=` list in `notify-downstream.yml` Template file
4. Boom — it’ll sync on the next release of the Terrabyte Template.