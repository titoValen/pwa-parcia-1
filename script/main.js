import { endpoint } from "./endpoint.js";
import { li, renderizar, containerBtn } from "./elementos.js";
import { renderizarData } from "./functions.js";

containerBtn.style.display = "none";

li.forEach((e) => {
  e.addEventListener("click", (j) => {
    const id = j.target.id;
    fetch(endpoint[id])
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos);
        renderizarData(id, datos, renderizar);
      })
      .catch((error) => {
        console.error(`Error fetching ${id}:`, error);
      });
  });
});
