import { RouteNode, RouterMetaData, RouteSegmentType } from "../types";
import * as http from "http";

const add = (tree: RouteNode, route: string, handler: http.RequestListener) => {
  if (!tree || tree.type !== "ROOT")
    throw new Error(
      "The expected element tree must be the root of the routeTree"
    );
  if (!route) throw new Error("Invalid route path");
  const segments = route.split("/");
  addRecursively(tree, segments, handler);
};

const addRecursively = (
  tree: RouteNode,
  segments: Array<string>,
  handler: http.RequestListener
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
    if(remainingSegments.length === 0)
        newChild.handler = handler;
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
  const segment = segments[0];
  const remainingSegments = segments.slice(1);

  const { handler, value, type } = tree;
  if (handler && type === "PARAM") {
    return { params: [{ name: value, value: segment }], handler };
  }
  if (handler) {
    return { params: [], handler };
  }

  const { childrens } = tree;

  // Valido si es un segmento de una ruta
  const matchSegment = childrens.find(
    (node) => node.value === segment && node.type === "SEGMENT"
  );

  if (matchSegment) return getRouteMetadata(matchSegment, remainingSegments);
  else {
    // valido si es un param
    const matchParams = childrens.find((node) => node.type === "PARAM");
    if (matchParams) {
      const result = getRouteMetadata(matchParams, remainingSegments);
      return {
        params: [...result.params, { name: matchParams.value, value: segment }],
        handler: result.handler,
      };
    } else {
      throw new Error("No route was matched by path");
    }
  }
};

export default { add, addRecursively, getRouteMetadata };
