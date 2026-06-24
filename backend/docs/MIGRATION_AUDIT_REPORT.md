# Migration Audit Report

**Project:** MoM Website Backend  
**Database:** PostgreSQL (Sequelize CLI)  
**Date:** 2026-06-24  
**Migrations before refactor:** 85  
**Migrations after refactor:** 77  

---

## Executive Summary

The migration history was refactored to eliminate 8 corrective/seed migrations, merge their changes into original `create-*` migrations, add idempotent guards across all schema migrations, and fix rollback safety. Fresh-database testing confirmed:

- `db:migrate` — 77/77 migrations succeed on empty database
- `db:migrate:undo:all` — full rollback succeeds without FK violations
- Second `db:migrate` — no-op (schema already up to date)

---

## A. Removed Migrations

| File | Reason |
|------|--------|
| `20260417105500-fix-mining-attachment-constraints.js` | Corrective FK change merged into `create-mining-framework` and `create-mining-guideline-attachments` |
| `20260417105600-fix-other-attachment-constraints.js` | Corrective FK change merged into `create-snapshot` and `create-steps` |
| `20260417125500-add-is-published-to-news-feedback.js` | Column addition merged into `create-news-feedbacks` |
| `20260417183004-remove-unique-from-permissions-resource.js` | Composite unique constraint merged into `create-permissions` |
| `20260622120000-add-attachment-image-variants.js` | Column additions merged into `create-attachments-table` |
| `20260622120000-add-slider-button-columns.js` | Column additions merged into `create-sliders-table` (also resolved duplicate timestamp conflict) |
| `20260622130001-seed-opportunities-permissions.js` | Seed data moved to `seeders/20260622130000-seed-production-permissions.js` |
| `20260622140200-seed-tenders-vacancies-permissions.js` | Seed data moved to `seeders/20260622130000-seed-production-permissions.js` |

---

## B. Merged Migrations

| Original Migration | Merged Changes |
|--------------------|----------------|
| `20260416142818-create-mining-framework.js` | `attachment_id` FK: `onDelete RESTRICT` → `SET NULL` |
| `20260416142824-create-mining-guideline-attachments.js` | `attachment_id` FK: `onDelete RESTRICT` → `CASCADE` |
| `20260404162044-create-snapshot.js` | `attachment_id` FK: `onDelete RESTRICT` → `CASCADE` |
| `20260410111600-create-steps.js` | `attachment_id` FK: `onDelete RESTRICT` → `CASCADE` |
| `20260220135313-create-news-feedbacks.js` | Added `is_published BOOLEAN NOT NULL DEFAULT false` |
| `20251210084301-create-permissions.js` | Added `uq_permissions_resource_action` unique on `(resource, action)` |
| `20260218195338-create-attachments-table.js` | Added `file_path_thumb`, `file_path_medium`, `file_path_large`, `mime_type`, `width`, `height` |
| `20260325172632-create-sliders-table.js` | Added `button_name`, `button_url`, `button2_name`, `button2_url` |

---

## C. Dependency Problems Found

### Circular References

| Relationship | Status | Notes |
|--------------|--------|-------|
| `routes.parent_id` → `routes` | Safe | Self-referential with `ON DELETE SET NULL` |
| `gamestones.parent_id` → `gamestones` | Safe | Self-referential with `ON DELETE SET NULL` |

No blocking circular dependencies detected.

### Invalid Foreign Keys

None found. All 77 tables reference tables created in earlier migrations.

### Ordering Issues

| Issue | Resolution |
|-------|------------|
| Duplicate timestamp `20260622120000` on two migrations | Resolved by merging both into parent `create-*` migrations |
| `permissions` unique constraint added after table creation | Constraint added via `addConstraintIfNotExists` immediately after `createTable` in same migration |

---

## D. Rollback Problems Fixed

| Problem | Fix Applied |
|---------|-------------|
| `dropTable` without existence checks | All migrations use `dropTableIfExists` |
| `removeConstraint` failures on corrective migrations | Corrective migrations removed; constraints defined at creation time |
| ENUM types left after table drop | `dropEnumIfExists` used where ENUM columns exist |
| `permissions` down() missing constraint drop | `dropConstraintIfExists` before table drop |
| Accidental re-run failures | Idempotent create/add helpers added |

**Test result:** `db:migrate:undo:all` completed successfully on test database (77 reversions).

---

## E. Final Migration Order

See `backend/migrations/` — 77 files from `20251210084133-create-user-types.js` through `20260622140100-create-vacancies-table.js` in timestamp order.

---

## F. Schema Dependency Diagram

```
user_types
    └── users ──┬── user_roles ── roles ── role_permissions ── permissions
                └── audit_logs

attachments (hub) ──┬── news_attachments ── news ──┬── news_metadata
                    │                            ├── news_tags ── tags
                    │                            ├── news_reactions / news_reads / news_feedbacks
                    ├── background_attachments ── backgrounds
                    ├── leadership_attachments ── leadership
                    ├── strategy_sections ── strategies ── core_values
                    ├── footers ── footer_sections
                    ├── cards / sliders / tenders / vacancies
                    ├── partner_attachments ── partners
                    ├── gamestones (self-ref) ── gamestone_attachments
                    ├── resource_attachments ── resource
                    ├── snapshot ── snapshot_section
                    ├── asm ── objectives / asm_attachments / asm_previews
                    ├── investigate_ethiopia ── investigation_action / investigation_strategy
                    ├── petroleum_processes ── process_blocks / process_steps ── steps
                    ├── petroleum_regulation_process ── petroleum_regulation / attachments / directive
                    ├── mining_regulation_process ── mining_framework / guideline / service
                    ├── mining_application_process ── attachments / types
                    ├── event_categories ── events ── event_attachments
                    └── routes (self-ref) ── route_translations

regions ── regional_office_contact_centers ── licensing_contacts
```

---

## G. Remaining Manual Actions

1. **Existing production DBs:** No re-run needed if already fully migrated. Verify schema with Section I queries if unsure.
2. **Deploy:** Docker now runs `seed:production` after migrate.
3. **Dev:** `npm run migrate && npm run seed` for full local setup.
4. **Future:** Use `migrations/lib/migration-utils.js` helpers; avoid `fix-*` follow-up migrations.
