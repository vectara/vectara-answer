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

Vectara Answer is an open source React project that enables you to quickly configure GenAI user interfaces, powered by the [Vectara Platform](https://vectara.com/)'s semantic search and summarization APIs.

For an example of what you'll be building, check out [Ask News](https://asknews.demo.vectara.com).

## Prerequisites

To get started, the minimum requirement is to install [npm and node](https://nodejs.org/en/download). That's it!

## Quickstart

Vectara Answer comes packaged with preset configurations that allow you spin up a sample application using Vectara's public datastores. To quickly get started, run the following command:

`npm run bootstrap`

When prompted for which application to create, simply select one of the three default apps, and you'll have the app running in your browser at `http://localhost:4444`.

Congratulations! You've just setup and run a sample app powered by Vectara! We'll work on setting up a custom application later in this doc.

### Under the hood

The bootstrap command installs dependencies, runs the configuration script, and spins up the local application.

If you would like to run the setup steps individually, you can run:

- `npm install`: for installing dependencies
- `npm run configure`: for running the configuration script
- `npm run start`: for running the application locally

### Deployment

To set up a deployable docker image, do the following:

- Install [Docker](https://docs.docker.com/engine/install/). Then make sure it's running on your machine.
- Run `bash docker/run.sh`
- View app logs with `docker logs -f vanswer`
- Stop the app with `docker stop vanswer`

`run.sh` creates a deployable docker image and runs it. The app should be accessible at `http://localhost:80`.

## Building Your Own Application

### Prerequisites

When building your own application, you will need to:

- **Create a data store:** Log into the [Vectara Console](https://console.vectara.com/) and create a data store(https://docs.vectara.com/docs/console-ui/creating-a-corpus).
- **Add data to the data store.** You can use [Vectara Ingest](https://github.com/vectara/vectara-ingest/blob/main/README.md#quickstart) to crawl datasets and websites, or use our [Indexing APIs](https://docs.vectara.com/docs/api-reference/indexing-apis/indexing) directly.

### Running Your Custom App

If you choose `[Create Your Own]` from the application selection prompt, you will be asked to provide:

- your Vectara customer ID
- the ID of the corpus you created as a prerequisite to this process
- the API key of your selected Vectara corpus (**NOTE: Depending on your set up, this may be visible to users. To ensure safe sharing, ensure that this key is set up to only have query access.**)
- any sample questions to display on the site, to get your users started.

Once provided, the values above will go into your own customized configuration, and your site will be ready to go via `npm start` or the Docker script.

### Deploying Your App

You can deploy `vectara-answer` on cloud platforms such as AWS, Azure, or GCP as well as on specialized cloud services like Render or Heroku.
See [detailed instructions](HOSTING.md)

## Make It Your Own!

Whether you choose to set up a preset application or build a custom app, you have the ability to make it your own.

### Modifying the UI

The UI source code is all in the `src/` directory. See the [UI README.md](https://github.com/vectara/vectara-answer/blob/main/src) to learn how to make changes to the UI source.

NOTE: The UI assumes there is a metadata field called `url` for each document in your Vectara corpus. If the `url` field exists, it will be displayed with search results as a clickable URL. If it does not, the title is used instead, but it will not be clickable.

### Modifying the Proxy Server

While the app run via `npm run start` works with a local client that accesses the Vectara API directly, running the app via Docker spins up a full-stack solution, using a proxy server to make Vectara API requests.

In order to modify the request handlers, make changes to `/server/index.js`.

## Configuration

After the configuration process has created your `.env` file, you are free to make modifications to it to suit your development needs.

### Search (required)

```yaml
# These config vars are required for connecting to your Vectara data and issuing requests.
corpus_id: 5
customer_id: 0000000001
api_key: "zwt_abcdef..."
```

### Application (optional)

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
