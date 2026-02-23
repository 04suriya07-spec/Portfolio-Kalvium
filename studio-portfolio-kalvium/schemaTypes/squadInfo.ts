export default {
    name: 'squadInfo',
    title: 'Squad Info',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Squad Name',
            type: 'string',
        },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        },
        {
            name: 'mission',
            title: 'Mission Statement',
            type: 'text',
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'text',
        },
        {
            name: 'roadmap',
            title: 'Roadmap Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                        { name: 'status', title: 'Status', type: 'string', options: { list: ['completed', 'current', 'upcoming'] } },
                        { name: 'date', title: 'Date Range', type: 'string' },
                    ],
                },
            ],
        },
    ],
}
