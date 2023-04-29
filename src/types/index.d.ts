import * as http from 'http';

type RequestHandler = (req: Request, res: Response) => void;
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH"; 
type HttpMethodMap = {
    [method in HttpMethod]?: (path: string, handler: RequestHandler) => void;
}

type AppRouteHandle = {
    use: (path: string, middleware: RequestHandler) => void;
    listen: (port: number) => void;
}

type Application = HttpMethodMap & AppRouteHandle;

type RouteHandlers = Record<HttpMethod, Record<string, RequestHandler>>;
type MiddlewareHandlers = Record<string, RequestHandler>;
type Handle = (method: HttpMethod, path: string, handler: RequestHandler ) => void;
type Use = (path: string, middleware: RequestHandler) => void;

type RequestListenner = {
    routesToHandle: RouteHandlers;
    middlewares: MiddlewareHandlers;
    use: Use;
    handle: Handle;
    handleV2: Handle;
    listenner: RequestHandler;
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

type RequestParams = Record<string, string>;
type RouterMetaData = {
    params:  Array<Param>;
    handler:  http.RequestListener;
}


type Request = DecoratedRequest;
type Response = DecoratedResponse<Request>;
