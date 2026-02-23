const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
    projectId: '2yvjamsp',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'skLDuBlFUMPXRQJbkbxhpPlZZjLGVxhsQhAScoKqwfFp3hKjfsalU2qXOvNyxbLtxDzaZ8W4MHhg8YMFNXaVqLSylcskRRfqIxyfWqOQVeaO2rLMmzJVB0k0Va8plBEhy8JTmPpJbVg5xsfzWfHOSRK8TQQuwROgQoJBhR067kufXCxigOlR'
});

async function uploadImage(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const imageData = fs.readFileSync(filePath);
    const asset = await client.assets.upload('image', imageData, {
        filename: path.basename(filePath)
    });
    return {
        _type: 'image',
        asset: { _type: "reference", _ref: asset._id }
    };
}

async function addMoreUniverse() {
    console.log("Expanding Universe entries...");

    const imageSource = path.join(__dirname, '..', 'public', 'avatars', 'Rahul.jpg'); // Using a general high-quality image from the pool
    const techImage = await uploadImage(path.join(__dirname, '..', 'public', 'avatars', 'Yugesh.jpg'));
    const milestoneImage = await uploadImage(path.join(__dirname, '..', 'public', 'avatars', 'Nandha.jpg'));

    const entries = [
        {
            _type: 'universe',
            title: 'The Silicon Synthesis: Squad Hackathon Win',
            category: 'tech',
            description: 'Squad 139 operatives secured the top position in the Inter-Campus Silicon Synthesis Hackathon, demonstrating superior architectural planning and AI implementation.',
            date: '2024-01-10',
            priority: 8,
            image: techImage
        },
        {
            _type: 'universe',
            title: 'Operation Blue Sky: First Cloud Deployment',
            category: 'milestone',
            description: 'Successfully migrated our legacy infrastructure to a decentralized cloud environment, achieving 99.9% uptime for the entire squad registry.',
            date: '2024-02-05',
            priority: 9,
            image: milestoneImage
        },
        {
            _type: 'universe',
            title: 'Neural Codex: Intelligence Integration',
            category: 'research',
            description: 'Initiating the research phase for Neural Codex—a project aimed at integrating personal AI agents for every student to manage their learning curves.',
            date: '2024-03-01',
            priority: 10
        }
    ];

    for (const entry of entries) {
        await client.create(entry);
        console.log(`Live: ${entry.title}`);
    }

    console.log("Universe expanded successfully.");
}

addMoreUniverse().catch(console.error);
