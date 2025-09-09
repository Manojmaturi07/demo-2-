import { User } from '../types';

export const sampleUsers: User[] = [
  {
    id: 'admin-user',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true,
    isArtist: false,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'sample-user-1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
    isArtist: false,
    createdAt: '2024-02-15T10:30:00.000Z'
  },
  {
    id: 'sample-user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    isAdmin: false,
    isArtist: false,
    createdAt: '2024-02-20T15:45:00.000Z'
  }
];