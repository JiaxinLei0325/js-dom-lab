/**
 * __tests__/dom.test.js
 *
 * These tests load `index.html` and `script.js` into a fake browser
 * (jsdom) so we can verify your DOM work. Each `describe` block lines
 * up with a TODO from `script.js`.
 *
 * Run them with:
 *   npm test
 *
 * Watch mode (re-runs on every save):
 *   npm run test:watch
 */

const fs = require("fs");
const path = require("path");

const HTML_PATH = path.join(__dirname, "..", "index.html");
const SCRIPT_PATH = path.join(__dirname, "..", "script.js");

/**
 * Reset the document, then run script.js in the test window so that
 * function declarations (e.g. `function showMember(...)`) attach to
 * the global object and event listeners hook up to fresh DOM nodes.
 */
function loadLab() {
  const html = fs.readFileSync(HTML_PATH, "utf8");
  const script = fs.readFileSync(SCRIPT_PATH, "utf8");

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  document.head.innerHTML = headMatch ? headMatch[1] : "";
  document.body.innerHTML = bodyMatch ? bodyMatch[1] : html;

  // innerHTML doesn't execute <script> tags — strip them anyway for cleanliness.
  document.querySelectorAll("script[src]").forEach((s) => s.remove());

  // Indirect eval — top-level function declarations land on `window`.
  // eslint-disable-next-line no-eval
  window.eval(script);
}

/**
 * Returns the same color jsdom would store after assignment.
 * Avoids us hard-coding "rgb(...)" strings the student didn't write.
 */
function normalizeColor(value) {
  const probe = document.createElement("div");
  probe.style.backgroundColor = value;
  return probe.style.backgroundColor;
}

/**
 * jsdom does not implement layout, so setting `el.innerText = "x"` stores
 * the value as a property but doesn't create a DOM text node — meaning
 * `el.textContent` stays stale. Read whichever is more recent. Real
 * browsers keep them in sync.
 */
function readText(el) {
  if (!el) return "";
  if (typeof el.innerText === "string" && el.innerText.length > 0) {
    return el.innerText;
  }
  return el.textContent || "";
}

// =====================================================
// PART 1 — HTML structure (index.html)
// =====================================================
describe("Part 1 — HTML structure", () => {
  beforeEach(loadLab);

  test("h1#page-title is present with the text 'Welcome to the Crew'", () => {
    const h1 = document.getElementById("page-title");
    expect(h1).not.toBeNull();
    expect(h1.tagName).toBe("H1");
    expect(h1.textContent.trim()).toBe("Welcome to the Crew");
  });

  test("h2#member-name lives inside #crew-card and reads 'Dominic Toretto'", () => {
    const card = document.getElementById("crew-card");
    expect(card).not.toBeNull();
    const h2 = card.querySelector("#member-name");
    expect(h2).not.toBeNull();
    expect(h2.tagName).toBe("H2");
    expect(h2.textContent.trim()).toBe("Dominic Toretto");
  });

  test("a <p class='bio'> with the bio text exists inside #crew-card", () => {
    const bio = document.querySelector("#crew-card .bio");
    expect(bio).not.toBeNull();
    expect(bio.tagName).toBe("P");
    expect(bio.textContent).toMatch(/Street racer/i);
    expect(bio.textContent).toMatch(/1970 Dodge Charger/i);
  });

  test("#stats has three <li class='stat'> children with the correct text", () => {
    const stats = document.querySelectorAll("#stats .stat");
    expect(stats).toHaveLength(3);
    const texts = [...stats].map((s) => s.textContent.trim());
    expect(texts).toContain("Driving: 99");
    expect(texts).toContain("Loyalty: 100");
    expect(texts).toContain("Quarter Mile: 9.4s");
  });

  test("#add-member-form contains #new-name, #new-ride, and a submit input", () => {
    const form = document.getElementById("add-member-form");
    expect(form).not.toBeNull();
    expect(form.tagName).toBe("FORM");
    expect(form.querySelector("#new-name")).not.toBeNull();
    expect(form.querySelector("#new-ride")).not.toBeNull();
    expect(form.querySelector("input[type='submit']")).not.toBeNull();
  });
});

