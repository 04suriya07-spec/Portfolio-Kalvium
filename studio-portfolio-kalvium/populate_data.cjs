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

function normalize(name) {
    if (!name) return "";
    return name.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function isMatch(name1, name2) {
    const n1 = normalize(name1);
    const n2 = normalize(name2);
    if (!n1 || !n2) return false;
    return n1.includes(n2) || n2.includes(n1);
}

async function uploadImage(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
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
        console.error(`Failed to upload ${filePath}:`, err.message);
        return null;
    }
}

async function populate() {
    console.log("Starting population...");

    // 1. Parse CSVs
    const linkedinPath = path.join(__dirname, '..', 'Portfolio Infos - Linkedin.csv');
    const githubPath = path.join(__dirname, '..', 'Portfolio Infos - Github.csv');

    const linkedinCsv = fs.readFileSync(linkedinPath, 'utf8');
    const githubCsv = fs.readFileSync(githubPath, 'utf8');

    const peopleData = {}; // name -> { linkedin, github }

    linkedinCsv.split('\n').forEach((line, i) => {
        if (i === 0 || !line.trim()) return;
        const parts = line.split(',');
        const name = parts[0];
        const linkedin = parts[1];
        if (name) {
            peopleData[normalize(name)] = { name: name.trim(), linkedin: linkedin?.trim() };
        }
    });

    githubCsv.split('\n').forEach((line, i) => {
        if (i === 0 || !line.trim()) return;
        const parts = line.split(',');
        const name = parts[0];
        const github = parts[2];
        if (name) {
            const norm = normalize(name);
            if (!peopleData[norm]) peopleData[norm] = { name: name.trim() };
            if (github) peopleData[norm].github = github.trim();
        }
    });

    // 2. Fetch Students
    const studentDocs = await client.fetch('*[_type == "student"]{_id, name}');
    console.log(`Fetched ${studentDocs.length} students from Sanity`);

    // 3. Process Student Images & Data
    const studentImagesDir = path.join(__dirname, '..', 'student-detail-Images');
    const studentFiles = fs.readdirSync(studentImagesDir);

    for (const doc of studentDocs) {
        const normName = normalize(doc.name);
        // Find data in peopleData using loose match
        let data = peopleData[normName];
        if (!data) {
            const matchedKey = Object.keys(peopleData).find(k => isMatch(k, normName));
            if (matchedKey) data = peopleData[matchedKey];
        }

        // Find matching image
        const imgFile = studentFiles.find(f => isMatch(path.parse(f).name, doc.name));
        let photoAsset = null;
        if (imgFile) {
            photoAsset = await uploadImage(path.join(studentImagesDir, imgFile));
        }

        const patch = {};
        if (data?.linkedin) patch.linkedin = data.linkedin;
        if (data?.github) patch.github = data.github;
        if (photoAsset) patch.photo = photoAsset;

        if (Object.keys(patch).length > 0) {
            await client.patch(doc._id).set(patch).commit();
            console.log(`Updated student: ${doc.name}`);
        }
    }

    // 4. Leadership & Mentors
    console.log("Processing Leadership...");
    const mentorsDir = path.join(__dirname, '..', 'Mentors-Images');
    const pastMentorsDir = path.join(__dirname, '..', 'Past-Mentors-Images');

    const campusManagerFile = 'Karunakarn-Campus Manager.jpg';
    const mentorFiles = ['Aravind.jpg', 'Hanuram.jpg', 'Shantusta Iyer.jpg'];
    const pastMentorFiles = fs.existsSync(pastMentorsDir) ? fs.readdirSync(pastMentorsDir) : [];

    // Campus Manager
    const cmMatch = Object.keys(peopleData).find(k => isMatch(k, 'Karunakaran'));
    const cmData = peopleData[cmMatch] || { name: 'Karunakaran', linkedin: 'https://www.linkedin.com/in/h-karunakaran-3b1285376/' };
    const cmPhoto = await uploadImage(path.join(mentorsDir, campusManagerFile));

    const campusManager = {
        name: cmData.name,
        role: 'Campus Manager',
        image: cmPhoto,
        linkedin: cmData.linkedin || '',
        bio: 'Dedicated Campus Manager supporting student growth and ecosystem excellence.',
        completeInfo: 'Overseeing the holistic development of Squad 139 and ensuring a world-class learning environment.'
    };

    // Mentors
    const mentors = [];
    for (const f of mentorFiles) {
        const namePart = path.parse(f).name;
        const matchedKey = Object.keys(peopleData).find(k => isMatch(k, namePart));
        const data = peopleData[matchedKey] || { name: namePart };
        const photo = await uploadImage(path.join(mentorsDir, f));
        mentors.push({
            name: data.name,
            role: 'Technical Mentor',
            image: photo,
            linkedin: data.linkedin || '',
            bio: 'Expert technical mentor guiding the next generation of developers.',
            completeInfo: 'Providing deep technical insights and industry-standard practices to help students master modern web technologies.'
        });
    }

    // Past Mentors & Honors
    const pastMentors = [];
    const honors = [];
    for (const f of pastMentorFiles) {
        const namePart = path.parse(f).name;
        const photo = await uploadImage(path.join(pastMentorsDir, f));
        const record = {
            name: namePart,
            role: 'Former Technical Mentor',
            image: photo,
            linkedin: '',
            details: 'Made significant contributions to the Squad 139 growth journey and technical foundation.'
        };
        pastMentors.push(record);
        if (honors.length < 2) honors.push(record);
    }

    // Update Leadership Document
    const leadershipDoc = await client.fetch('*[_type == "leadership"][0]');
    if (leadershipDoc) {
        await client.patch(leadershipDoc._id).set({
            campusManager,
            mentors,
            pastMentors,
            honors
        }).commit();
        console.log('Updated existing Leadership document');
    } else {
        await client.create({
            _id: 'leadership-main',
            _type: 'leadership',
            campusManager,
            mentors,
            pastMentors,
            honors
        });
        console.log('Created new Leadership document');
    }

    console.log("Population complete!");
}

populate().catch(console.error);
