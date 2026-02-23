const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '2yvjamsp',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'skLDuBlFUMPXRQJbkbxhpPlZZjLGVxhsQhAScoKqwfFp3hKjfsalU2qXOvNyxbLtxDzaZ8W4MHhg8YMFNXaVqLSylcskRRfqIxyfWqOQVeaO2rLMmzJVB0k0Va8plBEhy8JTmPpJbVg5xsfzWfHOSRK8TQQuwROgQoJBhR067kufXCxigOlR'
});

const placeholderPath = path.join(__dirname, '..', 'public', 'avatars', 'none.png');

async function uploadImage(filePath) {
    const imageData = fs.readFileSync(filePath);
    const asset = await client.assets.upload('image', imageData, {
        filename: path.basename(filePath)
    });
    return {
        _type: 'image',
        asset: { _type: "reference", _ref: asset._id }
    };
}

async function run() {
    const photoAsset = await uploadImage(placeholderPath);
    const names = ['shyam', 'Krishna', 'srimati vijaya kumar', 'srinithi vijaya kumar'];

    const students = await client.fetch('*[_type == "student"]{_id, name}');

    for (const s of students) {
        if (names.some(n => s.name.toLowerCase().includes(n.toLowerCase()))) {
            await client.patch(s._id).set({ photo: photoAsset }).commit();
            console.log(`UPDATED: ${s.name}`);
        }
    }
}

run().catch(console.error);
