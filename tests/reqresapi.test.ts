import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
dotenv.config();

test.describe('ReqresAPI', () => {

    const apiKey = process.env.API_KEY!;
    const baseUrl = process.env.BASE_URL!;
    test('Validating GET API',async({request})=>{
        const response = await request.get(
            `${baseUrl}/users/2`,
            {
                headers:{
                    'x-api-key' : apiKey
                }
            }
        );
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
    });

    test('Validating POST API', async ({ request }) => {
        const response = await request.post(
            `${baseUrl}/users`,
            {
            headers: {
                'x-api-key': apiKey
            },
            data: {
                name: 'Kumar',
                job: 'QA Engineer'
            }
            }
        );

        expect(response.status()).toBe(201);

        const body = await response.json();

        console.log(body);

        expect(body.name).toBe('Kumar');
        expect(body.job).toBe('QA Engineer');
        expect(body.id).toBeTruthy();
        expect(body.createdAt).toBeTruthy();

    });

    test('Update User', async ({ request }) => {

        const response = await request.put(
            `${baseUrl}/users/2`,
            {
            headers: {
                'x-api-key': apiKey
            },
            data: {
                name: 'KumarVel',
                job: 'Senior QA'
            }
            }
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.name).toBe('KumarVel');
        expect(body.job).toBe('Senior QA');
        expect(body.updatedAt).toBeTruthy();

    });

    test('Delete User', async ({ request }) => {

        const response = await request.delete(
            `${baseUrl}/users/2`,
            {
            headers: {
                'x-api-key': apiKey
            }
            }
        );

        expect(response.status()).toBe(204);

    });
});