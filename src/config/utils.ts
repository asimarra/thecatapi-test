import { Filters } from '../application/interfaces/thirdparty/api.cat.interfaces';

export class Utils {
    static dinamicURLSearchParams(filters: Filters) {
        const params = new URLSearchParams();

        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                params.append(key, filters[key].toString());
            }
        }

        return params.toString();
    }
}