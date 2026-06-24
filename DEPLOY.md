# Production deploy

Deploy the upgraded **v2 database** and **reprocessed uploads** to `www.mom.gov.et`.

## What goes in git (push / pull)

| Artifact | Path | Size (approx.) |
|---|---|---|
| Upgraded database | `backend/db-snapshot.sql` | ~0.9 MB |
| Application code | entire repo on `website-update` | — |

## What to transfer separately (too large for git)

| Artifact | Path | Size (approx.) |
|---|---|---|
| Reprocessed uploads | `backend/deploy-uploads.tar.gz` | ~1.8 GB |

Create or refresh the tarball locally:

```bash
cd backend
npm run deploy:pack
```

Copy to the server (from your machine):

```bash
scp backend/deploy-uploads.tar.gz user@your-server:/path/to/website/backend/
```

---

## Server deploy steps

SSH into the server, then:

```bash
cd /path/to/website

# 1. Backup live DB (optional but recommended)
mkdir -p backups/manual
docker exec -e PGPASSWORD="$DB_PASSWORD" mom_postgres \
  pg_dump -U postgres -d mom_website --clean --if-exists --no-owner \
  > backups/manual/pre-deploy-$(date +%Y%m%d).sql

# 2. Pull latest code + db snapshot
git pull origin website-update

# 3. Ensure uploads tarball is present (from scp above)
ls -lh backend/deploy-uploads.tar.gz

# 4. Run deploy script
chmod +x scripts/deploy-production.sh
./scripts/deploy-production.sh
```

The script will:

1. Back up the current database (if Postgres is running)
2. Start Postgres
3. Import `backend/db-snapshot.sql`
4. Extract `backend/deploy-uploads.tar.gz` → `backend/uploads/`
5. `docker compose up -d --build`

Uploads are mounted from `./backend/uploads` into the backend container (persist across rebuilds).

---

## After deploy

| Check | URL |
|---|---|
| Public site | https://www.mom.gov.et |
| Admin login | https://www.mom.gov.et/en/access/identity/gateway |
| API | https://www.mom.gov.et/api |

Migrations run on backend start; with the imported snapshot they should be a no-op.  
`seed:production` is idempotent (safe if permissions already exist).

---

## Removed / do not use

These were from the migration workflow and are **not** part of deploy:

- `backend/db-snapshot-v1-original.sql` — raw server backup (local only)
- `backend/db-snapshot-v2-final.sql` — duplicate of `db-snapshot.sql`
- `backend/server-uploads.tar.gz` — old uncleaned server uploads
- `backend/db-snapshot.sql.*.bak` — export backups (now under `backend/tmp/`)

---

## Local upgrade pipeline (reference)

To regenerate deploy artifacts from a fresh server export:

```bash
# Place raw server files locally (gitignored):
#   backend/db-snapshot.sql          (v1 export from server)
#   backend/server-uploads.tar.gz  (docker cp from mom_backend:/app/uploads)

cd backend
npm run db:upgrade-from-server   # imports v1, migrates, reprocesses, exports v2
npm run deploy:pack              # creates deploy-uploads.tar.gz
```

Then commit `db-snapshot.sql`, push code, and `scp` the uploads tarball.
