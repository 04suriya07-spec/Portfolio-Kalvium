import { createClient } from '@sanity/client'

export default createClient({
    projectId: "2yvjamsp",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
})
