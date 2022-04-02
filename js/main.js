

var elList = document.querySelector(".list");
var elListTitle = document.querySelector(".list-title");
var elSelect = document.querySelector(".form-select");
var elForm = document.querySelector(".form");

const bookmarkArr = [];

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
    let elBtn = document.createElement("button");
    let elBtnDiv = document.createElement("div");

    elImg.setAttribute("src", film.poster);
    elTitle.textContent = film.title;
    elText.textContent = `Weaknesses: ${film.overview
      .split(" ")
      .slice(0, 15)
      .join(" ")}`;

    elItem.setAttribute("class", " card col-4 bg-info p-0 m-2");

    elText.setAttribute("class", " card-text");
    elImg.setAttribute("class", " bg-white card-img-top card__img");
    elTitle.setAttribute("class", "card-title");
    elBody.setAttribute("class", "card-body  title__body ");
    elBtn.setAttribute("class", "btn btn-danger list__btn");
    elBtn.href = "#";
    elBtn.textContent = "Bookmark";
    elBtnDiv.setAttribute("class", "text-end ");
    elBtn.dataset.filmId = film.id;

    elBtnDiv.appendChild(elBtn);

    elBody.appendChild(elTitle);
    elBody.appendChild(elText);
    elBody.appendChild(elBtnDiv);

    elItem.appendChild(elImg);
    elItem.appendChild(elBody);

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
      let elBtn = document.createElement("button");
      let elBtnDiv = document.createElement("div");

      elImg.setAttribute("src", film.poster);
      elTitle.textContent = film.title;
      elText.textContent = `Weaknesses: ${film.overview
        .split(" ")
        .slice(0, 15)
        .join(" ")}`;

      elItem.setAttribute("class", " card col-4 bg-info p-0 m-2");

      elText.setAttribute("class", " card-text");
      elImg.setAttribute("class", " bg-white card-img-top card__img");
      elTitle.setAttribute("class", "card-title");
      elBody.setAttribute("class", "card-body  title__body");
      elBtn.setAttribute("class", "btn btn-danger list__btn");
      elBtn.href = "#";
      elBtn.textContent = "Bookmark";
      elBtnDiv.setAttribute("class", "text-end ");
      elBtn.dataset.filmId = film.id;

      elBtnDiv.appendChild(elBtn);

      elBody.appendChild(elTitle);
      elBody.appendChild(elText);
      elBody.appendChild(elBtnDiv);

      elItem.appendChild(elImg);
      elItem.appendChild(elBody);

      element.appendChild(elItem);
    }
  }
};
renderFilms(films, elList);
// elForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   elList.textContent = "";
//   if (elSelect.value == "All") {
//     renderFilms(films, elList);
//   } else {
//     renderFilms2(films, elList, elSelect.value);
//   }
// });
elSelect.addEventListener("change", ()=>{
  elList.textContent = "";
  if (elSelect.value == "All") {
    renderFilms(films, elList);
  } else {
    renderFilms2(films, elList, elSelect.value);
  }
})

elList.addEventListener("click", (e) => {
  if (e.target.matches(".list__btn")) {
    const btnId = e.target.dataset.filmId;
    const findElement = films.find((film) => film.id == btnId);
    // console.log(findElement);

    if (!bookmarkArr.includes(findElement)) {
      bookmarkArr.push(findElement);
    }

    // if(bookmarkArr.length > 0){
    //   for (let item of bookmarkArr) {
    //     if (item.id != findElement.id) {
    //       bookmarkArr.push(findElement);
    //     }
    //   }
    // }else{
    //   bookmarkArr.push(findElement)
    // }

    renderTitle(bookmarkArr, elListTitle);
  }
});
elListTitle.addEventListener("click", (e) => {
  console.log("ishladi");
  if (e.target.matches(".btn-danger")) {
    const btnId = e.target.dataset.filmId;
    const findElement = bookmarkArr.findIndex((film) => film.id == btnId);
    bookmarkArr.splice(findElement, 1);
    renderTitle(bookmarkArr, elListTitle);
  }
});

const renderTitle = (arr, element) => {
  element.innerHTML = "";
  arr.forEach((elem) => {
    const newItem = document.createElement("li");
    const newBtn = document.createElement("button");


    newItem.textContent = elem.title;
    newItem.setAttribute("class", "list-group-item list__item");

    newBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    newBtn.setAttribute("class", "btn btn-danger me-3");
    newBtn.dataset.filmId = elem.id;

    newItem.prepend(newBtn);
    element.appendChild(newItem);
  });
};
