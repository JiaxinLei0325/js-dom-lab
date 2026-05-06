# Lab — DOM: F&F Crew Switcher

![One does not simply ignore the DOM](https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif)

> "I don't have friends. I got family." — Dom Toretto, _Furious 7_
>
> Today your "family" is the DOM tree. Time to start a fight with it.

---

## Background

Yesterday you learned how to write JavaScript — variables, functions, arrays, loops, the prototype chain. But all of that ran in a sandbox. Nothing showed up on a webpage. JavaScript alone can't draw a button. It can't read what a user typed. It can't change a color when you click something.

The **Document Object Model (DOM)** is the bridge. It's the live, in-memory tree the browser builds from your HTML, and it's the API your JavaScript uses to read and change everything on the page. Every modern web app — from Instagram to Slack to a TTPR mock interview portal — works by manipulating the DOM in response to user events.

In this lab you'll build a Fast & Furious "Crew Switcher" — a single-page app where users can click between crew members, recruit themselves into the family, restyle the card, and remove members. By the end you'll have practiced every major DOM skill from today's slides.

---

## Objectives

By the end of this lab you will be able to:

- Search the DOM with `getElementById`, `getElementsByClassName`, `getElementsByTagName`, `querySelector`, and `querySelectorAll`
- Tell the difference between an `HTMLCollection` / `NodeList` and a real array, and convert between them with `[...]`, `Array.from`, and `Array.isArray`
- Traverse the DOM using `parentNode`
- Change the DOM using `.innerText`, `.innerHTML`, `.src`, `.style`, and `.value`
- Create new elements with `document.createElement` and add them with `.appendChild`
- Remove elements with `.removeChild` and the `parentNode` trick
- Attach event handlers using `addEventListener`
- Read user input from a `<form>` and prevent the default page reload with `event.preventDefault()`
- Use `data-*` attributes to carry information from HTML into your JS

---

## Setup

1. Fork this repository to your own GitHub account.
2. Clone your fork locally:

   ```
   git clone <your-fork-url>
   cd <repo-name>
   ```

3. Open `index.html` in your browser to see the starter page.
4. Open the **DevTools console** so you can see your `console.log` output and any errors:
   - **Mac (Chrome):** `Command + Option + J`
   - **Windows / Linux / ChromeOS (Chrome):** `Control + Shift + J`
5. **Refresh the browser after every change** to `script.js` or `index.html`.

> No `npm install` needed. No build step. Just a browser and a text editor.

---

## Instructions

You'll edit two files: **`index.html`** and **`script.js`**. (You don't need to touch `style.css` — it's done.)

### Part 1 — HTML Content (`index.html`)

Open `index.html`. You'll find 5 numbered comment placeholders. Replace each comment with the correct HTML element.

> **Do not remove the comment.** Replace it with the actual element immediately after it, or swap the comment for the element. Keep the surrounding `<div>` containers intact.

**1. `<h1>` — Page title**
Add an `<h1>` with `id="page-title"` and the text `Welcome to the Crew`.

**2. `<h2>` — Member name**
Inside `#crew-card`, add an `<h2>` with `id="member-name"` and the text `Dominic Toretto`.

**3. `<p>` — Bio**
Inside `#crew-card`, after the `<img>`, add a `<p>` with `class="bio"` and the text:

> Street racer. Family man. Drives a 1970 Dodge Charger R/T.

**4. Three `<li>` — Stats**
Inside the `<ul id="stats">`, add three `<li>` elements, each with `class="stat"`:

- `Driving: 99`
- `Loyalty: 100`
- `Quarter Mile: 9.4s`

**5. The `<form>`**
Inside `#form-section`, replace the comment with a `<form id="add-member-form">` containing, **in this order**:

```html
<label for="new-name">Name</label>
<input type="text" id="new-name" name="new-name">
<label for="new-ride">Ride</label>
<input type="text" id="new-ride" name="new-ride">
<input type="submit" value="Add to Crew">
```

