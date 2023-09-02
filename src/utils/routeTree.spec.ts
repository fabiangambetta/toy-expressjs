import type { IncomingMessage, ServerResponse } from 'http';
import type { RouteNode } from '../types';
import routeTree from './routeTree'

const reqMock = {
    body: {},
    query: {},
    params: {},
    headers: {},
    get: jest.fn(),
} as unknown as IncomingMessage;

  const resMock = {
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
  } as unknown as ServerResponse<IncomingMessage>;


describe('getRouteMetaData Method', () => {

    // /segmentA/:paramA/segmentB/
    const rootNodeA: RouteNode = {
        value: '',
        type: 'ROOT',
        childrens: [ {
            value: 'segmentA',
            type: 'SEGMENT',
            childrens: [
                {
                    value: ':paramA',
                    type: 'PARAM',
                    handler: (req, res) => {
                        return "I am the handler for paramA";
                    },
                    childrens: [
                        {
                            value: 'segmentB',
                            type: 'SEGMENT',
                            childrens: [],
                            handler: (req, res) => {
                                return "I am the handler for segmentB";
                            }
                        }]
                }
            ]
        }],

    }

    it('GIVEN: The route /segmentA/valueParamA/segmentB THEN return value of paramA equal to valueParamA and the registred handler for segmentB ', ()=> {
        const routeMetaData = routeTree.getRouteMetaData(rootNodeA , ['segmentA', 'valueParamA', 'segmentB']);
        expect(routeMetaData.params).toHaveLength(1);
        expect(routeMetaData.params[0].value).toBe('valueParamA');
        expect(routeMetaData.params[0].name).toBe(':paramA');
        expect(routeMetaData.handler).toBeDefined();
        expect(routeMetaData.handler(reqMock, resMock)).toBe("I am the handler for segmentB");
    });

    it('GIVEN: The route /segmentA/valueParamA THEN return value of paramA equal to valueParamA and the registred handler for paramA ', ()=> {
        const routeMetaData = routeTree.getRouteMetaData(rootNodeA , ['segmentA', 'valueParamA']);
        expect(routeMetaData.params).toHaveLength(1);
        expect(routeMetaData.params[0].value).toBe('valueParamA');
        expect(routeMetaData.params[0].name).toBe(':paramA');
        expect(routeMetaData.handler).toBeDefined();
        expect(routeMetaData.handler(reqMock, resMock)).toBe("I am the handler for paramA");
    });


    // /segmentA/:paramA/:paramB/
    const rootNodeB: RouteNode = {
        value: '',
        type: 'ROOT',
        childrens: [ {
            value: 'segmentA',
            type: 'SEGMENT',
            childrens: [
                {
                    value: ':paramA',
                    type: 'PARAM',
                    handler: (req, res) => {
                        return "I am the handler for paramA";
                    },
                    childrens: [
                        {
                            value: ':paramB',
                            type: 'PARAM',
                            childrens: [],
                            handler: (req, res) => {
                                return "I am the handler for paramB";
                            }
                        }]
                }
            ]
        }],

    }

    it('GIVEN: The route /segmentA/valueParamA/valueParamB THEN return value of paramA equal to valueParamA, param B equal to valueParamB and the registred handler for paramB ', ()=> {
        const routeMetaData = routeTree.getRouteMetaData(rootNodeB , ['segmentA', 'valueParamA', 'valueParamB']);
        expect(routeMetaData.params).toHaveLength(2);

        expect(routeMetaData.params[0].value).toBe('valueParamB');
        expect(routeMetaData.params[0].name).toBe(':paramB');

        expect(routeMetaData.params[1].value).toBe('valueParamA');
        expect(routeMetaData.params[1].name).toBe(':paramA');
        expect(routeMetaData.handler).toBeDefined();
        expect(routeMetaData.handler(reqMock, resMock)).toBe("I am the handler for paramB");
    });
});