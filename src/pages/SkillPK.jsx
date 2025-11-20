import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords, Wand, Shield, Flame, Zap, Heart } from 'lucide-react';

const SkillPK = ({ user, skills, battles, saveBattles }) => {
  const navigate = useNavigate();
  const [opponent, setOpponent] = useState(null);
  const [battleState, setBattleState] = useState('selecting'); // selecting, preparing, battling, finished
  const [battleLog, setBattleLog] = useState([]);
  const [userHP, setUserHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // 如果用户未选择角色，重定向到角色选择页面
  if (!user) {
    navigate('/characters');
    return null;
  }

  // 如果用户没有装备技能，重定向到技能选择页面
  const equippedSkills = skills.filter(skill => skill.equipped);
  if (equippedSkills.length === 0) {
    navigate('/skills');
    return null;
  }

  const opponents = [
    {
      id: 1,
      name: '德拉科·马尔福',
      house: '斯莱特林',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=draco%20malfoy&width=300&height=300&random=draco_300_300_v2',
      level: '中级',
      skills: ['缴械咒', '蛇佬腔', '幻身咒']
    },
    {
      id: 2,
      name: '卢娜·洛夫古德',
      house: '拉文克劳',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=luna%20lovegood&width=300&height=300&random=luna_300_300_v2',
      level: '中级',
      skills: ['幻影移形', '护法咒', '预言术']
    },
    {
      id: 3,
      name: '塞德里克·迪戈里',
      house: '赫奇帕奇',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=cedric%20diggory&width=300&height=300&random=cedric_300_300_v2',
      level: '高级',
      skills: ['石化咒', '恢复咒', '魔药学']
    },
    {
      id: 4,
      name: '汤姆·里德尔',
      house: '斯莱特林',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=voldemort&width=300&height=300&random=voldemort_300_300_v2',
      level: '专家',
      skills: ['阿瓦达索命', '钻心剜骨', '夺魂咒']
    }
  ];

  const handleSelectOpponent = (opp) => {
    setOpponent(opp);
    setBattleState('preparing');
  };

  const handleSelectSkill = (skill) => {
    if (selectedSkills.some(s => s.id === skill.id)) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleStartBattle = () => {
    if (selectedSkills.length === 0) return;
    
    setBattleState('battling');
    setUserHP(100);
    setOpponentHP(100);
    setBattleLog([
      `${user.name} 与 ${opponent.name} 的魔法对决开始了！`,
      `${user.name} 选择了 ${selectedSkills.length} 个技能进行战斗。`
    ]);
    
    // 开始战斗模拟
    simulateBattle();
  };

  const simulateBattle = () => {
    // 这里我们模拟一个简单的战斗过程
    // 实际应用中可以调用AI接口生成更丰富的战斗描述
    
    const newLog = [...battleLog];
    let currentUserHP = 100;
    let currentOpponentHP = 100;
    
    // 模拟3轮战斗
    for (let i = 0; i < 3; i++) {
      if (currentUserHP <= 0 || currentOpponentHP <= 0) break;
      
      // 用户攻击
      if (selectedSkills.length > 0) {
        const userSkill = selectedSkills[Math.floor(Math.random() * selectedSkills.length)];
        const userDamage = Math.floor(Math.random() * 30) + 20;
        currentOpponentHP = Math.max(0, currentOpponentHP - userDamage);
        
        newLog.push(`${user.name} 使用了 ${userSkill.name}！对 ${opponent.name} 造成了 ${userDamage} 点伤害。`);
        
        if (currentOpponentHP <= 0) {
          newLog.push(`${opponent.name} 被击败了！${user.name} 获得了胜利！`);
          break;
        }
      }
      
      // 对手攻击
      if (currentOpponentHP > 0) {
        const opponentSkill = opponent.skills[Math.floor(Math.random() * opponent.skills.length)];
        const opponentDamage = Math.floor(Math.random() * 25) + 15;
        currentUserHP = Math.max(0, currentUserHP - opponentDamage);
        
        newLog.push(`${opponent.name} 使用了 ${opponentSkill}！对 ${user.name} 造成了 ${opponentDamage} 点伤害。`);
        
        if (currentUserHP <= 0) {
          newLog.push(`${user.name} 被击败了！${opponent.name} 获得了胜利！`);
          break;
        }
      }
    }
    
    // 如果3轮后仍未分出胜负
    if (currentUserHP > 0 && currentOpponentHP > 0) {
      if (currentUserHP > currentOpponentHP) {
        newLog.push(`经过激烈的战斗，${user.name} 以 ${currentUserHP} 对 ${currentOpponentHP} 的血量优势获得了胜利！`);
      } else if (currentOpponentHP > currentUserHP) {
        newLog.push(`经过激烈的战斗，${opponent.name} 以 ${currentOpponentHP} 对 ${currentUserHP} 的血量优势获得了胜利！`);
      } else {
        newLog.push(`双方势均力敌，战斗以平局告终！`);
      }
    }
    
    setBattleLog(newLog);
    setUserHP(currentUserHP);
    setOpponentHP(currentOpponentHP);
    
    // 保存战斗记录
    const newBattle = {
      id: Date.now(),
      opponent: opponent.name,
      result: currentUserHP > 0 ? '胜利' : '失败',
      date: new Date().toLocaleDateString(),
      log: newLog
    };
    
    const updatedBattles = [newBattle, ...battles];
    saveBattles(updatedBattles);
    
    setTimeout(() => {
      setBattleState('finished');
    }, 2000);
  };

  const handleReset = () => {
    setBattleState('selecting');
    setOpponent(null);
    setSelectedSkills([]);
    setBattleLog([]);
  };

  return (
    <div className="page-transition relative">
      {/* 装饰性元素 */}
      <div className="absolute top-10 right-10">
        <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=magic%20spell&width=80&height=80&random=spell_80_80" alt="魔法咒语" className="w-16 h-16 floating-element" />
      </div>
      <div className="absolute bottom-20 left-20">
        <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=flying%20broomstick&width=100&height=60&random=broomstick_100_60" alt="飞天扫帚" className="w-20 h-12 floating-element" />
      </div>
      
      <h1 className="text-3xl font-cinzel font-bold text-yellow-400 mb-8 text-center relative z-10">魔法技能对战</h1>
      
      {battleState === 'selecting' && (
        <div className="relative z-10">
          <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-6 text-center">选择对手</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opponents.map(opp => (
              <div 
                key={opp.id}
                className="magic-card rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform relative"
                onClick={() => handleSelectOpponent(opp)}
              >
                <div className="absolute top-2 right-2 bg-amber-800 text-yellow-300 px-2 py-1 rounded-full text-xs z-10">
                  {opp.level}
                </div>
                <img 
                  src={opp.image} 
                  alt={opp.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-cinzel font-bold text-yellow-400">{opp.name}</h3>
                  <p className="text-amber-200 text-sm">{opp.house}学院</p>
                  <div className="mt-2 flex justify-between items-center">
                    <Swords className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {battleState === 'preparing' && opponent && (
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="text-center md:text-left md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-2">准备战斗</h2>
              <p className="text-amber-200 mb-4">
                你将与 {opponent.name} 进行对决，请选择最多3个技能进行战斗。
              </p>
              <div className="flex items-center">
                <img 
                  src={opponent.image} 
                  alt={opponent.name} 
                  className="w-16 h-16 rounded-full border-2 border-yellow-500 mr-4"
                />
                <div>
                  <h3 className="text-xl font-cinzel font-bold text-yellow-400">{opponent.name}</h3>
                  <p className="text-amber-200">{opponent.house}学院 | {opponent.level}</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="magic-card rounded-lg p-4">
                <h3 className="text-lg font-cinzel font-bold text-yellow-400 mb-3">你的角色</h3>
                <div className="flex items-center">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full border-2 border-yellow-500 mr-4"
                  />
                  <div>
                    <h4 className="font-cinzel font-bold text-yellow-400">{user.name}</h4>
                    <p className="text-amber-200">{user.house}学院</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-4">选择技能</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {equippedSkills.map(skill => {
              const isSelected = selectedSkills.some(s => s.id === skill.id);
              
              return (
                <div 
                  key={skill.id}
                  className={`magic-card rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected ? 'ring-4 ring-yellow-500' : ''
                  }`}
                  onClick={() => handleSelectSkill(skill)}
                >
                  <div className="flex items-center">
                    <Wand className="w-8 h-8 text-yellow-400 mr-3" />
                    <div className="flex-grow">
                      <h4 className="font-cinzel font-bold text-yellow-400">{skill.name}</h4>
                      <p className="text-amber-200 text-sm">{skill.type} | {skill.difficulty}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                        <span className="text-amber-900 text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <button 
              onClick={handleStartBattle}
              disabled={selectedSkills.length === 0}
              className={`magic-button ${selectedSkills.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              开始对战
            </button>
          </div>
        </div>
      )}
      
      {battleState === 'battling' && (
        <div className="relative z-10">
          <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-6 text-center">魔法对决进行中</h2>
          
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <img 
                src={user.image} 
                alt={user.name} 
                className="w-24 h-24 rounded-full border-4 border-yellow-500 mx-auto mb-2"
              />
              <h3 className="font-cinzel font-bold text-yellow-400">{user.name}</h3>
              <div className="w-32 bg-amber-900 rounded-full h-4 mt-2 mx-auto">
                <div 
                  className="bg-red-600 h-4 rounded-full" 
                  style={{ width: `${userHP}%` }}
                ></div>
              </div>
              <p className="text-sm text-amber-200 mt-1">{userHP}/100 HP</p>
            </div>
            
            <Swords className="w-12 h-12 text-yellow-400 mx-4" />
            
            <div className="text-center">
              <img 
                src={opponent.image} 
                alt={opponent.name} 
                className="w-24 h-24 rounded-full border-4 border-yellow-500 mx-auto mb-2"
              />
              <h3 className="font-cinzel font-bold text-yellow-400">{opponent.name}</h3>
              <div className="w-32 bg-amber-900 rounded-full h-4 mt-2 mx-auto">
                <div 
                  className="bg-red-600 h-4 rounded-full" 
                  style={{ width: `${opponentHP}%` }}
                ></div>
              </div>
              <p className="text-sm text-amber-200 mt-1">{opponentHP}/100 HP</p>
            </div>
          </div>
          
          <div className="magic-card rounded-lg p-6 max-h-96 overflow-y-auto scrollbar-hidden">
            <h3 className="font-cinzel font-bold text-yellow-400 mb-4">战斗日志</h3>
            <div className="space-y-3">
              {battleLog.map((log, index) => (
                <div key={index} className="p-3 bg-amber-900 rounded">
                  <p className="text-amber-200">{log}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {battleState === 'finished' && (
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-cinzel font-bold text-yellow-400 mb-2">
              {battleLog[battleLog.length - 1].includes('胜利') ? '战斗胜利！' : 
               battleLog[battleLog.length - 1].includes('失败') ? '战斗失败' : '战斗结束'}
            </h2>
            <p className="text-amber-200">
              {battleLog[battleLog.length - 1]}
            </p>
          </div>
          
          <div className="magic-card rounded-lg p-6 mb-8">
            <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-4">战斗总结</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-cinzel font-bold text-yellow-400 mb-2">你的表现</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Wand className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-amber-200">使用了 {selectedSkills.length} 个技能</span>
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-amber-200">最终血量: {userHP}/100</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-amber-200">
                      {userHP > opponentHP ? '成功击败对手' : 
                       userHP < opponentHP ? '惜败于对手' : '与对手势均力敌'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-cinzel font-bold text-yellow-400 mb-2">对手信息</h4>
                <div className="flex items-center mb-3">
                  <img 
                    src={opponent.image} 
                    alt={opponent.name} 
                    className="w-12 h-12 rounded-full border-2 border-yellow-500 mr-3"
                  />
                  <div>
                    <p className="font-cinzel font-bold text-yellow-400">{opponent.name}</p>
                    <p className="text-amber-200 text-sm">{opponent.house}学院</p>
                  </div>
                </div>
                <p className="text-amber-200">最终血量: {opponentHP}/100</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={handleReset}
              className="magic-button mr-4"
            >
              再来一局
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="magic-button-secondary"
            >
              查看档案
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillPK;
