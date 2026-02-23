const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '2yvjamsp',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'skLDuBlFUMPXRQJbkbxhpPlZZjLGVxhsQhAScoKqwfFp3hKjfsalU2qXOvNyxbLtxDzaZ8W4MHhg8YMFNXaVqLSylcskRRfqIxyfWqOQVeaO2rLMmzJVB0k0Va8plBEhy8JTmPpJbVg5xsfzWfHOSRK8TQQuwROgQoJBhR067kufXCxigOlR'
});

async function verify() {
    const students = await client.fetch('*[_type == "student" && (name match "shyam" || name match "Krishna" || name match "srimati" || name match "srinithi")]{_id, name, "hasPhoto": defined(photo)}');
    console.log(JSON.stringify(students, null, 2));
}

verify().catch(console.error);
