import { RequestListener } from "http";

type RequestHandler = (req: Request, res: Response) => void;
type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "TRACE"
  | "CONNECT";

type HttpMethodMap = {
  [method in HttpMethod]: (
    path: string,
    handler: ChainHandler,
    ...handlers: Array<ChainHandler>
  ) => void;
};

type AppRouteHandle = {
  use: (path: string, middleware: RequestHandler) => void;
  listen: (port: number) => void;
};

type Application = HttpMethodMap & AppRouteHandle;

type RouteHandlers = Record<HttpMethod, Record<string, RequestHandler>>;
type MiddlewareHandlers = Record<string, RequestHandler>;
type Handle = (
  method: HttpMethod,
  path: string,
  handler: ChainHandler | Array<ChainHandler>
) => void;
type MountMiddleware = (path: string, middleware: RequestHandler) => void;

type RequestListenner = {
  middlewares: MiddlewareHandlers;
  mount: MountMiddleware;
  handle: Handle;
  onRequest: RequestHandler;
  handlers: Record<HttpMethod, RouteNode>;
};

type RouteSegmentType = "PARAM" | "SEGMENT" | "ROOT";

type RouteNode = {
  value: string;
  type: RouteSegmentType;
  childrens: Array<RouteNode>;
  handler?: RequestListener;
};

type Param = {
  name: string;
  value: string;
};

type RequestParams = Record<string, string>;
type RouterMetaData = {
  params: Array<Param>;
  handler: RequestListener;
};

type Request = DecoratedRequest;
type Response = DecoratedResponse<Request>;

type NextFunction = () => void;
type ChainHandler = (req: Request, res: Response, next: NextFunction) => void;
