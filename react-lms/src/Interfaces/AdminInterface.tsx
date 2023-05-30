export interface UserContents {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status_id: number;
}

export interface BookContents {
    id: number;
    title: string;
    quantity: string;
    description: string;
}

export interface BookStatusContents {
    id: number;
    title: string;
    quantity: string;
    description: string;
    requestDate: Date;
    status: string;
}