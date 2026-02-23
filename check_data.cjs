const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: "2yvjamsp",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: "skO5R20qLzFm5i5yD6i7H7S5R20qLzFm5i5yD6i7H7S5R20qLzFm5i5yD6i7H7S5R20qLzFm5i5yD6i7H7S5R20qLzFm5i5yD6i7H7S5R20qLzFm5i5yD6i7H7S5R20qLz" // I don't have a token here, but usually I don't need one for public read
});

async function check() {
    try {
        const squad = await client.fetch('*[_type == "squadInfo"][0]');
        const leadership = await client.fetch('*[_type == "leadership"][0]');
        const students = await client.fetch('*[_type == "student"]');
        const roadmap = await client.fetch('*[_type == "squadRoadmap"][0]');

        console.log("Check Status:");
        console.log("Squad Info:", squad ? "EXISTS" : "MISSING");
        console.log("Leadership:", leadership ? "EXISTS" : "MISSING");
        console.log("Students Count:", students.length);
        console.log("Roadmap:", roadmap ? "EXISTS" : "MISSING");
    } catch (e) {
        console.error("Fetch Error:", e.message);
    }
}

check();
