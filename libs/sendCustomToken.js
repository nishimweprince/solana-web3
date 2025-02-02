const {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
} = require("@solana/web3.js");
const {
  getOrCreateAssociatedTokenAccount,
  transfer,
} = require("@solana/spl-token");
const bs58 = require("bs58");

const tokenToDecimal = {
  USDT: 6,
  ETH: 18,
  POETRYCOIN: 6,
};

async function transferCustomToken(recipientPublicKeyString, amount, token) {
  try {
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

    const senderPrivateKeyString = process.env.WALLET_SECRET_KEY;
    const senderPrivateKey = bs58.decode(senderPrivateKeyString);
    const fromWallet = Keypair.fromSecretKey(senderPrivateKey);

    // Get public key for receiver public key
    const toWallet = new PublicKey(recipientPublicKeyString);

    const mint = new PublicKey("DodXtevRoqQEscPte2h4YVKnBmZjYBgBAkykhe4Apump");

    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      fromWallet.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      toWallet
    );

    const amountToTransfer = amount * Math.pow(10, tokenToDecimal[token]);
    const signature = await transfer(
      connection,
      fromWallet,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      Number(amountToTransfer)
    );

    console.log("Transfer successful with signature:", signature);
  } catch (e) {
    console.error("Error transferring token:", e);
    throw e;
  }
}

module.exports = {
  transferCustomToken,
};
