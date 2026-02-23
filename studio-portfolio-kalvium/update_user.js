import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const userId = 'af0b2dd5-3a83-4a81-a6ef-5b328a030232'

async function update() {
    try {
        await client
            .patch(userId)
            .set({
                summary: "Lead Developer & System Architect for Squad 139. Specialized in building immersive, high-performance web ecosystems.",
                skills: [
                    { _key: 's1', name: 'React/Next.js', level: 98 },
                    { _key: 's2', name: 'Node.js/Express', level: 95 },
                    { _key: 's3', name: 'Sanity CMS', level: 90 },
                    { _key: 's4', name: 'Framer Motion', level: 92 }
                ],
                projects: [
                    {
                        _key: 'p1',
                        title: "Squad Portfolio v2",
                        description: "A premium student collective dashboard with real-time Sanity integration and cinematic animations.",
                        tech: ["React", "Sanity", "Framer Motion", "Tailwind"],
                        github: "https://github.com/04suriya07-spec",
                        live: "http://localhost:5173"
                    }
                ]
            })
            .commit()
        console.log('Successfully updated Suriya R V details')
    } catch (err) {
        console.error('Update failed:', err)
    }
}

update()
