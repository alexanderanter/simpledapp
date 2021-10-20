const ssAddress = '0xECFfe0Fe39942c5cb8310d131f677f06029493a5';
const ssABI = [
	{
		inputs: [],
		name: 'retrieve',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'num',
				type: 'uint256',
			},
		],
		name: 'store',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];

window.addEventListener('load', function () {
	let mmDetected = document.querySelector('#mm-detected');
	if (window.ethereum) {
		console.log('metamask installed');
		mmDetected.innerHTML = '<p>MetaMask detected</p>';
	} else {
		console.log('metamask not installed');
		alert('You need metamask to run this dapp');
	}

	let mmConnect = document.querySelector('#btn-connect');

	// mmConnect.addEventListener('click', function () {
	// 	console.log('ok');
	// });

	mmConnect.onclick = async () => {
		await ethereum.request({ method: 'eth_requestAccounts' });
		let mmCurrent = document.querySelector('#mm-current-account');

		mmCurrent.innerHTML =
			'Here is your current account:' + ethereum.selectedAddress;
	};

	// let web3 = new Web3(window.ethereum);
	// console.log(web3);
	let web3 = new Web3(window.ethereum);
	const simpleStorage = new web3.eth.Contract(ssABI, ssAddress);
	const ssSubmit = document.querySelector('#ss-input-button');
	const ssStoredValue = document.querySelector('#stored-value');
	const ssTxhash = document.querySelector('#tx-hash');
	ssSubmit.onclick = async () => {
		const ssValue = document.querySelector('#ss-input-box').value;
		// console.log(ssValue);
		// simpleStorage.setProvider(window.ethereum);
		await simpleStorage.methods
			.store(ssValue)
			.send({ from: ethereum.selectedAddress })
			.then(function (receipt) {
				// console.log(simpleStorage.methods);
				console.log(receipt);
				ssTxhash.innerHTML = receipt.transactionHash;
				retrieve();

				// retrieve();
			});
	};
	const retrieve = async () => {
		const result = await simpleStorage.methods.retrieve().call();
		ssStoredValue.innerHTML = result;
	};
});
