import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Hash, ChevronRight, Settings, HelpCircle, FileText, Shield, ArrowRight } from 'lucide-react';
import { useMockData } from '../services/mockData';
import { Profile } from '../types';

// Reusing ProfileCard for consistency, or we could export it from HomePage if we refactored
// Fix: Typed as React.FC to allow 'key' prop
const SimpleProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => (
  <Link to={`/profile/${profile.id}`} className="flex items-center gap-4 p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
    <img src={profile.avatarUrl} alt={profile.name} className="w-12 h-12 rounded-full object-cover" />
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-slate-900 truncate">{profile.name}</h3>
      <p className="text-sm text-gray-500 truncate">{profile.handle}</p>
    </div>
    <ChevronRight size={20} className="text-gray-300" />
  </Link>
);

export const SearchPage = () => {
  const { profiles } = useMockData();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQ = query.toLowerCase();
    return profiles.filter(p => 
      p.name.toLowerCase().includes(lowerQ) || 
      p.handle.toLowerCase().includes(lowerQ) ||
      p.bio.toLowerCase().includes(lowerQ)
    );
  }, [profiles, query]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input 
          autoFocus
          type="text"
          placeholder="Search for creators or posts..."
          className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {query && results.length === 0 && (
          <p className="text-center text-gray-500 py-8">No results found for "{query}"</p>
        )}
        
        {results.map(profile => (
          <SimpleProfileCard key={profile.id} profile={profile} />
        ))}

        {!query && (
          <div className="text-center text-gray-400 py-12">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>Type to find your favorite creators</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const HashtagsPage = () => {
  const { profiles } = useMockData();
  
  // aggregate tags
  const allTags = useMemo(() => {
    const counts: Record<string, number> = {};
    profiles.forEach(p => {
      p.tags.forEach(t => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [profiles]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Trending Hashtags</h1>
      
      <div className="space-y-2">
        {allTags.map(([tag, count]) => (
          <Link 
            key={tag}
            to={`/?search=${tag}`} // Redirects to home with search filter logic
            className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Hash size={20} />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">#{tag}</span>
                <span className="text-xs text-gray-500">{count} {count === 1 ? 'post' : 'posts'}</span>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-300" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export const MorePage = () => {
  const menuItems = [
    { label: 'Account Settings', icon: Settings, path: '/settings' },
    { label: 'Help & Support', icon: HelpCircle, path: '/help' },
    { label: 'Terms of Service', icon: FileText, path: '/terms' },
    { label: 'Privacy Policy', icon: Shield, path: '/privacy' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">More</h1>
      
      <div className="bg-white rounded-xl border overflow-hidden">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button 
              key={item.label}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${i !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} className="text-gray-600" />
                <span className="font-medium text-slate-900">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        <p>FanDirectory v1.0.0</p>
        <p>© 2024 FanDirectory Inc.</p>
      </div>
    </div>
  );
};