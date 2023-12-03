# API Backend using ExpressJS and MongoDB

## Setup

```bash
    git clone https://github.com/cak-17/buttongame-v032.git && \
    cd buttongame-v032 && \
    cd backend && npm install && \
    cd ../frontend && npm install
```

Add your MongoDB credentials to and .env file in your backend root folder.

```bash
    ATLAS_DB_USER=<username>
    ATLAS_DB_PASS=<mongodb psw>
    ATLAS_DB_HOST=<mongodb cluster>
```

## Usage

To run the server just type `npm run start`, or `node main.js runserver`.
If you want to run in it develoment mode use `npm run dev` or `node main.js runserver -d`

For more options `node main.js help`
