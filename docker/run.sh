if [ $# -lt 2 ]; then
  echo "Missing arguments."
  echo "Usage: $0 <config-folder> <secrets-profile>"
  exit 1
fi

if [ ! -d "$1" ]; then
  echo "Error: '$1' is not a valid folder or does not exist"
  exit 2
fi

# Generate .env file for docker
python3 docker/prepare_config.py $1 $2

if [[ $1 == /* ]] || [[ $1 == ~* ]]; then
    correct_path=$(eval echo $1)
else
    correct_path="$PWD/$1"
fi
docker compose up -d
if [ $? -eq 0 ]; then
  echo "Success! Application is running at http://localhost:3000.\nTo shut it down use: docker compose down"
  sleep 5
  open http://localhost:3000
else
  echo "Container failed to start."
fi
