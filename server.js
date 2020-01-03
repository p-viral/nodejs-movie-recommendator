const express = require('express');
const app = express();
const movies = require('./movies.js');
var moment = require('moment')
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.get('/', function(req, res) {
    res.sendfile('public/index.html');
});

app.post('/search',function(req,res) {
    let filter_movie = [];
    let status = 0;
    for (var i=0; i < movies.length; i++) {
        if (movies[i].genres.includes(req.body.genre)) {        
            let isMovieAvailable = movies[i].showings.filter(function(show_time){
                return show_time > (moment.utc(req.body.time,'HH:mm').add(30,'minutes').format('HH:mm:ss'));
            });
            if (isMovieAvailable.length > 0) {
                status = 1;
                filter_movie.push(movies[i].name+', showing at '+isMovieAvailable[0]);
            }
        }
    }
    res.json({'status':status,'data':filter_movie});
});
app.listen(9000, function() {
    console.log('server started on port 9000');
});
module.exports = app;