document.addEventListener("DOMContentLoaded", function () {
    let connexion = new MovieDB();
    connexion.requeteDernierFilms();
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

            /*if(data[i].overview != ""){
                article.querySelector('.description').innerHTML = data[i].overview;

            }else{
                article.querySelector('.description').innerHTML = "Aucune description disponible";
            }*/

            article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";


        }


    }
}