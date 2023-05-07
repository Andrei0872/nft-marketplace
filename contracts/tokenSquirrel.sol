// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SquirrelNft is ERC721 {
    string public constant TOKEN_URI = "https://ipfs.io/ipfs/QmSbMn8uScG9xaDoCz9W9vb7374Hxq2gtWhcPRoMvBMQGc";
    uint256 private s_tokenCounter;

    event SquirellMinted(uint256 indexed tokenId);

    constructor() ERC721("NFT Squirrel", "SQUI") {
        s_tokenCounter = 0;
    }

    function mint() public { //we can add payable here
        _safeMint(msg.sender, s_tokenCounter);
        // _approve(address(bytes20(bytes("0x6184b26E6F816E68b4bdFffA27e0C5352e186B8B"))), s_tokenCounter);
        // _setApprovalForAll(msg.sender, address(this), true);
        emit SquirellMinted(s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    // TODO: isOwner.
    function approveMarketplace(address marketplaceAddr, uint256 tokenId) public {
        _approve(marketplaceAddr, tokenId);
    }
}