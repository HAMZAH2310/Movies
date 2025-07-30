$('.search-button').on('click', function(){
  
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=[]&s=' + $('.input-keywoard').val(),
    success: results => {
      const movies = results.Search;
      let cards = '';
      movies.forEach(m => {
        cards += showCards(m);
      });
      $('.movie-container').html(cards);
  
      //Ketika Button di click
      $('.modal-detail-button').on('click',function(){
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=[]&i=' + $(this).data('imdbid'),
          success: e =>{
            const movieDetails = showMovieDetails(e);
            $('.modal-body').html(movieDetails);
          },
          error: (e) => {
            console.log(e.responseText);
          }
        })       
    });
    },
    error: (e) => {
      console.log(e.responseText);
    }
  });

});




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