import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
import { Profile } from '../../../types';

// Named Export to satisfy "import { ProfileCard } from './ProfileCard'"
export const ProfileCard = ({ profile }: { profile: Profile }) => {
  return (
    <Link to={`/profile/${profile.id}`} className="group block bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300">
      {/* Card Header / Banner */}
      <div className="relative h-32 bg-gray-200">
        <img src={profile.heroUrl || '/placeholder-hero.jpg'} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      </div>

      {/* Content */}
      <div className="px-5 pb-5 relative">
        {/* Avatar */}
        <div className="absolute -top-10 left-5">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-sm">
            <img src={profile.avatarUrl || '/placeholder-avatar.jpg'} alt={profile.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-lg text-slate-900 leading-tight">{profile.name}</h3>
              {profile.isVerified && <BadgeCheck size={16} className="text-blue-500" />}
            </div>
            {profile.pricePerMonth === 0 ? (
              <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">FREE</span>
            ) : (
              <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-full">${profile.pricePerMonth}/mo</span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-3">{profile.handle}</p>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4 h-10">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {profile.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
            <div className="flex gap-3">
              <span>{profile.images?.length || 0} photos</span>
              <span>{profile.stats?.likes >= 1000 ? (profile.stats.likes / 1000).toFixed(1) + 'k' : profile.stats?.likes} likes</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};