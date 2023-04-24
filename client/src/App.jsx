import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { web3 } from './config/web3';
import { Outlet, Link } from 'react-router-dom';

function App() {
  useEffect(() => {
    const fetchFn = async () => {
      Promise.resolve()
        .then(async () => {
          const accounts = await web3.eth.getAccounts();
          console.log(accounts);
        })
    };

    fetchFn();
  }, []);
  
  return (
    <div id='container'>
      <header id='header'>
        <h1 className='header__title'>NFT Marketplace</h1>

        <nav id='navbar'>
          <ul className='navbar__links'>
            <li>
              <Link to='/market'>Market</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
