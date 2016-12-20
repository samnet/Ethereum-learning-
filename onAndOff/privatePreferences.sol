
// the two sellers makes a (semi) random offers (waiting 5 seconds each time), until one of them is successful


/*
how to make the relation viz. inputs, computed value, between the two contracts private?
computing logic should not be in thecontract
how to integrate the checking that it is correct to teh contract (rather than acting based upon the rating)
*/
pragma solidity ^0.4.2;

contract Seller {
  // Variables
  address public originator = msg.sender;
  uint public rating;
  mapping(address => uint) public previousInterlocutors;
  bool public lastClientResponse;
  // Modifiers & Events
  modifier onlyBy(address _account){ if (msg.sender != _account){throw;}_;}
  event RatingReceived(address interlocutor, uint newRating);
  event MoneyReceived(uint monies);
  event OfferAccepted(uint price);
  event OfferRejected(uint price);

  // Constructor / Destructor
  function Seller() public {rating = 0; lastClientResponse = false;}
  function remove() public onlyBy(originator){suicide(originator);}

  // Public Methods
  function rateServiceUp() public {
    if (previousInterlocutors[msg.sender] < 1){throw;}
    rating += 1;
    previousInterlocutors[msg.sender]-=1;
    RatingReceived(msg.sender, rating);
  }

  function offerAccepted(bool _yes) public {lastClientResponse = _yes;}

  function getLastAns() public returns(bool _r)  {return lastClientResponse;}

  function  makeOffer(
      address _aBuyerAddr, uint _offerPrice, uint _result,
      uint _first, uint _second) public {
    Buyer aBuyer = Buyer(_aBuyerAddr);
    aBuyer.computeForMoney.gas(75000)(_offerPrice, _result, _first, _second);
  }

  function pay() public payable {
    MoneyReceived(msg.value);
    previousInterlocutors[msg.sender] +=1;
  }
}

contract Buyer {
  // Variables
  address public originator = msg.sender;
  uint public maxPrice;
  uint public anInteger;
  uint public anotherInteger;
  bool public taskDone;

  // Events and modifiers
  event BuyerFundingReceived(address from, uint amount);
  event OfferReceived(address from, uint amount);
  event OfferAccepted(address from, uint amount);
  event OfferRejected(address from, uint amount);
  event SolutionReceived(uint result);
  event MoneyPaidOut(uint price);
  modifier onlyBy(address _account){ if (msg.sender != _account){throw;}_;}

  // Constructor/Destructor
  function remove() public onlyBy(originator){suicide(originator);}
  function Buyer(uint _price, uint _first, uint _second) public {
    maxPrice = _price;
    anInteger=_first;
    anotherInteger = _second; }

  // Public Methods
  function load() public payable{BuyerFundingReceived(msg.sender, msg.value);}

  function setParams(uint _price, uint _first, uint _second) public onlyBy(originator){
    maxPrice = _price;
    anInteger = _first;
    anotherInteger = _second;}

  function setTaskDone(bool _done) public onlyBy(originator) {taskDone = _done;}

  function rateService(bool _satisfactory, address _aSellerAddr) public onlyBy(originator){
    if (_satisfactory){
      Seller aSeller;
      aSeller = Seller(_aSellerAddr);
      aSeller.rateServiceUp.gas(50000)();
    }
  }
  function taskSpecs() public returns (uint) {return anInteger;}
  function computeForMoney (uint _offerPrice, uint _result, uint _first, uint _second) public {
    OfferReceived(msg.sender, _offerPrice);
    // if an agreement was already reached with someone (else)
    if (taskDone){throw;}
    // if price is too high
    if (_offerPrice > maxPrice) {
      OfferRejected(msg.sender, _offerPrice);
      throw;
    }
    // if parameters are not what they should be
    if (anInteger != _first || anotherInteger != _second) {throw;}

    // if offer is accepted, notify seller and pay
    OfferAccepted(msg.sender,_offerPrice);
    Seller aSeller;
    aSeller = Seller(msg.sender);
    aSeller.offerAccepted.gas(50000)(true);
    aSeller.pay.value(_offerPrice).gas(50000)();
    MoneyPaidOut(_offerPrice);

    // no open to futher offesr
    taskDone = true;
    SolutionReceived(_result);
  }
}
