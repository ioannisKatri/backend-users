import prisma from '../src/database/prisma';
import { execSync } from 'child_process';

test('example test', () => {
    expect(true).toBe(true);
});

beforeAll(async () => {
    await prisma.$connect()
});

afterAll(async () => {
    await prisma.$disconnect();
});
