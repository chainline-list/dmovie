//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

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
    }
}
