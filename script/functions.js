// functions.js
import { $, imageCDN } from "./elementos.js";

export function renderizarData(id, datos, contenedor) {
  limpiarContenedor(contenedor);
  
  switch (id) {
    case "characters":
      renderizarCharacters(datos, contenedor);
      break;

    case "episodes":
      renderizarEpisodes(datos, contenedor);
      break;

    case "locations":
      renderizarLocations(datos, contenedor);
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
      <figure>
        <img src="${imageCDN}${datos.results[i].portrait_path}" alt="${datos.results[i].name}">
      </figure>  
      <h2>${datos.results[i].name}</h2>
      <p>${datos.results[i].occupation}</p>
    `;
    contenedor.appendChild(card);
  }
}

function renderizarEpisodes(datos, contenedor) {
  for (let i = 0; i < datos.results.length; i++) {
    const card = $.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <figure>
        <img src="${imageCDN}${datos.results[i].image_path}" alt="${datos.results[i].name}">
      </figure>  
    <h2>${datos.results[i].name}</h2>
      <p>${datos.results[i].synopsis}</p>
      <div>
        <span>Temporada: ${datos.results[i].season}</span>
        <span>Episodio: ${datos.results[i].episode_number}</span>
        <span>Fecha de emisión: ${datos.results[i].airdate}</span>
      </div>
    `;
    contenedor.appendChild(card);
  }
}

function renderizarLocations(datos, contenedor) {
  for (let i = 0; i < datos.results.length; i++) {
    const card = $.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <figure>
        <img src="${imageCDN}${datos.results[i].image_path}" alt="${datos.results[i].name}">
      </figure>  
      <h2>${datos.results[i].name}</h2>
      <p>${datos.results[i].town}</p>
    `;
    contenedor.appendChild(card);
  }
}

function limpiarContenedor(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}