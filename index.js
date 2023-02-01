// 1. Declaração de variável global para armazenar a instância web3
let FactoryContract;
let RaffleContract;
let signer;
let signer_address;

// 2. Configuração do endereço do contrato e ABI
const Factory_Contract_Address = "0x8f6a7a8Aee3EAF02eA086197d731e0DfF0a60960";
const Factory_Contract_ABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "prize",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "multipleTickets",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "ticketPrice",
				"type": "uint256"
			}
		],
		"name": "createRaffle",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "prize",
				"type": "uint256"
			}
		],
		"name": "RaffleCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "getRaffleAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "raffleAdd",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "list_of_raffles",
		"outputs": [
			{
				"internalType": "contract Raffle",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "size",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const Raffle_Contract_ABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_prize",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_multipleTickets",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ticketPrice",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "winner",
				"type": "string"
			}
		],
		"name": "TicketDrawn",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "buyTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "drawTicket",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "drawnSize",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "drawnTickets",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getWinnerAdd",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getWinnerName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "multipleTickets",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "payOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "prize",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "removeTicket",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "size",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticketPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tickets",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "title",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

// ##################################################################
// bilhetes
const telaBilhetes = document.querySelector(".telaBilhetes");
const comprarButton = document.querySelector("#comprar");
const para_criarButton = document.querySelector("#para_criar");

// criacao
const telaCriar = document.querySelector(".telaCriar")
const criarButton = document.querySelector("#criarButton");
const voltar_criarButton = document.querySelector("#voltar_criar");

const sortearButton = document.querySelector("#sortearButton");

const atualizarButton = document.querySelector("#atualizarButton");

/* Prompt user to sign in to MetaMask */

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
provider.send("eth_requestAccounts", []).then(() => {
	provider.listAccounts().then((accounts) => {
		signer = provider.getSigner(accounts[0]);
	  	signer_address = signer["_address"];
		FactoryContract = new ethers.Contract(Factory_Contract_Address,Factory_Contract_ABI,signer);
	});
  });

// TELA DE CRIAR
const para_criar = () => {
	telaBilhetes.style.display = "none";
	telaCriar.style.display = "block";
}
para_criarButton.addEventListener("click", para_criar);

const botao_voltar = () => {
	telaBilhetes.style.display = "block";
	telaCriar.style.display = "none";
}
voltar_criarButton.addEventListener("click", botao_voltar);

// CRIAR RIFA
const botao_criar = async () => {
	try{
		const titulo = document.querySelector("#criar_titulo");
		const premio = document.querySelector("#criar_premio");
		const multiple = document.querySelector("#criar_multiple");
		const precoBilhete = document.querySelector("#preco_bilhete");
		TITULO = titulo.value;
		PREMIO = ethers.utils.parseEther(premio.value);
		MULTIPLE = multiple.value;
		PRECO = ethers.utils.parseEther(precoBilhete.value);

		let transaction = await FactoryContract.createRaffle(TITULO, PREMIO, MULTIPLE, signer_address, PRECO, {value: PREMIO, gasLimit: 2000000});
		criarButton.value = "CRIANDO...";
		const t = await transaction.wait();
		alert("A rifa [ " + t.events[0].args[0] + " ] com prêmio [ " + ethers.utils.formatUnits(t.events[0].args[1], 'ether') + " ] foi criada com sucesso!");
		criarButton.value = "CRIAR";
		titulo.value = "";
		premio.value = 0;
		precoBilhete.value = 0;
		multiple.value = "nao";
	}catch(e){
		alert("Error: " + e);
	}
}
criarButton.addEventListener("click", botao_criar);

