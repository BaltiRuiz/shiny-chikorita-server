import { Languages } from "../enums/languages.enums";
import { APIResource } from "../enums/api.enums";

export abstract class MapperService {
    protected getEntryByLanguage(entries: any[], lang: Languages, property: string): string {
        const entry = entries.find((entry: any) => entry.language.name === lang);

        return entry ? entry[property] : "Not found for this language";
    }

    public mapErrorAPIToResourceError(status: number, resourceType: APIResource, resourceID: string): string {
        let message: string;

        switch (status) {
            case 200:
                message = `${resourceType} with ID or name '${resourceID}' retrieved successfully`;
                break;
            case 404:
                message = `${resourceType} with ID or name '${resourceID}' does not exist`;
                break;
            case 500:
                message = `There was an internal error while retrieving ${resourceType} with ID or name '${resourceID}'`;
                break;
            default:
                message = `Undefined error while retrieving ${resourceType} with ID or name '${resourceID}'`;
        }

        return message;
    }

    public abstract mapResourceAPIToApplicationData(resourceAPIData: any): any;
}
