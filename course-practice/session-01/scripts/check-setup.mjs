#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// No installs, writes, network requests, environment dumps, or account checks.
// Run from any directory: the starter root is resolved from this file.
const starterRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const expectedNode = "22.14.0";
const expectedPnpm = "10.7.1";
const expectedReference = "f20a5c15bfb2b1aa943f61f8b17bcbd27f185c40";
let failures = 0;

function report(ok, label, detail) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}: ${detail}`);
  if (!ok) failures += 1;
}

function readVersion(command) {
  // Fixed executable names only. Windows invokes its .cmd wrapper via cmd.exe.
  // A neutral directory avoids activating a parent repository's package manager.
  // Corepack is explicitly forbidden from downloading or auto-pinning anything.
  const result = spawnSync(command, ["--version"], {
    encoding: "utf8",
    timeout: 10000,
    windowsHide: true,
    shell: process.platform === "win32",
    cwd: tmpdir(),
    env: {
      ...process.env,
      COREPACK_ENABLE_NETWORK: "0",
      COREPACK_ENABLE_AUTO_PIN: "0",
      npm_config_manage_package_manager_versions: "false",
      npm_config_package_manager_strict: "false",
      npm_config_update_notifier: "false",
    },
  });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim();
}

console.log("Open Shed Session 1 setup check (read-only)");
report(process.versions.node === expectedNode, "Node", `expected ${expectedNode}; found ${process.versions.node}`);

const pnpmVersion = readVersion("pnpm");
report(pnpmVersion === expectedPnpm, "pnpm", `expected ${expectedPnpm}; found ${pnpmVersion ?? "unavailable (ask your trainer to prepare it)"}`);

const gitVersion = readVersion("git");
report(Boolean(gitVersion?.startsWith("git version ")), "Git", gitVersion ?? "unavailable (ask your trainer to prepare it)");

for (const relativePath of [
  "package.json",
  ".nvmrc",
  "README.md",
  "UPSTREAM.md",
  "LICENSE.upstream",
  "reference.json",
  "practice/recommend-card.mjs",
  "practice/scenarios.mjs",
  "tests/recommend-card.test.mjs",
]) {
  report(existsSync(resolve(starterRoot, relativePath)), "File", relativePath);
}

try {
  const reference = JSON.parse(readFileSync(resolve(starterRoot, "reference.json"), "utf8"));
  report(reference.commit === expectedReference, "Reference", reference.commit === expectedReference ? expectedReference : "does not match the Session 1 source pin");
} catch {
  report(false, "Reference", "reference.json is missing or invalid JSON");
}

if (failures > 0) {
  console.log(`SETUP BLOCKED: ${failures} check(s) need attention. This script changed nothing.`);
  process.exitCode = 1;
} else {
  console.log("SETUP READY. Next: pnpm test");
  console.log("The first exercise run should show 1 failed and 2 passed tests; that failure is deliberate.");
  console.log("This checks local prerequisites and starter files, not AI account access, the full game, CI, or Hub submission.");
}
