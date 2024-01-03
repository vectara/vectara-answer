# Using Vectara Answer with Docker

## Introduction

Docker provides a container-based mechanism that ensures consistency and portability as well as environment isolation. For these reasons, deployment of Vectara Answer via Docker may be preferred in some cases.<br>
To demonstrate how to use Vectara Answer with Docker we will now walk through the steps for building an application with the content of Paul Graham's essays website (http://paulgraham.com/).

We call this application `AskPG`.

## Pre-Requisites

For Docker, you will first need to follow some additional installation steps:

> [!IMPORTANT]   
> For mac users, please ensure you Docker Desktop is version 4.26.1 or above.

1. Install [Docker](https://docs.docker.com/engine/install/).
2. Install [pyyaml](https://pypi.org/project/PyYAML/): `pip3 install pyyaml`.

Then, you will need to create the data store:

1. Log into the Vectara Console and create a data store (https://docs.vectara.com/docs/console-ui/creating-a-corpus).
2. Use Vectara Ingest to [crawl Paul Graham's website](https://github.com/vectara/vectara-ingest#quickstart) and index it into your data store. Of course, you can also index this data on your own via the API.

## Run Docker

Find and open the Docker Desktop application. When you run your application, it will use Docker to host your application inside a container.

## Setup secrets.toml

Duplicate the `secrets.example.toml` file and rename the copy to `secrets.toml`. <br>Edit the `secrets.toml` file and change the `api_key` value under "default" to be your Vectara API key.

> [!NOTE]   
> The use of `secrets.toml` allows you to create multiple profiles, and store a differnet API key under each profile. This may be helpful if you are working with multiple Vectara Answer apps in parallel. As you can see in the included `secrets.example.toml` file we've included the API keys (query only) for the existing datasets that are part of the Quickstart: Feynman, vectara.com and vectara docs. 

> [!NOTE]   
> Some secrets are shared among all profiles, and in order to avoid having to copy that secret under each profile, the code designates a special profile called `general` — each secret under this profile will be used in any profile (in addition to the profile-specific secrets).
> When computing the Hughes Hallucination Evaluation Model (HEM), the code calls the HEM Hugging Face [model](https://huggingface.co/vectara/hallucination_evaluation_model). If you sign up for a Hugging Face account, you can include your [HF token](https://huggingface.co/docs/hub/security-tokens) under the `general` profile as follows:
> 
> hf*token="<hf*...>"
> 
> If this token is found (either in a normal profile or under the "general" profile) it will be used for making HEM calls. Using an hf_token associated with a paid Hugging Face plan ensures these calls are not rate limited (see [here](https://huggingface.co/docs/api-inference/faq)).

## Configuring your application

Make a duplicate of the `config/vectara-website-search/` directory and rename it `config/pg-search/`. Update the `config/pg-search/config.yaml` file with these changes:

- Change the `corpus_id` value to the ID of the corpus into which you ingested Paul Graham's essays as part of the [`vectara-ingest` Quickstart](https://github.com/vectara/vectara-ingest/blob/main/README.md#quickstart).
- Change the `account_id` value to the ID of your account. You can click on your username in the top-right corner to copy it to your clipboard.
- Change the `app_title` to "Ask Paul Graham".

Edit the `config/pg-search/queries.json` file and update the four questions to a set of curated questions you'd like to include in the user interface.
For example, "What is a maker schedule?"

### 4. Run the application

Execute the run script from the Vectara Answer root folder, specifying your configuration as `config/pg-search`, and selecting the `default` profile from your secrets file:

```sh
bash docker/run.sh config/pg-search default
```

The `run.sh` script performs the following steps:
1 Runs the `prepare_config.py` python script which creates the `.env` file using the `config.yaml` and `secrets.toml` files
2 Creates the [Docker container](https://www.docker.com/resources/what-container/) and runs this container in your local Docker Desktop instance. The `queries.json` file is loaded dynamically as a Docker volume file.
3 Exposes the app that runs inside the container, under `localhost:80`
4 Waits 5 seconds (for the docker container to initialize), and open up a browser at `localhost:80`.

### 5. Done!

Your application is now up and running in Docker. Try a few queries to see how it works.

You can view your application's logs by running `docker logs -f vanswer`. You can stop the application and shut down the container with `docker stop vanswer`.

## Customizing your application

With the Docker setup, the `config.yaml` file includes all of your configuration parameters as describe in [README](README.md), and you can modify those as needed. In this case the parameters do not require the `REACT_APP` prefix - see examples in any of the configuration folders that are available in this repo.

## Deploying Your App

With Docker, you can deploy your Vectara Answer application on a cloud service like [Render](https://render.com/) by following these [detailed instructions](HOSTING.md). Deployment on other cloud platforms that support docker like AWS, Azure or GCP is also possible.

## FAQs

### Why do I get a "Cannot connect to the Docker daemon" error when I try to run my application?

Docker needs to be running before you can run your application. Find and open the Docker app.
