export interface IAbilityRepository {
    getAbilitiesDetails(abilitiesMetadata: any[]): Promise<any>;
}
