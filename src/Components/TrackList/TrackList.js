import React, { Component } from 'react'
import './TrackList.css'
import {Track} from '../Track/Track'
export class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.searchResults.map((track, i) => (<Track onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} key={i} track={track} />)
                )}
            </div>
        )
    }
}
