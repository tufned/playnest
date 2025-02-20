echo "🔍 Launching publishing @playnest/configs..."

cd packages/configs || exit

echo "🚀 Updating package version..."
CURRENT_VERSION=$(node -p "require('./package.json').version")
NEW_VERSION=$(npm version patch --no-git-tag-version)

echo "🔄 Updated version: v$CURRENT_VERSION → $NEW_VERSION"

echo "📤 Publishing $NEW_VERSION to npm..."
npm publish

sleep 3
echo "✅ @playnest/configs published"

cd ../../

echo "🔄 Updating @playnest/configs in other apps"

# update @playnest/configs in apps
pnpm update @playnest/configs --filter="@playnest/api" --filter="@playnest/admin" --filter="@playnest/shop" --filter="@playnest/core" --filter="@playnest/web"

git add pnpm-lock.yaml packages/**/package.json apps/**/package.json
git commit -m "chore(@playnest/configs): version patch [v$CURRENT_VERSION → $NEW_VERSION]"


echo "☑️ Updated"
