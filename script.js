"use strict";
// Add event listener to load the app once the window has loaded
window.addEventListener("load", initApp);

// Function to initialize the app
//Call getCharacters function and wait for it to return allCharacters data

async function initApp() {
  const allCharacters = await getCharacters(
    "https://cederdorff.github.io/dat-js/05-data/pokemons.json"
  );

  // Loop through each character in allCharacters array and call showCharacters function
  for (const character of allCharacters) {
    showCharacters(character);
  }
}

// Function to get characters data from a given URL using fetch and return the parsed JSON data
async function getCharacters(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to display a single character in the app UI
// Create HTML markup for displaying the character's image, name, and type
function showCharacters(character) {
  const characterHTML = /*html*/ `
    <article class="grid-item">
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p>${character.type}</p>
    </article>
  `;
  document
    .querySelector("#characters")
    .insertAdjacentHTML("beforeend", characterHTML);

  document
    .querySelector("#characters article:last-child")
    .addEventListener("click", () => clickCharacter(character));
}
// Create HTML markup to display detailed information about the character
function clickCharacter(character) {
  const characterInfoModal = document.querySelector("#characterInfo");
  characterInfoModal.innerHTML = /*html*/ `
    <article id="characterInfoContent">
      <h2>${character.name}</h2>
      <p><img src="${character.image}" alt="${character.name}"></p>
      <h3>"${character.description}"</h3>
      <ul>
        <li><b>Footprint:</b> ${character.fodspor}</li>
        <li><b>Name:</b> ${character.name}</li> 
        <li><b>Ability:</b> ${character.ability}</li>
        <li><b>Pokédex index:</b> #${character.dexindex}</li>
        <li><b>Type:</b> ${character.type}</li>
        <li><b>Subtype:</b> ${character.undertype}</li>
        <li><b>Weaknesses:</b> ${character.weaknesses}</li>
        <li><b>Gender:</b> ${character.sex}</li>
        <li><b>Weight:</b> ${character.weight} g</li>
        <li><b>Height:</b> ${character.height} cm</li>
        <li><b>Generation:</b> ${character.gen}</li>
        <li><b>Game version:</b> ${character.spilversion}</li>
        <li><b>Able to evolve:</b> ${character.evolve}</li>
        <li><b>HP:</b> ${character.statsHP}</li>
        <li><b>Attack:</b> ${character.statsAttack}</li>
        <li><b>Special attack:</b> ${character.statsSpecialAttack}</li>
        <li><b>Special defence:</b> ${character.statsSpecialDefence}</li>
        <li><b>Speed:</b> ${character.statsSpeed}</li> 
      </ul>
      <button id="close-btn">Close</button>
    </article>
  `;
  characterInfoModal.showModal();

  document.querySelector("#close-btn").addEventListener("click", function () {
    characterInfoModal.close();
    characterInfoModal.innerHTML = "";
  });
}
