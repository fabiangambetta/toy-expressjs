import * as http from 'http';

export type Request = http.IncomingMessage;
export type RequestHandler = (req: Request, res:any) => void;

type SimpleHandler = (req: SimpleRequest, res: SimpleResponse) => void;
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH"; 
type MethodIndexed = {
    [method in HttpMethod]?: (path: string, handler: SimpleHandler) => void;
}

type ApplicationServer = {
    use: (path: string, middleware: SimpleHandler) => void;
    listen: (port: number) => void;
}

type Application = MethodIndexed & ApplicationServer;

type RouteHandlers = Record<HttpMethod, Record<string, SimpleHandler>>;
type MiddlewareHandlers = Record<string, SimpleHandler>;
type Handle = (method: HttpMethod, path: string, handler: SimpleHandler ) => void;
type Use = (path: string, middleware: SimpleHandler) => void;

type RequestListenner = {
    routesToHandle: RouteHandlers;
    middlewares: MiddlewareHandlers;
    use: Use;
    handle: Handle;
    handleV2: Handle;
    listenner: SimpleHandler;
    handlers: Record<HttpMethod, RouteNode>;
}

type RouteSegmentType = "PARAM" | "SEGMENT" | "ROOT";

type RouteNode = {
    value: string;
    type: RouteSegmentType;
    childrens: Array<RouteNode>;
    handler?: http.RequestListener;
}

type Param = {
    name: string;
    value: string;
}

type Params = Array<Param>;
type RouterMetaData = {
    params: Params;
    handler:  http.RequestListener;
}


type SimpleRequest = DecoratedRequest;
type SimpleResponse = DecoratedResponse<SimpleRequest>;
