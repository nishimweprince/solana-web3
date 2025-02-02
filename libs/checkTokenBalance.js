const { Connection, PublicKey } = require("@solana/web3.js");
const { getOrCreateAssociatedTokenAccount } = require("@solana/spl-token");

/**
 * Checks the balance of a specific SPL token for a given wallet
 * @param {PublicKey} walletPublicKey - The public key of the wallet to check
 * @param {PublicKey} tokenMint - The mint address of the token
 * @param {Keypair} payer - The account that will pay for the creation of the associated token account if it doesn't exist
 * @returns {Promise<Object>} Object containing status, balance, and token information
 */
async function checkTokenBalance(walletPublicKey, tokenMint, payer) {
    try {
        // Input validation
        if (!walletPublicKey || !tokenMint || !payer) {
            throw new Error("Missing required parameters");
        }

        // Ensure inputs are PublicKey instances
        const wallet = walletPublicKey instanceof PublicKey
            ? walletPublicKey
            : new PublicKey(walletPublicKey);

        const mint = tokenMint instanceof PublicKey
            ? tokenMint
            : new PublicKey(tokenMint);

        // Initialize connection with commitment level
        const connection = new Connection(
            "https://api.mainnet-beta.solana.com",
            "confirmed"
        );

        // Get or create the associated token account
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,           // The payer for potential account creation
            mint,            // The token mint
            wallet          // The wallet to check
        );

        // Get the token balance
        const balance = await connection.getTokenAccountBalance(tokenAccount.address);

        return {
            status: 'success',
            balance: balance.value.uiAmount,
            decimals: balance.value.decimals,
            token: mint.toString(),
            associatedTokenAddress: tokenAccount.address.toString()
        };
    } catch (error) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}

/**
 * Checks the SOL balance for a given wallet
 * @param {PublicKey | string} walletPublicKey - The public key of the wallet to check
 * @returns {Promise<Object>} Object containing status, balance, and token information
 */
async function checkSOLBalance(walletPublicKey) {
    try {
        // Input validation
        if (!walletPublicKey) {
            throw new Error("Wallet public key is required");
        }

        // Convert string to PublicKey if needed
        const wallet = walletPublicKey instanceof PublicKey
            ? walletPublicKey
            : new PublicKey(walletPublicKey);

        // Initialize connection with commitment level
        const connection = new Connection(
            "https://api.mainnet-beta.solana.com",
            "confirmed"
        );

        // Get the SOL balance
        const balance = await connection.getBalance(wallet);

        return {
            status: 'success',
            balance: balance / 1e9, // Convert lamports to SOL
            token: 'SOL',
            lamports: balance
        };
    } catch (error) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}

// Example usage
/*
const wallet = new PublicKey("...wallet address...");
const tokenMint = new PublicKey("...token mint address...");
const payer = Keypair.fromSecretKey(...); // The account that will pay for potential token account creation

// Check SOL balance
const solBalance = await checkSOLBalance(wallet);
console.log(solBalance);

// Check token balance
const tokenBalance = await checkTokenBalance(wallet, tokenMint, payer);
console.log(tokenBalance);
*/

module.exports = { checkTokenBalance, checkSOLBalance };