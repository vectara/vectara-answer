const express = require("express");

const { legacyCreateProxyMiddleware:createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4444; // default port 4444 for local development and 3000 for docker
app.use(express.json());

app.use("/", express.static("build"));

app.get("/", function (req, res) {
  res.render("build/index.html");
});

const proxyOptions = {
  target: `https://${process.env.endpoint}`,
  changeOrigin: true,
  pathRewrite: { "^/v1/query": "/v1/query", "^/v2/query": "/v2/query" },
  onProxyReq: (proxyReq, req) => {
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Accept", "text/event-stream");
    proxyReq.setHeader("customer-id", process.env.customer_id);
    proxyReq.setHeader("x-api-key", process.env.api_key);
    proxyReq.setHeader("grpc-timeout", "60S");
    proxyReq.setHeader("X-Source", "vectara-answer");

    if (req.body && req.body.logQuery) {
      const hostHeader = req.headers.host;
      console.log(`${hostHeader} - user query: `, req.body.query[0].query);
    }

    if (req.body) {
      delete req.body.logQuery; // Remove the logQuery flag from request body
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
  selfHandleResponse: true,
  onProxyRes: (proxyRes, req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Transfer-Encoding", "chunked");

    proxyRes.pipe(res);
    proxyRes.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(res.status).send(error);
    });
  },
};

app.use("/v1/query", createProxyMiddleware(proxyOptions));
app.use("/v2/query", createProxyMiddleware(proxyOptions));

app.post("/config", (req, res) => {
  const {
    // Search
    endpoint,
    proxy_server_url,
    corpus_id,
    corpus_key,
    customer_id,
    api_key,
    metadata_filter,

    // App
    ux,
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
    all_sources,
    sources,

    // summary
    summary_default_language,
    summary_num_results,
    summary_num_sentences,
    summary_prompt_name,
    summary_prompt_text_filename,
    summary_fcs_mode,
    enable_stream_query,
    summary_prompt_options,

    // Rerank
    rerank_num_results,
    reranker_name,
    user_function,

    // MMR
    mmr_diversity_bias,

    // Hybrid search
    hybrid_search_num_words,
    hybrid_search_lambda_long,
    hybrid_search_lambda_short,

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
    gtm_container_id,
    amplitude_api_key,

    // recommendation
    related_content,

    // Questions
    questions,
  } = process.env;

  res.send({
    // Search
    endpoint,
    proxy_server_url,
    corpus_id,
    corpus_key,
    customer_id,
    api_key,
    metadata_filter,

    // App
    ux,
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
    all_sources,
    sources,

    // Summary
    summary_default_language,
    summary_num_results,
    summary_num_sentences,
    summary_prompt_name,
    summary_prompt_text_filename,
    summary_fcs_mode,
    enable_stream_query,
    summary_prompt_options,

    // Hybrid search
    hybrid_search_num_words,
    hybrid_search_lambda_long,
    hybrid_search_lambda_short,

    // Rerank
    rerank_num_results,
    reranker_name,
    user_function,

    // MMR
    mmr_diversity_bias,

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
    gtm_container_id,
    amplitude_api_key,

    // recommendation
    related_content,

    // Questions
    questions,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
