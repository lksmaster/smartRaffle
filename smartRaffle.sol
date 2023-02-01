pragma solidity ^0.8.10;

    // funcao para comparar strings
    function memcmp(bytes memory a, bytes memory b) pure returns (bool) {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }
    function strcmp(string memory a, string memory b) pure returns (bool) {
        return memcmp(bytes(a), bytes(b));
    }

contract RaffleFactory {
    Raffle raffle;
    Raffle[] public list_of_raffles;
    mapping(string => Raffle) private endereco;
    event RaffleCreated(string title, uint256 prize);

    // function arguments are passed to the constructor of the new created contract
    function createRaffle(string memory title, uint256 prize, string memory multipleTickets, address owner, uint256 ticketPrice) external payable {
        bool m = strcmp("sim", multipleTickets);
        raffle = new Raffle(title, prize, m, owner, ticketPrice);
        list_of_raffles.push(raffle);
        endereco[title] = raffle;
        (bool success, ) = payable(address(raffle)).call{value: prize}("");  // Envia o dinheiro para o endereço
        require(success, "Failed to send coins to raffle"); // Se falhar manda a mensagem de erro
        emit RaffleCreated(title,prize);
    }

    function getRaffleAddress(string memory title) public view returns (address raffleAdd) {
        return address(endereco[title]);
    }

    function size() public view returns (uint256) {
        return list_of_raffles.length;
    }
}

contract Raffle {
    struct Ticket {
        string name;
        address add;
    }
    string public title;
    uint256 public prize;
    address public owner;
    uint256 public ticketPrice;
    bool public multipleTickets;

    Ticket[] public tickets;
    Ticket[] public drawnTickets;

    event TicketDrawn(string title, string winner);

    constructor(string memory _title, uint256 _prize, bool _multipleTickets, address _owner, uint256 _ticketPrice) {
        title = _title;
        prize = _prize;
        multipleTickets = _multipleTickets;
        owner = _owner;
        ticketPrice = _ticketPrice;
    }

    fallback() external payable {}
    receive() external payable {}

    function buyTicket(string memory _name, address add) public payable {
            Ticket memory newTicket = Ticket(_name, add);
            tickets.push(newTicket);
    }

    function getWinnerName(uint256 index) public view returns (string memory) {
        return drawnTickets[index].name;
    }

    function getWinnerAdd(uint256 index) public view returns (address) {
        return drawnTickets[index].add;
    }

    function size() public view returns (uint256) {
        return tickets.length;
    }

    function drawnSize() public view returns (uint256) {
        return drawnTickets.length;
    }

    function getAddress(uint256 index) public view returns (address){
        return tickets[index].add;
    }

    function getName(uint256 index) public view returns (string memory){
        return tickets[index].name;
    }

    function drawTicket() public {
        require(msg.sender == owner, "You are not the owner of the contract.");
        uint256 index = randomTicketIndex();
        emit TicketDrawn(title, getName(index));
        drawnTickets.push(tickets[index]);
        removeTicket(index);
        (bool success, ) = payable(getWinnerAdd(0)).call{value: prize}("");  // Envia o dinheiro para o endereço
        require(success, "Failed to send coins to winner"); // Se falhar manda a mensagem de erro
    }

    function removeTicket(uint256 index) public {
        for (uint256 i=index; i<tickets.length-1; i++) {
            tickets[i] = tickets[i+1];
        }
        tickets.pop();
    }

    function randomTicketIndex() internal view returns (uint256) {
        uint256 idx = random() % tickets.length;
        return idx;
    }

    function getBalance() view external returns(uint256) {
        return address(this).balance;
    }

    function payOwner() external {
        require(msg.sender == owner, "You are not the owner of the contract.");
        uint balance = address(this).balance; // Pega o valor total do dinheiro
        (bool success, ) = payable(owner).call{value: balance}("");  // Envia o dinheiro para o endereço
        require(success, "Failed to send coins to owner"); // Se falhar manda a mensagem de erro
    }

    // Generate a random number using the Linear Congruential Generator algorithm,
    // using the block number as the seed of randomness.
    function random() internal view returns (uint256) {
        uint256 seed = block.number;

        uint256 a = 1103515245;
        uint256 c = 12345;
        uint256 m = 2**32;

        return (a * seed + c) % m;
    }
}
