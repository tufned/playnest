# Check for changes in @playnest/core and @playnest/web and @playnest/configs
CHANGED_CONFIGS=$(git diff --name-only "origin/$(git rev-parse --abbrev-ref HEAD)" HEAD packages/configs/ | wc -l)
CHANGED_CORE=$(git diff --name-only "origin/$(git rev-parse --abbrev-ref HEAD)" HEAD packages/core/ | wc -l)
CHANGED_WEB=$(git diff --name-only "origin/$(git rev-parse --abbrev-ref HEAD)" HEAD packages/web/ | wc -l)

if [ "$CHANGED_CONFIGS" -gt 0 ]; then
  sh "shell/publish/configs.sh"
fi

if [ "$CHANGED_CORE" -gt 0 ]; then
  sh "shell/publish/core.sh"
fi

if [ "$CHANGED_WEB" -gt 0 ]; then
  sh "shell/publish/web.sh"
fi

git push --no-verify origin "$(git rev-parse --abbrev-ref HEAD)"
