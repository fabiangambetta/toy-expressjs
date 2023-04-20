import { IncomingMessage, ServerResponse } from 'http';


export default class DecoratedResponse<Request extends IncomingMessage> extends ServerResponse<Request> {
  constructor(req: Request) {
    super(req);
  }

  send(data: any) {
    this.writeHead(200, { "Content-Type": "application/json" });
    this.end(JSON.stringify(data));
  }
}
