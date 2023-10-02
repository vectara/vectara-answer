
if [ $# -lt 2 ]; then
  echo "Missing arguments."
  echo "Usage: $0 <config-folder> <secrets-profile>"
  exit 1
fi

if [ ! -d "$1" ]; then
  echo "Error: '$1' is not a valid folder or does not exist"
  exit 2
fi

# build docker container
npm install & npm run build
docker build -f docker/Dockerfile . --tag=vectara-answer:latest

# run the docker with the right configuration
python3 docker/prepare_config.py $1 $2
docker rm vanswer -f 2> /dev/null

if [[ $1 == /* ]] || [[ $1 == ~* ]]; then
    correct_path=$(eval echo $1)
else
    correct_path="$PWD/$1"
fi
docker run --platform=linux/amd64 -d  -v $correct_path/queries.json:/usr/src/app/build/queries.json  --env-file .env --name vanswer -p 127.0.0.1:80:3000/tcp vectara-answer
if [ $? -eq 0 ]; then
  echo "Success! Application is running at http://localhost:80.\nTo shut it down use: docker container stop vanswer."
  sleep 5
  open http://localhost
else
  echo "Container failed to start."
fi
