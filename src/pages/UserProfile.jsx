import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand, Shield, Sword, Flame, Droplets, Leaf, Sparkles, Award, Calendar, Swords } from 'lucide-react';

const UserProfile = ({ user, skills, battles }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="page-transition text-center py-12 relative">
        {/* 装饰性元素 */}
        <div className="absolute top-10 left-10">
          <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=hogwarts%20letter%20seal&width=70&height=70&random=seal_70_70" alt="学院印章" className="w-14 h-14 floating-element" />
        </div>
        
        <h1 className="text-3xl font-cinzel font-bold text-yellow-400 mb-4 relative z-10">魔法档案</h1>
        <p className="text-amber-200 mb-6 relative z-10">你还没有选择角色</p>
        <button 
          onClick={() => navigate('/characters')}
          className="magic-button relative z-10"
        >
          选择角色
        </button>
      </div>
    );
  }

  const equippedSkills = skills.filter(skill => skill.equipped);
  const skillIcons = {
    '攻击': Sword,
    '防御': Shield,
    '辅助': Wand,
    '治疗': Leaf,
    '控制': Sparkles,
    '移动': Flame,
    '特殊': Droplets
  };

  return (
    <div className="page-transition relative">
      {/* 装饰性元素 */}
      <div className="absolute top-10 right-10">
        <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=magic%20potion&width=60&height=80&random=potion_60_80" alt="魔法药水" className="w-12 h-16 floating-element" />
      </div>
      <div className="absolute bottom-20 left-20">
        <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=golden%20snitch&width=60&height=60&random=snitch_60_60_v2" alt="金色飞贼" className="w-12 h-12 floating-element" />
      </div>
      
      <h1 className="text-3xl font-cinzel font-bold text-yellow-400 mb-8 text-center relative z-10">你的魔法档案</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-1">
          <div className="magic-card rounded-lg p-6 mb-6">
            <div className="text-center">
              <img 
                src={user.image} 
                alt={user.name} 
                className="w-48 h-48 rounded-full border-4 border-yellow-500 mx-auto mb-4"
              />
              <h2 className="text-2xl font-cinzel font-bold text-yellow-400">{user.name}</h2>
              <p className="text-amber-200 mb-2">{user.house}学院</p>
              <div className="inline-block bg-amber-800 text-yellow-300 px-4 py-1 rounded-full text-sm">
                巫师等级: 高级
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-cinzel font-bold text-yellow-400 mb-3">角色特征</h3>
              <div className="flex flex-wrap gap-2">
                {user.traits.map((trait, index) => (
                  <span key={index} className="bg-amber-900 text-amber-200 px-3 py-1 rounded-full text-sm">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-cinzel font-bold text-yellow-400 mb-3">统计信息</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-200">总技能数</span>
                  <span className="font-bold text-yellow-400">{skills.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-200">装备技能</span>
                  <span className="font-bold text-yellow-400">{equippedSkills.length}/4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-200">对战次数</span>
                  <span className="font-bold text-yellow-400">{battles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-200">胜率</span>
                  <span className="font-bold text-yellow-400">
                    {battles.length > 0 
                      ? `${Math.round((battles.filter(b => b.result === '胜利').length / battles.length) * 100)}%` 
                      : '0%'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="magic-card rounded-lg p-6">
            <h3 className="font-cinzel font-bold text-yellow-400 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              最近成就
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-2 bg-amber-900 rounded">
                <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center mr-3">
                  <Swords className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-yellow-400">首次对战</p>
                  <p className="text-xs text-amber-300">完成第一次魔法对战</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-amber-900 rounded">
                <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center mr-3">
                  <Wand className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-yellow-400">技能大师</p>
                  <p className="text-xs text-amber-300">学习超过5个技能</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="magic-card rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-cinzel font-bold text-yellow-400">已装备技能</h2>
              <button 
                onClick={() => navigate('/skills')}
                className="text-sm bg-amber-700 text-amber-200 px-3 py-1 rounded hover:bg-amber-600"
              >
                管理技能
              </button>
            </div>
            
            {equippedSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equippedSkills.map(skill => {
                  const IconComponent = skillIcons[skill.type] || Wand;
                  return (
                    <div key={skill.id} className="magic-card rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          <IconComponent className="w-8 h-8 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-cinzel font-bold text-yellow-400">{skill.name}</h3>
                          <p className="text-amber-200 text-sm">{skill.type} | {skill.difficulty}</p>
                          <p className="text-amber-300 text-sm mt-1 line-clamp-2">{skill.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Wand className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <p className="text-amber-200">暂无装备技能</p>
                <button 
                  onClick={() => navigate('/skills')}
                  className="magic-button mt-4"
                >
                  去学习技能
                </button>
              </div>
            )}
          </div>
          
          <div className="magic-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-cinzel font-bold text-yellow-400">对战记录</h2>
              <button 
                onClick={() => navigate('/pk')}
                className="text-sm bg-amber-700 text-amber-200 px-3 py-1 rounded hover:bg-amber-600"
              >
                开始对战
              </button>
            </div>
            
            {battles.length > 0 ? (
              <div className="space-y-4">
                {battles.slice(0, 5).map(battle => (
                  <div key={battle.id} className="flex items-center justify-between p-3 bg-amber-900 rounded">
                    <div>
                      <h3 className="font-cinzel font-bold text-yellow-400">{battle.opponent}</h3>
                      <div className="flex items-center text-sm text-amber-300 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{battle.date}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                      battle.result === '胜利' 
                        ? 'bg-green-700 text-white' 
                        : 'bg-red-700 text-white'
                    }`}>
                      {battle.result}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Swords className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <p className="text-amber-200">暂无对战记录</p>
                <button 
                  onClick={() => navigate('/pk')}
                  className="magic-button mt-4"
                >
                  开始第一场对战
                </button>
              </div>
            )}
            
            {battles.length > 5 && (
              <div className="text-center mt-4">
                <button className="text-amber-200 hover:text-yellow-400 text-sm">
                  查看更多记录
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
