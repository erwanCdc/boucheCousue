echo "#### STOP RUNNING CONTAINERS ####"
docker rm auth -f
docker rm main -f
docker rm db -f

echo "#### BUILDING AUTH ####"
cd auth
docker build -t auth:latest .

echo "#### BUILDING MAIN ####"
cd ../main
docker build -t main:latest .

echo "#### BUILDING DATABASE ####"
cd ../db
docker build -t db:latest .

echo "#### RUN PROJECT ####"
cd ..
docker-compose up
