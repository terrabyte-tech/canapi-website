#!/bin/bash

# Bump version
# npm version patch
npm version patch --no-git-tag-version

# Sync version to site.json
npm run sync-version

# Stage and commit updated site.json
git add _data/site.json
VERSION=$(node -p "require('./package.json').version")
git commit -m "chore(release): v$VERSION - sync site.json with package version"

# Tag the commit with the new version from package.json
git tag -a "v$VERSION" -m "Release $VERSION"

# Push commit and tag to origin
git push origin main
git push origin --tags
# git push origin "v$VERSION"

echo "✅ Version bumped to v$VERSION"
echo "📦 site.json synced"
echo "🏷️ Annotated tag created and pushed"
echo "🚀 Template ready to release!"
echo "-----------------------------------"