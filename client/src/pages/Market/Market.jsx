import NFTCard from "../../components/NFTCard/NFTCard";
import './Market.css';

// TODO: fetch NFTs.
// TODO: include `isOwned
const NFTs = [
  { accountId: 'x1', price: 10, imageURL: 'x', },
  { accountId: 'x2', price: 10, imageURL: 'x', },
  { accountId: 'x3', price: 10, imageURL: 'x', },
  { accountId: 'x4', price: 10, imageURL: 'x', },
  { accountId: 'x5', price: 10, imageURL: 'x', },
  { accountId: 'x6', price: 10, imageURL: 'x', },
  { accountId: 'x7', price: 10, imageURL: 'x', },
  { accountId: 'x8', price: 10, imageURL: 'x', },
];

function Market() {
  const handleBuy = () => { }
  const handleUnlist = () => { }

  return (
    <div className='market-container'>
      <h2 className='market__title'>Market</h2>

      <section className='market__token-list-container'>
        <ul className="market__token-list">
          {
            NFTs.map((nft, idx) => (
              <li key={nft.accountId}>
                <NFTCard
                  nft={nft}
                  actionButtons={
                    <>
                      {
                        idx % 2 ? (
                          <button onClick={() => handleBuy(nft)}>Buy</button>
                        ) : (
                          <button onClick={() => handleUnlist(nft)}>Unlist</button>
                        )
                      }
                    </>
                  }
                />
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  )
}

export default Market