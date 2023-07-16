import { RequestListener } from "http";
import {
  ChainHandler,
  RouteNode,
  RouterMetaData,
  RouteSegmentType,
} from "../types";
import * as http from "http";
import { argv } from "process";

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

const getRouteMetadata = (
  tree: RouteNode,
  segments: Array<string>
): RouterMetaData => {
  const [segment, ...remainingSegments] = segments;
  const { handler, value, type, childrens } = tree;

  // If the current node has a handler defined and there are no more path elements left to process
  if (handler && remainingSegments.length === 0) {
    // If current node is a PARAM node, get current value and name
    const params = type === "PARAM" ? [{ name: value, value: segment }] : [];
    return { params, handler };
  }

  // Check if any child is the segment
  const matchSegment = childrens.find(
    (node) => node.value === segment && node.type === "SEGMENT"
  );

  if (matchSegment) {
    return getRouteMetadata(matchSegment, remainingSegments);
  }

  const matchParams = childrens.find((node) => node.type === "PARAM");

  if (matchParams) {
    const updatedSegments =
      remainingSegments.length === 0 ? segments : remainingSegments;
    const result = getRouteMetadata(matchParams, updatedSegments);

    if (remainingSegments.length !== 0) {
      return {
        params: [...result.params, { name: matchParams.value, value: segment }],
        handler: result.handler,
      };
    }

    return {
      params: [...result.params],
      handler: result.handler,
    };
  }

  throw new Error("No route was matched by path");
};

/*
const nextChaining = (handlers: ChainHandler | Array<ChainHandler>) => {
  const result: Array<RequestListener> = Array.isArray(handlers)
    ? handlers.map((handler, index) => {
        return (req, res) => {
          handler(req, res, () => {
            handlers[index + 1](req, res, () => {});
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
*/

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

export default { add, addRecursively, getRouteMetadata };
