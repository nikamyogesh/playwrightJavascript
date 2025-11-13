const { test, expect } = require('@playwright/test');
const { createUser } = require('../../helpers/createUser');
const payload = require('./payload');


test.describe.serial('API Authentication', () => {

    // Define variables for token and basketId
    let authToken;
    let basketId;
    let testUser;


    // Run to create test user
    test.beforeAll(async ({ request }) => {
        testUser = await createUser(request);
        console.log('User created for tests:', testUser.email);
    });

    test('Login and get authentication token and basketId', async ({ request }) => {

        // payload using the generated user's email
        const loginPayload = payload.getLoginPayload(testUser.email);

        // Send login request
        const response = await request.post('/rest/user/login', {
            headers: { 'Content-Type': 'application/json' },
            data: loginPayload,
        });

        // Assert: HTTP status is 200 OK
        expect(response.status()).toBe(200);

        // Parse response body
        const body = await response.json();

        // Assert properties inside the response
        expect(body).toHaveProperty('authentication');
        expect(body.authentication).toHaveProperty('token');
        expect(body.authentication).toHaveProperty('bid');

        // Store token and basketId for later use
        authToken = body.authentication.token;
        basketId = body.authentication.bid;


    });


    test('GET all products returns successful response and valid data', async ({ request }) => {
        // Send GET request to products search endpoint
        const response = await request.get('/rest/products/search?q=');

        // Assert: HTTP status is 200 OK
        expect(response.status()).toBe(200);

        // Parse JSON response body
        const body = await response.json();

        // Assert: status is "success"
        expect(body.status).toBe('success');

        // Assert: data is an array, not empty, and contains expected product fields
        expect(Array.isArray(body.data)).toBe(true);
        expect(body.data.length).toBeGreaterThan(0);

        // Assert: required fields exist on the first product (sample check)
        const product = body.data[0];
        expect(product).toHaveProperty('id');
        expect(typeof product.id).toBe('number');
        expect(product).toHaveProperty('name');
        expect(typeof product.name).toBe('string');
        expect(product).toHaveProperty('description');
        expect(typeof product.description).toBe('string');
        expect(product).toHaveProperty('price');
        expect(typeof product.price).toBe('number');
        expect(product).toHaveProperty('image');
        expect(typeof product.image).toBe('string');
        expect(product).toHaveProperty('createdAt');
        expect(product).toHaveProperty('updatedAt');
        expect(product).toHaveProperty('deluxePrice');
        expect(typeof product.deluxePrice).toBe('number');
        expect(product).toHaveProperty('deletedAt');


    });

    test('Add product to basket', async ({ request }) => {

        // get the payload
        const addProductPayload = payload.getBasketAddPayload(basketId);

        // Make POST request to add item to basket
        const response = await request.post('/api/BasketItems/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: addProductPayload
        });

        // Assert response
        expect(response.status()).toBe(200);

        // Parse response body
        const body = await response.json();

        // Assert 'status' is 'success'
        expect(body.status).toBe('success');

        // Assert all expected fields
        expect(body.data).toHaveProperty('id');
        expect(typeof body.data.id).toBe('number');
        expect(body.data.ProductId).toBe(5);
        expect(String(body.data.BasketId)).toBe(String(basketId));
        expect(body.data.quantity).toBe(1);

        // Assert createdAt/updatedAt are valid date strings (optional, regexp for ISO format)
        expect(new Date(body.data.createdAt).toString()).not.toBe('Invalid Date');
        expect(new Date(body.data.updatedAt).toString()).not.toBe('Invalid Date');

    });

    test('Add product to basket without Authorization header returns 401', async ({ request }) => {

        // get the payload
        const addProductPayload = payload.getBasketAddPayload(basketId);

        // Make POST request to add item to basket
        const response = await request.post('/api/BasketItems/', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: addProductPayload
        });

        // Assert response
        expect(response.status()).toBe(401);

    });

    test('Test place order', async ({ request }) => {

        // get the payload
        const placeOrderPayloadPayload = payload.placeOrderPayload;

        // Make POST request to add item to basket
        const response = await request.post('/b2b/v2/orders', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: placeOrderPayloadPayload
        });

        // Parse response body
        const body = await response.json();

        // Assert response
        expect(response.status()).toBe(200);

        // Assert all required fields are present
        expect(body).toHaveProperty('cid');
        expect(typeof body.cid).toBe('string');
        expect(body).toHaveProperty('orderNo');

    });






});

