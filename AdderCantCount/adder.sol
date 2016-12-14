
/*
My first contracts in Solidity. An Adder contract able to add two numbers,
e.g., on behalf the CantCount contract, for a small fee. Adder has a limited lifetime.
CanCount can rate Adder after they interacted.
*/
pragma solidity ^0.4.2;




// My first contracts. Adder adds on behalf of Innumerate, for a small fee.

contract Adder {

  // Variables
  address public originator = msg.sender;
  uint public creationTime = now;
  uint public rating ;
  uint public capacity;
  uint public price;
  uint public eth;
  mapping(address => uint) public previousInterlocutors;

  // Events that will be fired on changes.
  event RatingReceived(address interlocutor, uint newRating);
  event AddingDone(uint first, uint second, address interlocutor);
  event PriceProposalReceived(uint price, address interlocutor);

  // Constructor
  function Adder(){rating = 0 ; capacity = 10;}

  // Internal Methods
  function costFunction() public returns(uint cost) {return (500-10*capacity); }

  // Modifiers
  modifier onlyBy(address _account){
    if (msg.sender != _account)
        throw;
    _;
  }
  
  // Public Methods
  function remove() public onlyBy(originator){suicide(originator);}
  function check() public payable returns(uint sum)  {
    PriceProposalReceived(msg.value, msg.sender);
    if (capacity == 0){
      // remove();
      throw;
    }
    price = costFunction();
    if (msg.value < price) {throw;}
    capacity -= 1;
    previousInterlocutors[msg.sender] += 1;
    return 42;
  }

  function add(uint first, uint second) public payable returns(uint sum)  {
    PriceProposalReceived(msg.value, msg.sender);
    if (capacity == 0){
      // remove();
      throw;
    }
    price = costFunction();
    if (msg.value < price) {return 0;}
    capacity -= 1;
    previousInterlocutors[msg.sender] += 1;
    AddingDone(first, second, msg.sender);
    return (first + second);
  }

// Public Free Methods
  function rateService() public{
    if (previousInterlocutors[msg.sender] < 1){throw;}
    rating += 1;
    RatingReceived(msg.sender, rating);
  }
}

contract CantCount {
  // Variables
  Adder public selectedAdder;
  uint public lastComputedValue;

  // Events
  event gotPaid(address sender, uint amount);

  // Constructor
  function CantCount(){lastComputedValue=0;}

  // Public functions
  function setAdder(address anAdder) public {selectedAdder = Adder(anAdder);}

  function load() public payable{gotPaid(msg.sender, msg.value);}

  function checkChannel() public{
    lastComputedValue = selectedAdder.check.value(555).gas(50000)();
  }

  function outsourceSum(uint arg1, uint arg2) public{
    lastComputedValue = selectedAdder.add.value(666).gas(50000)(2,3);
  }

  function rateService(bool satisfactory) public {
    if (satisfactory){selectedAdder.rateService.gas(50000)();}
  }

}
