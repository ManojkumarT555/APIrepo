import {test,expect} from '@playwright/test';

test.describe('PlaceholderAPI', () => {
    test('Validating GET API',async({request})=>{
        const response = await request.get(
            'https://jsonplaceholder.typicode.com/users/10'
            // { timeout: 30000 }
        );
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);
        expect(body.id).toBe(10);
        expect(body.name).toContain('DuBuque'); //partial text check
        expect(body.username).toBe('Moriah.Stanton'); //fulltext
    });

    test('Validating POST API',async({request})=>{
        const response = await request.post(
            'https://jsonplaceholder.typicode.com/users',
            {
                data:{
                    name: 'Kumar',
                    username: 'Kumar22'
                }
            }
        );
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.name).toBe('Kumar');
        expect(body.username).toBe('Kumar22');
        expect(body.id).toBeTruthy();
    });
});