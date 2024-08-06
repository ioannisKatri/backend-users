import { User } from '@prisma/client';
import { handlePrismaError } from '../../commons';
import { CreateUserInput, GetUsers } from './types';
import prisma from '../../database/prisma';

export async function createUser(data: CreateUserInput): Promise<User> {
    try {
        return await prisma.user.create({
            data,
        });
    } catch (error) {
        throw handlePrismaError(error, data);
    }
}

export async function getUsers(props: GetUsers): Promise<User[]> {
    return prisma.user.findMany({
        orderBy: [
            {
                [props.orderBy]: props.sortBy,
            },
        ],
    });
}
