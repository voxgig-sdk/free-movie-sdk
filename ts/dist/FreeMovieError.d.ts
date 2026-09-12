import { Context } from './Context';
declare class FreeMovieError extends Error {
    isFreeMovieError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FreeMovieError };
