import { IncomingMessage } from "http"
import { Params } from "../types"

export default class DecoratedRequest extends IncomingMessage {
    private _params: Array<Params> = [];

    public get params() {
        return this._params;
    }

    public set setParams(params: Array<Params>){
        this._params = params;
    }
}
