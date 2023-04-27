import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { web3, marketplaceContract, bearContract } from './config/web3';
import { Outlet, Link } from 'react-router-dom';

function App() {
  useEffect(() => {
    const fetchFn = async () => {
      //  web3.eth.Contract() 
      console.log(marketplaceContract.methods);
      console.log(bearContract.methods);
      // bearContract.methods.mintNft().send({
      //   from: '0xFf02c74586E2a627064d086364413280476b87eC',
      //   gas: 6721974,
      // });

      // setTimeout(() => {
      //   bearContract.getPastEvents('BearMinted')
      //     .then(r => {
      //       console.log(r);
      //     })
      // }, 100);

      marketplaceContract.methods
        .insertNFT("0xDb3601Ddc98b208e0Bad73e5F9C51D353299A26A", 6)
        .send({
          from: '0xFf02c74586E2a627064d086364413280476b87eC',
          // from: '0xDd8958E023E63549c7f635de372d977E5bb10A11',
          gas: 6721974,
        })


      // Promise.resolve()
      //   .then(async () => {
      //     const accounts = await web3.eth.getAccounts();
      //     console.log(accounts);
      //   })
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
