# Bouche cousue
## LANCER LE PROJET
- Dans le dossier main:

`sudo docker build -t index:latest .` /!\ ne pas oublier le point à la fin !

- Dans le dossier db:

`sudo docker build -t score_db:latest .` /

- Depuis la racine du projet:

`sudo docker-compose up`

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
VALUES ('Bob','Kelso'), ('Mickey', 'Mouse'), ('Lennart', 'Green'), ('David', 'Gemmel'), ('Randal', 'Munroe');
```

- Query the database:

`SELECT * FROM my_table;`

- Exit the container:

`exit`

- Stop the container:

`sudo docker stop CONTAINER_ID`

- Remove the container:

`sudo docker rm CONTAINER_ID`

### Storing data

- Create a volume named postgres_data

`sudo docker volume create --name postgres_data`

- Display all volumes

`sudo docker volume ls`

- Remove volume named postgres_data

`sudo docker volume rm postgres_data`

- Create docker container linked to **postgres_data** volume

`sudo docker run --name=postgres_c_1 -v postgres_data:/var/lib/postgresql/data -d -e POSTGRES_PASSWORD=password postgres`

### Image creation

- When the Dockerfile is written:

`sudo docker build -f Dockerfile -t IMAGE_NAME:latest .`

- Create a container from this image:

`sudo docker run --init --publish 3000:3000 IMAGE_NAME`

    - Where: `--init` enables you to shutdown the server with Ctrl+C
    - And: `--publish 3000:3000` enables it to work locally

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
