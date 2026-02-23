const fs = require('fs');
const path = require('path');

const csvPath = 'Portfolio Infos - Sheet1.csv';
const csvData = fs.readFileSync(csvPath, 'utf8');

const roles = [
    "Frontend Developer", "Backend Developer", "Full Stack Engineer",
    "UI/UX Designer", "AI Specialist", "Mobile App Developer",
    "Cloud Architect", "DevOps Engineer", "Cybersecurity Analyst", "Data Scientist"
];

const summaries = [
    "Passionate about building scalable web applications and exploring the depths of modern computing.",
    "Designing experiences that aren't just usable, but memorable. Bridging the gap between art and code.",
    "Data-driven problem solver with a focus on machine learning and efficient algorithms.",
    "Focused on creating seamless user interactions and high-performance frontend architectures.",
    "Aspiring cloud architect with a knack for building resilient and distributed systems."
];

const skills = [
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "JavaScript", level: 95 },
    { name: "Tailwind", level: 90 }
];

const lines = csvData.trim().split('\n').slice(1);
const students = lines.map((line, index) => {
    const parts = line.split(',');
    const name = parts[0].trim();
    const linkedin = (parts[1] || "").trim();
    const github = (parts[2] || "").trim();

    return {
        _type: 'student',
        _id: `student-${index}`,
        name: name,
        role: roles[index % roles.length],
        specialization: "Technical Operative",
        summary: summaries[index % summaries.length],
        skills: skills.map(s => ({ ...s, _key: Math.random().toString(36).substr(2, 9) })),
        socials: {
            linkedin: linkedin || "https://linkedin.com",
            github: github || "https://github.com"
        }
    };
});

const output = students.map(s => JSON.stringify(s)).join('\n');
fs.writeFileSync('students.ndjson', output, 'utf8');
console.log('Successfully generated students.ndjson');
