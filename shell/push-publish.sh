# Check for changes in @playnest/core
CHANGED_CONFIGS=$(git diff --name-only "origin/$(git rev-parse --abbrev-ref HEAD)" HEAD packages/configs/ | wc -l)

if [ "$CHANGED_CONFIGS" -gt 0 ]; then
  sh "shell/publish/publish-configs.sh"
else
  echo "ℹ️ No changes in @playnest/configs. Skipping publishing"
fi

git push --no-verify origin "$(git rev-parse --abbrev-ref HEAD)"
