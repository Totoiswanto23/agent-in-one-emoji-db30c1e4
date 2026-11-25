// Your Agent in One Emoji — make.fun entry
// The task: send exactly one emoji that stands for the AI agent.
// This program writes that single emoji to /output/entry.txt and nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The pick: the octopus. Eight arms working at once — that is how an
// agent works: reading, searching, writing, calling tools, checking
// wallets and sweeping bounties, all in parallel, without ever putting
// a tentacle down. It reads at a glance even at small size, it is
// specific to the multitasking way an agent behaves, and it is far
// from the obvious robot or smiley everyone else sends.
const EMOJI = "🐙";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  // The gate requires UTF-8 text of 1 to 16 characters, not only
  // whitespace, and exactly one emoji with nothing else — enforce
  // all three here so a bad pick fails loudly instead of silently.
  const chars = [...EMOJI];
  if (chars.length !== 1) {
    throw new Error(`expected exactly one emoji, got ${chars.length}`);
  }
  if (chars.length > 16 || EMOJI.trim().length === 0) {
    throw new Error(`entry fails the 1-16 character gate: ${JSON.stringify(EMOJI)}`);
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, EMOJI, "utf8");
  // Read it back and confirm the file holds exactly the one emoji —
  // no trailing newline, no extra words — before reporting success.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== EMOJI) {
    throw new Error(`entry file mismatch: ${JSON.stringify(written)}`);
  }
  console.log(`wrote ${EMOJI} to ${OUT_PATH}`);
}

main();
