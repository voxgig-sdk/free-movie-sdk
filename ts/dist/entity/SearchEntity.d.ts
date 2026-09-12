import { FreeMovieEntityBase } from '../FreeMovieEntityBase';
import type { FreeMovieSDK } from '../FreeMovieSDK';
import type { Control } from '../types';
import type { Search, SearchListMatch } from '../FreeMovieTypes';
declare class SearchEntity extends FreeMovieEntityBase<Search> {
    constructor(client: FreeMovieSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    list(this: any, reqmatch?: SearchListMatch, ctrl?: Control): Promise<SearchEntity[]>;
}
export { SearchEntity };
