import React, { Component } from 'react'
import './Playlist.css'
import {TrackList} from '../TrackList/TrackList'
export class Playlist extends Component {
    handlenameChange = (e) => {
        this.props.onNameChange(e.target.value)
    }
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handlenameChange}/>
                <TrackList onRemove={this.props.onRemove} isRemoval={true} searchResults={this.props.playlisttracks}/>
                <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}