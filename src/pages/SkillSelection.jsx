import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand, Shield, Sword, Flame, Droplets, Leaf, Sparkles, Eye } from 'lucide-react';

const SkillSelection = ({ user, skills, saveSkills }) => {
  const navigate = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState('格兰芬多');
  const [selectedSkill, setSelectedSkill] = useState(null);

  // 如果用户未选择角色，重定向到角色选择页面
  if (!user) {
    navigate('/characters');
    return null;
  }

  const houses = [
    { id: '格兰芬多', name: '格兰芬多', color: 'red' },
    { id: '斯莱特林', name: '斯莱特林', color: 'green' },
    { id: '拉文克劳', name: '拉文克劳', color: 'blue' },
    { id: '赫奇帕奇', name: '赫奇帕奇', color: 'yellow' }
  ];

  const allSkills = [
    // 格兰芬多技能
    {
      id: 1,
      name: '除你武器',
      house: '格兰芬多',
      type: '攻击',
      description: '最基础的攻击咒语，可以解除对手的武器。是哈利波特的标志性技能。',
      icon: Sword,
      difficulty: '初级'
    },
    {
      id: 2,
      name: '守护神咒',
      house: '格兰芬多',
      type: '防御',
      description: '召唤守护神来抵御摄魂怪等黑暗生物。需要回忆最快乐的记忆才能施展。',
      icon: Shield,
      difficulty: '高级'
    },
    {
      id: 3,
      name: '火焰熊熊',
      house: '格兰芬多',
      type: '攻击',
      description: '召唤火焰进行攻击的咒语，属于火系魔法。需要强大的意志力才能控制。',
      icon: Flame,
      difficulty: '中级'
    },
    {
      id: 4,
      name: '飞来咒',
      house: '格兰芬多',
      type: '辅助',
      description: '让远处的物品飞到施法者手中。是赫敏最擅长的技能之一。',
      icon: Wand,
      difficulty: '中级'
    },
    
    // 斯莱特林技能
    {
      id: 5,
      name: '阿瓦达索命',
      house: '斯莱特林',
      type: '攻击',
      description: '三大不可饶恕咒之一，直接杀死目标。使用此咒语会被魔法部追捕。',
      icon: Sword,
      difficulty: '禁咒'
    },
    {
      id: 6,
      name: '钻心剜骨',
      house: '斯莱特林',
      type: '控制',
      description: '三大不可饶恕咒之一，给目标造成剧烈痛苦。属于黑魔法。',
      icon: Sparkles,
      difficulty: '禁咒'
    },
    {
      id: 7,
      name: '夺魂咒',
      house: '斯莱特林',
      type: '控制',
      description: '三大不可饶恕咒之一，完全控制目标的意志。极其危险的黑魔法。',
      icon: Eye,
      difficulty: '禁咒'
    },
    {
      id: 8,
      name: '蛇佬腔',
      house: '斯莱特林',
      type: '特殊',
      description: '与蛇类交流的能力。萨拉查·斯莱特林的后裔通常具备此能力。',
      icon: Leaf,
      difficulty: '特殊'
    },
    
    // 拉文克劳技能
    {
      id: 9,
      name: '飘浮咒',
      house: '拉文克劳',
      type: '辅助',
      description: '让物体漂浮在空中的基础咒语。是学习飞行的基础。',
      icon: Wand,
      difficulty: '初级'
    },
    {
      id: 10,
      name: '阿拉霍洞开',
      house: '拉文克劳',
      type: '辅助',
      description: '打开锁住的门或箱子。是赫敏最常用的咒语之一。',
      icon: Sparkles,
      difficulty: '中级'
    },
    {
      id: 11,
      name: '幻影移形',
      house: '拉文克劳',
      type: '移动',
      description: '瞬间移动到指定地点的高级魔法。需要许可证才能使用。',
      icon: Sparkles,
      difficulty: '高级'
    },
    {
      id: 12,
      name: '时间转换术',
      house: '拉文克劳',
      type: '特殊',
      description: '回到过去的特殊魔法。极其危险，需要魔法部严格监管。',
      icon: Sparkles,
      difficulty: '禁咒'
    },
    
    // 赫奇帕奇技能
    {
      id: 13,
      name: '恢复咒',
      house: '赫奇帕奇',
      type: '治疗',
      description: '恢复受伤部位的治疗咒语。赫奇帕奇学生的基础技能。',
      icon: Leaf,
      difficulty: '初级'
    },
    {
      id: 14,
      name: '石化咒',
      house: '赫奇帕奇',
      type: '控制',
      description: '将目标变成石头的咒语。需要解除咒语才能恢复。',
      icon: Shield,
      difficulty: '中级'
    },
    {
      id: 15,
      name: '生长咒',
      house: '赫奇帕奇',
      type: '辅助',
      description: '让植物快速生长的咒语。与草药学密切相关。',
      icon: Leaf,
      difficulty: '中级'
    },
    {
      id: 16,
      name: '防水咒',
      house: '赫奇帕奇',
      type: '防御',
      description: '使物体完全防水的咒语。在魔药课上经常使用。',
      icon: Droplets,
      difficulty: '初级'
    }
  ];

  const filteredSkills = allSkills.filter(skill => skill.house === selectedHouse);
  const userSkills = skills || [];
  const equippedSkills = userSkills.filter(skill => skill.equipped);

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
  };

  const handleLearnSkill = () => {
    if (selectedSkill) {
      // 检查是否已学习该技能
      const isLearned = userSkills.some(s => s.id === selectedSkill.id);
      
      if (isLearned) {
        // 如果已学习，切换装备状态
        const updatedSkills = userSkills.map(skill => 
          skill.id === selectedSkill.id 
            ? { ...skill, equipped: !skill.equipped } 
            : skill
        );
        saveSkills(updatedSkills);
      } else {
        // 如果未学习，添加技能（默认装备）
        const updatedSkills = [
          ...userSkills,
          { ...selectedSkill, equipped: true }
        ];
        saveSkills(updatedSkills);
      }
      
      setSelectedSkill(null);
    }
  };

  const handleEquipSkill = (skillId) => {
    // 计算当前装备的技能数量
    const equippedCount = userSkills.filter(s => s.equipped).length;
    
    const updatedSkills = userSkills.map(skill => {
      if (skill.id === skillId) {
        // 如果要装备且未达到上限，或者要卸下，则允许操作
        if (!skill.equipped && equippedCount >= 4) {
          // 已达到装备上限
          return skill;
        }
        return { ...skill, equipped: !skill.equipped };
      }
      return skill;
    });
    
    saveSkills(updatedSkills);
  };

  return (
    <div className="page-transition relative">
      {/* 装饰性元素 */}
      <div className="absolute top-10 left-10">
        <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=magic%20wand&width=70&height=70&random=wand_70_70_v2" alt="魔法杖" className="w-14 h-14 floating-element" />
      </div>
      <div className="absolute bottom-20 right-20">
        <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=spell%20book&width=80&height=100&random=book_80_100" alt="魔法书" className="w-16 h-20 floating-element" />
      </div>
      
      <h1 className="text-3xl font-cinzel font-bold text-yellow-400 mb-8 text-center relative z-10">魔法技能学习</h1>
      
      <div className="mb-8 relative z-10">
        <h2 className="text-xl font-cinzel font-bold text-yellow-400 mb-4">选择学院</h2>
        <div className="flex flex-wrap gap-2">
          {houses.map(house => (
            <button
              key={house.id}
              onClick={() => setSelectedHouse(house.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedHouse === house.id
                  ? `bg-${house.color === 'red' ? 'red' : house.color === 'green' ? 'green' : house.color === 'blue' ? 'blue' : 'yellow'}-800 text-white border-2 border-yellow-500`
                  : 'bg-amber-900 text-amber-200 hover:bg-amber-800 border-2 border-amber-700'
              }`}
            >
              {house.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-4">
            {selectedHouse}技能
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredSkills.map(skill => {
              const isLearned = userSkills.some(s => s.id === skill.id);
              const isEquipped = userSkills.some(s => s.id === skill.id && s.equipped);
              
              return (
                <div 
                  key={skill.id}
                  className={`magic-card rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSkill?.id === skill.id ? 'ring-4 ring-yellow-500' : ''
                  }`}
                  onClick={() => handleSelectSkill(skill)}
                >
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      {React.createElement(skill.icon, { className: "w-8 h-8 text-yellow-400" })}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-cinzel font-bold text-yellow-400">{skill.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          skill.difficulty === '初级' ? 'bg-green-900 text-green-300' :
                          skill.difficulty === '中级' ? 'bg-yellow-900 text-yellow-300' :
                          skill.difficulty === '高级' ? 'bg-blue-900 text-blue-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {skill.difficulty}
                        </span>
                      </div>
                      <p className="text-amber-200 text-sm mt-1">{skill.type}</p>
                      <p className="text-amber-300 text-sm mt-2 line-clamp-2">{skill.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    {isLearned ? (
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        isEquipped 
                          ? 'bg-green-700 text-white' 
                          : 'bg-amber-800 text-amber-200'
                      }`}>
                        {isEquipped ? '已装备' : '已学习'}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm bg-amber-900 text-amber-200">
                        未学习
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          {selectedSkill ? (
            <div className="magic-card rounded-lg p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500 rounded-full opacity-10 translate-x-12 -translate-y-12"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  {React.createElement(selectedSkill.icon, { className: "w-10 h-10 text-yellow-400 mr-3" })}
                  <div>
                    <h2 className="text-2xl font-cinzel font-bold text-yellow-400">{selectedSkill.name}</h2>
                    <p className="text-amber-200">{selectedSkill.type} | {selectedSkill.difficulty}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full ${
                  selectedSkill.difficulty === '初级' ? 'bg-green-900 text-green-300' :
                  selectedSkill.difficulty === '中级' ? 'bg-yellow-900 text-yellow-300' :
                  selectedSkill.difficulty === '高级' ? 'bg-blue-900 text-blue-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {selectedSkill.difficulty}
                </div>
              </div>
              
              <p className="text-amber-200 mb-6">{selectedSkill.description}</p>
              
              <div className="bg-amber-900 p-4 rounded-lg mb-6">
                <h3 className="font-cinzel font-bold text-yellow-400 mb-2">技能说明</h3>
                <ul className="list-disc pl-5 text-amber-200 space-y-1">
                  <li>技能类型：{selectedSkill.type}</li>
                  <li>所属学院：{selectedSkill.house}</li>
                  <li>难度等级：{selectedSkill.difficulty}</li>
                  <li>使用场景：战斗、探索、日常</li>
                </ul>
              </div>
              
              <button 
                onClick={handleLearnSkill}
                className="magic-button w-full"
              >
                {userSkills.some(s => s.id === selectedSkill.id) 
                  ? (userSkills.find(s => s.id === selectedSkill.id)?.equipped ? '卸下技能' : '装备技能') 
                  : '学习此技能'}
              </button>
            </div>
          ) : (
            <div className="magic-card rounded-lg p-6 text-center">
              <Wand className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-2">选择一个技能</h3>
              <p className="text-amber-200">点击左侧技能查看详细信息</p>
            </div>
          )}
          
          <div className="magic-card rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-4">已装备技能</h2>
            {equippedSkills.length > 0 ? (
              <div className="space-y-3">
                {equippedSkills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between bg-amber-900 p-3 rounded">
                    <div className="flex items-center">
                      {React.createElement(skill.icon, { className: "w-6 h-6 text-yellow-400 mr-3" })}
                      <span className="font-medium text-amber-200">{skill.name}</span>
                    </div>
                    <button 
                      onClick={() => handleEquipSkill(skill.id)}
                      className="text-sm bg-amber-700 text-amber-200 px-3 py-1 rounded hover:bg-amber-600"
                    >
                      卸下
                    </button>
                  </div>
                ))}
                <p className="text-sm text-amber-300 mt-3">
                  已装备 {equippedSkills.length}/4 个技能
                </p>
              </div>
            ) : (
              <p className="text-amber-200 text-center py-4">暂无装备技能</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSelection;
