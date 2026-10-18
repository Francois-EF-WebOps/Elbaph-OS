# KIT.md — OS Prototype Discovery and Test Kit

**Status:** discovery-first. The repository README is generic AI Studio boilerplate; the operating-system scope and feature set must be verified from the actual source.

## Read first
- `README.md`
- `package.json`, lockfile and source tree
- persistence, permissions, network/API use and deployment configuration
- licence and any existing specification

## Requirements pack
Identify the actual system boundary: what is simulated versus implemented, where state is stored, what data leaves the device, supported platforms, failure/recovery behaviour, and acceptance criteria. Never describe a web prototype as a real operating system unless evidence supports that claim.

## Setup and procurement
README lists Node.js, `npm install`, `.env.local` with `GEMINI_API_KEY`, and `npm run dev`. Verify versions and scripts first. Use no-cost tools where possible; do not purchase hosting or API credits before demonstrating need. Protect credentials and personal data.

## Procedure
1. Inventory source, dependencies and existing features.
2. Inspect storage and network paths.
3. Run documented startup steps.
4. Test initial state, ordinary operation, refresh/restart, invalid input and failure/recovery.
5. Record which behaviours persist and which are only visual simulations.
6. Check for key exposure and unexpected data transmission.
7. Document setup, reset, rollback and known limitations.

## Acceptance
- [ ] Implemented versus simulated behaviour is explicit.
- [ ] State and data flows are documented.
- [ ] Startup and reset are repeatable.
- [ ] Failure/recovery results are recorded.
- [ ] No credentials or private data are exposed.
- [ ] Claims match demonstrated behaviour.