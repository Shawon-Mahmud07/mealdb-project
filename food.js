const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("default-search");
const mainDiv = document.getElementById("mainDiv");
const btnHidden = document.getElementById("btnHidden");
const warning = document.getElementById("warning");
const modalDiv = document.getElementById("modalDiv");

function submitForm(event) {
  event.preventDefault();
}
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=all`;
fetch(url)
  .then((response) => response.json())
  .then((data) => showData(data.meals.slice(0, 6)));

searchBtn.addEventListener("click", function () {
  const search = searchInput.value.trim();
  if (!isNaN(search)) {
    warning.innerText = "🚫Please enter a food name!";
    return;
  }
  if (search.length < 4) {
    warning.innerText = "🚫Please enter at least 4 characters!";
    return;
  }
  warning.innerText = "";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => showData(data.meals.slice(0, 6)))
    .catch((error) => {
      warning.innerText = "Something went wrong. Please try again later!";
      console.error("Error fetching data:", error);
    });
  btnHidden.classList.remove("hidden");
});

function showAll() {
  const search = searchInput.value.trim();
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showData(data.meals));
  btnHidden.classList.add("hidden");
}

const showData = (food) => {
  mainDiv.innerHTML = "";
  food.map((food) => {
    const {
      strCategory,
      strYoutube,
      strMealThumb,
      strMeal,
      strInstructions,
      idMeal,
    } = food;

    const div = document.createElement("div");
    div.classList.add(
      "card",
      "card-side",
      "h-52",
      "bg-base-100",
      "shadow-xl",
      "overflow-y-auto"
    );
    div.innerHTML = `
          <figure class="basis-2/5"><img class="h-full " src="${strMealThumb}" alt="Food image" />
          </figure>
          <div class="card-body p-4 basis-3/5">
            <h2 class="card-title text-title-color font-poppins font-bold text-base sm:text-2xl">${strMeal}</h2>
            <p class="font-poppins font-normal text-sm sm:text-base text-[#706F6F]">${strInstructions.slice(
              0,
              75
            )}. . . . </p>
            <label onclick=showDetails(${idMeal}) for="my-modal-5" class="text-yellow-600 cursor-pointer  hover:text-yellow-400 underline">View Details</label>             
          </div>
    `;
    mainDiv.appendChild(div);
  });
};

function showDetails(details) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => modalDetails(data.meals[0]));
}
function modalDetails(idDetails) {
  console.log(idDetails);
  const { strMeal, strCategory, strMealThumb, strYoutube, strInstructions } =
    idDetails;
  modalDiv.innerHTML = `
  <div class="sm:flex">
  <img class="h-64 w-full sm:w-64" src="${strMealThumb}" alt="">
  </div>

  <div class="sm:col-span-2 sm:grid grid-cols-1 "> 
  <h3 class="font-bold text-lg ">${strCategory}</h3>
  <p class="underline font-poppins mb-2">${strMeal}</p>
  <p id="modalTextAll" class="hidden font-poppins">${strInstructions}</p>
  <p id="modalText">${strInstructions.slice(
    0,
    200
  )}.....<button onclick="readMore()" class="text-red-500 text-semibold">read more</button></p>
  
  <a class="font-poppins " href="${strYoutube} target="_blank">Click here: <span class="underline text-red-500"> ${strYoutube}</span></a>
   <div class="modal-action">
      <label for="my-modal-5" class="btn rounded-md ">Close</label>
    </div>
  
  </div>
  `;
}
function readMore() {
  const readMore = document.getElementById("modalText");
  readMore.classList.add("hidden");
  const modalTextAll = document.getElementById("modalTextAll");
  modalTextAll.classList.remove("hidden");
}
