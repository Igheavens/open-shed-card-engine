# Session 1: make one safe improvement to Open Shed

By the end of this lesson you will explain one failed test, use Codex or Claude to make a small change, and show three passing tests. You are beginning the same Open Shed practice-coach project that continues through the course.

The full game already decides which moves are legal. This exercise adds a tiny recommendation function that must respect those decisions. It uses invented cards and no network connection, AI API key, database, payment or live player data. It does not play a move or change the actual game. An AI coding assistant helps you develop this function; there is no runtime AI model in this starter yet.

## Before class

Your trainer provides this extracted `starter` folder and prepares Node **22.14.0**, pnpm **10.7.1**, Git, an editor, and access to either Codex or Claude. Account access is separate from the setup check. There are no package dependencies to install: do not run `pnpm install`, `npm install`, a global installer or a command that changes `.npmrc` for this lesson.

On macOS, open Terminal in the extracted folder. On Windows, open PowerShell in that folder using File Explorer. In either shell you can type `cd `, drag the folder onto the terminal, then press Enter; alternatively use `cd "YOUR EXTRACTED FOLDER PATH"`. Keep quotation marks around paths containing spaces. Do not run these commands in the production game or the Hub website checkout.

Run:

```text
node --version
pnpm --version
git --version
node scripts/check-setup.mjs
```

Expected versions start with `v22.14.0`, `10.7.1`, and `git version`. The last command should end with `SETUP READY. Next: pnpm test`. It reads versions and files; it does not install, fix, upload or write anything. `SETUP READY` is not proof that your AI account works or that the full game runs.

If a command is missing or the checker reports `SETUP BLOCKED`, show the trainer the output. Do not replace software or try random installation commands during the guided exercise. On macOS **with nvm already installed**, `nvm use 22.14.0` can select an already installed version. Windows version managers have different commands; use the trainer's prepared setup. The `.nvmrc` file is a version reminder, not a universal installer. Once fixed, rerun the same checker.

## The 45-minute class

| Time | What you do | Evidence you can see |
| --- | --- | --- |
| 0–5 min | Explain the game and this lesson's boundary | The game supplies permitted card IDs |
| 5–10 min | Run the setup check | `SETUP READY` |
| 10–18 min | Read the small example and run its tests | One failed test, two passed |
| 18–30 min | Ask your coding assistant for a focused fix | One changed line you understand |
| 30–40 min | Review the change and rerun the tests | Three passed tests |
| 40–45 min | Explain the result and record evidence | Your own short explanation |

## 1. Understand the example

Open `practice/scenarios.mjs`. The invented hand contains a blue 9 followed by a red 3. The supplied `legalActions.playableCardIds` list allows only the red 3. This list represents the game's answer, so the coach must use it instead of inventing a rule.

Open `practice/recommend-card.mjs`. Its deliberate bug chooses the first card in the hand. A card being in your hand does not mean you can play it now.

The full game has a much larger `GameView` type, server authentication and rules engine. This starter includes only the fields needed to teach the boundary. It does not claim to validate every rule or replace the upstream implementation.

## 2. Observe the failure

Run in the starter folder:

```text
pnpm test
```

Expected: **3 tests; 2 pass; 1 fails**, with the failed test named `recommends the playable card when the first hand card is not playable`. The comparison shows actual `practice-blue-9` versus expected `practice-red-3`. A nonzero exit status is expected here. This is the intended lesson failure, not a broken installation.

pnpm may also print `Local package.json exists, but node_modules missing, did you mean to install?` after the deliberate failure. This starter has no dependencies, so that warning does not require an installation. Read the named test failure above it.

The other tests check a different allowed card and a turn where no card is permitted. They help catch a misleading fix that simply returns the red card every time.

## 3. Ask for a focused fix

Open the starter folder in Codex or Claude. Copy this prompt:

```text
I am learning to build an Open Shed practice coach. Read README.md,
practice/scenarios.mjs, practice/recommend-card.mjs and
tests/recommend-card.test.mjs. Explain why the first test fails.
Then change only practice/recommend-card.mjs so the recommendation uses
legalActions.playableCardIds, returning null when none are allowed.
Do not alter the tests, hard-code a card ID, install anything, use the
internet, commit, push, deploy or change files outside this starter.
Run pnpm test and explain the result in plain English.
```

If the assistant asks to run a command, read the command first. It should stay inside this folder. The lesson does not need passwords, API keys or access to your browser account.

