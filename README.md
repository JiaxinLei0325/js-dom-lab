# JS DOM Lab — F&F Crew Switcher 🏎️

A hands-on lab for practicing **DOM searching**, **DOM manipulation**, **events**, and **forms** — with a Fast & Furious twist (Dom, Brian, Letty, Hobbs, and a recruiting form for *you*).

> "I don't have friends. I got family." — Dom Toretto, _Furious 7_
>
> Today your "family" is the DOM tree. Time to start a fight with it.

---

## 🎯 Learning Objectives

By the end of this lab, you should be able to:

1. Search the DOM with `getElementById`, `getElementsByClassName`, `getElementsByTagName`, `querySelector`, and `querySelectorAll`.
2. Tell the difference between an `HTMLCollection` / `NodeList` and a real array — and convert one with the spread operator.
3. Change page content with `.innerText`, `.innerHTML`, `.src`, and `.style`.
4. Build new elements with `document.createElement` and `.appendChild`.
5. Remove elements with the `node.parentNode.removeChild(node)` pattern.
6. Wire up user interactions with `addEventListener`.
7. Read form input with `.value` and stop the default page reload with `event.preventDefault()`.
8. Read `data-*` attributes with `element.dataset` to drive UI from HTML.

---

## 📚 Quick Reference

| Need to…                          | Use this                                                         |
|-----------------------------------|------------------------------------------------------------------|
| Find one element by id            | `document.getElementById("foo")`                                 |
| Find many by CSS selector         | `document.querySelectorAll(".foo")`                              |
| Convert a NodeList to an array    | `[...nodeList]` *or* `Array.from(nodeList)`                      |
| Change visible text               | `el.innerText = "hi"`                                            |
| Replace markup inside an element  | `el.innerHTML = "<b>hi</b>"` *(careful with user input!)*        |
| Make a new element                | `const li = document.createElement("li")`                        |
| Add it to the page                | `parent.appendChild(li)`                                         |
| Remove an element                 | `el.parentNode.removeChild(el)`                                  |
| React to a click                  | `btn.addEventListener("click", () => { ... })`                   |
| Read a form field                 | `document.getElementById("new-name").value`                      |
| Stop a form from reloading        | `event.preventDefault()`                                         |
| Read `<button data-member="dom">` | `btn.dataset.member` // "dom"                                    |

```js
// Pattern: replace the contents of a list
const ul = document.getElementById("stats");
ul.innerHTML = "";
["Driving: 99", "Loyalty: 100"].forEach((text) => {
  const li = document.createElement("li");
  li.className = "stat";
  li.innerText = text;
  ul.appendChild(li);
});
```

---

## 🚀 Getting Started

### 1. Fork, clone & install
First, **fork** this repo to your own GitHub account (click **Fork** at the top right of the GitHub page). Then clone **your fork** — not the original — and install dependencies:

```bash
git clone https://github.com/<your-username>/js-dom-lab.git
cd js-dom-lab
npm install
```

> Working from your own fork is what lets you push your work back to GitHub for submission. If you clone the original instead, `git push` will fail.

### 2. Start the dev server
```bash
npm start
```

