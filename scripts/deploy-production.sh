#!/usr/bin/env bash
# Production deploy after git pull on the server.
# Imports upgraded DB + reprocessed uploads, then rebuilds containers.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

DB_USER="${DB_USER:-postgres}"
DB_PASSWORD="${DB_PASSWORD:-root}"
DB_NAME="${DB_NAME:-mom_website}"

SNAPSHOT="$REPO_ROOT/backend/db-snapshot.sql"
UPLOADS_ARCHIVE="$REPO_ROOT/backend/deploy-uploads.tar.gz"

if [ ! -f "$SNAPSHOT" ]; then
  echo "Missing $SNAPSHOT"
  exit 1
fi

if [ ! -f "$UPLOADS_ARCHIVE" ]; then
  echo "Missing $UPLOADS_ARCHIVE"
  exit 1
fi

BACKUP_DIR="$REPO_ROOT/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "=== MoM production deploy ==="

if docker ps --format '{{.Names}}' | grep -q '^mom_postgres$'; then
  echo "1. Backing up current database..."
  docker exec -e "PGPASSWORD=$DB_PASSWORD" mom_postgres \
    pg_dump -U "$DB_USER" -d "$DB_NAME" --clean --if-exists --no-owner --no-acl \
    > "$BACKUP_DIR/pre-deploy.sql" || true
else
  echo "1. No running DB container — skipping backup"
fi

echo "2. Starting database..."
docker compose up -d db
echo "   Waiting for Postgres..."
sleep 8

echo "3. Importing upgraded database..."
cd "$REPO_ROOT/backend"
DB_HOST=localhost \
DB_PORT=5432 \
DB_USER="$DB_USER" \
DB_PASSWORD="$DB_PASSWORD" \
DB_NAME="$DB_NAME" \
npm run db:import

echo "4. Extracting reprocessed uploads..."
cd "$REPO_ROOT/backend"
rm -rf uploads
tar -xzf deploy-uploads.tar.gz

echo "5. Building and starting services..."
cd "$REPO_ROOT"
docker compose up -d --build

echo ""
echo "=== Deploy complete ==="
echo "Backup (if any): $BACKUP_DIR"
echo "Site: https://www.mom.gov.et"
echo "Admin: https://www.mom.gov.et/en/access/identity/gateway"
