# boucheCousue
## Procedure
### HTTP

### Node
#### Requierements
- npm install express --save
- npm install seedrandom --save

### ReverseProxy

### Docker
#### Requierements
- Install docker:
`sudo pacman -S docker docker-compose`

- Start/enable docker service:
`systemctl start docker`

`systemctl enable docker`

- Pull requiered images:
`sudo docker pull postgres`

`sudo docker pull nocodb/nocodb`

#### Postgres
- Run postgres docker from raw image:
`sudo docker run --name=DOCKER_NAME -d -e POSTGRES_PASSWORD=password postgres`

- Go inside the container:
`sudo docker exec -it CONTAINER_ID bash`

- Connect to database:
`psql -U postgres`

- Create a database and fill it with data:
`CREATE DATABASE my_bdd;`

```
CREATE TABLE my_table (firstname varchar(50) NOT NULL UNIQUE, lastname varchar(50) NOT NULL UNIQUE);
INSERT INTO
    users(firstname, lastname)
VALUES
    ('Bob','Kelso'),
    ('Mickey', 'Mouse'),
    ('Lennart', 'Green'),
    ('David', 'Gemmel'),
    ('Randal', 'Munroe');
```

- Query the database:
`SELECT * FROM my_table;`

- Exit the container:
`exit`

- Stop the container:
`sudo docker stop CONTAINER_ID`
