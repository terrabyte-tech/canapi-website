# Terrabyte Template Version Tracking System

**Purpose:** Automatically track Template version number in `package.json` and `site.json` to manage what version of the template downstream projects are using.

## How to use

To bump the project version, run either `release-patch.sh`, `release-minor.sh`, or `release-major.sh`. This will increment the respective value in versioning within the Template's `package.json`, but will also sync to `site.json`. The value within site.json is not used in the template itself, but is meant to help manage versions in downstream projects. Downstream projects can diff files and see that the project currently uses `v1.1.1`, while the template in the `/template` folder (the most up-to-date template version, as long as it is setup correctly) has a version of `v1.2.0`.

**NOTE:** `sync-version.js` should only need to be ran on its own in outlying circumstances. Each of the shell scripts runs this file as part of its sync version process.