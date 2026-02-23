export default {
    name: 'student',
    title: 'Students',
    type: 'document',

    groups: [
        { name: 'basic', title: 'Basic Info' },
        { name: 'achievements', title: 'Honors & Activities' },
        { name: 'dojo', title: 'Tech Dojo' },
        { name: 'projects', title: 'Active Deployments' },
        { name: 'service', title: 'Internships' },
        { name: 'gallery', title: 'Visual Logs' }
    ],

    fields: [

        // ===== BASIC =====
        {
            name: 'name',
            type: 'string',
            group: 'basic',
            validation: (Rule: any) => Rule.required()
        },

        { name: 'photo', type: 'image', group: 'basic' },

        { name: 'role', type: 'string', group: 'basic' },

        { name: 'summary', type: 'text', group: 'basic' },

        { name: 'linkedin', type: 'url', group: 'basic' },
        { name: 'github', type: 'url', group: 'basic' },

        { name: 'resume', type: 'file', group: 'basic' },

        // ===== HONORS =====

        {
            name: 'kalviumRecords',
            title: 'Kalvium Records',
            type: 'array',
            group: 'achievements',
            of: [{ type: 'string' }]
        },

        {
            name: 'squadMerits',
            title: 'Squad Merits',
            type: 'array',
            group: 'achievements',
            of: [{ type: 'string' }]
        },

        {
            name: 'extracurricular',
            type: 'array',
            group: 'achievements',
            of: [{ type: 'string' }]
        },

        // ===== TECH DOJO =====

        {
            name: 'techDojo',
            group: 'dojo',
            type: 'array',
            of: [{
                type: 'object',
                preview: { select: { title: 'skill', subtitle: 'belt' } },
                fields: [

                    {
                        name: 'skill',
                        type: 'string',
                        options: {
                            list: [
                                'Python', 'C++', 'Java', 'JavaScript', 'React', 'Node'
                            ]
                        }
                    },

                    {
                        name: 'belt',
                        title: 'Belt Color',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'White', value: 'white' },
                                { title: 'Yellow', value: 'yellow' },
                                { title: 'Orange', value: 'orange' },
                                { title: 'Green', value: 'green' },
                                { title: 'Blue', value: 'blue' },
                                { title: 'Brown', value: 'brown' },
                                { title: 'Black', value: 'black' }
                            ]
                        }
                    },

                    {
                        name: 'level',
                        type: 'number',
                        description: 'Number of segments to color (0-7)',
                        validation: (Rule: any) => Rule.min(0).max(7)
                    }

                ]
            }]
        },

        // ===== PROJECTS =====

        {
            name: 'deployments',
            group: 'projects',
            type: 'array',
            options: { sortable: true },
            of: [{
                type: 'object',
                preview: { select: { title: 'title' } },
                fields: [
                    { name: 'title', type: 'string' },
                    { name: 'image', type: 'image' },
                    { name: 'liveUrl', type: 'url' },
                    { name: 'github', type: 'url' },
                    { name: 'summary', type: 'text' },
                    {
                        name: 'status',
                        type: 'string',
                        options: {
                            list: ['Live', 'In Progress', 'Archived']
                        }
                    }
                ]
            }]
        },

        // ===== INTERNSHIPS =====

        {
            name: 'internships',
            group: 'service',
            type: 'array',
            of: [{
                type: 'object',
                preview: { select: { title: 'company' } },
                fields: [
                    { name: 'company', type: 'string' },
                    { name: 'role', type: 'string' },
                    { name: 'startDate', type: 'date' },
                    { name: 'endDate', type: 'date' },
                    { name: 'description', type: 'text' },
                    {
                        name: 'certificate',
                        title: 'Certificate',
                        type: 'file',
                        options: {
                            accept: '.pdf,image/*'
                        }
                    }
                ]
            }]
        },

        // ===== VISUAL LOGS =====

        {
            name: 'memories',
            group: 'gallery',
            type: 'array',
            options: { sortable: true },
            of: [{
                type: 'object',
                preview: { select: { media: 'photo', title: 'caption' } },
                fields: [
                    { name: 'photo', type: 'image' },
                    {
                        name: 'caption',
                        type: 'string',
                        validation: (Rule: any) => Rule.max(120)
                    }
                ]
            }]
        }

    ]
}
