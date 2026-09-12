import { FreeMovieEntityBase } from '../FreeMovieEntityBase';
import type { FreeMovieSDK } from '../FreeMovieSDK';
import type { Control } from '../types';
import type { Movie, MovieLoadMatch } from '../FreeMovieTypes';
declare class MovieEntity extends FreeMovieEntityBase<Movie> {
    constructor(client: FreeMovieSDK, entopts: any);
    make(this: MovieEntity): MovieEntity;
    load(this: any, reqmatch?: MovieLoadMatch, ctrl?: Control): Promise<MovieEntity>;
}
export { MovieEntity };
