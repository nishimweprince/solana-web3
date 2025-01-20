# Solana Web3 Token Transfer Application

A web application that enables transfer of SOL and custom tokens (ETH, USDT) on Solana's devnet network.

## Prerequisites

- Node.js v16.14.2
- A Solana wallet with devnet tokens

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in the required environment variables:
```bash
WALLET_SECRET_KEY=<your-wallet-secret-key>
WALLET_PUBLIC_KEY=<your-wallet-public-key>
TOKEN_PROGRAM_ID=<token-program-id>
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `WALLET_SECRET_KEY` | Your wallet's secret key in base58 format |
| `WALLET_PUBLIC_KEY` | Your wallet's public key |
| `TOKEN_PROGRAM_ID` | The Solana Token Program ID |

## API Endpoints

### Transfer Tokens
- **URL**: `/transfer-tokens`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body**:
```json
{
    "recipientPublicKey": "string",
    "amount": "number",
    "token": "string"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `recipientPublicKey` | string | Recipient's Solana wallet public key |
| `amount` | number | Amount of tokens to transfer |
| `token` | string | Token type ("SOL", "ETH", or "USDT") |

**Success Response**:
- **Code**: 201
- **Content**:
```json
{
    "status": "success",
    "details": "Token transferred successfully"
}
```

## Supported Tokens

| Token | Decimals |
|-------|----------|
| SOL | 9 |
| USDT | 6 |
| ETH | 18 |

## Features

1. **SOL Token Transfer**
   - Direct transfer of SOL tokens between wallets
   - Uses Solana's System Program for transfers

2. **Custom Token Transfer**
   - Support for ETH and USDT tokens on Solana
   - Automatic token account creation if not exists
   - Token-specific decimal handling

3. **Web Interface**
   - User-friendly form for token transfers
   - Real-time transaction status updates
   - Support for multiple token types

## Technical Details

The application uses the following main components:

1. **Frontend**
   - Built with EJS templating engine
   - Axios for API requests
   - Responsive CSS design

2. **Backend**
   - Express.js server
   - @solana/web3.js for blockchain interactions
   - @solana/spl-token for token operations

3. **Solana Integration**
   - Connects to Solana devnet
   - Supports SPL token transfers
   - Handles token account creation and management

## Error Handling

The application includes comprehensive error handling for:
- Invalid wallet addresses
- Insufficient balances
- Network failures
- Transaction failures

## Development

To start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3030`

## Security Considerations

1. Never commit your `.env` file
2. Keep your wallet's secret key secure
3. Always verify transaction amounts and recipient addresses
4. Use devnet for testing before mainnet deployment

## Author

[Nishimwe Prince](https://www.linkedin.com/in/nishimweprince/)
