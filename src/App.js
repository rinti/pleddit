import React, { useState } from 'react';
import './App.css';

const Song = ({ title, url }) => {
    return <li>{title}</li>
}

const App = () => {
    const [subreddit, setSubreddit] = useState('')
    const [songs, setSongs] = useState([])

    const handleSubredditChange = (e) => {
        setSubreddit(e.target.value)
    }

    const handleFetchClick = (e) => {
        setSongs([{title: 'test'}])
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
                {songs.map(item => <Song {...item} />)}
            </ul>
        </div>
    );
}

export default App;
