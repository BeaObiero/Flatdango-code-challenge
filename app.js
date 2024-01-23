// app.js
document.addEventListener('DOMContentLoaded', function () {
    //ensure page is fully loaded

    // Fetch details(execute when DOM is ready)
    getMovieDetails(1);

    // Fetch a list(execute when DOM is ready)
    getMoviesList();
});

function getMovieDetails(movieId) {
    // Fetch details for a specific movie
    fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json())
        .then(data => {
            //updated data
            displayMovieDetails(data);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function getMoviesList() {
    // Fetch a list of all movies
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
            //updated data
            displayMoviesList(data);
        })
        .catch(error => console.error('Error fetching movies list:', error));
}

function displayMovieDetails(movieDetails){


    const posterElement = document.getElementById('poster');
    const titleElement = document.getElementById('title');
    const runtimeElement = document.getElementById('runtime');
    const showtimeElement = document.getElementById('showtime');
    const availableTicketsElement = document.getElementById('available-tickets');

    posterElement.src = movieDetails.poster;
    titleElement.textContent = `Runtime: ${movieDetails.runtime} minutes`;
    showtimeElement.textContent = `Showtime: ${movieDetails.showtime}`;

    const availableTickets = movieDetails.capacity - movieDetails.tickets_sold;
    availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;


    //BONUS DELIVERABLES...(use movie id when fetching function)
}
//MENU(add classes "film" and "item to each list item")

function displayMoviesList(movieList){
    const filmsListElement = document.getElementById('films');

    movieList.forEach(movie => {
// create a new list item
        const listItem = document.createElement('li');

// set the text content of the list item to the movie title
        listItem.textContent = movie.title;

// add classes to style each film in the list
listItem.dataset.movieID = movie.id;

listItem.classList.add('film', 'item');

//BONUS DELIVERABLES(set unique identifier to each movie)



// add a delete button next to each movie(EXTRA BONUS)
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.addEventListener('click', function (event) {
    event.stopPropagation();
    deleteFilm(movie.id);
});

listItem.appendChild(deleteButton);


async function deleteFilm(movieId) {
    try {
// make a DELETE request to remove the film from the server
        const response = await fetch(`http://localhost:3000/films/${movieId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete film from the server');
        }

        console.log('Film deleted from the server');

// remove the film from the UI
        const listItemToDelete = document.querySelector(`li[data-movie-id="${movieId}"]`);
        if (listItemToDelete) {
            listItemToDelete.remove();
        }
    } catch (error) {
        console.error('Error deleting film from the server:', error);
    }
}


// append the list item to the 'films' list
        filmsListElement.appendChild(listItem);
    });

}
//function to buy a ticket
function buyTicket(movieDetails){
    const availableTicketsElement = Math.max(0,movieDetails.capacity - displayMovieDetails.tickets_sold-1);

//dont forget to update UI!
    availableTicketsElement.textContent = `Available Tickets: ${newAvailableTickets}`;

}

