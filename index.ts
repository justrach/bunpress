import getUrl from "./helper/getUrl";


type RequestHandler = (request: Request) => Response;

interface Route {
  method: string;
  path: string;
  handler: RequestHandler;
}

export class BunPress {
  private routes: Route[] = [];

  // Define GET routes
  get(path: string, handler: RequestHandler): void {
    this.routes.push({ method: 'GET', path, handler });
  }

  // Define POST routes
  post(path: string, handler: RequestHandler): void {
    this.routes.push({ method: 'POST', path, handler });
  }

  // Internal method to handle the fetch requests
  private _handleRequest(request: Request): Response {
    const route = this.routes.find(r => r.method === request.method && getUrl(request.url) === r.path);

    if (route) {
      return route.handler(request);
    }

    return new Response("Welcome to BunExpress!"); // Default response
  }

  // Starts the server
  listen(port: number): void {
    const server = Bun.serve({
      port: port,
      fetch: (request) => this._handleRequest(request),
    });

    console.log(`Listening on localhost:${port}`);
  }
}
