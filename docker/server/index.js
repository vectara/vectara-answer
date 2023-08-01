const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');
require("dotenv").config();
const app = express();
const port = 3000; // 4444 for local dev, 3000 for Docker

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use("/", express.static("build"));

app.post("/v1/query", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const response = await axios.post(`https://${process.env.endpoint}/v1/query`, req.body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "customer-id": process.env.customer_id,
        "x-api-key": process.env.api_key,
        "grpc-timeout": "60S",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error sending search request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

    // summary
    enable_summary,
    summary_default_language,
    summary_num_results,
    summary_num_sentences,

    // rerank
    rerank,
    rerank_num_results,

    // Search header
    search_logo_link,
    search_logo_src,
    search_logo_alt,
    search_logo_height,
    search_title,
    search_description,
    search_placeholder,

    // Auth
    authenticate,
    google_client_id,

    // Analytics
    google_analytics_tracking_code,
    full_story_org_id,
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

    // summary
    enable_summary,
    summary_default_language,
    summary_num_results,
    summary_num_sentences,

    // rerank
    rerank,
    rerank_num_results,

    // Search header
    search_logo_link,
    search_logo_src,
    search_logo_alt,
    search_logo_height,
    search_title,
    search_description,
    search_placeholder,

    // Auth
    authenticate,
    google_client_id,

    // Analytics
    google_analytics_tracking_code,
    full_story_org_id,
  });
});

app.listen(port, () => { });
