export type GetUsers = {
    orderBy: string;
    sortBy: 'asc' | 'desc';
}

export type CreateUserInput = {
    name: string;
    email: string;
}