## 4. Review and verify yourself

Open the changed function. Explain which list it now uses and what happens when that list is empty. Check that the tests and scenario files remain unchanged. In your own terminal run:

```text
pnpm run check:setup
pnpm test
```

Expected: `SETUP READY`, followed by **3 tests; 3 pass; 0 fail**. The assistant saying “fixed” is not the evidence; the output from your own run is.

This proves only the three practice behaviors. It does not prove the complete game is correct, that a multiplayer move succeeded, that a paid model was called, or that CI passed.

## 5. Record your work

Use this small evidence record in your notes:

```text
Session: 1 — Open Shed practice coach
Reference: f20a5c15bfb2b1aa943f61f8b17bcbd27f185c40
Assistant used: Codex or Claude
Setup result: SETUP READY
Before: 2 passed, 1 failed
After: 3 passed, 0 failed
Changed file: practice/recommend-card.mjs
My explanation: [two sentences in your own words]
```

Keep the changed file and relevant terminal output. Remove personal paths, account information or unrelated output from screenshots. Use only invented scenarios; never paste a real player's hand, chat, table link, join code or identity into an AI prompt.

Use the Hub's existing submission fields only where the trainer has explicitly mapped this evidence to them. This pack does **not** add a new upload field, upstream pull-request importer, automatic GitHub validation or a pass status in the Hub. If your current form cannot accept the requested evidence, retain it locally and tell the trainer rather than selecting an unrelated submission type. Local completion and trainer assessment remain separate.

## After class: source reading and a safe fork

The fork exercise is follow-up work with the trainer; it is not required to reach the Session 1 test result. Read `UPSTREAM.md` first. Forking, pushing and pull requests are external actions you perform deliberately; this starter and its checker do none of them.

1. Open [the upstream repository](https://github.com/NiyiOke/open-shed-card-engine) and use GitHub's **Fork** action to create a copy in your own account. Do not request write access to the production repository.
2. Replace `YOUR-GITHUB-USERNAME` below with your account name. Clone into a **new** folder, then create the lesson branch at the reviewed source commit. Both PowerShell and macOS Terminal accept these commands:

   ```text
   git clone https://github.com/YOUR-GITHUB-USERNAME/open-shed-card-engine.git open-shed-course
   cd open-shed-course
   git switch -c Niyi/session-01-practice f20a5c15bfb2b1aa943f61f8b17bcbd27f185c40
   git rev-parse HEAD
   git status --short
   git remote -v
   ```

3. Check that `HEAD` matches the pinned hash, `git status --short` is empty, and `origin` names **your fork**. If the folder or branch already exists, stop and use a fresh location or ask the trainer; do not reset or delete existing work. If the pinned commit is unavailable, ask the trainer rather than substituting a newer version.
4. Inspect `lib/game/projection.ts`, `lib/game/engine.ts`, and `tests/game-engine.test.ts`. Locate the viewer's hand, the list of legal card IDs, and the test named `viewer projection exposes only the viewer's private hand`. Explain why the recommendation code must not read all players' hands.
5. You may use Finder/File Explorer to copy this starter into a new `course-practice/session-01` folder inside **your fork**. Do not overwrite upstream files. Enter that folder and rerun `pnpm run check:setup` and `pnpm test`. This keeps the small exercise attached to the same course project.
6. Review `git diff` and `git status --short` from the fork root with your trainer. Do not commit secrets or machine configuration. A lesson folder is not automatically appropriate for an upstream contribution. Commit/push/PR work belongs to its separately taught and reviewed workflow.

The upstream game currently documents **npm** with `package-lock.json`; this standalone starter uses **pnpm 10.7.1** and has no dependencies. Do not run pnpm at the upstream root or convert its lockfile for this lesson. Do not copy or deploy its `.openai/hosting.json`: it identifies the existing hosted project. Running the complete game, applying migrations, provisioning training hosting and configuring paid AI are later, separately prepared exercises.

## Mandatory local checks versus later CI

For Session 1, the mandatory local checks are `pnpm run check:setup` and `pnpm test` inside this starter. No GitHub Actions workflow is included in this pack, so a local green result is not a green CI result.

A later upstream pull request must meet the then-current contribution rules and relevant full-game checks. At the pinned source, these include unit tests, typecheck, lint, build and performance checks, truthful Codex/Claude attestation and maintainer review. An upstream merge, deployment or GitHub submission is not required or claimed by Session 1.
