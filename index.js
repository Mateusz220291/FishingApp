"use strict";
class Fish {
  date = new Date();
  id = Date.now().toString().slice(-9);
  constructor(lenght, weight, bait, notes) {
    this.lenght = lenght;
    this.weight = weight;
    this.bait = bait;
    this.notes = notes;
  }
  _setDescription() {
    const months = [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień",
    ];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(
      1
    )} złowiony w dniu  ${this.date.getDate()} ${months[this.date.getMonth()]}`;
  }
}

class Pike extends Fish {
  type = "szczupak";
  constructor(lenght, weight, bait, notes) {
    super(lenght, weight, bait, notes);
    this._setDescription();
  }
}

class Perch extends Fish {
  type = "okoń";
  constructor(lenght, weight, bait, notes) {
    super(lenght, weight, bait, notes);
    this._setDescription();
  }
}

class Zander extends Fish {
  type = "sandacz";
  constructor(lenght, weight, bait, notes) {
    super(lenght, weight, bait, notes);
    this._setDescription();
  }
}

class Catfish extends Fish {
  type = "sum";
  constructor(lenght, weight, bait, notes) {
    super(lenght, weight, bait, notes);
    this._setDescription();
  }
}

const form = document.querySelector(".form");
const containerFishes = document.querySelector(".fishes");
const inputType = document.querySelector(".form__input--type");
const inputLenght = document.querySelector(".form__input--lenght");
const inputWeight = document.querySelector(".form__input--weight");
const inputBait = document.querySelector(".form__input--bait");
const inputNotes = document.querySelector(".form__input--notes");
const btnAdd = document.querySelector(".btnAdd");
const btnList = document.querySelector(".btnList");
const btnForm = document.querySelector(".form__btn");
const btnRtrn = document.querySelector(".return");
const btnRmve = document.querySelectorAll(".remove");
const sectionStart = document.querySelector(".start");
const sectionAdd = document.querySelector(".add");
const sectionList = document.querySelector(".list");

class App {
  #fishes = [];
  constructor() {
    this._getLocalStorage();
    btnAdd.addEventListener("click", this._addFish);
    btnList.addEventListener("click", this._showList);
    btnRtrn.addEventListener("click", this._showStart);
    btnForm.addEventListener("click", this._newFish.bind(this));
    containerFishes.addEventListener("click", this._removeFish.bind(this));
  }
  _addFish() {
    sectionAdd.classList.remove("hidden");
    sectionStart.classList.add("hidden");
    inputLenght.value =
      inputWeight.value =
      inputBait.value =
      inputNotes.value =
        "";
  }

  _removeFish(e) {
    const closeEl = e.target.closest(".remove");
    if (!closeEl) return;
    const fish = this.#fishes.find((fi) => fi.id === closeEl.dataset.id);
    const fishEl = e.target.closest(".fish");

    fishEl.style.display = "none";
    this.#fishes.pop(fish);
    this._setLocalStorage();
  }
  _showList() {
    sectionList.classList.remove("hidden");
    sectionStart.classList.add("hidden");
    sectionAdd.classList.add("hidden");
  }
  _showStart() {
    sectionList.classList.add("hidden");
    sectionStart.classList.remove("hidden");
    sectionAdd.classList.add("hidden");
  }
  _newFish(e) {
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);
    e.preventDefault();

    const type = inputType.value;
    const lenght = +inputLenght.value;
    const weight = +inputWeight.value;
    const bait = inputBait.value;
    const notes = inputNotes.value;
    let fish;

    if (!validInputs(lenght, weight) || !allPositive(lenght, weight))
      return alert(
        "Pole 'długość' i  'waga' musi zostać wypełnione liczbą dodatnią!"
      );
    function outOfRange() {
      return alert("Ryba poza wymiarem!");
    }
    if (type === "pike") {
      if (lenght > 150 || lenght < 50 || weight > 30) return outOfRange();
      fish = new Pike(lenght, weight, bait, notes);
    }

    if (type === "perch") {
      if (lenght > 60 || weight > 3) return outOfRange();
      fish = new Perch(lenght, weight, bait, notes);
    }

    if (type === "zander") {
      if (lenght > 120 || lenght < 45 || weight > 15) return outOfRange();
      fish = new Zander(lenght, weight, bait, notes);
    }

    if (type === "catfish") {
      if (lenght > 270 || lenght < 70 || weight > 150) return outOfRange();
      fish = new Catfish(lenght, weight, bait, notes);
    }
    this.#fishes.push(fish);
    this._renderFish(fish);
    this._showList();
    this._setLocalStorage();
  }
  _renderFish(fish) {
    let html = `<li class="fish fishes__fish" data-id="${fish.id}" >
    <img class = "fish__img" src="${fish.type}.jpg" alt="">
    <h2 class="fish__name">${fish.description}</h2>
    <div class="fish__details fish__details--one">
      <span class="fish__value">${fish.lenght}</span>
      <span class="fish__unit">cm</span>
    </div>
    <div class="fish__details fish__details--two">
      <span class="fish__value">${fish.weight}</span>
      <span class="fish__unit">kg</span>
    </div>
    <div class="fish__details fish__details--three">
      <span class="fish__info">${fish.bait}</span>
    </div>
    <div class="fish__details fish__details--notes">
      <span class="fish__info"
        >${fish.notes}</span
      >
    </div>
    <button class="button remove">Usuń</button>
    <button class="button edit">Edytuj</button>
  </li>`;
    containerFishes.insertAdjacentHTML("beforeend", html);
  }
  _setLocalStorage() {
    localStorage.setItem("fishes", JSON.stringify(this.#fishes));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("fishes"));
    if (!data) return;
    this.#fishes = data;
    this.#fishes.forEach((fi) => {
      this._renderFish(fi);
    });
  }
  reset() {
    localStorage.removeItem("fishes");
  }
}

const app = new App();
