import {
  $,
  imageCDN,
  containerBtn,
  btnSiguiente,
  btnAnterior,
  renderizar,
} from "./elementos.js";

import { endpoint } from "./endpoint.js";

export function renderizarData(id, datos, contenedor, limpiar = true) {
  if (limpiar) {
    limpiarContenedor(contenedor);
    if (renderizar && renderizar.dataset.view) {
      delete renderizar.dataset.view;
    }
  }
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
    card.id = `character-${datos.results[i].id}`;
    card.classList.add("card");
    const esFav = esFavorito("character", String(datos.results[i].id));
    card.innerHTML = `
      <figure class="heart">
        <img src="${esFav ? "../img/heartSolid.svg" : "../img/heartRemix.svg"}" alt="Icono de corazón en linea">
      </figure>
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
    card.id = `episode-${datos.results[i].id}`;
    card.classList.add("card");
    const esFav = esFavorito("episode", String(datos.results[i].id));
    card.innerHTML = `
      <figure class="heart">
        <img src="${esFav ? "../img/heartSolid.svg" : "../img/heartRemix.svg"}" alt="Icono de corazón en linea">
      </figure>
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
    card.id = `location-${datos.results[i].id}`;
    card.classList.add("card");
    const esFav = esFavorito("location", String(datos.results[i].id));
    card.innerHTML = `
      <figure class="heart">
        <img src="${esFav ? "../img/heartSolid.svg" : "../img/heartRemix.svg"}" alt="Icono de corazón en linea">
      </figure>
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

export function toggleHeart(heart) {
  const img = heart.querySelector("img");
  if (img.src.includes("heartRemix.svg")) {
    img.src = "../img/heartSolid.svg";
  } else {
    img.src = "../img/heartRemix.svg";
  }

  const accion = guardarFavorito(heart.parentElement.id);

  if (renderizar && renderizar.dataset.view === "favoritos" && accion === "removed") {
    const card = heart.parentElement;
    if (card && card.parentElement) card.parentElement.removeChild(card);
  }
}

function guardarFavorito(idPadre) {
  const id = idPadre.split("-")[1];
  const tipo = idPadre.split("-")[0];

  let favoritos = { id, tipo };

  if (!localStorage.getItem("favorito")) {
    localStorage.setItem("favorito", JSON.stringify([favoritos]));
    return "added";
  }
  
  let dataLocal = JSON.parse(localStorage.getItem("favorito"));

  for (let i = 0; i < dataLocal.length; i++) {
    if (dataLocal[i].id === id && dataLocal[i].tipo === tipo) {
      dataLocal.splice(i, 1);
      localStorage.setItem("favorito", JSON.stringify(dataLocal));
      return "removed";
    }
  }
  
  dataLocal.push(favoritos);
  localStorage.setItem("favorito", JSON.stringify(dataLocal));
  return "added";
}

function esFavorito(tipo, id) {
  const favoritos = JSON.parse(localStorage.getItem("favorito")) || [];
  return favoritos.some((f) => f.tipo === tipo && String(f.id) === String(id));

}

export function mostrarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favorito"));
  if (!favoritos || favoritos.length === 0) {
    alert("No tienes personajes favoritos guardados.");
    return;
  }

  renderizar.dataset.view = "favoritos";
  limpiarContenedor(renderizar);
  containerBtn.style.display = "none";

  favoritos.forEach((fav) => {
    const url = endpoint[`${fav.tipo}s`];
    fetch(`${url}/${fav.id}`)
      .then((response) => response.json())
      .then((datos) => {
        renderizarData(`${fav.tipo}s`, { results: [datos] }, renderizar, false);
      })
      .catch((error) => {
        console.error(`Error fetching favorito ${fav.id}:`, error);
      });
  });
}