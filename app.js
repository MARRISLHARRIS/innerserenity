const express = require('express');
const ethers = require('ethers');
require('dotenv').config();

const app = express();

// Connect to the Fantom network
const providerUrl = process.env.PROVIDER_URL;
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Create a wallet using your private key
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Load the InnerSerenity contract ABI
const contractABI = require(process.env.CONTRACT_ABI);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  const user = await contract.getUser(userId);

  res.json(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
