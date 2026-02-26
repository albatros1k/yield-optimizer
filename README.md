<div align="center">

# 🏦 DeFi Vault Aggregator

### Multi-Chain Yield Optimization Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)](https://ethereum.org/)
[![Web3](https://img.shields.io/badge/Web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white)](https://web3js.readthedocs.io/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**DeFi Vault Aggregator** is a comprehensive decentralized finance platform that aggregates yield-generating vaults across multiple blockchain networks. Discover, compare, and interact with the best DeFi strategies in one unified interface.

### Key Highlights

- 🌐 **Multi-Chain Support** - Access vaults across 20+ blockchain networks
- 📊 **Real-Time Analytics** - Live APY tracking and performance metrics
- 🔒 **Risk Assessment** - Comprehensive security and risk analysis
- 💰 **Yield Optimization** - Compare and maximize your returns
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔄 **Auto-Compounding** - Automated yield optimization strategies

---

## ✨ Features

### Core Functionality

#### 🏠 **Home & Vault Discovery**
- Browse and filter vaults by chain, APY, TVL, and risk score
- Advanced search and sorting capabilities
- Vault categories: Staking, Liquidity Pools, Lending, and more
- Featured and trending vaults

#### 📈 **Dashboard & Portfolio Tracking**
- Personal portfolio overview with P&L tracking
- Asset allocation and exposure analysis
- Historical performance charts
- Chain distribution visualization
- Platform exposure breakdown
- Token balance tracking

#### 🔐 **Vault Details**
- Detailed strategy explanations and mechanics
- Protocol integrations and partnerships
- Risk analysis (smart contract, liquidity, market risks)
- Revenue sources breakdown
- Safety scores and audit information
- Historical APY data and charts

#### 💱 **On-Ramp Integration**
- Buy crypto with fiat directly in the app
- Multiple payment providers
- Support for credit cards and bank transfers
- Seamless onboarding for new users

#### 🌉 **Bridge Support**
- Cross-chain asset transfers
- Integrated with multiple bridge providers
- Compare routes and fees
- Fast and secure transfers

#### 🏛️ **Treasury Dashboard**
- Platform treasury analytics
- Revenue tracking and distribution
- Token holder information
- Governance insights

#### 👛 **Wallet Integration**
- Multiple wallet support (MetaMask, WalletConnect, Coinbase, etc.)
- ENS name resolution
- Address display and QR codes
- Transaction history

---

## 🛠️ Technology Stack

### Frontend

<table>
<tr>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="48" height="48" alt="React" />
<br>React 18
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="96">
<img src="https://vitejs.dev/logo.svg" width="48" height="48" alt="Vite" />
<br>Vite
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" width="48" height="48" alt="Redux" />
<br>Redux Toolkit
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" width="48" height="48" alt="Material-UI" />
<br>Material-UI
</td>
</tr>
</table>

### Web3 & Blockchain

<table>
<tr>
<td align="center" width="96">
<img src="https://docs.ethers.org/v5/static/logo.svg" width="48" height="48" alt="Ethers.js" />
<br>Ethers.js
</td>
<td align="center" width="96">
<img src="https://avatars.githubusercontent.com/u/37784886" width="48" height="48" alt="Web3" />
<br>Web3.js
</td>
<td align="center" width="96">
<img src="https://avatars.githubusercontent.com/u/108554348" width="48" height="48" alt="Web3-Onboard" />
<br>Web3-Onboard
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/ethereum/ethereum-org-website/master/public/images/assets/eth-diamond-black.png" width="48" height="48" alt="Ethereum" />
<br>Multi-chain
</td>
</tr>
</table>

### Data Visualization & UI

- **Chart.js** - Advanced charting library
- **Recharts** - Composable charting components
- **Styled Components** - CSS-in-JS styling
- **React Router** - Client-side routing
- **i18next** - Internationalization
- **Axios** - HTTP client

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking
- **Madge** - Dependency visualization

---

## 🚀 Installation

### Prerequisites

- **Node.js** 16.x or higher
- **Yarn** package manager
- **Git**

### Quick Start

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
yarn install

# Start development server
yarn start
```

The application will open automatically at `http://localhost:5173`

> **Note:** Disable ad blockers for `127.0.0.1` if you encounter a white screen (due to ADX.png being blocked).

---

## 📦 Usage

### Development Commands

```bash
# Start development server with hot reload
yarn start

# Run TypeScript type checking in watch mode
yarn tsc-watch

# Validate vault configuration files
yarn validate

# Build for production
yarn build

# Preview production build locally
yarn preview

# Analyze bundle size
yarn analyze-bundle

# Analyze source dependencies
yarn analyze-sources
```

### Code Quality

```bash
# Check code formatting
yarn prettier:check

# Fix code formatting
yarn prettier:fix

# Run type checking
yarn tsc
```

### Utility Scripts

```bash
# Get pool creation timestamp
yarn creationdate

# Launch a new pool
yarn launchpool

# Add a new vault
yarn vault

# Migrate platform
yarn migratePlatform

# Check 1inch liquidity
yarn checkOneInchLiquidity

# Set vault URLs
yarn setVaultUrls

# Add AMMs to vaults
yarn addAmmsToVaults
```

---

## 🏗️ Project Structure

```

├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header/          # Navigation and wallet connection
│   │   ├── Footer/          # Footer with links
│   │   ├── Modal/           # Modal dialogs
│   │   ├── Button/          # Button components
│   │   └── ...
│   ├── features/            # Feature-based modules
│   │   ├── home/            # Vault listing and filtering
│   │   ├── vault/           # Individual vault details
│   │   ├── dashboard/       # Portfolio dashboard
│   │   ├── on-ramp/         # Fiat to crypto
│   │   ├── bridge/          # Cross-chain transfers
│   │   └── treasury/        # Treasury analytics
│   ├── config/              # Configuration files
│   │   ├── vault/           # Vault configurations by chain
│   │   ├── abi/             # Smart contract ABIs
│   │   ├── boost/           # Boost configurations
│   │   └── zap/             # Zap configurations
│   ├── helpers/             # Utility functions
│   ├── images/              # Static assets
│   ├── locales/             # Translations (en, de, zh)
│   └── store.ts             # Redux store configuration
├── scripts/                 # Utility scripts
├── public/                  # Public static files
└── package.json
```

---

## 📝 Adding a New Vault

To add a new vault strategy to the platform:

### 1. Create Configuration File

Create a JSON file at `config/vault/{chain}/{vaultId}.json`:

```json
{
  "id": "unique-vault-id",
  "name": "Vault Name",
  "token": "Token Symbol",
  "tokenAddress": "0x...",
  "earnedToken": "Earned Token Symbol",
  "earnedTokenAddress": "0x...",
  "earnContractAddress": "0x...",
  "pricePerFullShare": 1,
  "tvl": 0,
  "oracle": "lps",
  "oracleId": "protocol-token-token",
  "status": "active",
  "platform": "Protocol Name",
  "assets": ["TOKEN1", "TOKEN2"],
  "risks": ["COMPLEXITY_LOW", "BATTLE_TESTED", "IL_NONE"],
  "strategyTypeId": "strategy-type",
  "addLiquidityUrl": "https://...",
  "buyTokenUrl": "https://...",
  "createdAt": 1234567890
}
```

### 2. Define Strategy Details

Add strategy information to `config/about.ts`:

```typescript
export const ABOUT = {
  'vault-id': {
    title: 'Strategy Title',
    content: 'Detailed explanation of how the strategy works...',
    mechanics: 'Step-by-step mechanics...',
  }
};
```

### 3. Specify Risks

Map risks in your configuration (must match keys in `config/risk.tsx`):

- **COMPLEXITY_LOW** / **COMPLEXITY_MID** / **COMPLEXITY_HIGH**
- **BATTLE_TESTED** / **NEW_STRAT**
- **IL_NONE** / **IL_LOW** / **IL_HIGH**
- **MCAP_LARGE** / **MCAP_MEDIUM** / **MCAP_SMALL**
- **AUDIT** / **CONTRACTS_VERIFIED**

### 4. Define Revenue Sources

Map revenue sources (must match keys in `config/revenue.ts`):

- **TRADING_FEES**
- **STAKING_REWARDS**
- **LENDING_INTEREST**
- **YIELD_FARMING**

### 5. Validate Configuration

```bash
yarn validate
```

The `checkVaults` function will verify:
- ✅ All required fields are present
- ✅ Risk keys match predefined templates
- ✅ Revenue keys are valid
- ✅ Addresses are properly formatted
- ✅ Oracle configuration is correct

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Endpoints
VITE_API_URL=https://api.example.com

# Analytics
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Feature Flags
VITE_ENABLE_BRIDGE=true
VITE_ENABLE_ONRAMP=true
```

### Supported Chains

The platform supports 20+ blockchain networks including:

- Ethereum
- Binance Smart Chain
- Polygon
- Avalanche
- Fantom
- Arbitrum
- Optimism
- And many more...

---

## 🧪 Testing

### Browser Testing

The platform should be tested across:

- Chrome/Chromium-based browsers
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### Wallet Testing

Test with multiple wallet providers:

- MetaMask
- WalletConnect
- Coinbase Wallet
- Trust Wallet
- Ledger/Trezor

---

## 📊 Architecture

### State Management

The application uses **Redux Toolkit** with the following slices:

- **Vaults** - Vault data and configurations
- **Balance** - User token balances
- **Wallet** - Wallet connection state
- **APY** - APY calculations and historical data
- **Prices** - Token price feeds
- **Chains** - Multi-chain configuration
- **UI** - UI state (modals, filters, etc.)

### Data Flow

```
User Action → Redux Action → Middleware → API Call → Reducer → UI Update
```

### Web3 Integration

```typescript
// Wallet Connection
import { Web3Onboard } from '@web3-onboard/core';

// Contract Interaction
import { ethers } from 'ethers';

// Multi-chain Support
import { ChainEntity } from './features/data/entities/chain';
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful commit messages
- Add comments for complex logic
- Ensure `yarn build` passes before submitting PR
- Run `yarn prettier:fix` before committing

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] TypeScript compilation succeeds (`yarn tsc`)
- [ ] Vault validation passes (`yarn validate`)
- [ ] Production build succeeds (`yarn build`)
- [ ] No console errors or warnings
- [ ] Changes are documented

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links & Resources

### Documentation

- [Configuration Guide](./docs/configuration.md)
- [API Reference](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

### Community

- Discord: Coming soon
- Twitter: Coming soon
- Telegram: Coming soon

---

## 🙏 Acknowledgments



Special thanks to:
- All contributors and maintainers
- The Ethereum and Web3 community
- Open source library authors

---

<div align="center">

**[⬆ Back to Top](#-defi-vault-aggregator)**

Made with TypeScript, React, and Web3 💙

</div>
