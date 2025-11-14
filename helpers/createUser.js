/**
 * Create a new user in OWASP Juice Shop via API
 * @param {import('@playwright/test').APIRequestContext} request
 */
async function createUser(request) {
  const randomId = Math.floor(Math.random() * 100000);
  const email = `Test${randomId}@example.com`;
  const password = 'Test@2025';

  const body = {
    email:email,
    password: password,
    passwordRepeat: password,
    securityQuestion: {
      id: 11,
      question: 'Your favorite book?',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    securityAnswer: 'Charles',
  };

  const res = await request.post('http://localhost:3000/api/Users', {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok()) {
    throw new Error('Failed to create user: ' + res.status() + ' - ' + (await res.text()));
  }

  const json = await res.json();
  console.log('User created:', email);
  return { email};
}

// Export the function
//module.exports = { createUser };
export { createUser };
