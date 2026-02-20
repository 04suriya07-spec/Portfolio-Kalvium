
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'Portfolio Infos - Sheet1.csv');
const csvData = fs.readFileSync(csvPath, 'utf8');

const roles = [
    "Frontend Developer", "Backend Developer", "Full Stack Engineer",
    "UI/UX Designer", "AI Specialist", "Mobile App Developer",
    "Cloud Architect", "DevOps Engineer", "Cybersecurity Analyst", "Data Scientist"
];

const specializations = [
    "React & Modern Web", "Scalable System Design", "Interactive User Interfaces",
    "Neural Networks & ML", "Cross-Platform Apps", "Cloud Infrastructure",
    "System Security & Auditing", "Data Visualization", "Blockchain & Web3", "Embedded Systems"
];

const summaries = [
    "Passionate about building scalable web applications and exploring the depths of modern computing.",
    "Designing experiences that aren't just usable, but memorable. Bridging the gap between art and code.",
    "Data-driven problem solver with a focus on machine learning and efficient algorithms.",
    "Focused on creating seamless user interactions and high-performance frontend architectures.",
    "Aspiring cloud architect with a knack for building resilient and distributed systems.",
    "Love turning complex problems into simple, beautiful, and intuitive designs.",
    "Building the future of the web with a focus on accessibility and performance.",
    "Security enthusiast dedicated to building safe and robust digital environments.",
    "Full-stack wizard who enjoys the challenge of working across the entire tech stack.",
    "Creative developer blending the worlds of 3D graphics and web technology."
];

const skillsList = [
    { name: "JavaScript", level: 90 }, { name: "Python", level: 85 },
    { name: "React", level: 92 }, { name: "DSA", level: 80 },
    { name: "Node.js", level: 88 }, { name: "Figma", level: 95 },
    { name: "TypeScript", level: 85 }, { name: "Tailwind", level: 90 },
    { name: "AWS", level: 75 }, { name: "Docker", level: 82 }
];

// Mapping local images to student names
const getStudentImage = (name) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('arulananthan')) return '/avatars/Arul.jpg';
    if (lowerName.includes('gokul raj')) return '/avatars/Gokul.jpg';
    if (lowerName.includes('nandhakumar')) return '/avatars/Nandha.jpg';
    if (lowerName.includes('ragul')) return '/avatars/Rahul.jpg';
    if (lowerName.includes('yugesh')) return '/avatars/Yugesh.jpg';

    return '/avatars/none.png';
};

const lines = csvData.trim().split('\n').filter(l => l.trim() !== '').slice(1);
const studentsArr = lines.map((line, index) => {
    const parts = line.split(',');
    const name = parts[0].trim();
    const linkedin = (parts[1] || "").trim() || "https://linkedin.com";
    const github = (parts[2] || "").trim() || "https://github.com";

    const roleIdx = index % roles.length;
    const specIdx = (index + 2) % specializations.length;
    const sumIdx = (index + 4) % summaries.length;

    const studentSkills = [];
    for (let i = 0; i < 4; i++) {
        studentSkills.push(skillsList[(index + i) % skillsList.length]);
    }

    let cleanLinkedin = linkedin;
    if (cleanLinkedin !== "https://linkedin.com") {
        if (!cleanLinkedin.startsWith('http')) cleanLinkedin = 'https://' + cleanLinkedin;
    }

    let cleanGithub = github;
    if (cleanGithub !== "https://github.com") {
        if (!cleanGithub.startsWith('http')) cleanGithub = 'https://' + cleanGithub;
    }

    return {
        id: (index + 1).toString(),
        name: name,
        role: roles[roleIdx],
        specialization: specializations[specIdx],
        summary: summaries[sumIdx],
        image: getStudentImage(name),
        skills: studentSkills,
        projects: [
            {
                title: "Field Deployment",
                description: "Developing robust and scalable technical solutions for real-world impact.",
                tech: ["Modern Stack", "Cloud Architecture"],
                github: "https://github.com",
                live: "https://example.com",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"
            }
        ],
        internships: [
            {
                company: "Tech Collective",
                role: "Innovation Resident",
                duration: "3 Months",
                responsibilities: "Collaborating on squad-level engineering challenges.",
                achievements: "Optimized workflow by 20%."
            }
        ],
        achievements: {
            kalvium: ["Sprint Excellence", "Team Lead Candidate"],
            college: ["Tech Enthusiast"],
            hackathons: ["Squad Hack Winner"]
        },
        activities: ["Engineering", "Creative Design", "Strategy"],
        socials: {
            linkedin: cleanLinkedin,
            github: cleanGithub,
            resume: "https://example.com/resume.pdf"
        },
        gallery: [
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
        ]
    };
});

const squadData = {
    name: "Squad 139",
    tagline: "The future of Engineering",
    mission: "To push the boundaries of technology and create impactful solutions that define the next generation of digital experiences.",
    overview: "Squad 139 is a high-performance squad of developers, designers, and problem solvers at Kalvium. We specialize in full-stack development, AI integration, and immersive UI/UX design.",
    stats: {
        academic: 92,
        attendance: 98,
        luCompletion: 95
    },
    roadmap: [
        { title: "Foundations", description: "Mastering the core of Computer Science and Logic.", status: "completed", date: "Jan - Apr 2025" },
        { title: "Web Mastery", description: "Diving deep into React, Node, and Scalable Architectures.", status: "current", date: "May - Aug 2025" },
        { title: "AI Integration", description: "Implementing intelligence into our modern web apps.", status: "upcoming", date: "Sep - Dec 2025" },
        { title: "Industry Capstone", description: "Building production-grade systems for real-world clients.", status: "upcoming", date: "Jan - Apr 2026" }
    ]
};

const output = "export const squadInfo = " + JSON.stringify(squadData, null, 4) + ";\n\nexport const students = " + JSON.stringify(studentsArr, null, 4) + ";";

fs.writeFileSync(path.join(__dirname, 'src/data/students.js'), output);
console.log('Successfully updated src/data/students.js with local images');
