# Local UI development

## Dependencies

Install [npm and node](https://nodejs.org/en/download).

Install dependencies with:

```
npm install
```

## Configuration

The app requires you to configure a `.env` file at the root of the project with, at minimum, these properties:

```yaml
REACT_APP_corpus_id=<your corpus ID here>
REACT_APP_customer_id=<your customer ID here>
REACT_APP_api_key=<your API key here>
REACT_APP_endpoint=api.vectara.io
```

You can also configure this file with any of the supported [`config.yaml` file properties](https://github.com/vectara/vectara-answer#configyaml-file).

You can configure example questions like this:

```yaml
REACT_APP_questions='["Question 1", "Question 2", "Question 3", "Question 4"]'
```

## Running locally

Run the code locally and serve it at `http://localhost:4444/` with: 

```
npm run start
```

If you make changes to the source code, the app will automatically reload with your changes.

if you make changes to your `.env` file, you'll need to end the process and rerun `npm run start` for them to take effect.

NOTE: The UI assumes there is a metadata field called `url` for each document in your Vectara corpus. If the `url` field exists, it will be displayed with search results as a clickable URL. If it does not, the title is used instead, but it will not be clickable.
