const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '2yvjamsp',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'skfeFvmLWTaN06uzFXU1pUS2r7su3hY0QYQv9kEtm9xtXkTxsqiDHl7f7W5RUUOWAcH048iT45RFqMhvVyOPg5hn3B5i9lwO0kq6zTfE32PklPpAJ7NwvZe7SlyrmrqRbijUcGyVDAzIvpESvprPPMQsqs1dhgC32P5rn3FTIQyQH6hLGt7x'
});

async function check() {
    try {
        const user = await client.users.getById('me');
        console.log('Token Identity:', user);
    } catch (err) {
        console.error('Check failed:', err.message);
    }
}

check();
