// functions.js
import { $ } from "./elementos.js";

export function renderizarData(id, datos, contenedor) {
  switch (id) {
    case "characters":
      renderizarCharacters(datos, contenedor);
      break;

    case "episodes":
      // renderizarEpisodes(datos, contenedor);
      break;

    case "locations":
      // renderizarLocations(datos, contenedor);
      break;
    default:
      console.error(`ID no reconocido: ${id}`);
      break;
  }
}

function renderizarCharacters(datos, contenedor) {
  for (let i = 0; i < datos.results.length; i++) {
    const card = $.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${datos.results[i].name}</h2>
      <p>${datos.results[i].occupation}</p>
    `;
    contenedor.appendChild(card);
  }
}
