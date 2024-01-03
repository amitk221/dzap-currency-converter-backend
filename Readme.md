````markdown
# DZap Crypto currencies Converter backend

### Using these api's we can can get the top 100 crypto currencies and we can fetch latest Prices.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Live url](#live-url)
-

## Features

- Using these api's we can can get the top 100 crypto currencies.
- we can fetch latest Prices.

## Getting Started

Instructions on setting up and running the backend application on a local machine.

### Prerequisites

- List any software or dependencies that need to be installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amitk221/dzap-currency-converter-backend.git
   ```
````

2. Navigate to the project directory:

   ```bash
   cd dzap-currency-converter-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

make new .env file and add PORT and API_KEY. API_KEY is used for fetching realtime data from coinmarketcap.
You can go coinmarketcap and after login , you can copy API_KEY from coinmarketcap dashboard.
after setup env. run command

```bash
  npm start
```

## Usage

- /api/crypto/convert - can use for convert the price into USD , EUR . You have need to send params. Please read api's for more details.
- /api/crypto/currencies -can use for get list of top 100 crypto currencies

## Testing

```bash
npm run test
```

## Live url:

https://dzap-crypto-currency-converter.onrender.com
