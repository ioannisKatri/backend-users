import { User } from '@prisma/client';
import { CreateUserInput, GetUsers } from '../../src/modules/users/types';
import { createUser, getUsers } from '../../src/modules/users/user.storage';
import { createUserService, getUsersService } from '../../src/modules/users/user.service';

jest.mock('../../src/modules/users/user.storage', () => ({
    createUser: jest.fn(),
    getUsers: jest.fn(),
}));

describe('User Service', () => {
    describe('createUserService', () => {
        it('should create a user successfully', async () => {
            const userData: CreateUserInput = {
                name: 'Test User',
                email: 'test@example.com',
            };

            const createdUser: User = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                createdAt: new Date(),
            };

            (createUser as jest.Mock).mockResolvedValue(createdUser);

            const result = await createUserService(userData);

            expect(createUser).toHaveBeenCalledWith(userData);
            expect(result).toEqual(createdUser);
        });

        it('should throw an error if user creation fails', async () => {
            const userData: CreateUserInput = {
                name: 'Test User',
                email: 'test@example.com',
            };

            (createUser as jest.Mock).mockRejectedValue(new Error('User creation failed'));

            await expect(createUserService(userData)).rejects.toThrow('User creation failed');
        });
    });

    describe('getUsersService', () => {
        it('should retrieve a list of users', async () => {
            const query: GetUsers = {
                orderBy: 'createdAt',
                sortBy: 'desc',
            };

            const users: User[] = [
                {
                    id: 1,
                    name: 'Test User 1',
                    email: 'test1@example.com',
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    name: 'Test User 2',
                    email: 'test2@example.com',
                    createdAt: new Date(),
                },
            ];

            (getUsers as jest.Mock).mockResolvedValue(users);

            const result = await getUsersService(query);

            expect(getUsers).toHaveBeenCalledWith(query);
            expect(result).toEqual(users);
        });

        it('should throw an error if user retrieval fails', async () => {
            const query: GetUsers = {
                orderBy: 'createdAt',
                sortBy: 'desc',
            };

            (getUsers as jest.Mock).mockRejectedValue(new Error('User retrieval failed'));

            await expect(getUsersService(query)).rejects.toThrow('User retrieval failed');
        });
    });
});
