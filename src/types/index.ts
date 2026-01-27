export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  status: 'upcoming' | 'active' | 'ended';
  qrCode: string;
  createdAt: string;
  organizerId: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  eventId: string;
  checkedIn: boolean;
  checkInTime?: string;
  registrationTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'attendee';
  avatar?: string;
}

export interface AnalyticsData {
  totalEvents: number;
  activeEvents: number;
  totalAttendees: number;
  checkInRate: number;
  attendanceOverTime: {
    date: string;
    attendees: number;
    checkedIn: number;
  }[];
}
