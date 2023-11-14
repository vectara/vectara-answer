## Manual Configuration

### 1. Install dependencies

Install [Docker](https://docs.docker.com/engine/install/).

Install [pyyaml](https://pypi.org/project/PyYAML/): `pip3 install pyyaml`.

Install [npm and node](https://nodejs.org/en/download).

Clone this repository:

```sh
git clone https://github.com/vectara/vectara-answer.git
```

From the root directory, run these commands to install JavaScript dependencies and build the front-end application:

```sh
npm install && npm run build
```

### 2. Run Docker

Find and open Docker. When you run your application, it will use Docker to host your application inside a container.

### 3. Set configuration

Duplicate the `secrets.example.toml` file and rename the copy to `secrets.toml`.

Edit the `secrets.toml` file and change the `api_key` value to be your Vectara API Key.

Make a duplicate of the `config/vectara-website-search/` directory and rename it `pg-search/`.

Update the `config/pg-search/config.yaml` file with these changes:

- Change the **corpus_id** value to the ID of the corpus into which you ingested Paul Graham's essays as part of the [`vectara-ingest` Quickstart](https://github.com/vectara/vectara-ingest/blob/main/README.md#quickstart).
- Change the **account_id** value to the ID of your account. You can click on your username in the top-right corner to copy it to your clipboard.
- Change the **app_title** to "Ask Paul Graham".

Edit the `config/pg-search/queries.json` file and update the four questions to a set of curated questions you'd like to include in the user interface. For example: "What is a maker schedule?"

### 4. Run the application

Execute the run script from the root directory using your `config/` directory, assigning the **default** profile from your secrets file:

```sh
bash docker/run.sh config/pg-search default
```

The application executes inside of a [Docker container](https://www.docker.com/resources/what-container/) to avoid any issues with existing environments and installed packages.

When the container is set up, the `run.sh` launch script will open up a browser at `localhost:80`.

### 5. Done!

Your application is now up and running. Try a few queries to see how it works.

You can view your application's logs by running `docker logs -f vanswer`. You can stop the application and shut down the container with `docker stop vanswer`.
