First of all, thank you for giving me the opportunity to work on this project. It was a unique challenge and an excellent opportunity for me to learn about dapps development on Ethereum. 

In the following lines, I will address my thought process in approaching the challenge, my implemented method, and ways in which my program can be improved. 

<h3>(i) Approach</h3> <br>
This challenge was my very first opportunity to build a web app that interacts with data on the ethereum blockchain. Thus, I started by doing some research about tools that I could use to interact with smart contracts. This research was extremely educational, as it allowed me to get a good grasp on how to proceed and have an interesting overview of the ethereum dapps development ecosystem. After some consideration, I decided to first build a Meteor app, using web3.js for the interaction with the contract. 

<h3>(ii) Meteor+web3.js </h3><br>
Building a Meteor version of this app allowed me to both learn some fundamentals about Meteor and web3.js, two technologies I had never used in the past. Once I figured out the way Meteor worked, and got a good grasp on how to use web3 to get the data I needed, I began implementing the order book using those 2 technologies. I quickly considered switching to Truffle. The reason for that is that I usually don't work off of callbacks, I much prefer using promises. 
If you wish to consult the code of my Meteor+web3.js app, you may visit the following repo on github : https://github.com/jennazenk/meteor-melon.

<h3>(iii) Meteor+Truffle3</h3> <br>
With this new direction decided, I wanted to devise the most effective solution by integrating Truffle in a Meteor application. After exploring all the options available, I attempted to follow the following tutorials :<br>
	- http://robmyers.org/2016/01/26/ethereum-truffle-meteor/<br>
	- https://github.com/blockchain-hacklab/meteor-truffle<br>
Unfortunately, neither of those worked for me ; I think the reason for that is that I was using the recently released version of Truffle (3).
Subsequently, I tried to implement my own Meteor app integrating Truffle. I set up a simple meteor app, and inside the imports folder, I had my Solidity contracts (compiled with Truffle3). Once imported into my Meteor app, I was using the npm library 'truffle-contract' to manipulate the contracts. When I tried to instantiate the first contract at the provided address, I was getting an odd error ; I then ran into a multiple hours conundrum to figure out what was wrong. I believe that the node module truffle-contract was attempting -in vain- to perform a function on the provider I had set for the contract (web3 metamask). For some mysterious reason, truffle-contract would read this.provider as undefined and thus could not perform the said function and would prevent my promise from resolving.
I was really eager to find a fix to issue but after multiple hours trying to solve it, I decided that I should first focus on devising a working solution that I could deliver on time, and later on I could dedicate some time to find a solution to this. 

<h3>(iv) Final solution : Truffle3</h3> <br>
I finally decided to deliver an app entirely built with Truffle. This allowed me to work with promises, and to effectively use the contracts Exchange and Asset, along with their dependencies at the desired addresses. I thus had the chance to get a good grasp on how Truffle works. I used jQuery to display the data on the UI ; the app being quite simple, I thought it was not necessary to deploy a whole frontend framework (although I would have preferred to get the Meteor+Truffle app to work). After having implemented the order book, I had some time left to start investigating how I could implement the "make an offer" functionnality. 

<h3>(v) Thoughts for improvement</h3> <br>
I wish to pursue this project, and the following are the main improvements I want to perform on it:<br>
	- Get the contract instanciation at the provided address to work with truffle-contract, so that I can use my Meteor+Truffle implementation.<br>
	- Pursue the implementation of the trade functionnality (makeOffer function).<br>
	- Improve the UX/design, maybe use something like LESS. <br>

Please let me know if you have any questions, I would be more than happy to discuss my approach and the challenges I encountered! Thank you again for sending over such an interesting exercise! 









