


// the two sellers makes a (semi) random offers (waiting 5 seconds each time), until one of them is successful







/*
Privacy,
Flexibility,
Approximation,
Personalisation...

how to make the relation viz. inputs, computed value, between the two contracts private?
computing logic should not be in thecontract
how to integrate the checking that it is correct to teh contract (rather than acting based upon the rating)
should have thought of what characteristics we want to see that architecture acheive, before trying to build it.
*/
pragma solidity ^0.4.2;

contract Seller {
  // Variables
  address public originator = msg.sender;
  uint public creationTime = now;
  uint public rating;
  mapping(address => uint) public previousInterlocutors;
  // Modifiers
  modifier onlyBy(address _account){
    if (msg.sender != _account)
        throw;
    _;}
  // Events that will be fired on changes.
  event RatingReceived(address interlocutor, uint newRating);
  event MoneyReceived(address interlocutor, uint newRating);
  event OfferAccepted(uint price);
  event OfferRejected(uint price);
  event SellerReceived(uint value);

  // Constructor / Destructor
  function Seller() public {rating = 0;}
  function remove() public onlyBy(originator){suicide(originator);}
  // Public Methods
  function rateService() public {
    if (previousInterlocutors[msg.sender] < 1){throw;}
    rating += 1;
    RatingReceived(msg.sender, rating);
  }
  function  makeOffer(address aBuyerAddr, uint offerPrice, uint result, uint first, uint second) public returns (bool) {
    Buyer aBuyer = Buyer(aBuyerAddr);
    if(aBuyer.computeForMoney.gas(75000)(offerPrice, result, first, second)==1){
      previousInterlocutors[aBuyerAddr] +=1;
      OfferAccepted(offerPrice);
      return true;
    }
    OfferRejected(offerPrice);
    return false;
  }
  function pay() public payable {
    SellerReceived(msg.value);
  }


}


contract Buyer {
  // variables
  address public originator = msg.sender;
  uint public creationTime = now;
  uint public maxPrice;
  uint public anInteger;
  uint public anotherInteger;
  bool public taskDone;

  event BuyerFundingReceived(address from, uint amount);
  event OfferReceived(address from, uint amount);
  event OfferAccepted(address from, uint amount);
  event OfferRejected(address from, uint amount);
  event SolutionReceived(uint result);
  event MoneyPaidOut(uint price);
  modifier onlyBy(address _account){
    if (msg.sender != _account)
        throw;
    _;
  }
  function Buyer(uint _price, uint _first, uint _second) public {
    maxPrice = _price;
    anInteger=_first;
    anotherInteger = _second;
  }
  function load() public payable{BuyerFundingReceived(msg.sender, msg.value);}
  function setParams(uint _price, uint _first, uint _second) public onlyBy(originator){
    maxPrice = _price;
    anInteger = _first;
    anotherInteger = _second;
  }
  function rateService(bool satisfactory, address aSellerAddr) public onlyBy(originator){
    if (satisfactory){
      Seller aSeller;
      aSeller = Seller(aSellerAddr);
      aSeller.rateService.gas(50000)();
    }
  }
  function taskSpecs() public returns (uint) {return anInteger;}
  function computeForMoney (uint offerPrice, uint result, uint first, uint second) public returns (int)  {
    if (taskDone){return 0;}
    OfferReceived(msg.sender,offerPrice);
    if (offerPrice > maxPrice) {
      OfferRejected(msg.sender, offerPrice);
      return -1;
    }
    if (anInteger !=first) {throw;}
    if (anotherInteger !=second) {throw;}
    OfferAccepted(msg.sender,offerPrice);

    address aSellerAddr = msg.sender;
    Seller aSeller;
    aSeller = Seller(msg.sender);
    aSeller.pay.value(offerPrice).gas(30000)();

    if(msg.sender.send(offerPrice)){MoneyPaidOut(offerPrice);}

    taskDone = true;
    SolutionReceived(result);
    return 1;
  }
  function remove() public onlyBy(originator){suicide(originator);}
}
