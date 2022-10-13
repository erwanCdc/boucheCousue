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

echo "Setup done. To run the project, run: sudo sh run.sh"
