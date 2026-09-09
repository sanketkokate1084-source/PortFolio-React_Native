import {Briefcase, Globe, LayoutDashboard, Moon, Puzzle, Shield, Smartphone, Zap} from 'lucide-react-native';

export const HomeScreenData = {
  aboutMe: {
    intro: 'I am 2026 graduated Fresher actively looking for opportunities. I also have 11 months of internship experience as a Front-End (Web, iOS, Android) development-intern delivering production-ready apps using React & React Native (Expo/CLI).\nYou\'ll get many of the industry standard features such as : ',
    features: [
      {icon: LayoutDashboard, label: 'Responsive UIs', color: 'text-green-500'},
      {icon: Zap,             label: 'Great Animations & Smooth Performance', color: 'text-blue-500'},
      {icon: Smartphone,      label: 'Great UI/UX', color: 'text-primary-foreground'},
      {icon: Shield,          label: 'Authentication & Authorization', color: 'text-red-500'},
      {icon: Globe,           label: 'API Integrations', color: 'text-orange-500'},
      {icon: Briefcase,       label: 'Best Practices', color: 'text-purple-600'},
      {icon: Moon,            label: 'Dark Mode & Multiple Language Support', color: 'text-gray-500'},
      {icon: Puzzle,          label: 'Application State Management', color: 'text-pink-500'},
    ],
    outro : 'This Application is an Expo + React-Native Project.',
  },
};
