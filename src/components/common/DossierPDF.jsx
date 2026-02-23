import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register a clean modern font (using a hosted version for react-pdf)
Font.register({
    family: 'Outfit',
    src: 'https://fonts.gstatic.com/s/outfit/v11/Q_3_A6BB6Gnc_D3_BDR_4D8.ttf',
    fontWeight: 'bold',
});
Font.register({
    family: 'OutfitLight',
    src: 'https://fonts.gstatic.com/s/outfit/v11/Q_3_A6BB6Gnc_D3_BDR_4D8.ttf',
    fontWeight: 'normal',
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontFamily: 'OutfitLight',
    },
    titlePage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        color: '#ffffff',
    },
    squadName: {
        fontSize: 60,
        fontFamily: 'Outfit',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    tagline: {
        fontSize: 14,
        color: '#00f2fe',
        textTransform: 'uppercase',
        letterSpacing: 4,
    },
    section: {
        marginBottom: 30,
    },
    header: {
        fontSize: 24,
        fontFamily: 'Outfit',
        color: '#0f172a',
        borderBottom: 2,
        borderBottomColor: '#00f2fe',
        marginBottom: 20,
        paddingBottom: 5,
        textTransform: 'uppercase',
    },
    subHeader: {
        fontSize: 16,
        fontFamily: 'Outfit',
        color: '#0f172a',
        marginTop: 15,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 11,
        lineHeight: 1.6,
        color: '#475569',
        textAlign: 'justify',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    mentorCard: {
        width: '48%',
        padding: 15,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        marginRight: '2%',
        marginBottom: 10,
    },
    studentCard: {
        width: '100%',
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottom: 1,
        borderColor: '#e2e8f0',
        marginBottom: 20,
    },
    studentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    studentImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    studentName: {
        fontSize: 20,
        fontFamily: 'Outfit',
        color: '#0f172a',
    },
    studentRole: {
        fontSize: 10,
        color: '#00f2fe',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    pill: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        fontSize: 8,
        marginRight: 5,
        marginBottom: 5,
    },
    roadmapItem: {
        padding: 15,
        borderLeft: 3,
        borderLeftColor: '#00f2fe',
        backgroundColor: '#f8fafc',
        marginBottom: 15,
    },
    galleryImage: {
        width: '31%',
        aspectRatio: 1,
        marginRight: '2%',
        marginBottom: 10,
        borderRadius: 4,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 40,
        right: 40,
        fontSize: 8,
        textAlign: 'center',
        color: '#94a3b8',
        borderTop: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 10,
    }
});

