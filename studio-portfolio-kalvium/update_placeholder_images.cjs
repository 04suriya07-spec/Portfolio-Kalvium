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
    if (!fs.existsSync(filePath)) {
        console.error("Placeholder file not found:", filePath);
        return null;
    }
    try {
        const imageData = fs.readFileSync(filePath);
        const asset = await client.assets.upload('image', imageData, {
            filename: path.basename(filePath)
        });
        return {
            _type: 'image',
            asset: {
                _type: "reference",
                _ref: asset._id
            }
        };
    } catch (err) {
        console.error(`Failed to upload placeholder:`, err.message);
        return null;
    }
}

async function updateStudents() {
    console.log("Starting placeholder update...");

    const photoAsset = await uploadImage(placeholderPath);
    if (!photoAsset) return;

    const namesToUpdate = [
        'shyam',
        'Krishna',
        'srimati vijaya kumar',
        'srinithi vijaya kumar'
    ];

    // Fetch all students to match names
    const students = await client.fetch('*[_type == "student"]{_id, name}');

    for (const student of students) {
        const matches = namesToUpdate.some(target =>
            student.name.toLowerCase().includes(target.toLowerCase()) ||
            target.toLowerCase().includes(student.name.toLowerCase())
        );

        if (matches) {
            console.log(`Matching student found: ${student.name} (${student._id})`);
            await client.patch(student._id).set({ photo: photoAsset }).commit();
            console.log(`Updated photo for ${student.name}`);
        }
    }

    console.log("Update process complete.");
}

updateStudents().catch(console.error);
