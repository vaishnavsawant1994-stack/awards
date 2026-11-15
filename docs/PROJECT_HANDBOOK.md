# Global Awards 2026 — Project Handbook

> **Repository:** [vaishnavsawant1994-stack/awards](https://github.com/vaishnavsawant1994-stack/awards)  
> **Documentation review:** 15 November 2026 · **Scope:** checked-in source and existing documentation, not a fresh end-to-end certification.

## 1. Purpose and intended audience

**Goal:** Awards-oriented editorial website combining responsive public content, Sanity-managed material and animated frontend presentation.

**Who this serves:** Awards-site visitors, editors and content administrators.

## 2. Product features and expected journeys

1. Render public awards and editorial content.
2. Connect Sanity CMS-managed assets and entries.
3. Provide motion-aware responsive interactions.
4. Build and deploy a Next.js site.

These are described product areas or repository-supported development paths. See the status and limitations below before claiming live feature completeness.

## 3. Technical architecture and project structure

Next.js 16, React 19, TypeScript, Sanity, next-sanity, Framer Motion and Lucide. Sources under `src/`, assets under `public/`; `sanity.config.ts` and `sanity.cli.ts` are present.

## 4. Implementation maturity and evidence

Application and CMS configuration exist; publication workflow, real content inventory, live Sanity credentials and deployment acceptance were not reverified.

**Evidence level:** Repository source, current README and available manifest/structure were inspected. No new unit-test run, database migration, browser acceptance, security penetration test, CI re-run or live deployment is implied by this document. Treat older gate reports as date- and commit-specific records.

## 5. Installation, development and validation

`npm install`, configure Sanity/project variables as documented, `npm run dev`; validate with `npm run lint` and `npm run build`.

Recheck exact commands, package versions and environment variables against the current source. Use disposable credentials and isolated local/test data; never run destructive migrations or seed scripts against an unknown database.

## 6. Security, data and operational boundaries

- Published awards, winners and names must be fact checked and appropriately licensed.
- Do not commit Sanity secrets.
- Check performance, keyboard support, motion reduction and accessibility.

For production use additionally verify access control, errors, secrets, backup/recovery, monitoring and relevant legal/privacy responsibilities.

## 7. Recommended next milestones

1. Inventory frontend pages and CMS schemas.
2. Verify editorial publishing and approvals.
3. Test responsive rendering, motion and link behavior.
4. Record live environment and content source provenance.

## 8. Source documents and change policy

- [`README.md`](../README.md)
- [`package.json`](../package.json)
- [`src/`](../src/)
- [`sanity.config.ts`](../sanity.config.ts)

This handbook supplements rather than replaces authoritative specs, security rules and exact-SHA qualification. Update it whenever the application architecture, deployment status, feature contract or project ownership changes.
