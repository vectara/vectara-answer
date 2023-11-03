


# build docker container
npm install & npm run build
docker build -f docker/Dockerfile . --tag=vectara-answer:latest

# run the docker with the right configuration
docker rm vanswer -f 2> /dev/null

docker run --platform=linux/amd64 -d --env-file .env --name vanswer -p 127.0.0.1:80:3000/tcp vectara-answer
if [ $? -eq 0 ]; then
  echo "Success! Application is running at http://localhost:80.\nTo shut it down use: docker container stop vanswer."
  sleep 5
  open http://localhost
else
  echo "Container failed to start."
fi
