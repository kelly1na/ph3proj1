const apiKey = import.meta.env.VITE_API_KEY;
//  const URL = `http://www.omdbapi.com/?apikey=${apiKey}&${search}`;

const image =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';

const titleSearch = document
  .getElementById('title-search')
  .addEventListener('input', searchMovies);
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
let moviePoster = '';

async function getMovies(movieTitle) {
  const URL = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}&page=1`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data.Search);
  console.log(data);
  if (data.Response === 'True') showMovies(data.Search);
}

function searchMovies() {
  let movieTitle = document.getElementById('title-search').value.trim();
  console.log(movieTitle);
  if (movieTitle.length > 0) {
    searchList.classList.remove('hide-search-list');
    getMovies(movieTitle);
  } else {
    searchList.classList.add('hide-search-list');
  }
}
function showMovies(movies = []) {
  searchList.innerHTML = '';
  for (let i = 0; i < movies.length; i++) {
    let movieListitem = document.createElement('div');
    movieListitem.dataset.id = movies[i].imdbID;
    movieListitem.classList.add('search-list-item');
    if (movies[i].Poster !== 'N/A') moviePoster = movies[i].Poster;
    else moviePoster = `${image}`;

    movieListitem.innerHTML = `
    <div class="search-item-thumbnail">
    <img
      src="${moviePoster}"
      alt="no Image"
    />
  </div>
  <div class="search-item-info">
    <h2>${movies[i].Title}

    </h2>

    <p>${movies[i].Year}</p>
  </div>
    `;

  
    searchList.appendChild(movieListitem);
  }

  movieDetails();
}

function movieDetails() {
  const searchListMovies = searchList.querySelectorAll('.search-list-item');
  searchListMovies.forEach((movie) => {
    movie.addEventListener('click', async () => {
      searchList.classList.add('hide-search-list');
      const result = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${apiKey}`
      );
      const movieInfo = await result.json();

      displayMovieInfo(movieInfo);
    });
  });
}

function displayMovieInfo(details) {
  resultGrid.innerHTML = `
     <div class='movie-poster' >
     <img src="${
       details.Poster !== 'N/A'
         ? details.Poster
         : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
     }">

   </div>
<div class='movie-info'>
<h2 class='movie-Title'>
${details.Title}    
</h2>

<ul>
 <li class='year'>
  Year: ${details.Year}
 </li>
 <li class='rated'>
   Rate: ${details.Rated}
 </li>
 <li class='released'>
   Released: ${details.Released}
 </li>
</ul>

<p class= 'genre'>
 <b>
   Genre: ${details.Genre}
 </b>
 Comedy
</p>

<p class= 'plot'>
<b>
 Plot: ${details.Plot}
</b>
Hello
</p>

<p class= 'writer'>
<b>
Writer: ${details.Writer}
</b>
Hi
</p>

<p class= 'actors'>
<b>
Actors: ${details.Actors}
</b>
What
</p>

<p class= 'language'>
<b>
Language: ${details.Language}
</b>
No
</p>

<p class= 'awards'>
<b>
<i class='fasfa-award'>
</i>
</b>
${details.Awards}
</p>


</div>
     `;
}

window.addEventListener('click', (event) => {
  if (event.target.className !== "search-info") {
    searchList.classList.add('hide-search-list');
  }
});