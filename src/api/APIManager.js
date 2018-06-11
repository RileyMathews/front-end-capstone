/* 
    module to provide functionality for working with api
    Authors: Riley Mathews
*/

import $ from 'jquery'

const APIManager = Object.create(null, {
    getSingleGame: {
        value: function (gameId) {
            return fetch(`http://localhost:8088/games?id=${gameId}`)
        }
    },
    getUsersGames: {
        value: function (user) {
            return fetch(`http://localhost:8088/usersGames?userId=${user}`)
        }
    },
    searchGames: {
        value: function (searchString) {
            return fetch(`http://localhost:8088/games?name_like=${encodeURI(searchString)}`)
        }
    },
    post: {
        value: function (collection, data) {
            return fetch(`http://localhost:8088/${collection}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    put: {
        value: function (collection, data, id) {
            return fetch(`http://localhost:8088/${collection}/${id}`, {
                method: "put",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
    },
    delete: {
        value: function (collection, id) {
            return fetch(`http://localhost:8088/${collection}/${id}`, {
                method: "DELETE"
            })
        }
    },
    getGbGame: {
        value: function (gbId) {
            return $.ajax({
                type: "GET",
                dataType: "jsonp",
                crossDomain: true,
                jsonp: "json_callback",
                url: `http://www.giantbomb.com/api/game/3030-${gbId}/?api_key=817e4ec0b4026b38424f3c98970b14d273226692&format=jsonp&field_list=name,genres,developers,franchises,image,similar_games,deck,guid,id,platforms`
            })
        }
    },
    searchGbGames: {
        value: function (searchString) {
            return $.ajax({
                type: "GET",
                dataType: "jsonp",
                crossDomain: true,
                jsonp: "json_callback",
                url: `http://www.giantbomb.com/api/search?api_key=817e4ec0b4026b38424f3c98970b14d273226692&format=jsonp&query=${searchString}&resources=game`
            })
        }
    }
})

export default APIManager


/* 

    Giantbomb api search string templates
    http://www.giantbomb.com/api/game/3030-39775/?api_key=817e4ec0b4026b38424f3c98970b14d273226692&format=json&field_list=name,genres,developers,franchises,image,similar_games,deck,guid,id,platforms

    search
    http://www.giantbomb.com/api/search?api_key=817e4ec0b4026b38424f3c98970b14d273226692&query=mario&resources=game

*/