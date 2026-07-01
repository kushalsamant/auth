#!/usr/bin/env bash
set -euo pipefail
DESIGN_SYSTEM_DIR="../platform-design-system"
DESIGN_SYSTEM_REPO="https://github.com/kushalsamant/platform-design-system.git"

# 1. Clone design system if not present
if [ ! -d "${DESIGN_SYSTEM_DIR}" ]; then
  git clone --depth 1 "${DESIGN_SYSTEM_REPO}" "${DESIGN_SYSTEM_DIR}"
fi

# 2. Build design system first so dist/ exists before platform-auth resolves it
npm ci --prefix "${DESIGN_SYSTEM_DIR}"
npm run build --prefix "${DESIGN_SYSTEM_DIR}"

# 3. Install platform-auth with --install-links so npm copies built dist/
#    instead of symlinking (symlink would miss dist/ at resolution time)
npm install --install-links
