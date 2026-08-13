import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("contains one descriptive h1", () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /Engineering clarity for/);
});

test("defines essential discovery metadata", () => {
  assert.match(html, /<title>Farid Benvidi — Advanced Simulation &amp; CAE Engineer<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/faridbnv\.github\.io\/"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /property="og:image"/);
});

test("all in-page navigation targets exist", () => {
  const targets = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  for (const target of targets) {
    assert.match(html, new RegExp(`id="${target}"`), `missing #${target}`);
  }
});

test("does not expose common sensitive placeholders", () => {
  assert.doesNotMatch(html, /customer name|salary|compensation|revenue|confidential value/i);
});
