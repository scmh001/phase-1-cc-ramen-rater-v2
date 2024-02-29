export function displayRamens() {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    testResponseData.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenuDiv.appendChild(img);
    });
  }
  
  export function handleClick(ramen, event) {
    const detailImg = document.querySelector("#ramen-detail > .detail-image");
    const detailName = document.querySelector("#ramen-detail > .name");
    const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");
  
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailImg.src = ramen.image;
    detailsRating.textContent = ramen.rating.toString();
    detailsComment.textContent = ramen.comment;
  }
  
  export function addSubmitListener(formElement) {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const newRamen = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target.comment.value,
      };
      const ramenMenuDiv = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = newRamen.image;
      img.addEventListener('click', () => handleClick(newRamen));
      ramenMenuDiv.appendChild(img);
      formElement.reset();
    });
  }
  
  export function main(formElement) {
    addSubmitListener(formElement);
    displayRamens();
  }
  
  //----------------------------------------------------------------------------------------------



   // index.js
const url = "http://localhost:3000/"


function displayRamens() {
  fetch(url + 'ramens')
    .then(response => response.json())
    .then(ramens => {
      // Ensure the element with ID 'ramen-menu' exists in the HTML
      const menuDiv = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => handleClick(ramen));
        menuDiv.appendChild(img);
      });
    });
}


function handleClick(ramen, event) {
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailImg.src = ramen.image;
  detailsRating.textContent = ramen.rating.toString();
  detailsComment.textContent = ramen.comment;
}

function addSubmitListener(formElement) {
  formElement.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Create a new ramen object from the form input values
      const newRamen = {
          name: event.target.name.value,
          restaurant: event.target.restaurant.value,
          image: event.target.image.value,
          rating: event.target.rating.value,
          comment: event.target.comment.value,
      };

      // Get the div where the ramen images are displayed
      const ramenMenuDiv = document.getElementById('ramen-menu');

      // Create a new image element for the new ramen
      const img = document.createElement('img');
      img.src = newRamen.image;

      // Attach a click event listener to the new image
      img.addEventListener('click', () => handleClick(newRamen));

      // Append the new image to the ramen menu div
      ramenMenuDiv.appendChild(img);

      // Reset the form inputs
      formElement.reset();
  });
}

// can not get this addSubmitListener to add a new img ^^^


const main = (formElement) => {
  displayRamens();
  addSubmitListener(formElement);
}


document.addEventListener('DOMContentLoaded', () => {
  const formElement = document.getElementById('new-ramen');
  main(formElement);
});

//^^^^^^ had to wrap the call to main() in a DOMContentLoaded event listener in order to fix an "failed suite" error. This fixed it and allowed me to pass all tests. 



export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};