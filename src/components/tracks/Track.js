import React from 'react';
import {Link} from 'react-router-dom';

const Track = props => {
  const {track} = props;
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3>{track.artist_name}</h3>
          <p className="card-text">
            <strong><i className="fas fa-play" />Track</strong>
            :
            {track.track_name}
            <br />
            <strong><i className="fas fa-compact-disc" />Album Name</strong>
            :
            {track.album_name}
          </p>
          <Link
            to={`/track/lyrics/${track.track_id}`}
            className="btn btn-dark btn-block"
          >
            <i className="fas fa-chevron-right" />View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Track;
