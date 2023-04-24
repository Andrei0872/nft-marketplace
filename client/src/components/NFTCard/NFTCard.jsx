import './NFTCard.css';

function NFTCard(props) {
  const { nft } = props;

  return (
    <div className='nft-card'>
      <div className='nft-card__body'>
        <img src="/dog.jpg" alt="Dog picture" />
      </div>


      <div className='nft-card__footer'>
        <div>{nft.price}</div>

        {
          props.actionButtons ? (
            <div className='nft-card__action-buttons'>
              {props.actionButtons}
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default NFTCard