import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosAuth';

const Jokes = () => {
  const [jokes, setJokes] = useState([]);
  const [randomJoke, setRandomJoke] = useState({});
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getJokes();
  }, []);

  useEffect(() => {
    getRandomJoke();
  }, [jokes.length]);

  const getJokes = async () => {
    try {
      const jokes = await axiosWithAuth().get(
        'http://localhost:3300/api/jokes',
      );

      setJokes(jokes.data);
      setLoggedIn(true);
      setLoading(false);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const getRandomJoke = () => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setRandomJoke(randomJoke);
  };

  if (!loggedIn) {
    return (
      <div className='jokes'>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className='jokes'>
      {loading ? (
        <div>
          <h2>...Loading</h2>
        </div>
      ) : (
        <div className='joke-wrapper'>
          <div className='joke-display'>
            <h2>{randomJoke.joke}</h2>
          </div>
          <button onClick={getRandomJoke}>More jokes please</button>
        </div>
      )}
    </div>
  );
};

export default Jokes;
