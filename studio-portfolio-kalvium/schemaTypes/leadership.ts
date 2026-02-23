export default {
    name: 'leadership',
    title: 'Leadership & Mentors',
    type: 'document',
    fields: [
        {
            name: 'campusManager',
            title: 'Campus Manager',
            type: 'object',
            fields: [
                { name: 'name', type: 'string' },
                { name: 'role', type: 'string' },
                { name: 'image', type: 'image' },
                { name: 'linkedin', type: 'url' },
                { name: 'bio', type: 'text' },
                { name: 'completeInfo', type: 'text' },
            ]
        },
        {
            name: 'mentors',
            title: 'Technical Mentors',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string' },
                        { name: 'role', type: 'string' },
                        { name: 'image', type: 'image' },
                        { name: 'linkedin', type: 'url' },
                        { name: 'bio', type: 'text' },
                        { name: 'completeInfo', type: 'text' },
                    ]
                }
            ]
        },
        {
            name: 'pastMentors',
            title: 'Past Mentors (Legacy)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string' },
                        { name: 'role', type: 'string' },
                        { name: 'image', type: 'image' },
                        { name: 'linkedin', type: 'url' },
                        { name: 'details', type: 'text' },
                    ]
                }
            ]
        },
        {
            name: 'honors',
            title: 'Honors & Hall of Fame',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string' },
                        { name: 'role', type: 'string' },
                        { name: 'image', type: 'image' },
                        { name: 'linkedin', type: 'url' },
                        { name: 'details', type: 'text' },
                    ]
                }
            ]
        }
    ]
}
