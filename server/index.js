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
    const contentType = req.headers['content-type'] || 'application/json';
    proxyReq.setHeader("Content-Type", contentType);

    const acceptHeader = req.headers['accept'] || 'application/json';
    proxyReq.setHeader("Accept", acceptHeader);


    // Set other required headers
    proxyReq.setHeader("customer-id", process.env.customer_id);
    proxyReq.setHeader("x-api-key", process.env.api_key);
    proxyReq.setHeader("grpc-timeout", "60S");
    proxyReq.setHeader("X-Source", "vectara-answer");

    if (req.body) {
      const bodyData = { ...req.body };
      if (bodyData.logQuery) {
        delete bodyData.logQuery;
      }
      const bodyString = JSON.stringify(bodyData);
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyString));
      proxyReq.write(bodyString);
    }
  },
  selfHandleResponse: true,
  onProxyRes: (proxyRes, req, res) => {
    const contentType = proxyRes.headers['content-type'] || 'application/json';
    Object.keys(proxyRes.headers).forEach(key => {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== 'content-length' && lowerKey !== 'transfer-encoding') {
        res.setHeader(key, proxyRes.headers[key]);
      }
    });

    res.statusCode = proxyRes.statusCode;
    if (contentType.includes('text/event-stream')) {

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Transfer-Encoding", "chunked");

      proxyRes.on('data', (chunk) => {
        res.write(chunk);
      });

      proxyRes.on('end', () => {
        res.end();
      });

      proxyRes.on('error', (error) => {
        console.error("Proxy response error (streaming):", error);
        res.status(500).send({ error: "Proxy response error (streaming)" });
      });
    }
    else {
      proxyRes.pipe(res);
      proxyRes.on("error", (error) => {
        console.error("Response error:", error);
        res.status(500).send({ error: "Proxy response error" });
      });
    }
  }
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
    intelligent_query_rewriting,

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
    intelligent_query_rewriting,

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
