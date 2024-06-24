import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Courses } from '../../assets/icons/tasks.svg';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';

export const ACCOUNT_MENU_ITEMS = {
  Home: {
    path: '/home',
    label: 'Home',
    icon: Home,
  },
  Tasks: {
    path: '/my-courses',
    label: 'My courses',
    icon: Courses,
  },
  Profile: {
    path: '/profile',
    label: 'Profile',
    icon: Profile,
  },
} as const;
