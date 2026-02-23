const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function main() {
    try {
        const students = await client.fetch('*[_type == "student"]{_id, name, "imageUrl": photo.asset->url}');
        process.stdout.write(JSON.stringify(students));
    } catch (err) {
        process.stderr.write(err.message);
    }
}

main();
