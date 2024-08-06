import request from 'supertest';
import app from '../../src/app';
import generateUniqueEmail from '../helpers';

describe('POST /v1/users', () => {
    it('should create a user successfully', async () => {
        const userData = {
            name: 'Test User',
            email: generateUniqueEmail()
        };
        const response = await request(app)
            .post('/v1/users')
            .send(userData)
            .expect(201);

        const { data } = response.body;

        expect(response.body).toEqual(expect.objectContaining({
            status: 'success',
            data: {
                ...userData,
                id: data.id,
                createdAt: data.createdAt,
            }
        }));
    });

    it('should return 409 if email already exists', async () => {
        const userData = {
            name: 'Test User',
            email: generateUniqueEmail()
        };

        await request(app).post('/v1/users').send(userData).expect(201);

        const response = await request(app)
            .post('/v1/users')
            .send(userData)
            .expect(409);

        expect(response.body).toEqual(expect.objectContaining({
            status: 'error',
            message: expect.stringContaining(''),
            details: []
        }));
    });
});

describe('GET /v1/users', () => {
    it('should return users sorted by createdAt in descending order by default', async () => {
        const userData1 = {
            name: 'Test User 1',
            email: generateUniqueEmail()
        };
        const userData2 = {
            name: 'Test User 2',
            email: generateUniqueEmail()
        };

        await request(app).post('/v1/users').send(userData1).expect(201);
        await request(app).post('/v1/users').send(userData2).expect(201);

        const response = await request(app)
            .get('/v1/users?orderBy=createdAt&sortBy=desc')
            .expect(200);

        const { data } = response.body;

        expect(response.body).toEqual(expect.objectContaining({
            status: 'success',
            data: expect.arrayContaining([
                expect.objectContaining({
                    name: userData2.name,
                    email: userData2.email,
                }),
                expect.objectContaining({
                    name: userData1.name,
                    email: userData1.email,
                }),
            ]),
        }));

        expect(new Date(data[0].createdAt).getTime()).toBeGreaterThan(new Date(data[1].createdAt).getTime());
    });

    it('should return users sorted by createdAt in ascending order', async () => {
        const userData1 = {
            name: 'Test User 3',
            email: generateUniqueEmail()
        };
        const userData2 = {
            name: 'Test User 4',
            email: generateUniqueEmail()
        };

        await request(app).post('/v1/users').send(userData1).expect(201);
        await request(app).post('/v1/users').send(userData2).expect(201);

        const response = await request(app)
            .get('/v1/users?orderBy=createdAt&sortBy=asc')
            .expect(200);

        const { data } = response.body;

        expect(response.body).toEqual(expect.objectContaining({
            status: 'success',
            data: expect.arrayContaining([
                expect.objectContaining({
                    name: userData1.name,
                    email: userData1.email,
                }),
                expect.objectContaining({
                    name: userData2.name,
                    email: userData2.email,
                }),
            ]),
        }));

        expect(new Date(data[0].createdAt).getTime()).toBeLessThan(new Date(data[1].createdAt).getTime());
    });
});
