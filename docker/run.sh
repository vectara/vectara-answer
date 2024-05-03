# prepare the config file using the Python script
if [ $# -eq 2 ]; then
  if [ ! -d "$1" ]; then
    echo "Error: '$1' is not a valid folder or does not exist"
    exit 1
  fi

  python3 docker/prepare_config.py $1 $2
  if [ $? -ne 0 ]; then
      echo "prepare_config failed with exit code $?. Exiting..."
      exit 2
  fi

  if [[ $1 == /* ]] || [[ $1 == ~* ]]; then
    correct_path=$(eval echo $1)
  else
    correct_path="$PWD/$1"
  fi
fi

# build the image
docker build -f docker/Dockerfile . --tag=vectara-answer:latest
if [ $? -ne 0 ]; then
    echo "Docker build failed with exit code $?. Exiting..."
    exit 3
fi

# remove any old containers of the same name
docker rm vanswer -f 2> /dev/null

# use the Docker command to forward the queries.json path to the container.
if [ -z "$correct_path" ]; then
  docker run --platform linux/amd64 -d --env-file .env --name vanswer -p 80:3000/tcp vectara-answer
else
  docker run --platform linux/amd64 -d -v "$correct_path":/usr/src/app/extras/ --env-file .env --name vanswer -p 80:3000/tcp vectara-answer
fi

if [ $? -eq 0 ]; then
  echo "Success! Application is running at http://localhost:80."
  echo "To shut it down use: docker container stop vanswer."
  sleep 5
  open http://localhost
else
  echo "Container failed to start."
fi