> **Tip:** After this part, refresh the browser. The card should look complete (Dom's name, bio, stats, photo) and the form should be visible. None of the buttons or the form will _do_ anything yet — that's Part 2.

---

### Part 2 — JavaScript (`script.js`)

Open `script.js`. You'll find 6 numbered TODO blocks (1a, 1b, 1c, 1d, 2, 3, 4a, 4b, 5, 6). Each one has step-by-step hints in the comments. Complete them in order — later parts depend on earlier ones.

**TODO 1 — Searching the DOM** Practice all four search methods. Verify each one with `console.log`. Pay close attention to `Array.isArray(statList)` — it returns `false`, just like the slides warned.

**TODO 2 — Convert NodeList → Array** Use the spread operator (`[...divList]` from the slides) so you can call `.forEach()` on it.

**TODO 3 — `showMember(key)`** This is the heart of the lab. Reads from the `CREW` object and updates the card's heading, bio, photo, and stat list. To rebuild the stats, **clear the `<ul>` first** (`innerHTML = ""`) then create new `<li>` elements with `document.createElement` and append them.

**TODO 4a — Switcher buttons** Loop through the `.switch-btn` buttons and attach a click listener. Read each button's `data-member` attribute with `btn.dataset.member` and pass it to `showMember(...)`.

**TODO 4b — Remove from Crew** When `#remove-member-btn` is clicked, remove the entire `#crew-card` using the slide trick: `oldNode.parentNode.removeChild(oldNode)`.

**TODO 5 — Form submit** Listen for the form's `submit` event. **Call `event.preventDefault()` first** or the page reloads and your code breaks. Read the inputs with `.value`, build a new `<li>` with a delete button, and append it to `#recruits`.

**TODO 6 — Style buttons** Three buttons, three background colors. Use `.style.backgroundColor`.

---

### Part 3 — Reflection

Create a file called `reflection.md` in your repo and answer these in your own words (2–4 sentences each):

1. **In the slides, `Array.isArray(divList)` returns `false` even though `divList` looks like an array.** Why is that, and which of the three workarounds (`[].prototype.slice.call`, `Array.from`, or `[...]`) did you use in TODO 2 and why?
2. **What does `event.preventDefault()` do in TODO 5, and what happens if you forget to call it?** (Try removing it and see.)
3. **In TODO 4a you used `btn.dataset.member` instead of writing four separate event listeners — one for the Dom button, one for Brian, etc.** Why is the `data-*` approach better as the app grows?
4. **`.innerText` vs `.innerHTML` — when would you reach for each one?** Bonus: what's a security risk with using `.innerHTML` on text that came from a user?

---

### Part 4 — Submit via Pull Request

1. Stage, commit, and push your changes:

   ```
   git add .
   git commit -m "complete dom lab"
   git push origin main
   ```

2. Open a **Pull Request** from your fork back to the original repo's `main` branch.
3. Do **not** merge the PR yourself — your instructor will review it.

---

## Checklist

Use this checklist to verify your work before submitting.

### HTML (`index.html`)

- [ ] `<h1 id="page-title">Welcome to the Crew</h1>` is present
- [ ] `<h2 id="member-name">Dominic Toretto</h2>` is present in `#crew-card`
- [ ] `<p class="bio">` with the bio text is present in `#crew-card`
- [ ] Three `<li class="stat">` elements are present in `<ul id="stats">`
- [ ] `<form id="add-member-form">` is present with two labels, two text inputs, and a submit input

### JavaScript (`script.js`)

- [ ] **TODO 1a** — `pageTitle` is grabbed with `getElementById` and logged
- [ ] **TODO 1b** — `statList` is grabbed with `getElementsByClassName`, and `Array.isArray(statList)` is logged (and prints `false`)
- [ ] **TODO 1c** — `allButtons` is grabbed with `getElementsByTagName` and its `.length` is logged
- [ ] **TODO 1d** — `firstSwitchBtn` and `allSwitchBtns` are grabbed with `querySelector` / `querySelectorAll`
- [ ] **TODO 2** — `statArray` is built using the spread operator and `.forEach` runs on it
- [ ] **TODO 3** — `showMember(key)` updates name, bio, photo, AND clears + rebuilds the stats list
- [ ] **TODO 4a** — Clicking each switch button updates the card
- [ ] **TODO 4b** — Clicking "Remove from Crew" removes the entire card
- [ ] **TODO 5** — Submitting the form calls `preventDefault`, validates, and adds an `<li>` with a working "Remove" button
- [ ] **TODO 6** — Red / Blue / Reset buttons change the card's background color

### Reflection

- [ ] `reflection.md` is present in the repo root
- [ ] All 4 reflection questions are answered

---

## Resources

- [MDN — Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN — `getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
- [MDN — `querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [MDN — `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN — `event.preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
- [MDN — `HTMLElement.dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
- [MDN — `Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Chrome DevTools — Open the Console](https://developer.chrome.com/docs/devtools/console/)
