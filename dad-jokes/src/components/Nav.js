import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
  return (
    <div className='nav'>
      <Link to='/'>
        <h1>Dad Jokes</h1>
      </Link>
      <div>
        <Link to='/jokes'>
          <button href='#'>Jokes</button>
        </Link>

        <Link to='/login'>
          <button href='#'>Login</button>
        </Link>

        <Link to='/register'>
          <button href='#'>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
