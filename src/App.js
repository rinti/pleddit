import React, { useState } from 'react';
import './App.css';
import { create } from 'apisauce'
import Song from './Song'

const api = create({
  baseURL: 'https://www.reddit.com',
  headers: { Accept: 'application/vnd.github.v3+json' },
})

const App = () => {
    const [subreddit, setSubreddit] = useState('')
    const [songs, setSongs] = useState([])

    const handleSubredditChange = (e) => {
        setSubreddit(e.target.value)
    }

    const handleFetchClick = (e) => {
        api.get(`r/${subreddit}.json?jsonp=`).then(response => setSongs(response.data.data.children))
    }

    return (
        <div className="App">
            <section>
                <input type="text" value={subreddit} onChange={handleSubredditChange} />
                <button onClick={handleFetchClick}>
                    fetchy
                </button>
            </section>
            <ul>
                {songs.map(item => <Song key={item.data.id} {...item.data} />)}
            </ul>
        </div>
    );
}

export default App;
