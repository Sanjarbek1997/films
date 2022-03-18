var elList = document.querySelector(".list");
var elSelect = document.querySelector(".form-select");
var elForm = document.querySelector(".form");

function formatDate(format) {
  var date = new Date(format);
  var day = date.getDate();
  var month = String(date.getMonth() + 1).padStart(2, 0);
  var year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

let renderGenres = (arr, element) => {
  let nimadir = [];
  for (let item of arr) {
    for (let genres of item.genres) {
      if (!nimadir.includes(genres)) {
        nimadir.push(genres);
      }
    }
  }
  nimadir.forEach((elem) => {
    let elOption = document.createElement("option");
    elOption.setAttribute("value", elem);
    elOption.textContent = elem;
    element.appendChild(elOption);
  });
};
renderGenres(films, elSelect);

let renderFilms = (arr, element) => {
  for (let film of arr) {
    let elItem = document.createElement("li");
    let elImg = document.createElement("img");
    let elBody = document.createElement("div");
    let elTitle = document.createElement("h3");
    let elText = document.createElement("p");
    let elTextGenres = document.createElement("p");
    let elText2 = document.createElement("p");

    elImg.setAttribute("src", film.poster);
    elTitle.textContent = film.title;
    elTextGenres.textContent = `Genres: ${film.genres}`;
    elText.textContent = `Weaknesses: ${film.overview
      .split(" ")
      .slice(0, 15)
      .join(" ")}`;
    elText2.textContent = formatDate(film.release_date);

    elItem.setAttribute("class", "text-danger card col-3 bg-info p-0");

    elText2.setAttribute("class", " card-text");
    elText.setAttribute("class", " card-text");
    elImg.setAttribute("class", " bg-white card-img-top ");
    elTitle.setAttribute("class", "card-title");
    elBody.setAttribute("class", "card-body text-center ");

    // elTwoBody.appendChild(elText2);
    elBody.appendChild(elTitle);
    elBody.appendChild(elText);
    elBody.appendChild(elText2);

    elBody.appendChild(elTextGenres);

    elItem.appendChild(elImg);
    elItem.appendChild(elBody);
    // elItem.appendChild(elTwoBody);

    element.appendChild(elItem);
  }
};
let renderFilms2 = (arr, element, genre) => {
  for (let film of arr) {
    if (film.genres.includes(genre)) {
      let elItem = document.createElement("li");
      let elImg = document.createElement("img");
      let elBody = document.createElement("div");
      let elTitle = document.createElement("h3");
      let elText = document.createElement("p");
      let elTextGenres = document.createElement("p");
      let elText2 = document.createElement("p");

      elImg.setAttribute("src", film.poster);
      elTitle.textContent = film.title;
      elTextGenres.textContent = `Genres: ${film.genres}`;
      elText.textContent = `Weaknesses: ${film.overview
        .split(" ")
        .slice(0, 15)
        .join(" ")}`;
      elText2.textContent = formatDate(film.release_date);

      elItem.setAttribute("class", "text-danger card col-3 bg-info p-0");

      elText2.setAttribute("class", " card-text");
      elText.setAttribute("class", " card-text");
      elImg.setAttribute("class", " bg-white card-img-top ");
      elTitle.setAttribute("class", "card-title");
      elBody.setAttribute("class", "card-body text-center ");

      // elTwoBody.appendChild(elText2);
      elBody.appendChild(elTitle);
      elBody.appendChild(elText);
      elBody.appendChild(elText2);

      elBody.appendChild(elTextGenres);

      elItem.appendChild(elImg);
      elItem.appendChild(elBody);
      // elItem.appendChild(elTwoBody);

      element.appendChild(elItem);
    }
  }
};
// renderFilms(films, elList);
elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  elList.textContent = "";
  console.log(elSelect.value);
  if (elSelect.value == "All") {
    renderFilms(films, elList);
  } else {
    renderFilms2(films, elList, elSelect.value);
  }
});
