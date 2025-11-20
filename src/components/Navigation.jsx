import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, BookOpen, Swords, User } from 'lucide-react';

const Navigation = ({ user }) => {
  return (
    <nav className="bg-amber-900 bg-opacity-90 text-amber-100 sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 font-cinzel text-xl font-bold">
            <span>🧙‍♂️</span>
            <span>魔法指引</span>
          </Link>
          
          <div className="flex space-x-1">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors flex items-center"
            >
              <Home className="w-5 h-5 mr-1" />
              首页
            </Link>
            
            <Link 
              to="/characters" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors flex items-center"
            >
              <Users className="w-5 h-5 mr-1" />
              角色
            </Link>
            
            <Link 
              to="/skills" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors flex items-center"
            >
              <BookOpen className="w-5 h-5 mr-1" />
              技能
            </Link>
            
            <Link 
              to="/pk" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors flex items-center"
            >
              <Swords className="w-5 h-5 mr-1" />
              对战
            </Link>
            
            <Link 
              to="/profile" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors flex items-center"
            >
              <User className="w-5 h-5 mr-1" />
              档案
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
