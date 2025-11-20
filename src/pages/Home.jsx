import React from 'react';
import { Link } from 'react-router-dom';
import { Wand, Shield, Swords, Users, BookOpen, Award } from 'lucide-react';

const Home = ({ user }) => {
  return (
    <div className="page-transition">
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 left-1/4">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=hogwarts%20letter&width=80&height=60&random=letter_80_60" alt="魔法信" className="w-16 h-12 floating-element" />
        </div>
        <div className="absolute top-0 right-1/4">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=magic%20broom&width=70&height=100&random=broom_70_100" alt="飞天扫帚" className="w-14 h-20 floating-element" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-yellow-400 mb-4 relative z-10">
          欢迎来到霍格沃茨
        </h1>
        <p className="text-xl text-amber-200 max-w-2xl mx-auto relative z-10">
          {user 
            ? `欢迎回来，${user.name}！准备好开始新的魔法冒险了吗？` 
            : "年轻的巫师，选择你的角色，学习魔法技能，与其他巫师对战！"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Link to="/characters" className="magic-card rounded-lg p-6 flex flex-col items-center text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-700 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <div className="bg-amber-900 p-4 rounded-full mb-4 group-hover:bg-amber-800 transition-colors relative z-10">
            <Users className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-2 relative z-10">角色选择</h2>
          <p className="text-amber-200 relative z-10">选择你心仪的魔法角色，开启你的巫师生涯</p>
        </Link>

        <Link to="/skills" className="magic-card rounded-lg p-6 flex flex-col items-center text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <div className="bg-amber-900 p-4 rounded-full mb-4 group-hover:bg-amber-800 transition-colors relative z-10">
            <BookOpen className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-2 relative z-10">技能学习</h2>
          <p className="text-amber-200 relative z-10">学习各学院的魔法技能，提升你的魔法能力</p>
        </Link>

        <Link to="/pk" className="magic-card rounded-lg p-6 flex flex-col items-center text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-700 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <div className="bg-amber-900 p-4 rounded-full mb-4 group-hover:bg-amber-800 transition-colors relative z-10">
            <Swords className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-2 relative z-10">魔法对战</h2>
          <p className="text-amber-200 relative z-10">与其他巫师进行1v1对战，检验你的魔法实力</p>
        </Link>
      </div>

      {user && (
        <div className="magic-card rounded-lg p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full opacity-10 -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500 rounded-full opacity-10 translate-y-12 -translate-x-12"></div>
          
          <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-4 text-center">你的魔法档案</h2>
          <div className="flex flex-col md:flex-row items-center">
            <img 
              src={user.image} 
              alt={user.name} 
              className="w-32 h-32 rounded-full border-4 border-yellow-500 mb-4 md:mb-0 md:mr-6 relative z-10"
            />
            <div className="text-center md:text-left relative z-10">
              <h3 className="text-xl font-cinzel font-bold text-yellow-400">{user.name}</h3>
              <p className="text-amber-200 mb-2">{user.house}学院</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                {user.skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="bg-amber-800 text-amber-100 px-3 py-1 rounded-full text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-auto relative z-10">
              <Link to="/profile" className="magic-button">
                查看完整档案
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="text-center relative">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full opacity-10 -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 rounded-full opacity-10 translate-x-16 translate-y-16"></div>
        
        <h2 className="text-3xl font-cinzel font-bold text-yellow-400 mb-6 relative z-10">魔法世界指南</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="magic-card rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500 rounded-full opacity-10 translate-x-10 -translate-y-10"></div>
            <Wand className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-2">选择角色</h3>
            <p className="text-amber-200 mb-2">从霍格沃茨四大学院中选择你的角色，每个角色都有独特的背景故事和魔法倾向。</p>
          </div>
          <div className="magic-card rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-full opacity-10 translate-x-10 -translate-y-10"></div>
            <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-2">学习技能</h3>
            <p className="text-amber-200 mb-2">按学院分类学习魔法技能，每个学院都有独特的魔法专长，最多可装备4个技能。</p>
          </div>
          <div className="magic-card rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500 rounded-full opacity-10 translate-x-10 -translate-y-10"></div>
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-2">技能对战</h3>
            <p className="text-amber-200 mb-2">使用你学到的技能与其他巫师进行1v1对战，每场对战都会生成独特的战斗描述。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
