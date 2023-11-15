import { createRequire } from "module";
const require = createRequire(import.meta.url);

const vectaraWebsiteQuestions = require("./config/website-vectara/queries.json");
const vectaraDocsQuestions = require("./config/vectara-docs/queries.json");
const askFeynmanQuestions = require("./config/ask-feynman/queries.json");

const DEFAULT_CONFIGS = {
  "vectara-docs": {
    customerId: "1366999410",
    corpusId: "1",
    apiKey: "zqt_UXrBcnI2UXINZkrv4g1tQPhzj02vfdtqYJIDiA",
    appTitle: "Vectara Docs Search",
    searchTitle: "Vectara Docs Search",
    searchDescription: "All of Vectara's Platform Documentation",
    questions: JSON.stringify(vectaraDocsQuestions.questions),
  },

  "vectara-website": {
    customerId: "1366999410",
    corpusId: "2",
    apiKey: "zqt_UXrBcnnt4156FZqMtzK8OEoZqcR0OrecS5Bb6Q",
    appTitle: "Vectara Website Search",
    searchTitle: "Vectara Website Search",
    searchDescription: "All the content on Vectara's Website",
    questions: JSON.stringify(vectaraWebsiteQuestions.questions),
  },

  "ask-feynman": {
    customerId: "1366999410",
    corpusId: "3",
    apiKey: "zqt_UXrBclYURJiAW9MiKT1L60EJC6iaIoWYj_bSJg",
    appTitle: "Ask Feynman",
    searchTitle: "Ask Feynman",
    searchDescription: "All of Richard Feynman's Lectures",
    questions: JSON.stringify(askFeynmanQuestions.questions),
  },
};

let presetAppName;

const checkNeedsConfiguration = (context) => {
  return !context.presetAppName;
};

export default function (plop) {
  plop.setGenerator("env", {
    description: "Application Configuration Variables",
    prompts: async function (inquirer) {
      const acknowledgeAns = await inquirer.prompt({
        type: "input",
        name: "acknowledgePrimer",
        message:
          "Welcome to vectara-answer!\nLet's configure your application.\nYou can choose from a pre-configured one, or configure your own.\nNOTE: THIS WILL OVERWRITE .env CONFIGURATION FILE.\n\nPress Enter to continue.",
      });

      const presetAppNameAns = await inquirer.prompt({
        type: "list",
        name: "presetAppName",
        message: "Which application would you like to create?",
        choices: [
          { name: "Vectara Docs", value: "vectara-docs" },
          { name: "Vectara.com", value: "vectara-website" },
          { name: "AskFeynman", value: "ask-feynman" },
          { name: "[Create Your Own]", value: undefined },
        ],
        filter: (input) => {
          // Cache the chosen app name.
          // We'll check for this when creating the .env file.
          presetAppName = input;
          return presetAppName;
        },
      });

      if (presetAppNameAns.presetAppName) {
        presetAppName = presetAppNameAns.presetAppName;
        return;
      }

      const appTitleAns = await inquirer.prompt({
        when: checkNeedsConfiguration,
        type: "input",
        name: "searchTitle",
        message: "What would you like to name your application?",
      });

      const customerIdAns = await inquirer.prompt({
        when: checkNeedsConfiguration,
        type: "input",
        name: "customerId",
        message: "What's your Vectara Customer ID?",
      });

      const corpusIdAns = await inquirer.prompt({
        when: checkNeedsConfiguration,
        type: "input",
        name: "corpusId",
        message: "What Vectara Corpus ID is associated with your data?",
      });

      const apiKeyAns = await inquirer.prompt({
        when: checkNeedsConfiguration,
        type: "input",
        name: "apiKey",
        message:
          "What is your Vectara QueryService API Key (This can be safely shared)?",
      });

      const questions = [];
      const haveQuestionsAns = await inquirer.prompt({
        type: "confirm",
        name: "value",
        message: "Would you like to add sample questions for your users?",
      });

      if (haveQuestionsAns.value) {
        let moreQuestionsAns;
        let numQuestions = 0;
        do {
          numQuestions++;

          let questionAns = await inquirer.prompt({
            type: "input",
            name: "value",
            message: `Enter sample question ${numQuestions}:`,
          });

          questions.push(questionAns.value);

          moreQuestionsAns = await inquirer.prompt({
            type: "confirm",
            name: "value",
            message: "Would you like to add more questions?",
          });
        } while (moreQuestionsAns.value);
      }

      return {
        ...acknowledgeAns,
        ...presetAppNameAns,
        ...appTitleAns,
        ...customerIdAns,
        ...corpusIdAns,
        ...apiKeyAns,
        questions: JSON.stringify(questions),
      };
    },
    actions: [
      {
        type: "add",
        data: () => {
          // Check our cached app name since this function does
          // not have a reference to the current Plop context.

          if (presetAppName) {
            return DEFAULT_CONFIGS[presetAppName];
          }

          return {};
        },
        path: "./.env",
        templateFile: "plopTemplates/env.hbs",
        force: true,
      },
      "Configuration created! To run your app, run `npm run start` or `bash docker/run.sh`.",
    ],
  });
}
