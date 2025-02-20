# Check for changes in @playnest/core and @playnest/web and @playnest/configs
CHANGED_CONFIGS=$(git diff --name-only HEAD~1 HEAD packages/configs/ | wc -l)
CHANGED_CORE=$(git diff --name-only HEAD~1 HEAD packages/core/ | wc -l)
CHANGED_WEB=$(git diff --name-only HEAD~1 HEAD packages/web/ | wc -l)

git push

if [ "$CHANGED_CONFIGS" -gt 0 ]; then
  sh "./publish/configs.sh"
fi

if [ "$CHANGED_CORE" -gt 0 ]; then
  sh "./publish/core.sh"
fi

if [ "$CHANGED_WEB" -gt 0 ]; then
  sh "./publish/web.sh"
fi
