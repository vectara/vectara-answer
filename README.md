<h1 align="center">Welcome to vectara-answer</h1>
<p align="center">
  <img style="max-width: 100%;" alt="logo" src="img/project-logo.png"/>
</p>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D9.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D19.7.0-blue.svg" />
  <a href="https://github.com/vectara/vectara-answer#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/vectara/vectara-answer/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://twitter.com/vectara" target="_blank">
    <img alt="Twitter: vectara" src="https://img.shields.io/twitter/follow/vectara.svg?style=social" />
  </a>
</p>

## About

Customize and deploy a pre-built conversational search UI connected to the data you've ingested into [Vectara](https://vectara.com/). With Vectara’s [APIs](https://docs.vectara.com/docs/) you can create conversational experiences with your data, such as chatbots, semantic search, and workplace search.

`vectara-answer` is an open source React project that provides a configurable conversational search user interface. You can deploy it to end users so they can ask questions of your data and get back accurate, dependable answers, or refer to the source code when building your own conversational search applications.

## Quickstart

Let’s create a simple conversational application. We'll base it on [Paul Graham's essays](http://www.paulgraham.com/index.html), so you'll be able to ask questions and get back answers based on what he's written. This guide assumes you've followed the [`vectara-ingest` Quickstart](https://github.com/vectara/vectara-ingest/blob/main/README.md#quickstart) to ingest this content into a corpus.

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

## Project architecture

### Goals

`vectara-answer` provides example code of a modern user-interface for GenAI conversational search. We created it with two goals in mind:

1. To help you create custom conversational search applications with Vectara. You can customize the user experience, launch the application locally, and deploy it to production.
2. To demonstrate how a conversational search user can be implemented in JavaScript, so you can refer to it when writing your own code.

There are specific example applications such as AskNews (news search), Wikipedia search, and Hacker News search inside of the `config/` directory. Each example application has its own sub-directory. See [Example applications](#example-applications) for more info.

### Docker

`vectara-answer` uses a Docker container to reduce the complexities of specific development environments. Developers can run it locally or take pieces from this reference implementation and use them within their own application. See the [Dockerfile](https://github.com/vectara/vectara-answer/blob/main/docker/Dockerfile) for more information on the Docker file structure and build.

### Connecting to your Vectara data

`vectara-answer` requires a Vectara API key for querying. For this you will need to create a file called `secrets.toml` in the root directory. See `secrets.example.toml` for an example. This file uses the [TOML](https://toml.io/en/) format, which supports the definition of one or more profiles. Under each profile you can add the line `api_key="XXX"` where `XXX` is the Vectara API key you want to use in that profile.

### UI

The UI source code is all in the `src/` directory. See the [UI README.md](https://github.com/vectara/vectara-answer/blob/main/src) to learn how to make changes to the UI source.

NOTE: The UI assumes there is a metadata field called `url` for each document in your Vectara corpus. If the `url` field exists, it will be displayed with search results as a clickable URL. If it does not, the title is used instead, but it will not be clickable.

## Example applications

The `config/` directory contains example configurations of a `vectara-answer` application. Each example has its own sub-directory that contains two files:

- `config.yaml` defines the general behavior and look of the user interface.
- `queries.json` defines a set of pre-defined questions to display in the UI.

You can use the command line to try out an example locally:

```sh
bash docker/run.sh config/{name of sub-directory} default
```

If you like the UX of an example application, you can duplicate the sub-directory and configure it to connect to your own data.

## Configuring an application

### `config.yaml` file

You can configure the appearance and behavior of your app by editing these values in your application's `config.yaml` file.

#### Search (required)

```yaml
# These config vars are required for connecting to your Vectara data and issuing requests.
corpus_id: 5
customer_id: 0000000001
api_key: "zwt_abcdef..."
```

#### Application (optional)

These configuration parameters allow you to configure the look and feel of the application header, including title, logo and header/footer.

```yaml
# Define the title of your app to render in the browser tab.
app_title: "Your title here"

# Hide or show the app header.
enable_app_header: False

# Hide or show the app footer.
enable_app_footer: False

# Define the URL the browser will redirect to when the user clicks the logo in the app header.
app_header_logo_link: "https://www.vectara.com"

# Define the logo that appears in the app header. Any images you place in your `config_images` directory will be available.
app_header_logo_src: "config_images/logo.png"

# Describe the logo for improved accessibility.
app_header_logo_alt: "Vectara logo"

# Customize the height at which to render the logo. The width will scale proportionately.
app_header_logo_height: 20
```

#### Source filters (optional)

If your application uses more than one corpus, you can define source filters to enable the user to narrow their search to a specific corpus.

```yaml
# Hide or show source filters.
enable_source_filters: True

# whether the "all source" button should be enabled or not (default true)
all_sources: True

# A comma-separated list of the sources on which users can filter.
sources: "BBC,NPR,FOX,CNBC,CNN"
```

#### Summary paramaters (optional)

The way summarization works can be configured as follows:

```yaml
# Switches the mode of the ux to "summary" mode or "search" mode (if not specified defaults to summary mode). When set to "summary", a summary is shown along with references used in the summary. When set to "search", only search results are shown and no calls made to the summarization API.
ux: "summary"

# Default language for summary response (if not specified defaults to "auto")
summary_default_language: "eng"

# Number of sentences before and after relevant text segment used for summarization
summary_num_sentences: 3

# Number of results used for summarization
summary_num_results: 10

# The name of the summarization prompt in Vectara
# If you are a Vectara scale customer you can use custom prompts.
# This field names a custom prompt, otherwise it uses the default for the account.
summary_prompt_name: vectara-summary-ext-v1.2.0
```

#### Hybrid Search (optional)

By default, vectara-answer utilizes hybrid search with lambda=0.1 for short queries (num_words<=2) and lambda=0 (pure neural search) otherwise, but you can define other values here.

```yaml
# hybrid search
hybrid_search_num_words: 2
hybrid_search_lambda_long: 0.0
hybrid_search_lambda_short: 0.1
```

#### Reranking (optional)

Whether to use Vectara's [reranking](https://docs.vectara.com/docs/api-reference/search-apis/reranking) functionality. Note that reranking currently works for English language only, so if the documents in your corpus are in other languages, it's recommended to set this to "false".

```yaml
# Reranking: true or false
rerank: false

# number of results to use for reranking
rerank_num_results: 50
```

Whether to use Vectara's MMR (maximum marginal relevance) functionality. 
Note that if mmr=true, it will disable rerank=true, as both cannot co-exist

```yaml
# mmr enabled: true or false
mmr: true

# diversity bias factor (0..1) for MMR reranker. The higher the value, the more MMR is preferred over relevance.
mmr_diversity_bias: 0.3

# number of results to use for reranking
mmr_num_results: 50
```

#### Search header (optional)

These configuration parameters enable you to configure the look and feel of the search header, including the logo.

```yaml
# Define the URL the browser will redirect to when the user clicks the logo above the search controls.
search_logo_link: "https://asknews.demo.vectara.com"

# Define the logo that appears in the search header. Any images you place in your `config_images` directory will be available.
search_logo_src: "config_images/logo.png"

# Describe the logo for improved accessibility.
search_logo_alt: "Vectara logo"

# Customize the height at which to render the logo. The width will scale proportionately.
search_logo_height: 20

# Define the title to render next to the logo.
search_title: "Search your data"

# Define the description to render opposite the logo and title.
search_description: "Data that speaks for itself"

# Define the placeholder text inside the search box.
search_placeholder: "Ask me anything"
```

#### Authentication (optional)

`vectara-answer` supports Google SSO authentication.

```yaml
# Configure your app to require the user to log in with Google SSO.
authenticate: True
google_client_id: "cb67dbce87wcc"
```

#### Analytics (optional)

```yaml
# Track user interaction with your app.
google_analytics_tracking_code: "884327434"
```

#### Full Story (optional)

```yaml
# Track user experience with Full Story
full_story_org_id: "org1123"
```

### `queries.json` file

the `queries.json` defines four questions that are displayed underneath the search bar and can be clicked by the user as a shortcut to typing that question in.

The file is structured as follows:

```
[
    {
      question: "What is the meaning of life 1?"
    },
    {
      question: "What is the meaning of life 2?"
    },
    {
      question: "What is the meaning of life 3?"
    },
    {
      question: "What is the meaning of life 4?"
    }
]
```

## Deployment

### Local deployment

To run `vectara-answer` locally using Docker, perform the following steps:

1. Make sure you have [docker installed](https://docs.docker.com/engine/install/) on your machine.
2. Clone this repo into a local directory using `git clone https://github.com/vectara/vectara-answer.git`.
3. From the root, run `sh docker/run.sh config/<config-directory> <profile_name>`. This configures the Docker container with the parameters specified in your configuration directory, and builds the Docker image. Then it starts up the Docker container and opens up `localhost:80` in your browser which now contains the main search interface starting point. `<profile_name>` is the name of the profile in your `secrets.toml` file where the `api_key` is defined to use with this search application.

The container generated is called `vanswer`, and after it is started, you can:

- View logs by using `docker logs -f vanswer`
- Stop the container with `docker stop vanswer`

### Cloud deployment

You can deploy `vectara-answer` on cloud platforms such as AWS, Azure, or GCP as well as on specialized cloud services like Render or Heroku.
See [detailed instructions](HOSTING.md)

## FAQs

### Why do I get a "Cannot connect to the Docker daemon" error when I try to run my application?

Docker needs to be running before you can run your application. Find and open the Docker app.

## Author

👤 **Vectara**

- Website: https://vectara.com
- Twitter: [@vectara](https://twitter.com/vectara)
- GitHub: [@vectara](https://github.com/vectara)
- LinkedIn: [@vectara](https://www.linkedin.com/company/vectara/)
- Discord: [@vectara](https://discord.gg/GFb8gMz6UH)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/vectara/vectara-answer/issues). You can also take a look at the [contributing guide](https://github.com/vectara/vectara-answer/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Vectara](https://github.com/vectara).<br />
This project is [Apache 2.0](https://github.com/vectara/vectara-answer/blob/master/LICENSE) licensed.
