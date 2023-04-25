//Tutorial followed in making the project: https://blog.chain.link/how-to-build-an-nft-marketplace-with-hardhat-and-solidity/#building_the_nft_marketplace

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// Contract module that helps prevent reentrant calls to a function.
// Inheriting from ReentrancyGuard will make the nonReentrant modifier available, 
// which can be applied to functions to make sure there are no nested (reentrant) calls to them:
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error InsufficientFunds(address nftAddress, uint256 tokenId, uint256 price);
error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();
error OwnerTheSameWithBuyer(); // Error thrown for isNotOwner modifier

contract Marketplace is ReentrancyGuard {

    struct Listing {
        uint256 price;
        address seller;
    }

    // The indexed parameters for logged events will allow you to search for these events using the indexed parameters as filters.
    // The indexed keyword is only relevant to logged events.
    // (source: https://ethereum.stackexchange.com/questions/8658/what-does-the-indexed-keyword-do)
    event ItemListed( 
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    mapping(address => mapping(uint256 => Listing)) private s_listings;
    mapping(address => uint256) private s_proceeds;


    // We will use modifiers to automatically check some conditions prior to executing the functions:

    // This modifier verifies that an NFT has not already been listed when its listing was desired:
    modifier notListed(
        address nftAddress,
        uint256 tokenId
    ) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _; // This operator tells when the function can be executed 
          // (In this case the function will be executed after the above check.
         // If the check is not successful, the execution is interrupted and an error is thrown)
    }


    // This modifier verifies that an NFT is already listed when the list price is modified:
    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }

    // This modifier verifies that the one who wants to list, unlist or change the price of an NFT is the owner:
    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    // This modifier verifies that the NFT owner is not the same with the buyer - an owner can't buy his/her NFT:
    // (Modifies buyItem function)
    modifier isNotOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender == owner) {
            revert OwnerTheSameWithBuyer();
        }
        _;
    }

    // The functions that represent the functionality of the contract (marketplace):

    /*
     The method below is used for listing NFT. 
     The parameters are:
      - nftAddress: Address of NFT contract (type of NFT)
      - tokenId: Token ID of NFT
      - price: sale price for each item
     */
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
        external
        notListed(nftAddress, tokenId)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }
        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }
        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    /*
     The method below is used for canceling a NFT listing.
     The parameters are:
      - nftAddress: Address of NFT contract
      - tokenId: Token ID of NFT
     */
    function cancelListing(address nftAddress, uint256 tokenId)
        external
        isOwner(nftAddress, tokenId, msg.sender)
        isListed(nftAddress, tokenId)
    {
        delete (s_listings[nftAddress][tokenId]);
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    /*
     The method below is used for buying a NFT.
     Observation: the owner of an NFT could unapprove the marketplace,
                  which would cause this function to fail.
     The parameters are:
      - nftAddress: Address of NFT contract
      - tokenId: Token ID of NFT
     */
    function buyItem(address nftAddress, uint256 tokenId)
        external
        payable
        isListed(nftAddress, tokenId)
        isNotOwner(nftAddress, tokenId, msg.sender)
        nonReentrant
    {
        Listing memory listedItem = s_listings[nftAddress][tokenId];
        if (msg.value < listedItem.price) {
            revert InsufficientFunds(nftAddress, tokenId, listedItem.price);
        }
        s_proceeds[listedItem.seller] += msg.value;
        // Could just send the money...
        // https://fravoll.github.io/solidity-patterns/pull_over_push.html
        delete (s_listings[nftAddress][tokenId]);
        IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);
        emit ItemBought(msg.sender, nftAddress, tokenId, listedItem.price);
    }

    /*
     The method below is used for updating a NFT listing.
     The parameters are:
      - nftAddress: Address of NFT contract
      - tokenId: Token ID of NFT
      - newPrice: price (in Wei) of the item
     */
    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    )
        external
        isListed(nftAddress, tokenId)
        nonReentrant
        isOwner(nftAddress, tokenId, msg.sender)
    {
        //We should check the value of 'newPrice' and revert if it's below zero (like we also check in 'listItem()' function)
        if (newPrice <= 0) {
            revert PriceMustBeAboveZero();
        }
        s_listings[nftAddress][tokenId].price = newPrice;
        emit ItemListed(msg.sender, nftAddress, tokenId, newPrice);
    }

    /*
     The method below is used for withdrawing proceeds from sales. 
     */
    function withdrawProceeds() external {
        uint256 proceeds = s_proceeds[msg.sender];
        if (proceeds <= 0) {
            revert NoProceeds();
        }
        s_proceeds[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        require(success, "Transfer failed!");
    }


    // Getter Functions: 

    function getListing(address nftAddress, uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return s_listings[nftAddress][tokenId];
    }

    function getProceeds(address seller) external view returns (uint256) {
        return s_proceeds[seller];
    }
}