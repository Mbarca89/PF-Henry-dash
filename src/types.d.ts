//User
export interface User {
    name:              string;
    email:             string;
    password?:          string;
    address:           string;
    city:              string;
    province:          string;
    postalCode:        number;
    role:              string;
    phone?:            string;
    commerceName?:     string;
    purchasedProducts?: any[];
    cart:              string;
    id:                string;
    active:            boolean
}

//Users
export interface Users extends Array<User> {}

//Products
export interface Products {
    name:         string;
    price:        number;
    description:  string;
    stock:        number;
    hasDiscount:  boolean;
    discount:     number;
    photos:       Photo[];
    category:     string;
    freeShipping: boolean;
    sales:        number;
    rating:       number;
    reviews:      any[];
    seller:       {id:string, name:string};
    isActive:     boolean;
    id:           string;
    ratingAverage: number;
}


export interface Photo {
    url:       string;
    public_id: string;
}
//


export interface Categorie {
    categoryName: string;
    products:     Product[];
    id:           string;
}

export interface Product {
    _id: string;
}
