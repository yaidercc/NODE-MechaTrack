# NODE-MechaTrack

This is an api designed to manage the services, users, vehicles, employees, reservations, payments, spare parts and products of an auto repair shop.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)

## Getting started

### Installation

1. Clone the repo

```
git clone https://github.com/yaidercc/NODE-MechaTrack.git   
```

2. Install packages:

```
npm install
```

3. Fill the env file

```
PORT=
DB_NAME=
DB_USER= 
DB_PASSWORD= 
DB_HOST= 
DB_PORT= 
DB_SCHEMA=
```


### Usage

1. Run docker compose to prepare the database
```
docker compose up -d
```

2. Create and fill the tables on the database
```
npm run migrate:start
```

3. Execute the project
```
npm run start
```