// =====================================================
// PART 1/2 — DOM search APIs in script.js
// =====================================================
// We can't easily inspect `const pageTitle` after the script has run,
// so we statically check the source for the four search APIs and the
// spread-based array conversion. (No regex pun intended.)
describe("Part 1/2 — DOM search methods are used in script.js", () => {
  const src = fs.readFileSync(SCRIPT_PATH, "utf8");
  const uncommented = src.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");

  test("uses document.getElementById", () => {
    expect(uncommented).toMatch(/getElementById\s*\(/);
  });
  test("uses document.getElementsByClassName", () => {
    expect(uncommented).toMatch(/getElementsByClassName\s*\(/);
  });
  test("uses document.getElementsByTagName", () => {
    expect(uncommented).toMatch(/getElementsByTagName\s*\(/);
  });
  test("uses document.querySelector", () => {
    expect(uncommented).toMatch(/querySelector\s*\(/);
  });
  test("uses document.querySelectorAll", () => {
    expect(uncommented).toMatch(/querySelectorAll\s*\(/);
  });
  test("uses Array.isArray (TODO 1b)", () => {
    expect(uncommented).toMatch(/Array\.isArray\s*\(/);
  });
  test("uses the spread operator to convert a NodeList/HTMLCollection (TODO 2)", () => {
    expect(uncommented).toMatch(/\[\s*\.\.\./);
  });
});

// =====================================================
// PART 3 — showMember(key) updates the card
// =====================================================
// We exercise showMember through the switcher buttons so the test
// works regardless of how the student declared the function.
describe("Part 3 — showMember updates the card", () => {
  beforeEach(loadLab);

  test("clicking the Brian button updates name, bio, and photo", () => {
    const btn = document.querySelector('.switch-btn[data-member="brian"]');
    expect(btn).not.toBeNull();
    btn.click();

    expect(readText(document.getElementById("member-name")).trim()).toBe(
      "Brian O'Conner"
    );
    expect(readText(document.querySelector(".bio"))).toMatch(/Ex-FBI/);
    expect(document.getElementById("member-photo").src).toMatch(/Paul_Walker/);
  });

  test("rebuilds the stats list — old stats are replaced, not appended", () => {
    document.querySelector('.switch-btn[data-member="hobbs"]').click();
    const stats = [...document.querySelectorAll("#stats .stat")].map((s) =>
      readText(s).trim()
    );
    expect(stats).toEqual([
      "Strength: 100",
      "Driving: 88",
      "Intimidation: 99",
    ]);
  });

  test("each rebuilt stat is an <li class='stat'>", () => {
    document.querySelector('.switch-btn[data-member="letty"]').click();
    const items = document.querySelectorAll("#stats li");
    expect(items.length).toBeGreaterThan(0);
    items.forEach((li) => {
      expect(li.tagName).toBe("LI");
      expect(li.classList.contains("stat")).toBe(true);
    });
  });
});

// =====================================================
// PART 4a — Switcher buttons
// =====================================================
describe("Part 4a — Switcher buttons", () => {
  beforeEach(loadLab);

  test("clicking the Letty button updates the card", () => {
    document.querySelector('.switch-btn[data-member="letty"]').click();
    expect(readText(document.getElementById("member-name")).trim()).toBe(
      "Letty Ortiz"
    );
  });

  test("clicking the Hobbs button updates the card", () => {
    document.querySelector('.switch-btn[data-member="hobbs"]').click();
    expect(readText(document.getElementById("member-name")).trim()).toBe(
      "Luke Hobbs"
    );
  });

  test("clicking the Dom button switches back to Dom after another member", () => {
    document.querySelector('.switch-btn[data-member="brian"]').click();
    document.querySelector('.switch-btn[data-member="dom"]').click();
    expect(readText(document.getElementById("member-name")).trim()).toBe(
      "Dominic Toretto"
    );
  });
});

// =====================================================
// PART 4b — Remove from Crew
// =====================================================
describe("Part 4b — Remove from Crew button", () => {
  beforeEach(loadLab);

  test("clicking #remove-member-btn removes #crew-card from the DOM", () => {
    expect(document.getElementById("crew-card")).not.toBeNull();
    document.getElementById("remove-member-btn").click();
    expect(document.getElementById("crew-card")).toBeNull();
  });
});

// =====================================================
// PART 5 — Add-yourself form
// =====================================================
describe("Part 5 — Add-yourself form", () => {
  beforeEach(loadLab);

  function fillAndSubmit(name, ride) {
    document.getElementById("new-name").value = name;
    document.getElementById("new-ride").value = ride;
    const form = document.getElementById("add-member-form");
    const ev = new Event("submit", { cancelable: true, bubbles: true });
    form.dispatchEvent(ev);
    return ev;
  }

  test("calls preventDefault so the page doesn't reload", () => {
    const ev = fillAndSubmit("Roman", "Lamborghini");
    expect(ev.defaultPrevented).toBe(true);
  });

  test("appends a new <li> to #recruits with the name and ride", () => {
    fillAndSubmit("Roman", "Lamborghini Murciélago");
    const items = document.querySelectorAll("#recruits li");
    expect(items).toHaveLength(1);
    expect(readText(items[0])).toMatch(/Roman/);
    expect(readText(items[0])).toMatch(/Lamborghini Murciélago/);
  });

  test("does NOT add a recruit when name is blank", () => {
    fillAndSubmit("", "Mustang");
    expect(document.querySelectorAll("#recruits li")).toHaveLength(0);
  });

  test("does NOT add a recruit when ride is blank", () => {
    fillAndSubmit("Roman", "");
    expect(document.querySelectorAll("#recruits li")).toHaveLength(0);
  });

  test("clears both input fields after a successful submit", () => {
    fillAndSubmit("Tej", "Honda S2000");
    expect(document.getElementById("new-name").value).toBe("");
    expect(document.getElementById("new-ride").value).toBe("");
  });

  test("the new <li> contains a Remove button that removes only that <li>", () => {
    fillAndSubmit("Roman", "Lambo");
    fillAndSubmit("Tej", "S2000");

    const items = document.querySelectorAll("#recruits li");
    expect(items).toHaveLength(2);

    const firstBtn = items[0].querySelector("button");
    expect(firstBtn).not.toBeNull();
    firstBtn.click();

    const remaining = document.querySelectorAll("#recruits li");
    expect(remaining).toHaveLength(1);
    expect(readText(remaining[0])).toMatch(/Tej/);
  });
});

// =====================================================
// PART 6 — Color buttons
// =====================================================
describe("Part 6 — Color buttons", () => {
  beforeEach(loadLab);

  test("Red Tint sets #crew-card background to #5a1a1a", () => {
    document.getElementById("red-btn").click();
    expect(document.getElementById("crew-card").style.backgroundColor).toBe(
      normalizeColor("#5a1a1a")
    );
  });

  test("Blue Tint sets #crew-card background to #1a2a5a", () => {
    document.getElementById("blue-btn").click();
    expect(document.getElementById("crew-card").style.backgroundColor).toBe(
      normalizeColor("#1a2a5a")
    );
  });

  test("Reset puts the background back to #2a2a2a", () => {
    document.getElementById("red-btn").click();
    document.getElementById("reset-btn").click();
    expect(document.getElementById("crew-card").style.backgroundColor).toBe(
      normalizeColor("#2a2a2a")
    );
  });
});
