# Bouche cousue
## HTTP

### Requierements
- npm install express --save
- npm install seedrandom --save
- npm install path --save
- npm install body-parser --save

## Node
### Requierements
`npm install express`

`npm install seedrandom`

## ReverseProxy

## Docker
### Requierements
- Install docker:

`sudo pacman -S docker docker-compose`

- Start/enable docker service:

`systemctl start docker`

`systemctl enable docker`

- Pull requiered images:

`sudo docker pull postgres`

`sudo docker pull nocodb/nocodb`

### Using existing image
- Run postgres docker from raw image:

`sudo docker run --name=DOCKER_NAME -d -e POSTGRES_PASSWORD=password postgres`

- Go inside the container:

`sudo docker exec -it CONTAINER_ID bash`

- Connect to database:

`psql -U postgres`

- Create a database and fill it with data:

`CREATE DATABASE my_bdd;`

```
CREATE TABLE users(firstname varchar(50) NOT NULL UNIQUE, lastname varchar(50) NOT NULL UNIQUE);
INSERT INTO users(firstname, lastname)
VALUES ('Bob','Kelso'), ('Mickey', 'Mouse'), (Lennart', 'Green'), (David', 'Gemmel'), (Randal', 'Munroe');
```

- Query the database:

`SELECT * FROM my_table;`

- Exit the container:

`exit`

- Stop the container:

`sudo docker stop CONTAINER_ID`

### Storing data

- Create a volume named postgres_data

`sudo docker volume create --name postgres_data`

- Display all volumes

`sudo docker volume ls`

- Create docker container linked to **postgres_data** volume

`sudo docker run --name=postgres_c_1 -v postgres_data:/var/lib/postgresql/data -d -e POSTGRES_PASSWORD=password postgres`

# TODO
[] End Docker (image creation++)
[] Documentation

# Tests
``` mermaid
sequenceDiagram
    participant Client
    participant NodeJS
    participant Database

    Client->>NodeJS: Send word
    NodeJS->>Database: Test
```
