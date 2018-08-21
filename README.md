1. Add a .env file with following parameter:

```
Frontend .env content:

REACT_APP_API_SERVER=http://localhost:8080
REACT_APP_FACEBOOK_APP_ID={ your app id }
HTTPS=true


Backend .env content:

JWT_SECRET={ your jwt secret key}


Database .env content: 

DB_NAME={database_name}
DB_USERNAME={database_username}
DB_PASSWORD={database_pw}
```

2. Create a database for backend

```
a. install PostgreSQL Server

b. sudo service postgresql start

c. sudo su postgres

d. createdb {database_name}

e. psql {database_name}

f. CREATE USER {database_name} WITH PASSWORD '{database_pw}' SUPERUSER;

g. install knex

h. run command: knex init in the backend folder

i. run command: knex seed:run
```




For backend:

1. Go inside backend folder

2. Open terminal

```
yarn install

node index.js
```

For frontend:

1. Go inside frontend folder

2. Open terminal

```
yarn install

yarn start
```
