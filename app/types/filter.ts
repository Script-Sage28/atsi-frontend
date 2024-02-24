export interface Filter{
    brand?:{ name: string; id: string };
    category?:{ name: string; id: string };
    name?:string;
    status?:string;
    sort?: '' | 'asc' | 'desc' | 'lowest' | 'highest';
    price?: '' | 'asc' | 'desc'
}