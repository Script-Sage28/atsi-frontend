export interface Filter{
    brand?:string;
    category?:string;
    name?:string;
    status?:string;
    sort?: '' | 'asc' | 'desc' | 'lowest' | 'highest';
}