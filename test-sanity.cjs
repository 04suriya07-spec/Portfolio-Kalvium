const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: "2yvjamsp",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});

async function test() {
    try {
        const query = `*[_type == "student"] {
            "id": _id,
            name,
            role
        }`;
        console.log("Running query...");
        const data = await client.fetch(query);
        console.log("Data received:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

test();
