# Server git sync fix

If `git log origin/website-update` shows only `f0ea449` but GitHub has newer commits:

```bash
cd ~/website
git remote -v
git ls-remote origin refs/heads/website-update
```

Expected latest SHA starts with `80d12ab` (or newer).

Force-update from GitHub:

```bash
git fetch origin website-update --force
git reset --hard FETCH_HEAD
chmod +x deploy.sh scripts/deploy-production.sh
ls -lh deploy.sh scripts/deploy-production.sh backend/db-snapshot.sql backend/deploy-uploads.tar.gz
```

Then deploy:

```bash
source backend/.env 2>/dev/null || true
./deploy.sh
```

**Never `git commit` on the production server.**
