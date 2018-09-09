import React, {Component} from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';

export class Lyrics extends Component {
  state = {
    tracks: {},
    lyrics: {},
  };
  componentDidMount () {
    axios
      .get (
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_LYRIC_KEY}`
      )
      .then (res => {
        this.setState ({lyrics: res.data.message.body.lyrics});

        return axios
          .get (
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_LYRIC_KEY}`
          )
          .then (res => {
            this.setState ({
              tracks: res.data.message.body.track,
            });
          })
          .catch (err => console.log (err));
      })
      .catch (err => console.log (err));
  }
  render () {
    const {tracks, lyrics} = this.state;
    if (
      tracks === undefined ||
      lyrics === undefined ||
      Object.keys (tracks).length === 0 ||
      Object.keys (lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
          <div className="card">
            <div className="card-header">
              {tracks.track_name}
              {' '}
              by
              {' '}
              <span className="text-secondary">{tracks.artist_name}</span>
            </div>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
