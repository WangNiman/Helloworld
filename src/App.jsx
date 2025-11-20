import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterSelection from './pages/CharacterSelection';
import SkillSelection from './pages/SkillSelection';
import SkillPK from './pages/SkillPK';
import UserProfile from './pages/UserProfile';
import Navigation from './components/Navigation';

const App = () => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [battles, setBattles] = useState([]);

  useEffect(() => {
    // 从localStorage加载用户数据
    const savedUser = localStorage.getItem('harryPotterUser');
    const savedSkills = localStorage.getItem('harryPotterSkills');
    const savedBattles = localStorage.getItem('harryPotterBattles');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedSkills) setSkills(JSON.parse(savedSkills));
    if (savedBattles) setBattles(JSON.parse(savedBattles));
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem('harryPotterUser', JSON.stringify(userData));
  };

  const saveSkills = (skillsData) => {
    setSkills(skillsData);
    localStorage.setItem('harryPotterSkills', JSON.stringify(skillsData));
  };

  const saveBattles = (battlesData) => {
    setBattles(battlesData);
    localStorage.setItem('harryPotterBattles', JSON.stringify(battlesData));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* 浮动的魔法元素 */}
        <div className="floating-element top-10 left-10">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=magic%20wand&width=60&height=60&random=wand_60_60" alt="魔法杖" className="w-12 h-12" />
        </div>
        <div className="floating-element top-20 right-20">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=hedwig%20owl&width=70&height=70&random=owl_70_70" alt="海德薇" className="w-14 h-14" />
        </div>
        <div className="floating-element bottom-40 left-1/4">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=dobby%20elf&width=80&height=80&random=dobby_80_80" alt="多比" className="w-16 h-16" />
        </div>
        <div className="floating-element bottom-20 right-1/3">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=flying%20car&width=100&height=60&random=car_100_60" alt="飞车" className="w-20 h-12" />
        </div>
        <div className="floating-element top-1/3 left-1/5">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=golden%20snitch&width=50&height=50&random=snitch_50_50" alt="金色飞贼" className="w-10 h-10" />
        </div>
        <div className="floating-element top-1/4 right-1/4">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=hogwarts%20crest&width=70&height=70&random=crest_70_70" alt="霍格沃茨徽章" className="w-14 h-14" />
        </div>
        <div className="floating-element bottom-1/3 left-1/3">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=butterbeer&width=60&height=80&random=butterbeer_60_80" alt="黄油啤酒" className="w-12 h-16" />
        </div>
        <div className="floating-element top-2/3 right-1/5">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=marauders%20map&width=70&height=70&random=map_70_70" alt="掠夺者地图" className="w-14 h-14" />
        </div>
        
        <Navigation user={user} />
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/characters" element={<CharacterSelection user={user} saveUser={saveUser} />} />
            <Route path="/skills" element={<SkillSelection user={user} skills={skills} saveSkills={saveSkills} />} />
            <Route path="/pk" element={<SkillPK user={user} skills={skills} battles={battles} saveBattles={saveBattles} />} />
            <Route path="/profile" element={<UserProfile user={user} skills={skills} battles={battles} />} />
          </Routes>
        </main>
        <footer className="bg-amber-900 text-amber-100 py-6 text-center relative z-10">
          <div className="container mx-auto px-4">
            <p className="font-cinzel">霍格沃茨魔法学校 © {new Date().getFullYear()} - 一切权利属于魔法世界</p>
            <p className="text-sm mt-2">本应用为粉丝作品，非官方授权</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
