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
});