const DossierPDF = ({ data }) => {
    const {
        squad = { name: 'Squad 139', tagline: 'Excellence in Motion', mission: 'N/A', overview: 'N/A' },
        leadership = { mentors: [], campusManager: { name: 'N/A', role: 'N/A', bio: 'N/A' } },
        students = [],
        roadmap = [],
        images = []
    } = data;

    return (
        <Document>
            {/* Title Page */}
            <Page size="A4" style={styles.titlePage}>
                <Text style={styles.squadName}>{String(squad?.name || 'Squad 139')}</Text>
                <Text style={styles.tagline}>{String(squad?.tagline || 'Strategic Collective')}</Text>
                <Text style={{ marginTop: 50, fontSize: 10, color: '#94a3b8' }}>OFFICIAL DOSSIER // GENERATED ON-THE-FLY</Text>
            </Page>

            {/* Squad Overview */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>Squad Overview</Text>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Mission Statement</Text>
                    <Text style={styles.text}>{String(squad?.mission || 'Mission details under clearance.')}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Strategy & Vision</Text>
                    <Text style={styles.text}>{String(squad?.overview || 'Strategic overview currently confidential.')}</Text>
                </View>
                <Text style={styles.footer}>SQUAD 139 DOSSIER // CONFIDENTIAL</Text>
            </Page>

            {/* Leadership */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>Leadership Team</Text>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Campus Manager</Text>
                    <View style={styles.mentorCard}>
                        <Text style={{ fontSize: 14, fontFamily: 'Outfit' }}>{String(leadership?.campusManager?.name || 'N/A')}</Text>
                        <Text style={styles.studentRole}>{String(leadership?.campusManager?.role || 'Campus Manager')}</Text>
                        <Text style={[styles.text, { marginTop: 5, fontSize: 9 }]}>{String(leadership?.campusManager?.bio || '')}</Text>
                    </View>
                </View>

                {leadership?.mentors?.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Technical Mentors</Text>
                        <View style={styles.row}>
                            {leadership.mentors.map((mentor, i) => (
                                <View key={i} style={styles.mentorCard}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Outfit' }}>{String(mentor?.name || 'N/A')}</Text>
                                    <Text style={styles.studentRole}>{String(mentor?.role || 'Mentor')}</Text>
                                    <Text style={[styles.text, { marginTop: 5, fontSize: 8 }]}>{String(mentor?.bio || '')}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                <Text style={styles.footer}>SQUAD 139 DOSSIER // LEADERSHIP OPS</Text>
            </Page>

            {/* Student Profiles */}
            {students.map((student, index) => (
                <Page key={index} size="A4" style={styles.page}>
                    <View style={styles.studentCard}>
                        <View style={styles.studentHeader}>
                            {student.image && (
                                <Image
                                    src={student.image}
                                    style={styles.studentImage}
                                />
                            )}
                            <View>
                                <Text style={styles.studentName}>{String(student?.name || 'Unknown Operative')}</Text>
                                <Text style={styles.studentRole}>{String(student?.role || 'Developer')}</Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={[styles.text, { fontStyle: 'italic', fontSize: 12 }]}>"{String(student?.summary || 'N/A')}"</Text>
                        </View>

                        {student.techDojo?.length > 0 && (
                            <View style={styles.section}>
                                <Text style={[styles.subHeader, { fontSize: 12 }]}>Technical Arsenal</Text>
                                <View style={styles.row}>
                                    {student.techDojo.map((skill, i) => (
                                        <View key={i} style={styles.pill}>
                                            <Text>{String(skill?.skill || '')} [{String(skill?.belt || 'N/A').toUpperCase()}]</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {student.deployments?.length > 0 && (
                            <View style={styles.section}>
                                <Text style={[styles.subHeader, { fontSize: 12 }]}>Active Deployments</Text>
                                {student.deployments.map((p, i) => (
                                    <View key={i} style={{ marginBottom: 10 }}>
                                        <Text style={{ fontSize: 10, fontFamily: 'Outfit' }}>{String(p?.title || 'Project')}</Text>
                                        <Text style={[styles.text, { fontSize: 9 }]}>{String(p?.summary || '')}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        <View style={styles.row}>
                            <View style={{ width: '50%' }}>
                                <Text style={[styles.subHeader, { fontSize: 10 }]}>Achievements</Text>
                                {student.kalviumRecords?.map((rec, i) => (
                                    <Text key={i} style={[styles.text, { fontSize: 8, marginBottom: 3 }]}>• {String(rec)}</Text>
                                ))}
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={[styles.subHeader, { fontSize: 10 }]}>Extracurricular</Text>
                                {student.extracurricular?.map((extra, i) => (
                                    <Text key={i} style={[styles.text, { fontSize: 8, marginBottom: 3 }]}>• {String(extra)}</Text>
                                ))}
                            </View>
                        </View>
                    </View>
                    <Text style={styles.footer}>OPERATIVE DOSSIER // {String(student?.name || '').toUpperCase()}</Text>
                </Page>
            ))}

            {/* Roadmap */}
            {roadmap?.length > 0 && (
                <Page size="A4" style={styles.page}>
                    <Text style={styles.header}>Mission Roadmap</Text>
                    {roadmap.map((item, i) => (
                        <View key={i} style={styles.roadmapItem}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Outfit' }}>{String(item?.title || 'Milestone')}</Text>
                                <Text style={[styles.studentRole, { marginLeft: 'auto' }]}>
                                    {String(item?.status || 'UPCOMING').toUpperCase()} ({item?.progress || 0}%)
                                </Text>
                            </View>
                            <Text style={[styles.text, { marginBottom: 10 }]}>{String(item?.description || '')}</Text>
                            <View style={styles.row}>
                                {item.objectives?.map((obj, j) => (
                                    <View key={j} style={styles.pill}><Text>{String(obj)}</Text></View>
                                ))}
                            </View>
                        </View>
                    ))}
                    <Text style={styles.footer}>SQUAD 139 DOSSIER // STRATEGIC PLAN</Text>
                </Page>
            )}

            {/* Visuals */}
            {images?.length > 0 && (
                <Page size="A4" style={styles.page}>
                    <Text style={styles.header}>Visual Registry</Text>
                    <View style={styles.row}>
                        {images.slice(0, 15).map((img, i) => (
                            <Image
                                key={i}
                                src={img.image}
                                style={styles.galleryImage}
                            />
                        ))}
                    </View>
                    <Text style={styles.footer}>SQUAD 139 DOSSIER // VISUAL ASSETS</Text>
                </Page>
            )}
        </Document>
    );
};

export default DossierPDF;
