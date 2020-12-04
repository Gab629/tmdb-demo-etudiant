document.addEventListener("DOMContentLoaded", function () {
    let connexion = new MovieDB();

    if(document.location.pathname.search('fiche-film.html') > 0){
        let params = new URL(document.location).searchParams;
        connexion.requeteInfoFilms(params.get('id'));
    }else{
        connexion.requeteDernierFilms();
    }

});


class MovieDB {

    constructor() {
        console.log('new MovieDB()');

        this.apikey = "3c367a023e1abbda15e9e3c3b0db2d8b";
        this.lang = "fr-CA";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 8;

    }

    requeteDernierFilms() {
        let requette = new XMLHttpRequest();
        requette.addEventListener('loadend', this.retourRequeteDernierFilm.bind(this));
        requette.open('GET', this.baseUrl + 'movie/now_playing?api_key=' + this.apikey + '&language=' + this.lang + '&page=1');
        requette.send();
    };

    retourRequeteDernierFilm(event) {
        console.log('ca marche');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        //console.log(data);

        this.afficheDernierFilm(data);
    };

    afficheDernierFilm(data) {
        let section = document.querySelector('.liste-films');
        console.log(section);

        for (let i = 0; i < this.totalFilm; i++) {
            //console.log(data[i].title);
           // console.log(data[i].overview);
            let article = document.querySelector('.template .film').cloneNode(true);

            section.appendChild(article);

            article.querySelector('h2').innerHTML = data[i].title;

            let src = this.imgPath + "w500" + data[i].poster_path;
            let image = article.querySelector('img');
            image.setAttribute('src', src);
            image.setAttribute('alt', data[i].title);

            article.querySelector('a').setAttribute('href', 'fiche-film.html?id=' + data[i].id);

            article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";


        }


    }

    requeteInfoFilms(movieId) {
        let requette = new XMLHttpRequest();
        requette.addEventListener('loadend', this.retourRequeteInfoFilm.bind(this));
        requette.open('GET', this.baseUrl + 'movie/' + movieId +'?api_key=' + this.apikey + '&language=' + this.lang);
        requette.send();
    };

    retourRequeteInfoFilm(event) {
        console.log('ca marche');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
        console.log(data.title);
        console.log(target.responseText);

       this.afficheInfoFilm(data);
    };

    afficheInfoFilm(data) {

        //requetteActeur()
        document.querySelector('h1').innerHTML = data.title;


    }

    requetteActeur(movieId){
        //GET CREDIT (movieDB) - requette AJAX

    }

    retourRequetteActeur(){
        //Faire attention au JSON.parse... il ny a pas de results

    }

    afficheActeur(){
        //boucle pour afficher tous les acteurs avec un cloneNode

    }


}