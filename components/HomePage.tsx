import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMockData } from '../services/mockData';
import { Profile } from '../types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const HomePage = ({ showFavoritesOnly }: { showFavoritesOnly?: boolean }) => {
  const { profiles, user } = useMockData();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;

  let baseProfiles = profiles;
  if (showFavoritesOnly && user) {
    baseProfiles = profiles.filter(p => user.favorites.includes(p.id));
  }

  const [shuffledProfiles, setShuffledProfiles] = useState<Profile[]>(() => shuffleArray(baseProfiles));
  const baseRef = useRef(baseProfiles);
  baseRef.current = baseProfiles;

  useEffect(() => {
    setShuffledProfiles(shuffleArray(baseRef.current));
    const interval = setInterval(() => {
      setShuffledProfiles(shuffleArray(baseRef.current));
      setCurrentPage(1);
    }, 10000);
    return () => clearInterval(interval);
  }, [showFavoritesOnly]);

  const filteredProfiles = shuffledProfiles;

  // Pagination logic
  const totalItems = filteredProfiles.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const displayProfiles = filteredProfiles.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display (show 5 at a time)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const formatDate = (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-[#000000] font-sans pb-20">
      <div className="max-w-[600px] mx-auto px-4 py-6">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide mb-2">
            {showFavoritesOnly ? 'Your Favorites' : 'Latest Cached Updated Artists'}
          </h1>
          <p className="text-gray-400 text-sm">
            Showing {startIndex + 1} - {endIndex} of {totalItems}
          </p>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-1 mb-6 flex-wrap">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="pagination-btn"
            aria-label="First page"
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {getPageNumbers().map(pageNum => (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="pagination-btn"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="pagination-btn"
            aria-label="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        {/* Profile List */}
        {displayProfiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-xl text-gray-300 font-medium mb-2">No profiles found</h2>
            <p className="text-gray-500 max-w-md">
              {showFavoritesOnly ? "You haven't favorited any creators yet." : "The directory is currently empty."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayProfiles.map((profile, index) => (
              <ListCard key={profile.id} profile={profile} date={formatDate(index)} />
            ))}
          </div>
        )}

        {/* Bottom Pagination */}
        {displayProfiles.length > 0 && (
          <div className="flex justify-center items-center gap-1 mt-8 flex-wrap">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <ChevronsLeft size={16} />
            </button>

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <ChevronLeft size={16} />
            </button>

            {getPageNumbers().map(pageNum => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="pagination-btn"
            >
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="pagination-btn"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ListCard: React.FC<{ profile: Profile; date: string }> = ({ profile, date }) => {
  return (
    <Link
      to={`/profile/${profile.id}`}
      className="block relative h-[180px] rounded-lg overflow-hidden group animate-fade-in"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={profile.heroUrl}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 gradient-overlay-horizontal" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 py-4 gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-40 h-40 md:w-44 md:h-44 avatar-rounded-square object-cover border-2 border-white/10 shadow-lg"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <span className="badge-onlyfans">OnlyFans</span>
          </div>
          <h3 className="text-white font-semibold text-lg md:text-xl mb-1 truncate group-hover:text-cyan-400 transition-colors">
            {profile.handle.replace('@', '')}
          </h3>
          <p className="text-gray-400 text-sm">
            {date}
          </p>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  );
};
