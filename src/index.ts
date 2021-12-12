import {
  webhook as url,
  token as configToken,
  includeRepos as include,
  excludeRepos as exclude
} from "./config";

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

class GithubPacket {
  repository: {name: string}

  constructor(repository: {name: string}) {
    this.repository = repository;
  }
}

async function handleRequest(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const reqToken = searchParams.get("token")
  if (reqToken !== configToken) {
    return new Response("Invalid token", {status: 401});
  }

  let data = await request.json();
  let packet = data as GithubPacket;
  const repo: string = packet.repository.name;

  let reqUrl = `${url}/${reqToken}/github`;
  let reqHeaders = new Headers(request.headers);
  reqHeaders.delete("host");
  let req = new Request(reqUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: reqHeaders,
  });
  // request.url = 

  let send: boolean = true;

  if (include.length !== 0) {
    send = include.includes(repo);
  } else if (exclude.length !== 0) {
    send = !exclude.includes(repo);
  }

  if (send) {
    return await fetch(req);
  } else {
    return new Response("ignored repository", {status: 418});
  }
}
