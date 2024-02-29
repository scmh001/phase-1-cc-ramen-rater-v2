 // index.js
const url = "http://localhost:3000/"

function displayRamens() {
    fetch(url + 'ramens')
    .then(response => response.json())
    .then(ramens => {
        const menuDiv = document.getElementById('ramen-menu');
        ramens.forEach((ramen, index) => {
            const img = document.createElement('img');
            img.src = ramen.image;
            img.addEventListener('click', () => handleClick(ramen));

            // Create a delete button for each ramen
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent triggering the img click event
                deleteRamen(ramen, img);
            });

            const ramenContainer = document.createElement('div');
            ramenContainer.appendChild(img);
            ramenContainer.appendChild(deleteButton);
            menuDiv.appendChild(ramenContainer);

            // Display the first ramen's details on page load
            if (index === 0) {
                handleClick(ramen);
            }
        });
    });
}

function deleteRamen(ramen, imgElement) {
    // Remove the ramen image and button from the menu
    imgElement.parentNode.remove();

    // Clear the ramen detail view if this ramen is currently displayed
    const detailImg = document.querySelector("#ramen-detail > .detail-image");
    if (detailImg.src === ramen.image) {
        const detailName = document.querySelector("#ramen-detail > .name");
        const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
        const detailsRating = document.getElementById("rating-display");
        const detailsComment = document.getElementById("comment-display");

        detailName.textContent = '';
        detailRestaurant.textContent = '';
        detailImg.src = '';
        detailsRating.textContent = '';
        detailsComment.textContent = '';
    }
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
  if (!formElement) {
    console.error('Form element is not found');
    return;
  }

  formElement.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Debugging: Log the event target to ensure it has the expected structure
    console.log('Event target:', event.target);

    // Create a new ramen object from the form input values
    const newRamen = {
      name: event.target.name ? event.target.name.value : undefined,
      restaurant: event.target.restaurant ? event.target.restaurant.value : undefined,
      image: event.target.image ? event.target.image.value : undefined,
      rating: event.target.rating ? event.target.rating.value : undefined,
      comment: event.target.comment ? event.target.comment.value : undefined,
    };

    // Debugging: Log the newRamen object to ensure it has the correct values
    console.log('New ramen:', newRamen);

    // Get the div where the ramen images are displayed
    const ramenMenuDiv = document.getElementById('ramen-menu');
    if (!ramenMenuDiv) {
      console.error('Ramen menu div is not found');
      return;
    }

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

function addUpdateListener() {
  const editForm = document.getElementById('edit-ramen');
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the new rating and comment from the form
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    // Update the displayed rating and comment
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");

    detailsRating.textContent = newRating;
    detailsComment.textContent = newComment;
  });
}
//^^^ Not sure if this is functioning properly. It just eliminated rating and comment when you update on site.


const main = (formElement) => {
  displayRamens();
  addSubmitListener(formElement);
  addUpdateListener();
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