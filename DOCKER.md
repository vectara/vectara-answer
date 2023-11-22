# Using Vectara Answer with Docker

## Introduction

Docker provides a container based mechanism that ensures consistency and portability as well as environment isolation. For these reasons, deployment of Vectara \Answer via Docker may be preferred in some cases.<br>
To demonstrate how to use Vectara Answer with Docker we will now walk through the steps for building an application with the content of Paul Graham's essays website (http://paulgraham.com/). 

We call this application `AskPG`.

## Pre-Requisites

For Docker you will first need to follow some additional installation steps:
1. Install [Docker](https://docs.docker.com/engine/install/).
2. Install [pyyaml](https://pypi.org/project/PyYAML/): `pip3 install pyyaml`.

Then, you will need to create the data store:
1. Log into the Vectara Console and create a data store (https://docs.vectara.com/docs/console-ui/creating-a-corpus).
2. Use Vectara Ingest to [crawl Paul Graham's website](https://github.com/vectara/vectara-ingest#quickstart) and index it into your data store. Of course you can also index this data on your own via the API.

## Run Docker

Find and open the Docker Desktop application. When you run your application, it will use Docker to host your application inside a container.

## Setup secrets.toml

Duplicate the `secrets.example.toml` file and rename the copy to `secrets.toml`. <br>Edit the `secrets.toml` file and change the `api_key` value under "default" to be your Vectara API key.

Note: The use of `secrets.toml` allows you to create multiple profiles, and store a differnet API key under each profile. This may be helpful if you are working with multiple Vectara Answer apps in parallel. As you can see in the included `secrets.toml` file we've included the API keys (query only) for the existing datasets that are part of the Quickstart: Feynman, vectara.com and vectara docs.

## Configuring your application

Make a duplicate of the `config/vectara-website-search/` directory and rename it `config/pg-search/`. Update the `config/pg-search/config.yaml` file with these changes:

- Change the `corpus_id` value to the ID of the corpus into which you ingested Paul Graham's essays as part of the [`vectara-ingest` Quickstart](https://github.com/vectara/vectara-ingest/blob/main/README.md#quickstart).
- Change the `account_id` value to the ID of your account. You can click on your username in the top-right corner to copy it to your clipboard.
- Change the `app_title` to "Ask Paul Graham".

Edit the `config/pg-search/queries.json` file and update the four questions to a set of curated questions you'd like to include in the user interface. For example: "What is a maker schedule?"

### 4. Run the application

Execute the run script from the root directory, specifying your configuration as `config/pg-search`, and selecting the `default` profile from your secrets file:

```sh
bash docker/run.sh config/pg-search default
```

The application executes inside of a [Docker container](https://www.docker.com/resources/what-container/), which ensures a clean build and avoids any issues with existing environments and installed packages.

When the container is set up, the `run.sh` launch script will open up a browser at `localhost:80`.

### 5. Done!

Your application is now up and running in Docker. Try a few queries to see how it works.

You can view your application's logs by running `docker logs -f vanswer`. You can stop the application and shut down the container with `docker stop vanswer`.

## Customizing your application

With the Docker setup, the `config.yaml` file includes all of your configuration parameters as describe in [README](README.md). In this case the parameters do not require the `REACT_APP` prefix - see examples in any of the configuration folders that are available in this repo.

## Deploying Your App

With Docker you can deploy your Vectara Answer application on a cloud service like [Render](https://render.com/) by following these [detailed instructions](HOSTING.md). Deployment on other cloud platforms that support docker like AWS, Azure or GCP is also possible.

## FAQs

### Why do I get a "Cannot connect to the Docker daemon" error when I try to run my application?

Docker needs to be running before you can run your application. Find and open the Docker app.

