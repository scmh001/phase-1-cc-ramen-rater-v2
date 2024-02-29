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
  