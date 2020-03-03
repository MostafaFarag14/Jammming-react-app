import React from 'react';
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import {Spotify} from '../../util/Spotify'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    // this.addTrack = this.addTrack.bind(this)
  }
  addTrack = (track) => {
    if (!this.state.playlistTracks.includes(track)) {
      this.setState({ playlistTracks: this.state.playlistTracks.concat(track) })
    }

    // this.setState( prevState => ( { ...prevState, playlistTracks: prevState.playlistTracks.concat(track)}))
  }

  removeTrack = (track) => {
    this.setState({ playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.name !== track.name) })
  }

  updatePlaylistName = (name) => {
    this.setState({ playlistName: name })
  }

  savePlaylist = () => {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search = (term) => {
    Spotify.search(term).then( results => {
      this.setState({searchResults: results})
    })
  }

  render() {
    
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistname={this.state.playlistName} playlisttracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