// COMPRAR BILHETE
const botao_comprar = async () => {
	try{
		const titulo = document.querySelector("#titulo");
		const nome = document.querySelector("#nome");
		TITULO = titulo.value;
		NOME = nome.value;
		// confere se o titulo da rifa existe
		let Raffle_Contract_Address = await FactoryContract.getRaffleAddress(TITULO);
		if(Raffle_Contract_Address == "0x0000000000000000000000000000000000000000"){
			alert("Titulo da rifa não encontrado.");
			return;
		}
		RaffleContract = new ethers.Contract(Raffle_Contract_Address,Raffle_Contract_ABI,signer);
		// confere se ja tem bilhete com esse endereco
		if(await RaffleContract.multipleTickets() == false){
			let size = await RaffleContract.size();
			for(let i=0; i<size; i++){
				let add = await RaffleContract.getAddress(i);
				if(add == signer_address){
					alert("Já existe um bilhete com esse endereço.")
					return;
				}
			}
		}
		const preco = await RaffleContract.ticketPrice();
		let transaction = await RaffleContract.buyTicket(NOME, signer_address, {value: preco, gasLimit: 1500000});
		comprarButton.value = "COMPRANDO...";
		await transaction.wait();
		alert('O bilhete foi comprado com sucesso!');
		comprarButton.value = "COMPRAR";
		titulo.value = "";
		nome.value = "";
	}catch(e){
		alert("Error: " + e);
	}
  };
  comprarButton.addEventListener("click", botao_comprar);

  // PEGAR BILHETE VENCEDOR
  const botao_sortear = async () => {
	try{
		const titulo = document.querySelector("#draw_titulo");
		TITULO = titulo.value;
		// confere se o titulo da rifa existe
		let Raffle_Contract_Address = await FactoryContract.getRaffleAddress(TITULO);
		if(Raffle_Contract_Address == "0x0000000000000000000000000000000000000000"){
			alert("Titulo da rifa não encontrado.");
			return;
		}
		RaffleContract = new ethers.Contract(Raffle_Contract_Address,Raffle_Contract_ABI,signer);
		// confere se é o organizador da rifa
		if(await RaffleContract.owner() != signer_address){
			alert("Você não é o organizador dessa rifa.");
			return;
		}
		// confere se ja foi finalizada
		if(await RaffleContract.drawnSize() == 1){
			alert("Essa rifa já foi finalizada.");
			return;
		}
		let transaction1 = await RaffleContract.drawTicket({gasLimit: 3000000});
		sortearButton.value = "SORTEANDO...";
		const t = await transaction1.wait();
		alert("O bilhete foi sorteado com sucesso!\nO vencedor da rifa (" + t.events[0].args[0] + ") foi: " + t.events[0].args[1] + "\nConfirme a segunda transação para coletar o dinheiro da venda dos bilhetes.");
		sortearButton.value = "COLETANDO GANHOS...";
		const ganhos = await RaffleContract.getBalance();
		let transaction2 = await RaffleContract.payOwner();
		transaction2.wait();
		alert("Você ganhou " + ganhos/10**18 + " eth pela venda de bilhetes.");
		sortearButton.value = "SORTEAR";
		titulo.value = "";
	}catch(e){
		alert("Error: " + e);
	}
  }
  sortearButton.addEventListener("click", botao_sortear);

  // BOTAO ATUALIZAR
  const botao_atualizar = async () => {
	const size = await FactoryContract.size();
	if(size == 0) return;
	document.getElementById('rifas').innerHTML = "";
	document.getElementById('resultados').innerHTML = "";
	// percorre todas as rifas
	for(let index = size-1; index >= 0; index--){
		RaffleContract = new ethers.Contract(FactoryContract.list_of_raffles(index),Raffle_Contract_ABI,signer);
		let drawnSize = await RaffleContract.drawnSize();
		if(drawnSize > 0){ // rifa já tem vencedor
			document.getElementById('resultados').innerHTML += await RaffleContract.title() + " | premio: " + ethers.utils.formatUnits(await RaffleContract.prize(),'ether') + " eth";
			if(drawnSize > 1){ // mais de um vencedor
				document.getElementById('resultados').innerHTML += " | vencedores: ";
				for(let i=0;i<drawnSize;i++){
					document.getElementById('resultados').innerHTML += await RaffleContract.getWinnerName(i) + " ";
				}
			}else // apenas um vencedor
				document.getElementById('resultados').innerHTML += " | vencedor: " + await RaffleContract.getWinnerName(0);
			document.getElementById('resultados').innerHTML += "<br>";
		}else{// rifa em aberto
			document.getElementById('rifas').innerHTML += await RaffleContract.title() + " | premio: " + ethers.utils.formatUnits(await RaffleContract.prize(),'ether') + " eth | tickets comprados: " + await RaffleContract.size();
			document.getElementById('rifas').innerHTML += "<br>";
		}
	}
  }
  atualizarButton.addEventListener("click", botao_atualizar);