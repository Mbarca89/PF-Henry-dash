//User
export interface User {
    name:       string;
    email:      string;
    password:   string;
    address:    string;
    city:       string;
    province:   string;
    postalCode: number;
    role:       string;
    cart:       string;
    id:         string;
}
//Products
export interface Products {
    name:         string;
    price:        number;
    description:  string;
    stock:        number;
    hasDiscount:  boolean;
    discount:     number;
    photos:       Photo[];
    freeShipping: boolean;
    sales:        number;
    rating:       number;
    id:           string;
}


export interface Photo {
    url:       string;
    public_id: string;
}
//

