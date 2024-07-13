const Age = [
  {
    value: 'SELECT',
    label: 'select',
  },
  {
    value: 'ADULT',
    label: 'Adult',
  },
  {
    value: 'CHILD',
    label: 'Child',
  },
  {
    value: 'ELDER',
    label: 'Elder',
  },
];

const InternalUrl = [
  // {
  //   value: 'track_vital',
  //   label: 'Track Vital',
  // },
  {
    value: 'medicine_landing',
    label: 'Medicine Landing',
  },
  {
    value: 'lab_test_landing',
    label: 'Lab Test Landing',
  },
  {
    value: 'medicine_reminder',
    label: 'Medicine Reminders',
  },
  {
    value: 'health_locker',
    label: 'Health Locker',
  },
  // {
  //   value: 'feed',
  //   label: 'Feed',
  // },
  {
    value: 'exercise',
    label: 'Exercises',
  },
  // {
  //   value: 'gamification',
  //   label: 'Gamification',
  // },
  {
    value: 'journal_card',
    label: 'journal card',
  },
  {
    value: 'faq',
    label: 'FAQ',
  },
  {
    value: 'visualization_dashboard',
    label: 'Visualization Dashboard',
  },
  {
    value: 'locate_a_doctor',
    label: 'Locate a Doctor',
  },
  {
    value: 'profile',
    label: 'Profile',
  },
  {
    value: 'mood_tracker',
    label: 'mood tracker',
  },
  {
    value: 'medicine_reminder',
    label: 'medicine reminder',
  },
  {
    value: 'cip_air',
    label: 'cip air',
  },
  {
    value: 'webinar_list',
    label: 'webinar list',
  },
  // {
  //   value: 'webinar_details',
  //   label: 'webinar details',
  // },
  // {
  //   value: 'quiz',
  //   label: 'quiz',
  // },
  {
    value: 'breathing_exercise',
    label: 'breathing exercise',
  },
  // {
  //   value: 'vital_activity',
  //   label: 'vital activity',
  // },
  {
    value: 'habit',
    label: 'habit',
  },
  {
    value: 'diary',
    label: 'diary',
  },
  {
    value: 'discover_screen',
    label: 'Discover screen',
  },
  {
    value: 'infinite_scroll',
    label: 'Endless Scroll screen for any content ID',
  },
  {
    value: 'group_of_collection',
    label: 'Group of collection with group of collection ID',
  },
  {
    value: 'breathfree_coins',
    label: 'Breathefree coins',
  },
  // we are removing this screen name since it dos't make any make scense \
  // we hava already infinite_scroll screen for content id to redirect the user to any specipic content
  // {
  //   value: 'content_detail',
  //   label: 'Detailed screen for self-hosted and external articles',
  // },
  {
    value: 'quiz_listing',
    label: 'Quiz listing screen',
  },
  // {
  //   value: 'individual_quiz',
  //   label: 'Individual quiz screen',
  // },
  {
    value: 'saved_content',
    label: 'Saved content screen',
  },
  {
    value: 'vital_scan_method',
    label: 'Vital Scan Method',
  },
  {
    value: 'zoom_live_session',
    label: 'Zoom Live Session',
  },
  {
    value: 'membership',
    label: 'Membership',
  },
  {
    value: 'logs_screen',
    label: 'Logs Screen',
  },
  {
    value: 'course_detail',
    label: 'Course Detail',
  },
  {
    value: 'course_by_tag',
    label: 'Course Tag',
  },
  {
    value: 'course_landing_page',
    label: 'Course Landing',
  },
];
const WidgetDisplayOrderOptions = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
];
const PartofRewards = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
  },
];
const ProductFamily = [
  {
    value: 'AUTOMATED_VITALS',
    label: 'AUTOMATED_VITALS',
  },
  {
    value: 'PULMO_REHAB',
    label: 'PULMO_REHAB',
  },
];

const HomePageOptions = [
  {
    value: 'WATCH',
    label: 'Watch',
  },
  {
    value: 'READ',
    label: 'Read',
  },
];

const ChallengeOptions = [
  {
    value: 'WATER_INTAKE',
    label: 'Water Intake',
  },
  {
    value: 'BREATHING',
    label: 'Breathing',
  },
  {
    value: 'TRACK_VITAL',
    label: 'Track your Vital',
  },
  {
    value: 'ARTICLE',
    label: 'Read an Article',
  },
  {
    value: 'QUIZ',
    label: 'Take Quiz',
  },
  {
    value: 'EXERCISE',
    label: 'My Exercises',
  },
];

const ChallengeDaysOption = [
  {
    value: '7',
    label: '7 Days',
  },
  {
    value: '10',
    label: '10 Days',
  },
  {
    value: '30',
    label: '1 Month',
  },
];

const StaticContentType = [
  {
    value: 'terms_of_use',
    label: 'Terms of Use',
  },
  {
    value: 'privacy_policy',
    label: 'Privacy Policy',
  },
];

const VersionRange = [
  {
    value: 'GREATER',
    label: 'greater',
  },
  {
    value: 'LESSER',
    label: 'lesser',
  },
  {
    value: 'EQUALS',
    label: 'equals',
  },
];
const MallList = [
  {
    value: 77,
    label: 'Mall Ghaziabad',
  },
  {
    value: 78,
    label: 'Mall Dehradooon',
  },
  {
    value: 79,
    label: 'Mall Noida',
  },
];

const CohortOption = ['Asthma', 'COPD', 'ILD', 'AR', 'Other'];
const AgeOption = ['<18', '18-55', '55+'];
const AgeOptionNew = {
  AGE1: '0-18',
  AGE2: '19-35',
  AGE3: '35-54',
  AGE4: '54+',
};

const DropdownOptions = {
  PartofRewards,
  MallList,
  Age,
  InternalUrl,
  HomePageOptions,
  ChallengeOptions,
  ChallengeDaysOption,
  StaticContentType,
  VersionRange,
  WidgetDisplayOrderOptions,
  ProductFamily,
  AgeOption,
  CohortOption,
  AgeOptionNew,
};

export default DropdownOptions;
