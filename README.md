# API Backend using ExpressJS and MongoDB

## Setup

```bash
    git clone https://github.com/cak-17/buttongame-v032.git
    cd buttongame-v032
    cd backend && npm install
    cd ../frontend && npm install
```

Add your MongoDB credentials to and .env file in your backend root folder.

```bash
    ATLAS_DB_USER=<username>
    ATLAS_DB_PASS=<mongodb psw>
    ATLAS_DB_HOST=<mongodb cluster>
```

## Usage

```bash
    make help                 Show this help
    make backend              Start Backend 
    make frontend             Start Frontend
```
