import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("contains one descriptive h1", () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /Advanced simulation/);
  assert.match(html, /Clear engineering decisions/);
});

test("defines essential discovery metadata", () => {
  assert.match(html, /<title>Farid Benvidi — Advanced Simulation &amp; Application Engineering<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/faridbnv\.github\.io\/"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /property="og:image" content="https:\/\/faridbnv\.github\.io\/og-resume-aligned\.png"/);
});

test("aligns with the resume's current role and career history", () => {
  assert.match(html, /Solutions Consultant, Applications/);
  assert.match(html, /TriMech \(Javelin Technologies Inc\.\)/);
  assert.match(html, /Sept 2022—Present/);
  assert.match(html, /Mechanical Design Engineer/);
  assert.match(html, /Dec 2021—Aug 2022/);
  assert.match(html, /Graduate Research Assistant &amp; Teaching Assistant/);
  assert.match(html, /University of British Columbia/);
  assert.match(html, /Amirkabir University/);
});

test("carries the resume's technical breadth into the portfolio", () => {
  for (const topic of ["Abaqus", "3DEXPERIENCE", "Isight", "Hyperelasticity", "Viscoelasticity", "CATIA V5", "Customer engineering"]) {
    assert.match(html, new RegExp(topic, "i"), `missing ${topic}`);
  }
});

test("adds public-safe context and evidence beyond the resume", () => {
  assert.match(html, /3–4/);
  assert.match(html, /Several \/ month/);
  assert.match(html, /Why it matters/);
  assert.match(html, /Public-safe/);
  assert.doesNotMatch(html, /Case study in development/i);
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

test("uses LinkedIn as the professional profile destination", () => {
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/faridhb\//);
  assert.doesNotMatch(html, /github\.com\/faridbnv/);
});

test("includes NDA-safe technical imagery", () => {
  assert.match(html, /assets\/work-automation\.jpg/);
  assert.match(html, /assets\/work-composites\.jpg/);
  assert.match(html, /assets\/work-materials\.jpg/);
});
