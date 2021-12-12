import config from "./config.json";

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

const url: String = config.webhook_url;
const include: Array<String> = config.includeRepos;
const exclude: Array<String> = config.excludeRepos;

async function handleRequest(request: Request): Promise<Response> {
  request.url = url;

  let data = await request.json();
  let repo: String = data["repository"]["name"];

  let send: boolean = false;

  if (include != []) {
    send = include.includes(repo);
  } else if (exclude != []) {
    send = !exclude.includes(repo);
  }

  if (send) {
    return await fetch(request);
    
  } else {
    return new Response("ignored repository", {code: 418});
  }
}
