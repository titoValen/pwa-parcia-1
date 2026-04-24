// functions.js
import { $, imageCDN, containerBtn, btnSiguiente, btnAnterior } from "./elementos.js";

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
  renderizarBotones();
  siguientePag(id, datos, contenedor);
  anteriorPag(id, datos, contenedor);
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

function renderizarBotones() {
  containerBtn.style.display = "flex";
}

function siguientePag(id, datos, contenedor) {
  if (!datos.next) {
    btnSiguiente.onclick = null;
    btnSiguiente.classList.remove("btn-sig");
    btnSiguiente.classList.add("btn-not-available");
    return;
  }

  btnSiguiente.classList.remove("btn-not-available");
  btnSiguiente.classList.add("btn-sig");

  const siguienteEndpoint = datos.next;

  btnSiguiente.onclick = () => {
    fetch(siguienteEndpoint)
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos);
        renderizarData(id, datos, contenedor);
      })
      .catch((error) => {
        console.error(`Error fetching ${id}:`, error);
      });
  };
}

function anteriorPag(id, datos, contenedor) {
  if (!datos.prev) {
    btnAnterior.onclick = null;
    btnAnterior.classList.remove("btn-sig");
    btnAnterior.classList.add("btn-not-available");
    return;
  }

  btnAnterior.classList.remove("btn-not-available");
  btnAnterior.classList.add("btn-sig");

  const siguienteEndpoint = datos.prev;

  btnAnterior.onclick = () => {
    fetch(siguienteEndpoint)
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos);
        renderizarData(id, datos, contenedor);
      })
      .catch((error) => {
        console.error(`Error fetching ${id}:`, error);
      });
  };
}
