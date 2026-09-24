"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeMovieError = void 0;
class FreeMovieError extends Error {
    isFreeMovieError = true;
    sdk = 'FreeMovie';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.FreeMovieError = FreeMovieError;
//# sourceMappingURL=FreeMovieError.js.map