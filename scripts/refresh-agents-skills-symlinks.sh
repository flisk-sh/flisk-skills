#!/usr/bin/env bash
# Refresh .agents/skills so every skill is a proper git symlink (mode 120000)
# pointing at ../../skills/<name>. Run from the repository root.

set -euo pipefail

cd "$(dirname "$0")/.."

rm -rf .agents/skills
mkdir -p .agents/skills

for dir in skills/*/; do
  name=$(basename "$dir")
  target="../../skills/$name"
  ln -s "$target" ".agents/skills/$name"
  echo "symlink: .agents/skills/$name -> $target"
done

echo
echo "Done. Commit the result:"
echo "  git add .agents/skills"
echo "  git commit -m 'Refresh .agents/skills symlinks for all skills'"
