import { endpoint } from "./endpoint.js";

const $ = document;
const renderizar = $.getElementById("renderizar");
const li = $.querySelectorAll("li");

li.forEach((e) => {
  e.addEventListener("click", (j) => {
    const id = j.target.id;
    fetch(endpoint[id])
      .then((response) => response.json())
      .then((datos) => {
        renderizarData(datos);
      })
      .catch((error) => {
        console.error(`Error fetching ${id}:`, error);
      });
  });
});

function renderizarData(datos) {
  // console.log(datos.data[0].name);
}