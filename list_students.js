const client = require('./src/lib/sanityClient').default;

async function listStudents() {
    try {
        const students = await client.fetch(`*[_type == "student"] { _id, name, "imageUrl": photo.asset->url }`);
        console.log(JSON.stringify(students, null, 2));
    } catch (err) {
        console.error(err);
    }
}

listStudents();
