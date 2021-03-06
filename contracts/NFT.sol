//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public contractAddress;

    constructor(address _marketAddress) ERC721("ENTERTAINMENT", "ETT") {
        contractAddress = _marketAddress;
    }

    function createToken(string memory _tokenURI) public returns (uint) {
        
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}