export interface Product {
    id?:string;
    title?:string;
    price?:number;
    description?:string;
    image?:string;
    rating?:{
        rate?:number;
        count?:number;
    }
    categoryID?:number;
}