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

const DEMO_SKILLS = ['Python', 'JavaScript', 'React', 'Node', 'C++', 'Java'];
const DEMO_BELTS = ['white', 'yellow', 'orange', 'green', 'blue', 'brown', 'black'];
const DEMO_ROLES = ['Full Stack Engineer', 'AI Research Student', 'Cloud Architect', 'Systems Engineer', 'Product Designer'];
const DEMO_SUMMARIES = [
    "Exploring the depths of software engineering with a passion for clean code and innovative solutions.",
    "B.Tech CSE student specializing in Applied AI and immersive web experiences.",
    "Driven by curiosity and a mission to build technology that makes a difference.",
    "Full-stack enthusiast focused on highly responsive UIs and robust backend architectures."
];

function normalize(name) {
    if (!name) return "";
    return name.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function cleanHTML(str) {
    if (!str) return "";
    return str.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").trim();
}

async function populate() {
    console.log("Reading Form Responses...");
    const htmlPath = path.join(__dirname, 'Form responses 1.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    const rows = html.split(/<tr[^>]*>/).slice(3); // Skip header and spacer
    const formData = {};

    rows.forEach(row => {
        const cells = row.split(/<td[^>]*>/).slice(1).map(c => cleanHTML(c.split('</td>')[0]));
        if (cells.length < 2) return;
        const name = cells[1];
        if (!name) return;

        formData[normalize(name)] = {
            role: cells[2],
            summary: cells[3],
            achievements: cells[5] ? [cells[5]] : [],
            merits: cells[6] ? [cells[6]] : [],
            extra: cells[7] ? [cells[7]] : [],
            skills: parseSkills(cells[8]),
            project: {
                title: cells[9],
                live: cells[11],
                github: cells[12],
                summary: cells[13]
            },
            internship: {
                company: cells[14],
                role: cells[15],
                start: cells[16],
                end: cells[17],
                desc: cells[19]
            }
        };
    });

    console.log(`Parsed ${Object.keys(formData).length} responses from form.`);

    const students = await client.fetch('*[_type == "student"]{_id, name}');
    console.log(`Checking ${students.length} students in Sanity...`);

    for (const student of students) {
        const normName = normalize(student.name);
        const realData = findFormMatch(normName, formData);

        const patch = {};

        // Role & Summary
        patch.role = realData?.role || student.role || getRandom(DEMO_ROLES);
        patch.summary = realData?.summary || student.summary || getRandom(DEMO_SUMMARIES);

        // Achievements
        if (realData?.achievements?.length > 0) patch.kalviumRecords = realData.achievements;
        else if (!student.kalviumRecords) patch.kalviumRecords = ["Top 10% in Semester 1", "Hackathon Finalist"];

        if (realData?.merits?.length > 0) patch.squadMerits = realData.merits;
        else if (!student.squadMerits) patch.squadMerits = ["Excellence in Collaboration", "Punctuality Badge"];

        if (realData?.extra?.length > 0) patch.extracurricular = realData.extra;
        else if (!student.extracurricular) patch.extracurricular = ["Basketball Team", "Gaming Club"];

        // Skills (Tech Dojo)
        if (realData?.skills?.length > 0) {
            patch.techDojo = realData.skills;
        } else {
            patch.techDojo = [
                { _key: 's1', skill: getRandom(DEMO_SKILLS), belt: getRandom(DEMO_BELTS), level: Math.floor(Math.random() * 5) + 2 },
                { _key: 's2', skill: getRandom(DEMO_SKILLS), belt: getRandom(DEMO_BELTS), level: Math.floor(Math.random() * 4) + 1 }
            ];
        }

        // Projects (Deployments)
        if (realData?.project?.title) {
            patch.deployments = [{
                _key: 'p1',
                title: realData.project.title,
                liveUrl: realData.project.live || "",
                github: realData.project.github || "",
                summary: realData.project.summary || "A technical implementation of a system.",
                status: "Live"
            }];
        } else {
            patch.deployments = [{
                _key: 'p1',
                title: "Inertia Engine",
                summary: "A high-performance animation engine built for real-time web experiences.",
                status: "In Progress"
            }];
        }

        // Internships
        if (realData?.internship?.company) {
            patch.internships = [{
                _key: 'i1',
                company: realData.internship.company,
                role: realData.internship.role || "Trainee",
                startDate: realData.internship.start || "2024-01-01",
                endDate: realData.internship.end || "2024-03-01",
                description: realData.internship.desc || "Working on real-world projects."
            }];
        } else {
            patch.internships = [{
                _key: 'i1',
                company: "Kalvium Labs",
                role: "Research Intern",
                startDate: "2024-06-01",
                description: "Deep diving into advanced algorithmic challenges."
            }];
        }

        console.log(`Updating ${student.name}...`);
        await client.patch(student._id).set(patch).commit();
    }

    console.log("Population complete!");
}

function parseSkills(skillStr) {
    if (!skillStr) return [];
    // Format: Python - Green - 5
    // Some are: python - yellow -1
    // Some are: Python 3 belts
    return skillStr.split('\n').map((line, idx) => {
        const parts = line.split('-').map(p => p.trim());
        if (parts.length >= 2) {
            return {
                _key: `sk${idx}`,
                skill: parts[0],
                belt: (parts[1] || 'white').toLowerCase(),
                level: parseInt(parts[2]) || 1
            };
        }
        return {
            _key: `sk${idx}`,
            skill: line.split(' ')[0],
            belt: 'white',
            level: 1
        };
    }).filter(s => s.skill);
}

function findFormMatch(normName, formData) {
    if (formData[normName]) return formData[normName];
    // Loose match
    for (const key in formData) {
        if (normName.includes(key) || key.includes(normName)) return formData[key];
    }
    return null;
}

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

populate().catch(console.error);
