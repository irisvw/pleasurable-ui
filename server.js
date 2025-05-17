// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

console.log('')
// Doe een fetch naar de data die je nodig hebt
// const apiResponse = await fetch('...')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
// const apiResponseJSON = await apiResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Variables
const baseURL = "https://fdnd-agency.directus.app/items/tm_";
const defaultProfile = 124;

app.get('/', async function (request, response) {
  const apiResponse = await fetch ('https://fdnd-agency.directus.app/items/tm_playlist');

  const apiResponseJSON = await apiResponse.json ();
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('index.liquid', { playlists: apiResponseJSON.data});
});

app.post('/', async function (request, response) {

  response.redirect(303, '/')
})

app.get('/playlist', async function (request, response)  {

  const playlistResponse = await fetch('https://fdnd-agency.directus.app/items/tm_playlist')
  const playlistResponseJSON = await playlistResponse.json() 

  response.render('playlist.liquid', { playlists: playlistResponseJSON.data });
});

app.get('/lessons', async function (request, response) {
  let stories = await fetch(`${baseURL}story?fields=*.*`);
  let playlists = await fetch(`${baseURL}playlist?fields=creator,id,title,image.*`);
  let likes = await fetch(`${baseURL}likes?fields=playlist&filter[_and][0][profile][id][_eq]=${defaultProfile}&filter[_and][1][playlist][_nnull]`);

  let storiesJSON = await stories.json();
  let playlistsJSON = await playlists.json();
  let likesJSON = await likes.json();

  // convert array of objects to array of values
  let likesArray = likesJSON.data.map(a => a.playlist);

  // sort playlists
  let playlistsArray = playlistsJSON.data;
  // for each playlist, check if the creator matches the defaultProfile
  const yourPlaylists = playlistsArray.filter((playlist) => playlist.creator == defaultProfile);
  // for each playlist, check if the id is featured in the likesArray
  const likedPlaylists = playlistsArray.filter((playlist) => likesArray.includes(playlist.id));
  // for each playlist, check if the id is NOT featured in the likesArray
  const suggestedPlaylists = playlistsArray.filter((playlist => !likesArray.includes(playlist.id)));

  response.render('lessons.liquid', {
    stories: storiesJSON.data,
    suggestedPlaylists: suggestedPlaylists,
    likedPlaylists: likedPlaylists,
    yourPlaylists: yourPlaylists
  });
});

app.get('/lessons/story/:id', async function (request, response) {
  const story = await fetch(`${baseURL}story?filter[id][_eq]=${request.params.id}&fields=*.*`);
  let storyJSON = await story.json();

  response.render('story.liquid', {
    story: storyJSON.data[0]
  });
})

app.post(`/:profile/:playlist/like`, async function (request, response) {
  await fetch(`${baseURL}likes`, {
    method: 'POST',
    body: JSON.stringify({
      profile: defaultProfile,
      playlist: req.params.playlist,
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/lessons');
});

app.post('/:profile/:playlist/unlike', async function (request, response) {
  const like = await fetch(`${baseURL}likes?filter[_and][0][profile][_eq]=${defaultProfile}&filter[_and][1][playlist][_eq]=${req.params.playlist}`);
  const likeJSON = await like.json();
  const likeID = likeJSON.data[0].id;

  await fetch(`${baseURL}likes/${likeID}`, {
    method: 'DELETE'
  });

  response.redirect(303, '/lessons');
})

app.get('/lessons', async function (request, response) {
  let stories = await fetch(`${baseURL}story?fields=*.*`);
  let playlists = await fetch(`${baseURL}playlist?fields=creator,id,title,image.*`);
  let likes = await fetch(`${baseURL}likes?fields=playlist&filter[_and][0][profile][id][_eq]=${defaultProfile}&filter[_and][1][playlist][_nnull]`);

  let storiesJSON = await stories.json();
  let playlistsJSON = await playlists.json();
  let likesJSON = await likes.json();

  // convert array of objects to array of values
  let likesArray = likesJSON.data.map(a => a.playlist);

  // sort playlists
  let playlistsArray = playlistsJSON.data;
  // for each playlist, check if the creator matches the defaultProfile
  const yourPlaylists = playlistsArray.filter((playlist) => playlist.creator == defaultProfile);
  // for each playlist, check if the id is featured in the likesArray
  const likedPlaylists = playlistsArray.filter((playlist) => likesArray.includes(playlist.id));
  // for each playlist, check if the id is NOT featured in the likesArray
  const suggestedPlaylists = playlistsArray.filter((playlist => !likesArray.includes(playlist.id)));

  response.render('lessons.liquid', {
    stories: storiesJSON.data,
    suggestedPlaylists: suggestedPlaylists,
    likedPlaylists: likedPlaylists,
    yourPlaylists: yourPlaylists
  });
});

app.get('/lessons/story/:id', async function (request, response) {
  const story = await fetch(`${baseURL}story?filter[id][_eq]=${request.params.id}&fields=*.*`);
  let storyJSON = await story.json();

  response.render('story.liquid', {
    story: storyJSON.data[0]
  });
})

app.post(`/:profile/:playlist/like`, async function (request, response) {
  await fetch(`${baseURL}likes`, {
    method: 'POST',
    body: JSON.stringify({
      profile: defaultProfile,
      playlist: req.params.playlist,
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/lessons');
});

app.post('/:profile/:playlist/unlike', async function (request, response) {
  const like = await fetch(`${baseURL}likes?filter[_and][0][profile][_eq]=${defaultProfile}&filter[_and][1][playlist][_eq]=${req.params.playlist}`);
  const likeJSON = await like.json();
  const likeID = likeJSON.data[0].id;

  await fetch(`${baseURL}likes/${likeID}`, {
    method: 'DELETE'
  });

  response.redirect(303, '/lessons');
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`)
})