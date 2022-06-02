// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";



contract NFTMarket is ERC721URIStorage, ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter public _itemIds;
  Counters.Counter private _itemsSold;

  address payable owner;
  uint256 listingPrice = 0 ether;

  constructor() ERC721("Metaverse Tokens", "METT") {
    owner = payable(msg.sender);
  }

  struct MarketItem {
    uint itemId;
    uint256 tokenId;
    address payable creator;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) public idToMarketItem;
  mapping(uint => bool) private _created;

  event MarketItemCreated (
    uint indexed itemId,
    uint256 indexed tokenId,
    address indexed creator,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  function changeOwner(address _newOwner) public {
    require(owner == msg.sender, "oly owner can change this.");
    owner = payable(_newOwner);
  }

   /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public  {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }

  /* Returns the listing price of the contract */
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

    /* Mints a token and lists it in the marketplace */
    function mintNft(string memory tokenURI) public payable returns (uint) {
        require(owner == msg.sender, "not owner");
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      return newTokenId;
    }
  
  /* Places an item for sale on the marketplace */
  function createMarketItem(
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");
    require(_created[tokenId] == false, "already created!");

    _itemIds.increment();
    uint256 itemId = _itemIds.current();

  
    idToMarketItem[itemId] =  MarketItem(
      itemId,
      tokenId,
      payable(msg.sender),
      payable(msg.sender),
      payable(address(this)),
      price,
      false
    );

    _transfer(msg.sender, address(this), tokenId);
    _created[tokenId] = true;

    emit MarketItemCreated(
      itemId,
      tokenId,
      msg.sender,
      msg.sender,
      address(this),
      price,
      false
    );
  }

  /* Creates the sale of a marketplace item */
  /* Transfers ownership of the item, as well as funds between parties */
  function createMarketSale(
    uint256 itemId
    ) public payable nonReentrant {
    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    idToMarketItem[itemId].seller.transfer(msg.value);
    _transfer(address(this), msg.sender, tokenId);
    idToMarketItem[itemId].owner = payable(msg.sender);
    idToMarketItem[itemId].sold = true;
    _itemsSold.increment();
    payable(owner).transfer(listingPrice);
  }

  /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
      require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(msg.value == listingPrice, "Price must be equal to listing price");
      idToMarketItem[tokenId].sold = false;
      idToMarketItem[tokenId].price = price;
      idToMarketItem[tokenId].seller = payable(msg.sender);
      idToMarketItem[tokenId].owner = payable(address(this));
      _itemsSold.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }


  // return all items
    function fetchAllItems() public view returns (MarketItem[] memory) {
      uint itemCount = _itemIds.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
      }
      return items;
    }


  /* Returns all unsold market items */
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(this)) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }


  /* Returns onlyl items that a user has purchased */
  function fetchNftsBought() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Returns only items a user has created */
  function fetchMyCreatedNfts() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].creator == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].creator == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

   function fetchAllOfMyNfts() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].creator == msg.sender) {
        itemCount += 1;
      } else if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      } else if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].creator == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      } else if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      } else if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

}