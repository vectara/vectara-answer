const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;

app.use("/", express.static("build"));

app.get("/", function (req, res) {
  res.render("build/index.html");
});

app.post("/config", (req, res) => {
  const {
    // Search
    endpoint,
    corpus_id,
    customer_id,
    api_key,

    // App
    app_title,
    enable_app_header,
    enable_app_footer,

    // App header
    app_header_logo_link,
    app_header_logo_src,
    app_header_logo_alt,
    app_header_logo_height,
    app_header_learn_more_link,
    app_header_learn_more_text,

    // Filters
    enable_source_filters,
    sources,

    // Search header
    search_logo_link,
    search_logo_src,
    search_logo_alt,
    search_logo_height,
    search_title,
    search_description,
    search_placeholder,

    // Example questions
    questions_url,
    Q1,
    Q2,
    Q3,
    Q4,

    // Auth
    authenticate,
    google_client_id,

    // Analytics
    google_analytics_tracking_code,
  } = process.env;

  res.send({
    // Search
    endpoint,
    corpus_id,
    customer_id,
    api_key,

    // App
    app_title,
    enable_app_header,
    enable_app_footer,

    // App header
    app_header_logo_link,
    app_header_logo_src,
    app_header_logo_alt,
    app_header_logo_height,
    app_header_learn_more_link,
    app_header_learn_more_text,

    // Filters
    enable_source_filters,
    sources,

    // Search header
    search_logo_link,
    search_logo_src,
    search_logo_alt,
    search_logo_height,
    search_title,
    search_description,
    search_placeholder,

    // Example questions
    questions_url,
    Q1,
    Q2,
    Q3,
    Q4,

    // Auth
    authenticate,
    google_client_id,

    // Analytics
    google_analytics_tracking_code,
  });
});

app.listen(port, () => { });
