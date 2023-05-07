import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { web3, marketplaceContract, bearContract, squirrelContract, CONTRACT_ADDRESS } from './config/web3';
import { Outlet, Link } from 'react-router-dom';

const SQUIRREL_CONTRACT_ADDR = '0x2e8984745A877Ff5B2E0f2298E16c7D099E86172';
const FIRST_USER = '0xFf02c74586E2a627064d086364413280476b87eC';
const MARKETPLACE_OWNER_ADDR = FIRST_USER;
const BUYER_ADDR = '0xDd8958E023E63549c7f635de372d977E5bb10A11';


// here in App.jsx we need to take care of how we mint NFTs(we need to pass the correct addresses to functions)...


function App() {
  useEffect(() => {
    const doMainFlow = async () => {
      // bearContract.methods.mintNft().send({
      //   from: '0xFf02c74586E2a627064d086364413280476b87eC',
      //   gas: 6721974,
      // })

      // await squirrelContract.methods.mint().send({
      //   from: MARKETPLACE_OWNER_ADDR,
      //   gas: 6721974,
      // })
      // .then(r => console.log(r))

      // await squirrelContract.methods
      //   .approve(CONTRACT_ADDRESS, 0)
      //   .send({ from: MARKETPLACE_OWNER_ADDR })
      //   .then(console.log)

      // await marketplaceContract.methods
      //   .insertNFT(SQUIRREL_CONTRACT_ADDR, 0)
      //   .send({
      //     from: MARKETPLACE_OWNER_ADDR,
      //     gas: 6721974,
      //   })
      //   .then(r => {
      //     console.log(r);
      //   })

      //* LISTINGS

      await marketplaceContract.methods
        .listItem(
          SQUIRREL_CONTRACT_ADDR,
          0,
          10
        ).send({
          from: MARKETPLACE_OWNER_ADDR,
          gas: 6721974
        })
          .then(console.log)
return;
      //* BUY
      await marketplaceContract.methods
        .buyItem(SQUIRREL_CONTRACT_ADDR, 0)
        .send({
          from: BUYER_ADDR,
          value: 10,
          gas: 6721974,
        })
        .then(console.log)
    };

    const getUserToken = async () => {
      await marketplaceContract.methods
        .getOwnerToken(
          BUYER_ADDR,
          // MARKETPLACE_OWNER_ADDR,
          SQUIRREL_CONTRACT_ADDR,
          0
        ).send({
          gas: 6721974
        })
          .then(console.log)
    }

    const updateListing = async () => {
      await marketplaceContract.methods
        .updateListing(
          SQUIRREL_CONTRACT_ADDR,
          0,
          20
        ).send({
          from: MARKETPLACE_OWNER_ADDR,
          gas: 6721974
        })
          .then(console.log)
    }

    const listItemAsBuyer = async () => {
      await squirrelContract.methods
        .approve(CONTRACT_ADDRESS, 0)
        .send({ from: BUYER_ADDR })
        .then(console.log)
      
      await marketplaceContract.methods
        .listItem(
          SQUIRREL_CONTRACT_ADDR,
          0,
          10
        ).send({
          from: BUYER_ADDR,
          gas: 6721974
        })
          .then(console.log)
    }

    doMainFlow();
    // updateListing();
    // getUserToken();
    // listItemAsBuyer();
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
