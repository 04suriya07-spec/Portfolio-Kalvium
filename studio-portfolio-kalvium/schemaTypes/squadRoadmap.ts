export default {
    name: 'squadRoadmap',
    title: 'Squad Roadmap',
    type: 'document',
    fields: [
        {
            name: 'year',
            title: 'Target Year',
            type: 'string',
            initialValue: '2024-2025'
        },
        {
            name: 'milestones',
            title: 'Milestones',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'period', title: 'Period (e.g. Q1, Jan)', type: 'string' },
                        { name: 'title', title: 'Milestone Title', type: 'string' },
                        { name: 'description', title: 'Detailed Description', type: 'text' },
                        {
                            name: 'status',
                            title: 'Status',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Completed', value: 'completed' },
                                    { title: 'In Progress', value: 'in-progress' },
                                    { title: 'Upcoming', value: 'upcoming' },
                                    { title: 'Delayed', value: 'delayed' }
                                ]
                            },
                            initialValue: 'upcoming'
                        },
                        {
                            name: 'progress',
                            title: 'Progress Percentage',
                            type: 'number',
                            validation: Rule => Rule.min(0).max(100),
                            initialValue: 0
                        },
                        {
                            name: 'objectives',
                            title: 'Key Objectives',
                            type: 'array',
                            of: [{ type: 'string' }]
                        }
                    ]
                }
            ]
        }
    ]
}
