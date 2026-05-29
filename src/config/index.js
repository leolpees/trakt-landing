const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://trakt-production.up.railway.app',
  appName: 'Trakt',
  contactEmail: 'contato@lab510.com',
  waitlistUrl: import.meta.env.VITE_WAITLIST_URL || '#waitlist',
}

export default config
