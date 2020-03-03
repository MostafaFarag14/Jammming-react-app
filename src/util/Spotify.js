const clientID = 'cdf6e106591f4dfeb983b9e3b2edc6fa'
const redirectURI = 'https://jammming-hits.herokuapp.com/'
let token
export const Spotify = {
    getAccessToken() {
        if (token) {
            return token
        }
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiration_time = window.location.href.match(/expires_in=([^&]*)/)
        if (tokenMatch && expiration_time) {
            token = tokenMatch[1]
            const expires_in = Number(expiration_time[1])
            window.setTimeout(() => token = '', expires_in * 1000)
            window.history.pushState('Access Token', null, '/')
            return token
        }
        else {
            const access_url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}` ;
            window.location = access_url
        }
    },
    search(term) {
        const access_token = Spotify.getAccessToken()
        const headers = { Authorization: `Bearer ${access_token}` }
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return []
                }
                return jsonResponse.tracks.items.map(track => ({
                    
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    
                }))
            })
    }
    ,

    savePlaylist(name, trackUris) {
      if (!name || !trackUris.length) {
        return;
      }
  
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userId;
  
      return fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => response.json()
      ).then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: name})
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
          });
        });
      });
    }
  };
