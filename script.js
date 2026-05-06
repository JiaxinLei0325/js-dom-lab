/* =========================================================
   F&F CREW SWITCHER — script.js
   ---------------------------------------------------------
   Complete each TODO below. Open index.html in your browser
   AND open DevTools (Cmd+Option+J on Mac, Ctrl+Shift+J on
   Windows/Linux). Use console.log() liberally to debug.
   ========================================================= */


/* ---------- CREW DATA ----------
   Don't change this object. You'll read from it in Part 3.
*/
const CREW = {
  dom: {
    name: "Dominic Toretto",
    bio: "Street racer. Family man. Drives a 1970 Dodge Charger R/T.",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vin_Diesel_by_Gage_Skidmore.jpg/440px-Vin_Diesel_by_Gage_Skidmore.jpg",
    stats: ["Driving: 99", "Loyalty: 100", "Quarter Mile: 9.4s"],
  },
  brian: {
    name: "Brian O'Conner",
    bio: "Ex-FBI. Adrenaline junkie. Drives a Nissan Skyline GT-R R34.",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Paul_Walker_Fast_Five_premiere.jpg/440px-Paul_Walker_Fast_Five_premiere.jpg",
    stats: ["Driving: 96", "Charm: 95", "Quarter Mile: 9.7s"],
  },
  letty: {
    name: "Letty Ortiz",
    bio: "Mechanic. Brawler. Heart of the crew. Drives a Plymouth Barracuda.",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Michelle_Rodriguez_2019_by_Glenn_Francis.jpg/440px-Michelle_Rodriguez_2019_by_Glenn_Francis.jpg",
    stats: ["Driving: 94", "Toughness: 99", "Quarter Mile: 9.9s"],
  },
  hobbs: {
    name: "Luke Hobbs",
    bio: "DSS Agent. The size of a small mountain. Drives a Gurkha LAPV.",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Dwayne_Johnson_2%2C_2013.jpg/440px-Dwayne_Johnson_2%2C_2013.jpg",
    stats: ["Strength: 100", "Driving: 88", "Intimidation: 99"],
  },
};


/* =========================================================
   PART 1 — SEARCHING THE DOM
   ---------------------------------------------------------
   Practice the four main DOM search methods.
   Log each result to the console so you can verify.
   ========================================================= */

// 1a. Use document.getElementById to grab the element with id "page-title".
//     Save it in a const called pageTitle. Then console.log(pageTitle).
// TODO 1a:


// 1b. Use document.getElementsByClassName to grab all elements with the
//     class "stat". Save it in a const called statList.
//     Then console.log statList AND console.log Array.isArray(statList).
//     (Spoiler from the slides: it's NOT a real array.)
// TODO 1b:


// 1c. Use document.getElementsByTagName to grab every <button> on the page.
//     Save it in a const called allButtons. Then console.log how many
//     buttons there are using allButtons.length.
// TODO 1c:


// 1d. Use document.querySelector to grab the FIRST element matching
//     ".switch-btn" (a CSS selector). Save it in a const called firstSwitchBtn.
//     Then use document.querySelectorAll to grab ALL of them — save that in
//     a const called allSwitchBtns. console.log both.
// TODO 1d:


/* =========================================================
   PART 2 — TURN A NODELIST INTO A REAL ARRAY
   ---------------------------------------------------------
   ========================================================= */

// 2. Take the statList from TODO 1b and turn it into a real array using
//    the spread operator (...). Save it in a const called statArray.
//    Then call .forEach() on statArray and console.log each stat element's
//    .innerText. (.forEach would NOT work on the original NodeList!)
// TODO 2:


/* =========================================================
   PART 3 — CHANGING THE DOM (CHARACTER SWITCHER)
   ---------------------------------------------------------
   When a user clicks one of the switch buttons (Dom, Brian,
   Letty, Hobbs), update the crew card to show that member.
   ========================================================= */

// 3. Write a function called showMember that takes a key
//    ("dom", "brian", "letty", or "hobbs") and updates the card.
//
//    Inside the function:
//      a) Look up the data: const member = CREW[key];
//      b) Update the <h2 id="member-name"> using .innerText
//      c) Update the <p class="bio"> using .innerText
//         (HINT: use document.querySelector(".bio"))
//      d) Update the <img id="member-photo"> .src attribute
//      e) Update the stats list:
//           - First, set document.getElementById("stats").innerHTML = ""
//             to clear out the old stats.
//           - Then loop through member.stats and for each one create a
//             new <li>, set its className to "stat" and its .innerText
//             to the stat string, then append it to the #stats <ul>
//             using .appendChild().
//
//    HINT for creating elements:
//      const li = document.createElement("li");
//      li.className = "stat";
//      li.innerText = "Driving: 99";
//      document.getElementById("stats").appendChild(li);
//
// TODO 3:


/* =========================================================
   PART 4 — EVENT LISTENERS
   ---------------------------------------------------------
   ========================================================= */

// 4a. Hook up each switch button so clicking it shows that member.
//     Loop through allSwitchBtns (from TODO 1d) using forEach.
//     For each button, addEventListener("click", ...) and inside the
//     callback, read the data attribute with btn.dataset.member, then
//     call showMember(...) with that key.
//
//     HINT: <button data-member="dom"> ... </button>
//           In JS: btn.dataset.member  // "dom"
// TODO 4a:


// 4b. Wire up the "Remove from Crew" button (id="remove-member-btn").
//     When clicked, remove the entire #crew-card from the page.
//
//     Use the parentNode trick from the slides:
//       oldNode.parentNode.removeChild(oldNode)
// TODO 4b:


/* =========================================================
   PART 5 — FORMS
   ---------------------------------------------------------
   When the user submits the "Add Yourself" form, read the
   inputs and add them as a new <li> in the #recruits list.
   ========================================================= */

// 5. Grab the form (id="add-member-form") and addEventListener("submit", ...).
//    Inside the callback:
//      a) Call event.preventDefault()  // stops the page from reloading
//      b) Read the value of #new-name and #new-ride using .value
//      c) If either is empty, return early (don't add a blank recruit)
//      d) Create a new <li> whose .innerText is `${name} drives a ${ride}`
//      e) Inside that <li>, also create a <button> with class "delete-btn"
//         and innerText "Remove". Wire up its click to remove the <li>
//         from #recruits using .parentNode.removeChild(...).
//      f) Append the <li> to #recruits.
//      g) Clear both input fields by setting their .value = ""
//
//    HINT: To put both the text AND the button inside the <li>, you can use:
//      li.innerText = `${name} drives a ${ride} `;
//      li.appendChild(deleteBtn);
//
// TODO 5:


/* =========================================================
   PART 6 — CHANGING STYLES
   ---------------------------------------------------------
   ========================================================= */

// 6. Wire up #red-btn, #blue-btn, and #reset-btn so clicking each one
//    changes the BACKGROUND COLOR of the #crew-card.
//      - Red Tint  -> "#5a1a1a"
//      - Blue Tint -> "#1a2a5a"
//      - Reset     -> "#2a2a2a" (the original)
//
//    Use:  document.getElementById("crew-card").style.backgroundColor = "..."
// TODO 6:


/* =========================================================
   STRETCH GOALS (optional)
   ---------------------------------------------------------
   Try ONE of these if you finish early:
     - Add a 5th crew member of your choice to CREW and add a
       matching button to the switcher in index.html.
     - When a recruit is added in Part 5, also append the current
       date/time using new Date().toLocaleTimeString().
     - Add a "Surprise Me" button that picks a random crew member
       from CREW and calls showMember on it.
   ========================================================= */
