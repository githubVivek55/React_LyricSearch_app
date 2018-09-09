import React, {Component} from 'react';
import {Consumer} from '../../Context';
import axios from 'axios';

class Search extends Component {
  state = {
    trackTitle: '',
  };

  onChange = e => {
    this.setState ({
      trackTitle: e.target.value,
    });
  };

  findTrack = (dispatch, e) => {
    e.preventDefault ();
    axios
      .get (
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=decs&apikey=${process.env.REACT_APP_LYRIC_KEY}`
      )
      .then (res => {
        dispatch ({
          type: 'SEARCH_ACTION',
          payload: res.data.message.body.track_list,
        });
      })
      .then (
        this.setState ({
          trackTitle: '',
        })
      )
      .catch (err => console.log (err));
  };
  render () {
    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" />Search for a song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind (this, dispatch)}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Song title.."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                  value="Get title track"
                >
                  Get track lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
