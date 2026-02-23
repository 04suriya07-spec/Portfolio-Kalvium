const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '2yvjamsp',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'skLDuBlFUMPXRQJbkbxhpPlZZjLGVxhsQhAScoKqwfFp3hKjfsalU2qXOvNyxbLtxDzaZ8W4MHhg8YMFNXaVqLSylcskRRfqIxyfWqOQVeaO2rLMmzJVB0k0Va8plBEhy8JTmPpJbVg5xsfzWfHOSRK8TQQuwROgQoJBhR067kufXCxigOlR'
});

async function main() {
    const doc = await client.fetch('*[_type == "leadership"][0]');
    if (!doc) return console.error('Doc not found');

    const updatedHonors = doc.honors.map(h => {
        if (h.name === "Jalaj Joshi") {
            return {
                ...h,
                details: "A pioneer technical mentor at Kalvium, instrumental in architecting the core growth strategies for student squads and fostering a culture of excellence."
            };
        }
        return h;
    });

    await client.patch(doc._id).set({ honors: updatedHonors }).commit();
    console.log("Updated Jalaj Joshi successfully.");
}

main();
