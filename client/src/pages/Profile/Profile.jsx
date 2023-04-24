import NFTCard from '../../components/NFTCard/NFTCard';
import './Profile.css'

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

function Profile() {
  const handleList = () => { }
  const handleUnlist = () => { }
  
  return (
    <div className='profile-container'>
      <h2 className='profile__title'>Profile</h2>

      <section className='profile__token-list-container'>
        <ul className="profile__token-list">
          {
            NFTs.map((nft, idx) => (
              <li key={nft.accountId}>
                <NFTCard
                  nft={nft}
                  actionButtons={
                    <>
                      {
                        idx % 2 ? (
                          <button onClick={() => handleList(nft)}>List</button>
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

export default Profile