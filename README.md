# GitHub Webhook Proxy

A simple Cloudflare Worker for proxying and filtering GitHub webhooks.

### Getting Started

Only two configuration files are required to deploy this worker. Remember it's probably not a good idea to include your
configuration files in an open-source repository, especially your webhook information!

#### wrangler.toml

Copy/rename `wrangler.example.toml` to `wrangler.toml`, and fill in your info!

#### config.ts

Copy/rename `config.example.ts` to `config.ts`, and fill in your info!

### worker-typescript-template

This project uses Cloudflare's [worker-typescript-template](https://github.com/cloudflare/worker-typescript-template).
For info on installing/deploying/developing/testing/etc, check our their repo!
