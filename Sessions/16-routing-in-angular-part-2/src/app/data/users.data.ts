export type Post = {
  id: number;
  title: string;
};

export type User = {
  id: number;
  name: string;
  role: string;
  city: string;
  posts: Post[];
};

export const USERS: User[] = [
  {
    id: 1,
    name: 'Aarav Shah',
    role: 'Frontend Developer',
    city: 'Ahmedabad',
    posts: [
      { id: 101, title: 'Understanding Angular Router Links' },
      { id: 102, title: 'When to Use Child Routes' }
    ]
  },
  {
    id: 2,
    name: 'Mira Patel',
    role: 'UI Engineer',
    city: 'Surat',
    posts: [
      { id: 201, title: 'Designing Clear Navigation Menus' },
      { id: 202, title: 'Improving Accessibility in Forms' }
    ]
  },
  {
    id: 3,
    name: 'Rohan Iyer',
    role: 'Full Stack Developer',
    city: 'Bengaluru',
    posts: [
      { id: 301, title: 'Snapshot vs Reactive Route Params' },
      { id: 302, title: 'Simple Query Param Examples' }
    ]
  }
];

export function findUserById(id: number): User | undefined {
  console.log("find by user called", id);
  return USERS.find((user) => user.id === id);
}
