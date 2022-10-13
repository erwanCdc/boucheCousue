echo "#### STOP RUNNING CONTAINERS ####"
docker rm main -f
docker rm db -f
cd main
echo "#### BUILDING MAIN ####"
docker build -t main:latest .
cd ../db
echo "#### BUILDING DATABASE ####"
docker build -t db:latest .
cd ..
echo "#### BUILD DONE ####"
docker-compose up
