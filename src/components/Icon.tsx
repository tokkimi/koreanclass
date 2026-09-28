export function Icon({ name }: { name: 'home' | 'book' | 'quiz' | 'chart' | 'user' | 'calendar' | 'users' | 'euro' | 'more' }) {
  const paths = {
    home: 'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
    book: 'M12 5v16M12 5C9 3 5 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 1Z',
    quiz: 'm13 2-9 12h7l-1 8 10-13h-8Z',
    chart: 'M4 20V10m8 10V4m8 16v-7',
    user: 'M20 21v-2a8 8 0 0 0-16 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
    calendar: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2ZM4 10h16M8 2v4m8-4v4',
    users: 'M17 21v-2a5 5 0 0 0-10 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9 10v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
    euro: 'M17 5.5A7 7 0 1 0 17 18.5M4 10h9M4 14h9',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
  }
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={name === 'more' ? 3.2 : 1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}
