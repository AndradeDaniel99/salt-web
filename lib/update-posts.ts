export type UpdatePostDetails = {
  category: string;
  publishedTime: string;
  context: string;
  metrics: Array<{ label: string; value: string }>;
  nextStep: string;
  reactions: number;
  comments: number;
  imageCaption?: string;
};

const updatePostDetails: Record<string, UpdatePostDetails> = {
  'update-school-1': {
    category: 'Construction journal',
    publishedTime: '3:40 PM',
    context:
      'Over the past four days, 18 residents helped level and mark the foundation. The technical team revised one drainage line after the rain and confirmed that the classroom will serve up to 46 children per session. Local workers and family volunteers completed all the work in this phase.',
    metrics: [
      { value: '18', label: 'community volunteers' },
      { value: '46', label: 'seats per session' },
      { value: '100%', label: 'site marked' },
    ],
    nextStep:
      'Purchase cement and blocks from the three approved suppliers and begin the foundation next week.',
    reactions: 84,
    comments: 12,
    imageCaption:
      'The future multipurpose classroom site after the foundation was marked. Photo shared by the field team on August 12.',
  },
  'update-school-2': {
    category: 'Financial update',
    publishedTime: '9:15 AM',
    context:
      'We received three local quotes for blocks, cement, rebar, and transportation. The community committee chose the option with the lowest total cost and two-stage delivery, which avoids storing exposed materials during the rainy season. The first order represents 31% of the materials budget.',
    metrics: [
      { value: '3', label: 'supplier quotes' },
      { value: '31%', label: 'of budget allocated' },
      { value: '2', label: 'scheduled deliveries' },
    ],
    nextStep:
      'Confirm the demo payment for the first delivery and publish the materials receipt.',
    reactions: 61,
    comments: 8,
  },
  'update-oliveira-1': {
    category: 'Life in the field',
    publishedTime: '6:20 PM',
    context:
      'The gatherings moved to two neighborhood homes to reduce travel for families. During the first month, 27 adults and 19 children attended at least once. Local leaders helped adjust the schedule, language, and topics to fit community life.',
    metrics: [
      { value: '46', label: 'participants' },
      { value: '2', label: 'meeting locations' },
      { value: '4', label: 'local leaders involved' },
    ],
    nextStep: 'Make individual visits and prepare the second series of gatherings for September.',
    reactions: 73,
    comments: 10,
    imageCaption: 'The path used by the team during weekly visits in Huambo.',
  },
  'update-oliveira-2': {
    category: 'Local training',
    publishedTime: '11:10 AM',
    context:
      'The training included six practical sessions on listening, child safeguarding, small-group facilitation, and activity reporting. The four volunteers now support pairs of families and meet with the team every two weeks for supervision.',
    metrics: [
      { value: '4', label: 'volunteers trained' },
      { value: '6', label: 'sessions completed' },
      { value: '8', label: 'families supported' },
    ],
    nextStep: 'Review the first month of support and adapt the supervision materials.',
    reactions: 49,
    comments: 6,
  },
  'update-joao-1': {
    category: 'Planning',
    publishedTime: '4:35 PM',
    context:
      'Five educators and two community leaders joined the meeting. The group prioritized student attendance, family participation, and materials that can be made locally. Each workstream now has an owner and a review date.',
    metrics: [
      { value: '7', label: 'leaders attending' },
      { value: '3', label: 'priorities defined' },
      { value: '90 days', label: 'work cycle' },
    ],
    nextStep: 'Test the new plan with two classes and gather feedback from educators.',
    reactions: 57,
    comments: 9,
  },
  'update-well-1': {
    category: 'Technical progress',
    publishedTime: '2:05 PM',
    context:
      'Three community-recommended sites were assessed. The geophysical survey confirmed the best combination of estimated depth, drilling access, and safe distance from waste areas. The report recommends an initial depth of 72 meters, with a technical allowance of up to 95 meters.',
    metrics: [
      { value: '3', label: 'sites assessed' },
      { value: '72 m', label: 'initial depth' },
      { value: '320', label: 'people served' },
    ],
    nextStep: 'Hire the drilling team and hold a public meeting to launch construction.',
    reactions: 96,
    comments: 14,
    imageCaption: 'The site approved by the soil survey and marked by the community committee.',
  },
  'update-well-2': {
    category: 'Community management',
    publishedTime: '10:30 AM',
    context:
      'Seven residents were elected at a community meeting to oversee construction, organize water access, and maintain a small repair fund. The group represents three communities and will publish open monthly financial reports.',
    metrics: [
      { value: '7', label: 'committee members' },
      { value: '3', label: 'communities represented' },
      { value: 'Monthly', label: 'reporting schedule' },
    ],
    nextStep: 'Complete preventive maintenance training before the drilling rig arrives.',
    reactions: 68,
    comments: 11,
  },
  'update-lucas-1': {
    category: 'Field report',
    publishedTime: '7:05 PM',
    context:
      'The team traveled 286 kilometers over five days. In each community, they listened to local leaders, reviewed the schedule, and identified families needing closer support. Two visits were rescheduled because rain had affected the roads.',
    metrics: [
      { value: '3', label: 'communities visited' },
      { value: '286 km', label: 'distance traveled' },
      { value: '21', label: 'families consulted' },
    ],
    nextStep: 'Return to the two communities with materials and gatherings for local teams.',
    reactions: 74,
    comments: 7,
  },
  'update-boat-1': {
    category: 'Logistics',
    publishedTime: '1:25 PM',
    context:
      'Teams from six communities mapped the routes, travel times, safe boarding points, and periods of stronger currents. The initial plan includes two fixed routes and a monthly window for health and education programs requested by the communities.',
    metrics: [
      { value: '6', label: 'communities mapped' },
      { value: '2', label: 'fixed routes' },
      { value: '14 hrs', label: 'travel per cycle' },
    ],
    nextStep: 'Validate the engine specifications and required safety equipment.',
    reactions: 88,
    comments: 13,
    imageCaption: 'A section of one of the routes prioritized by riverside community teams.',
  },
  'update-sarah-1': {
    category: 'Education',
    publishedTime: '5:45 PM',
    context:
      'The group reviewed 24 activities and replaced unfamiliar examples with situations from daily life. The educators also recorded the pronunciation of key words in Nepali and suggested a shorter sequence for family gatherings.',
    metrics: [
      { value: '24', label: 'activities reviewed' },
      { value: '9', label: 'educators participating' },
      { value: '6', label: 'modules adapted' },
    ],
    nextStep: 'Use the material with a pilot class and record feedback from families.',
    reactions: 79,
    comments: 15,
    imageCaption: 'The region where educators gather for teacher training.',
  },
  'update-sarah-2': {
    category: 'New group',
    publishedTime: '8:50 AM',
    context:
      'Twelve educators from four villages confirmed their participation in the next cycle. Sessions will take place every two weeks to accommodate the harvest season and reduce absences. Two experienced participants will serve as local facilitators.',
    metrics: [
      { value: '12', label: 'educators confirmed' },
      { value: '4', label: 'villages' },
      { value: '2', label: 'local facilitators' },
    ],
    nextStep: 'Deliver the training kits and hold the first meeting with the facilitators.',
    reactions: 52,
    comments: 5,
  },
  'update-libraries-1': {
    category: 'Curation',
    publishedTime: '12:40 PM',
    context:
      'The list includes Kenyan literature, bilingual picture books, school references, and titles selected by teenagers. Before purchase, three teachers reviewed age range, language, and local availability to avoid unnecessary import costs.',
    metrics: [
      { value: '186', label: 'titles selected' },
      { value: '3', label: 'languages included' },
      { value: '4', label: 'collections planned' },
    ],
    nextStep: 'Confirm availability with Nakuru booksellers and place the first order.',
    reactions: 91,
    comments: 18,
    imageCaption: 'The initial selection used in discussions with teachers and young readers.',
  },
  'update-libraries-2': {
    category: 'Local partnerships',
    publishedTime: '3:10 PM',
    context:
      'The selected spaces are close to schools and already have people responsible for opening them each week. Every partner signed a simple plan for collection care, loan records, and reading activities. Two locations need minor repairs before installation.',
    metrics: [
      { value: '4', label: 'spaces confirmed' },
      { value: '11', label: 'local volunteers' },
      { value: '2', label: 'repairs scheduled' },
    ],
    nextStep: 'Measure the spaces, order the shelves, and complete priority repairs.',
    reactions: 63,
    comments: 9,
  },
};

export function getUpdatePostDetails(updateId: string): UpdatePostDetails {
  return (
    updatePostDetails[updateId] ?? {
      category: 'Field update',
      publishedTime: '12:00 PM',
      context:
        'The team recorded this milestone to keep supporters and local partners informed about decisions, lessons learned, and next steps.',
      metrics: [
        { value: 'In progress', label: 'current phase' },
        { value: 'Local', label: 'team responsible' },
        { value: 'Monthly', label: 'update schedule' },
      ],
      nextStep: 'Share another update when this phase is complete.',
      reactions: 0,
      comments: 0,
    }
  );
}
