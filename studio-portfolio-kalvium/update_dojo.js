import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function update() {
    try {
        const students = await client.fetch(`*[_type == "student" && (name match "Suriya*" || name match "Suriya R V")]`)
        if (students.length === 0) {
            console.log("No Suriya found in this dataset.")
            return
        }

        for (const s of students) {
            console.log(`Updating student: ${s.name} (${s._id})`)
            await client
                .patch(s._id)
                .set({
                    techDojo: [
                        { _key: 'd1', skill: 'C++', belt: 'white', level: 0 },
                        { _key: 'd2', skill: 'Python', belt: 'green', level: 3 },
                        { _key: 'd3', skill: 'Java', belt: 'white', level: 0 },
                        { _key: 'd4', skill: 'JavaScript', belt: 'white', level: 0 }
                    ]
                })
                .commit()
            console.log(`Successfully updated Tech Dojo for ${s.name}`)
        }
    } catch (err) {
        console.error('Update failed:', err)
    }
}

update()
