export default {
    name: 'universe',
    title: 'Universe',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Artifact Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Technical Achievement', value: 'tech' },
                    { title: 'Squad Event', value: 'event' },
                    { title: 'Strategic Milestone', value: 'milestone' },
                    { title: 'Research & AI', value: 'research' },
                    { title: 'Community Impact', value: 'impact' }
                ]
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Operational Summary',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'date',
            title: 'Date of Discovery',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            }
        },
        {
            name: 'image',
            title: 'Visual Data',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'url',
            title: 'External Node Link',
            type: 'url'
        },
        {
            name: 'priority',
            title: 'System Priority (1-10)',
            type: 'number',
            validation: (Rule: any) => Rule.min(1).max(10)
        }
    ]
}
