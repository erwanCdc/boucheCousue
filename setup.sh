# Setup the project by installing all the needed npm dependencies
echo "#### UPDATE NPM ####"
npm install -g npm

echo "#### MAIN DEPENDENCIES ####"
cd main
npm install express seedrandom body-parser os fs

echo "#### DB DEPENDENCIES ####"
cd ../db
npm install express os body-parser

echo "#### AUTH DEPENDENCIES ####"
cd ../auth
npm install express os body-parser

echo "#### BUILDING AUTH ####"
cd auth
docker build -t auth:latest .
 
echo "#### BUILDING MAIN ####"
cd ../main
docker build -t main:latest .
 
echo "#### BUILDING DATABASE ####"
cd ../db
docker build -t db:latest .

echo "Setup done."
echo "To run the project, run: sudo docker-compose up"
echo "To update images, run: sudo sh update.sh"
