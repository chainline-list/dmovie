//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.5;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract App is ReentrancyGuard {

    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    AggregatorV3Interface internal priceFeed;
    struct Item {
        uint itemId;
        address nftContract;
        uint tokenId;
        address payable owner;
        uint price;
        uint watchingFee;
        uint viewersCount;
        address[] Viewers;
    }
    mapping (uint256 => Item) private idToMarketItem;

    constructor() {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    function getLatestPrice() public view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price;
    }

    function getNFTs() public view returns (Item[] memory) {
        uint itemCount = _itemIds.current();
        Item[] memory items = new Item[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            items[i] = idToMarketItem[i + 1];
        }
        return items;
    }

    function mintNFT(address _nftContract, uint _tokenId, uint _price, uint _watchingFee) public {
        _itemIds.increment();
        uint itemID = _itemIds.current();
        idToMarketItem[itemID] = Item(itemID, _nftContract, _tokenId, payable(msg.sender), _price, _watchingFee, 0, new address[](0));
        idToMarketItem[itemID].Viewers.push(msg.sender);
    }

    function buyNFT(address _nftContract, uint _nftId) public payable {
        Item storage item = idToMarketItem[_nftId];
        require(msg.value == item.price, "Please, pay the right amount");
        require(item.owner != msg.sender, "You cannot buy your own work");
        item.owner.transfer(msg.value);
        IERC721(_nftContract).safeTransferFrom(item.owner, msg.sender, _nftId);
        idToMarketItem[_nftId].owner = payable(msg.sender);

        /*payable(owner).transfer(listingPrice);*/
    }

    function payAccessibility(uint _itemId) public payable {
        Item storage item = idToMarketItem[_itemId];
        require(item.owner != msg.sender, 'cannot pay for your own work!');
        require(msg.value == item.watchingFee, "Pay to right amount please");
        item.owner.transfer(msg.value);
        item.viewersCount +=1;
        item.Viewers.push(msg.sender);
        
    }
}
