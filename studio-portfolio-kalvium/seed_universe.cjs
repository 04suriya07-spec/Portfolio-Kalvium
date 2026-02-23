const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '2yvjamsp',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'skLDuBlFUMPXRQJbkbxhpPlZZjLGVxhsQhAScoKqwfFp3hKjfsalU2qXOvNyxbLtxDzaZ8W4MHhg8YMFNXaVqLSylcskRRfqIxyfWqOQVeaO2rLMmzJVB0k0Va8plBEhy8JTmPpJbVg5xsfzWfHOSRK8TQQuwROgQoJBhR067kufXCxigOlR'
});

async function seedUniverse() {
    console.log("Seeding Universe data...");

    const entries = [
        {
            _type: 'universe',
            title: 'Project Nebula: AI-Enhanced Portfolio Engine',
            category: 'tech',
            description: 'A revolutionary core update to our portfolio system integrating framer-motion physics with real-time Sanity CMS sync, establishing a new standard for squad visual identities.',
            date: '2024-02-15',
            priority: 9,
            url: 'https://github.com/04suriya07-spec/Portfolio-Kalvium'
        },
        {
            _type: 'universe',
            title: 'Squad 139: The First Ascent Milestone',
            category: 'milestone',
            description: 'Commemorating the successful deployment of all 50 operative dossiers into the digital cloud. This milestone marks our transition from individual development to a collective technical force.',
            date: '2024-02-20',
            priority: 10
        }
    ];

    for (const entry of entries) {
        try {
            const result = await client.create(entry);
            console.log(`Created Entry: ${result.title}`);
        } catch (err) {
            console.error(`Failed to create entry:`, err.message);
        }
    }

    console.log("Seeding complete.");
}

seedUniverse().catch(console.error);
