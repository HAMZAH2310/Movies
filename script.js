const searchButton =document.querySelector('.search-button');
searchButton.addEventListener('click',async function(){
  try{
  const inputKeywoard = document.querySelector('.input-keyword');
  const movies = await getMovies(inputKeywoard.value);
  updateUI(movies);
  }catch(err){
    // console.log(err);
    alert(err)
  }
});

function getMovies(keywoard){
 return fetch('http://www.omdbapi.com/?apikey=9f2c55e9&s=' + keywoard)
  .then(response => {
    if(!response.ok){
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(response => {
    if(response.Response === "False"){
      throw new Error(response.Error)
    }
    return response.Search;
  });
}

function updateUI(movies){
  let cards = '';
  movies.forEach(m => cards+= showCards(m));
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = cards;
}


// even binding
document.addEventListener('click',async function(e){
  if(e.target.classList.contains('modal-detail-button')){
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbID){
  return fetch('http://www.omdbapi.com/?apikey=9f2c55e9&i=' + imdbID)
  .then(response => response.json())
}

function updateUIDetail(e){
  const movieDetail = showMovieDetails(e);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
}


function showCards(m){
  return `
        <div class="col-md-4 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top" alt="${m.Title}">
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
              <a href="#" class="btn btn-primary modal-detail-button       show-detail-btn" 
                 data-bs-toggle="modal" 
                 data-bs-target="#movieDetailModal"
                 data-imdbid="${m.imdbID}">
                 Show Details
              </a>
            </div>
          </div>
        </div>`;
}

function showMovieDetails(e){
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${e.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${e.Title} ${e.Year}</h4></li>
                    <li class="list-group-item"><strong>Director :</strong>${e.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${e.Actors}</li>
                    <li class="list-group-item"><strong>Writer: </strong>${e.Writer}</li>
                    <li class="list-group-item"><strong>Genre : </strong>${e.Genre}</li>
                  </ul>
                </div>
              </div>
            </div>`;
}