import React from 'react';
import Song from './Song'

const SongList = ({ songs }) => {
    return (
        <ul>
            {songs.map(item => <Song key={item.data.id} {...item.data} />)}
        </ul>
    )
}

export default SongList;
