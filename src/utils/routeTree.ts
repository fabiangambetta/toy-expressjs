import { RequestListener } from "http";
import type {
  ChainHandler,
  RouteNode,
  RouterMetaData,
  RouteSegmentType,
} from "../types";

const add = (
  tree: RouteNode,
  route: string,
  handler: ChainHandler | Array<ChainHandler>
) => {
  if (!tree || tree.type !== "ROOT")
    throw new Error(
      "The expected element tree must be the root of the routeTree"
    );
  if (!route) throw new Error("Invalid route path");
  const segments = route.split("/").filter((segment) => segment != "");
  addRecursively(tree, segments, handler);
};

const addRecursively = (
  tree: RouteNode,
  segments: Array<string>,
  handler: ChainHandler | Array<ChainHandler>
) => {
  if (segments.length === 0) return;
  const segment = segments[0];
  const remainingSegments = segments.slice(1);

  const isParam = segment.startsWith(":");
  const type: RouteSegmentType = isParam ? "PARAM" : "SEGMENT";
  const value = isParam ? segment.substring(1) : segment;

  if (!tree.childrens.some((node) => node.value === value)) {
    const newChild: RouteNode = {
      value,
      type,
      childrens: [],
    };
    if (remainingSegments.length === 0)
      newChild.handler = nextChaining(handler)[0];
    tree.childrens.push(newChild);
  }
  addRecursively(
    tree.childrens.find((node) => node.value === value)!,
    remainingSegments,
    handler
  );
};

/**
 *
 * @param tree An in-memory structure that, for each registered route, knows, among other things,
 * the handler responsible for addressing a request for that route.
 * @param segments A list of segments from the url, /segA/segB/segC -> ["segA", "segB", "segC"]
 * @returns An object with the handler and the params extracted from the url.
 */

const getRouteMetaData = (
  tree: RouteNode,
  segments: Array<string>
): RouterMetaData => {
  const { handler, value, type, childrens } = tree;
  const [segment, ...remainingSegments] = segments;
  if (type === "ROOT") {
    if (segments.length === 0) return { params: [], handler: handler! };
    else {
      const firstSegment = segments[0];
      const segmentMatch = childrens.find(
        (node) => node.value === firstSegment
      );
      if (segmentMatch) return getRouteMetaData(segmentMatch, segments);
      else {
        const paramMatch = childrens.find((node) => node.type === "PARAM");
        if (paramMatch) return getRouteMetaData(paramMatch, segments);
        else throw new Error("No route was matched by path");
      }
    }
  }

  if(type === "SEGMENT"){
    if(remainingSegments.length === 0){
      // Soy el handler buscado para un segment
      return { params: [], handler: handler! };
    }
    else {
      const segmentMatch = childrens.find(
        (node) => node.value === remainingSegments[0]
      );
      if (segmentMatch)
        // si el siguiente también es un segment
        return getRouteMetaData(
          segmentMatch,
          remainingSegments
        ); // Elimino el primro
      else {
        const paramMatch = childrens.find((node) => node.type === "PARAM");
        if (paramMatch) {
          return getRouteMetaData(paramMatch, remainingSegments);
        } else {
          throw new Error("No route was matched by path");
        }
      }
    }
  }

  if(type === "PARAM") {
    if (remainingSegments.length === 0) {
      // Soy el handler buscado para un param
      return { params: [{ name: value, value: segment }], handler: handler! };
    }

    // Si soy un param conservo el valor de mi segment
    if (remainingSegments.length !== 0) {
      const currentParam = { name: value, value: segment };
      const segmentMatch = childrens.find(
        (node) => node.value === remainingSegments[0]
      );
      if (segmentMatch) {
        // si el siguiente también es un segment
        const result = getRouteMetaData(segmentMatch, remainingSegments); // Elimino el primro
        return {
          params: [...result.params, currentParam],
          handler: result.handler,
        };
      } else {
        const paramMatch = childrens.find((node) => node.type === "PARAM");
        if (paramMatch) {
          const result = getRouteMetaData(paramMatch, remainingSegments);
          return {
            params: [...result.params, currentParam],
            handler: result.handler,
          };
        } else {
          throw new Error("No route was matched by path");
        }
      }
    }
  }


  throw new Error("No route was matched by path");
};

const nextChaining = (handlers: ChainHandler | Array<ChainHandler>) => {
  const result: Array<RequestListener> = Array.isArray(handlers)
    ? handlers.map((handler, index) => {
        return (req, res) => {
          handler(req, res, () => {
            if (index < handlers.length - 1) {
              result[index + 1](req, res);
            } else {
              // Ejecutar middleware final a falta de next
            }
          });
        };
      })
    : [
        (req, res) => {
          handlers(req, res, () => {});
        },
      ];
  return result;
};

export default { add, addRecursively, getRouteMetaData };
