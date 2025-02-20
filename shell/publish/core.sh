echo "🔍 Launching publishing @playnest/core..."

echo "📦 Building..."
pnpm build --filter @playnest/core

cd packages/core || exit

echo "🚀 Updating package version..."
CURRENT_VERSION=$(node -p "require('./package.json').version")
NEW_VERSION=$(npm version patch --no-git-tag-version)

echo "🔄 Updated version: v$CURRENT_VERSION → $NEW_VERSION"

echo "📤 Publishing $NEW_VERSION to npm..."
npm publish

cd ../../

sleep 1

# update @playnest/core in apps
pnpm update @playnest/core --filter="@playnest/api" --filter="@playnest/admin" --filter="@playnest/shop"

git add pnpm-lock.yaml packages/core/package.json apps/**/package.json
git commit -m "chore(@playnest/core): version patch [v$CURRENT_VERSION → $NEW_VERSION]"

echo "✅ @playnest/core published"
