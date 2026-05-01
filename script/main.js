import { endpoint } from "./endpoint.js";
import { li, renderizar, btnHeart } from "./elementos.js";
import { renderizarData, toggleHeart, mostrarFavoritos } from "./functions.js";

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

renderizar.addEventListener("click", (event) => {
  const heart = event.target.closest(".heart");

  if (!heart) return;

  toggleHeart(heart);
});

btnHeart.addEventListener("click", () => {
  mostrarFavoritos();
});
