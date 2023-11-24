# If we received our legacy parameters,
# prepare the config file using the Python script
if [ $# -eq 2 ]; then
  if [ ! -d "$1" ]; then
    echo "Error: '$1' is not a valid folder or does not exist"
    exit 2
  fi

  python3 docker/prepare_config.py $1 $2

  if [[ $1 == /* ]] || [[ $1 == ~* ]]; then
    correct_path=$(eval echo $1)
  else
    correct_path="$PWD/$1"
  fi
fi

# If we used legacy configs (prepared via Python and using queries JSON file),
# use the Docker command to forward the queries.json path to the container.
if [ -z "$correct_path" ]; then
  docker compose up -d
else
  docker compose up -v "$correct_path"/queries.json:/usr/src/app/build/queries.json -d
fi

if [ $? -eq 0 ]; then
  printf "Success! Application is running at http://localhost:80.\nTo shut it down use: docker compose down"
  sleep 5
  open http://localhost
else
  echo "Container failed to start."
fi
