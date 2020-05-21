let favMovies = [{
    "adult": false,
    "backdrop_path": "/xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg",
    "genre_ids": [
      12,
      16,
      10751,
    ],
    "id": 330457,
    "original_language": "en",
    "original_title": "Frozen II",
    "overview": "Elsa, Anna, Kristoff and Olaf head far into the forest to learn the truth about an ancient mystery of their kingdom.",
    "popularity": 95.028,
    "poster_path": "/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg",
    "release_date": "2019-11-20",
    "title": "Frozen II",
    "video": false,
    "vote_average": 7.2,
    "vote_count": 4516,
  },
  {
    "adult": false,
    "backdrop_path": "/xFxk4vnirOtUxpOEWgA1MCRfy6J.jpg",
    "genre_ids": [
      12,
      16,
      35,
      14,
      10751,
    ],
    "id": 508439,
    "original_language": "en",
    "original_title": "Onward",
    "overview": "In a suburban fantasy world, two teenage elf brothers embark on an extraordinary quest to discover if there is still a little magic left out there.",
    "popularity": 91.598,
    "poster_path": "/f4aul3FyD3jv3v4bul1IrkWZvzq.jpg",
    "release_date": "2020-02-29",
    "title": "Onward",
    "video": false,
    "vote_average": 7.9,
    "vote_count": 1845,
  },
  {
    "adult": false,
    "backdrop_path": "/uZMZyvarQuXLRqf3xdpdMqzdtjb.jpg",
    "genre_ids": [
      53,
      878,
      27,
    ],
    "id": 570670,
    "original_language": "en",
    "original_title": "The Invisible Man",
    "overview": "When Cecilia's abusive ex takes his own life and leaves her his fortune, she suspects his death was a hoax. As a series of coincidences turn lethal, Cecilia works to prove that she is being hunted by someone nobody can see.",
    "popularity": 77.003,
    "poster_path": "/5EufsDwXdY2CVttYOk2WtYhgKpa.jpg",
    "release_date": "2020-02-26",
    "title": "The Invisible Man",
    "video": false,
    "vote_average": 7.1,
    "vote_count": 1892,
  }]

  let item = {
    "adult": false,
    "backdrop_path": "/xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg",
    "genre_ids": [
      12,
      16,
      10751,
    ],
    "id": 330457,
    "original_language": "en",
    "original_title": "Frozen II",
    "overview": "Elsa, Anna, Kristoff and Olaf head far into the forest to learn the truth about an ancient mystery of their kingdom.",
    "popularity": 95.028,
    "poster_path": "/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg",
    "release_date": "2019-11-20",
    "title": "Frozen II",
    "video": false,
    "vote_average": 7.2,
    "vote_count": 4516,
  }

let index = 3

function edit(item, favMovies, index) { //setFavMovies,
    let copy = favMovies

    for (var i = 0; i < copy.length - 1; i++)
    {
        if (copy[i].id === item.id){
            return(console.log("found it"))
        }
    }

    copy[index] = item
    // setFavMovies({...copy})
}

let copy = edit(item, favMovies,index)
console.log(copy)