This starts **live-server** on [http://localhost:3000](http://localhost:3000) and opens your browser automatically. It also **auto-reloads the page every time you save** `index.html`, `script.js`, or `style.css` — no manual refresh needed.

> Leave the server running in one terminal tab. Open a second terminal tab for `npm test` and `git`. Stop the server with `Ctrl + C`.

Now open your editor and:
- Edit **`index.html`** and **`script.js`** as you complete each TODO.
- Open **DevTools → Console** in the browser so you can see your `console.log` output and any errors:
  - **Mac (Chrome):** `Cmd + Option + J`
  - **Windows / Linux:** `Ctrl + Shift + J`

### 3. Run the tests
```bash
npm test
```

You'll see a list of passing ✓ and failing ✗ tests. Keep working until they all pass.

To re-run the tests automatically every time you save:
```bash
npm run test:watch
```

> The tests use **jsdom** — a fake browser inside Node — so they can verify your DOM updates without you having to click anything. They cover every TODO in `script.js` plus the HTML you add to `index.html`.

---

## 📝 The Exercises

You'll edit two files: **`index.html`** and **`script.js`**. (You don't need to touch `style.css` — it's done.)

| #     | File         | Topic                       | What you build                                                  |
|-------|--------------|-----------------------------|-----------------------------------------------------------------|
| HTML 1| `index.html` | Page heading                | `<h1 id="page-title">` with the page title                      |
| HTML 2| `index.html` | Member name                 | `<h2 id="member-name">` inside the crew card                    |
| HTML 3| `index.html` | Bio                         | `<p class="bio">` with Dom's tagline                            |
| HTML 4| `index.html` | Stats list                  | Three `<li class="stat">` items inside `<ul id="stats">`        |
| HTML 5| `index.html` | Add-yourself form           | A `<form id="add-member-form">` with two text inputs + submit   |
| JS 1  | `script.js`  | DOM searching               | Use all four `getElement*` / `querySelector*` methods           |
| JS 2  | `script.js`  | NodeList → Array            | Spread a collection and call `.forEach`                         |
| JS 3  | `script.js`  | Updating the DOM            | `showMember(key)` rewrites the card from `CREW` data            |
| JS 4a | `script.js`  | Events                      | Wire each switcher button to `showMember`                       |
| JS 4b | `script.js`  | Removing nodes              | "Remove from Crew" deletes `#crew-card`                         |
| JS 5  | `script.js`  | Forms                       | Submit handler that adds a recruit `<li>` with a Remove button  |
| JS 6  | `script.js`  | Inline styles               | Three buttons that change the card's background color          |
| ⭐    | `script.js`  | Stretch — pick one          | Add a 5th member, timestamp recruits, or a "Surprise Me" button |

The TODOs in `script.js` walk you through each step in detail — open the file and follow them in order.

---

## 💡 Tips & Gotchas

- **`npm start` auto-reloads your browser.** No need to manually refresh after each save. If it ever stops reloading, just hit `Cmd/Ctrl + R` once.
- **Port 3000 already in use?** Stop the other process, or change the port with `npx live-server --port=4000`.
- **`Array.isArray(htmlCollection)` returns `false`.** That's the trap from the slides. To get array methods like `.forEach`, spread it first: `[...statList]`.
- **`event.preventDefault()` is the line that makes forms work.** Forget it and the page reloads — your JS state vanishes mid-submit.
- **Use `.innerText` for plain text.** Reach for `.innerHTML` only when you genuinely need HTML markup. **Never** put unescaped user input into `.innerHTML` — that's a classic XSS hole.
- **`data-*` attributes scale.** One listener that reads `btn.dataset.member` beats four listeners that each hard-code a name. As you add a 5th, 6th, 7th member, the JS doesn't change at all.
- **Removing a node:** the slide pattern is `node.parentNode.removeChild(node)`. (Modern browsers also accept `node.remove()`, but the lab and the slides use the parentNode form.)
- **Tests fail with `Cannot read properties of null`?** That means `getElementById` returned `null` — the element you're looking for isn't in `index.html` yet. Finish the HTML for that part first.

---

## ✅ Submission

1. Make sure `npm test` shows **all 28 tests passing**.
2. Create a `reflection.md` file in the repo root (see [Reflection](#-reflection) below) and answer the four questions in your own words.
3. Commit and push your changes to **your fork**:
   ```bash
   git add .
   git commit -m "complete dom lab"
   git push
   ```
4. **Open a pull request to the original repo.** On GitHub, go to your fork and click **Contribute → Open pull request** (or visit the original repo and click **Pull requests → New pull request → compare across forks**). Make sure the *base* is the original repo's `main` and the *compare* is your fork's `main`. Title it with your name (e.g. `Jane Doe — DOM lab`) and click **Create pull request**.
5. Submit the URL of your pull request. **Do not merge it yourself** — your instructor will review it.

---

## 🤔 Reflection

Create a file called `reflection.md` in your repo root. Answer each question in your own words (2–4 sentences each):

1. **`Array.isArray(divList)` returns `false` even though `divList` looks like an array.** Why is that, and which workaround did you use in TODO 2 (and why)?
2. **What does `event.preventDefault()` do in TODO 5, and what happens if you forget it?** (Try removing it and see.)
3. **In TODO 4a you used `btn.dataset.member` instead of writing four separate event listeners.** Why is the `data-*` approach better as the app grows?
4. **`.innerText` vs `.innerHTML` — when would you reach for each one?** Bonus: what's a security risk with putting user-typed text into `.innerHTML`?

---

## 📖 Resources

- [MDN — Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN — `getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
- [MDN — `querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [MDN — `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN — `event.preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
- [MDN — `HTMLElement.dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
- [MDN — `Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Chrome DevTools — Open the Console](https://developer.chrome.com/docs/devtools/console/)

Good luck — and remember: family. 🏁
