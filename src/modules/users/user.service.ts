import { User } from '@prisma/client';
import { createUser, getUsers } from './user.storage';
import { CreateUserInput, GetUsers } from './types';

export async function createUserService(data: CreateUserInput): Promise<User> {
    return createUser(data);
}

export async function getUsersService(props: GetUsers): Promise<User[]> {
    return getUsers(props);
}