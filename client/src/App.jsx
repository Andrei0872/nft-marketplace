import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { web3, marketplaceContract, bearContract, squirrelContract, CONTRACT_ADDRESS } from './config/web3';
import { Outlet, Link } from 'react-router-dom';

const SQUIRREL_CONTRACT_ADDR = '0x6B2aA448384C719281E3519258839Ecc75Bc607e';
const FIRST_USER = '0xFf02c74586E2a627064d086364413280476b87eC';
const MARKETPLACE_OWNER_ADDR = FIRST_USER;

function App() {
  useEffect(() => {
    const fetchFn = async () => {
      //  web3.eth.Contract() 
      // console.log(marketplaceContract.methods);
      // console.log(bearContract.methods);
      // bearContract.methods.mintNft().send({
      //   from: '0xFf02c74586E2a627064d086364413280476b87eC',
      //   gas: 6721974,
      // })

      squirrelContract.methods.mintNft().send({
        from: MARKETPLACE_OWNER_ADDR,
        gas: 6721974,
      })
      .then(r => console.log(r))

      // squirrelContract.methods
      //   .approveMarketplace(CONTRACT_ADDRESS, 1)
      //   .call()
      //   .then(console.log)

      // setTimeout(() => {
      //   bearContract.getPastEvents('BearMinted')
      //     .then(r => {
      //       console.log(r);
      //     })
      // }, 100);

      
      
      // marketplaceContract.methods
      //   // .insertNFT("0xDb3601Ddc98b208e0Bad73e5F9C51D353299A26A", 6)
      //   .insertNFT(SQUIRREL_CONTRACT_ADDR, 1)
      //   .send({
      //     from: MARKETPLACE_OWNER_ADDR,
      //     gas: 6721974,
      //   })
      //   .then(r => {
      //     console.log(r);
      //   })

      // marketplaceContract.methods
      //   .getOwnerTokens(MARKETPLACE_OWNER_ADDR)
      //   .call()
      //   .then(r => console.log(r))

        //* LISTINGS


        // marketplaceContract.methods
        //   .listItem(
        //     SQUIRREL_CONTRACT_ADDR,
        //     1,
        //     10
        //   ).send({
        //     from: MARKETPLACE_OWNER_ADDR,
        //   });


      // marketplaceContract.methods
      //   .getAllListings()
      //   .call()
      //   .then(r => console.log(r))


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
