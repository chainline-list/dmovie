//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.5;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract App is ReentrancyGuard {

    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    struct Item {
        uint itemId;
        address nftContract;
        uint tokenId;
        address payable owner;
        uint price;
        uint watchingFee;
        bool accessible;
    }
    mapping (uint256 => Item) private idToMarketItem;

    function getNFTs() public view returns (Item[] memory) {
        uint itemCount = _itemIds.current();
        Item[] memory items = new Item[](itemCount);
        for (uint i = 0; i <= itemCount; i++) {
            items[i] = idToMarketItem[i + 1];
        }
        return items;
    }

    function mintNFT(address _nftContract, uint tokenId, uint price, uint watchingFee) public {
        _itemIds.increment();
        uint itemID = _itemIds.current();
        idToMarketItem[itemID] = Item(itemID, _nftContract, tokenId, payable(msg.sender), price, watchingFee, false);                                                                                                                                                                                                                                      Item(itemID, _nftContract, tokenId, payable(msg.sender), price, watchingFee, false);
    }

    function buyNFT(address _nftContract, uint _amount, uint _nftId) public payable {
        Item storage item = idToMarketItem[_nftId];
        require(_amount == item.price, "Please, pay the right amount");
        item.owner.transfer(_amount);
        IERC721(_nftContract).transferFrom(item.owner, msg.sender, _nftId);
        idToMarketItem[_nftId].owner = payable(msg.sender);
        /*payable(owner).transfer(listingPrice);*/
    }

    function payAccessibility(uint _amount, uint _nftId) public payable {
        Item storage item = idToMarketItem[_nftId];
        require(_amount == item.watchingFee, "Pay to right amount please");
        item.owner.transfer(_amount);
        item.accessible = true;
    }
}
