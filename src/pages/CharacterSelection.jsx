import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand, Shield, Sword, Eye } from 'lucide-react';

const CharacterSelection = ({ user, saveUser }) => {
  const navigate = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const houses = [
    { id: 'all', name: '全部学院' },
    { id: '格兰芬多', name: '格兰芬多' },
    { id: '斯莱特林', name: '斯莱特林' },
    { id: '拉文克劳', name: '拉文克劳' },
    { id: '赫奇帕奇', name: '赫奇帕奇' }
  ];

  const characters = [
    {
      id: 1,
      name: '哈利·波特',
      house: '格兰芬多',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=Harry%20Potter%20wizard&width=400&height=400&random=harry_400_400_v3',
      description: '霍格沃茨的"大难不死的男孩"，以勇气和正义感著称。拥有与蛇对话的能力，是格兰芬多的象征。',
      traits: ['勇敢', '正义', '忠诚', '坚韧'],
      skills: ['守护神咒', '除你武器', '蛇佬腔']
    },
    {
      id: 2,
      name: '赫敏·格兰杰',
      house: '格兰芬多',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=Hermione%20Granger%20wizard&width=400&height=400&random=hermione_400_400_v3',
      description: '聪明好学的女巫，拥有惊人的魔法知识和逻辑思维能力。是麻瓜出身的优秀代表。',
      traits: ['智慧', '博学', '机智', '勤奋'],
      skills: ['时间转换术', '阿拉霍洞开', '飞来咒']
    },
    {
      id: 3,
      name: '罗恩·韦斯莱',
      house: '格兰芬多',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=Ron%20Weasley%20wizard&width=400&height=400&random=ron_400_400_v3',
      description: '哈利的好友，来自纯血统巫师家庭。虽然缺乏自信，但在关键时刻总能展现勇气。',
      traits: ['忠诚', '幽默', '勇敢', '善良'],
      skills: ['棋子咒', '漂浮咒', '无声无息']
    },
    {
      id: 4,
      name: '德拉科·马尔福',
      house: '斯莱特林',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=Draco%20Malfoy%20wizard&width=400&height=400&random=draco_400_400_v3',
      description: '斯莱特林的学生，出身纯血统家庭。起初与哈利对立，但内心复杂，最终选择了正义。',
      traits: ['野心', '机智', '复杂', '骄傲'],
      skills: ['缴械咒', '蛇佬腔', '幻身咒']
    },
    {
      id: 5,
      name: '卢娜·洛夫古德',
      house: '拉文克劳',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=Luna%20Lovegood%20wizard&width=400&height=400&random=luna_400_400_v3',
      description: '独特而神秘的拉文克劳学生，拥有超乎常人的洞察力和对魔法生物的深刻理解。',
      traits: ['独特', '洞察', '善良', '直觉'],
      skills: ['幻影移形', '护法咒', '预言术']
    },
    {
      id: 6,
      name: '塞德里克·迪戈里',
      house: '赫奇帕奇',
      image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=Cedric%20Diggory%20wizard&width=400&height=400&random=cedric_400_400_v3',
      description: '赫奇帕奇的优秀学生，正直公平，是三强争霸赛的勇士。以高尚的品格著称。',
      traits: ['正直', '公平', '勇敢', '谦逊'],
      skills: ['石化咒', '恢复咒', '魔药学']
    }
  ];

  const filteredCharacters = selectedHouse === 'all' 
    ? characters 
    : characters.filter(char => char.house === selectedHouse);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleConfirmSelection = () => {
    if (selectedCharacter) {
      const userData = {
        ...selectedCharacter,
        skills: [],
        battles: []
      };
      saveUser(userData);
      navigate('/profile');
    }
  };

  return (
    <div className="page-transition relative">
      {/* 装饰性元素 */}
      <div className="absolute top-10 right-10">
        <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=hogwarts%20crest&width=80&height=80&random=crest_80_80" alt="学院徽章" className="w-16 h-16 floating-element" />
      </div>
      <div className="absolute bottom-20 left-20">
        <img src="https://www.weavefox.cn/api/bolt/unsplash_image?keyword=magic%20broom&width=60&height=100&random=broom_60_100" alt="飞天扫帚" className="w-12 h-20 floating-element" />
      </div>
      
      <h1 className="text-3xl font-cinzel font-bold text-yellow-400 mb-8 text-center relative z-10">选择你的魔法角色</h1>
      
      <div className="mb-8 relative z-10">
        <h2 className="text-xl font-cinzel font-bold text-yellow-400 mb-4">按学院筛选</h2>
        <div className="flex flex-wrap gap-2">
          {houses.map(house => (
            <button
              key={house.id}
              onClick={() => setSelectedHouse(house.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedHouse === house.id
                  ? 'bg-amber-800 text-yellow-300 border-2 border-yellow-500'
                  : 'bg-amber-900 text-amber-200 hover:bg-amber-800 border-2 border-amber-700'
              }`}
            >
              {house.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {filteredCharacters.map(character => (
          <div 
            key={character.id}
            className={`magic-card rounded-lg overflow-hidden cursor-pointer transition-all relative ${
              selectedCharacter?.id === character.id ? 'ring-4 ring-yellow-500' : ''
            }`}
          >
            <div className="absolute top-2 right-2 bg-amber-800 text-yellow-300 px-3 py-1 rounded-full text-sm z-10">
              {character.house}
            </div>
            <div className="relative">
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
            </div>
            <div className="p-4 relative z-10" onClick={() => handleSelectCharacter(character)}>
              <h3 className="text-xl font-cinzel font-bold text-yellow-400">{character.name}</h3>
              <p className="text-amber-200 text-sm mt-2 line-clamp-2">{character.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {character.traits.slice(0, 3).map((trait, index) => (
                  <span key={index} className="bg-amber-900 text-amber-200 px-2 py-1 rounded text-xs">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="magic-card rounded-lg p-6 mb-8 relative z-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full opacity-10 translate-x-16 -translate-y-16"></div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <img 
                src={selectedCharacter.image} 
                alt={selectedCharacter.name} 
                className="w-full rounded-lg border-4 border-yellow-500"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-cinzel font-bold text-yellow-400 mb-2">{selectedCharacter.name}</h2>
              <div className="inline-block bg-amber-800 text-yellow-300 px-3 py-1 rounded-full text-sm mb-4">
                {selectedCharacter.house}学院
              </div>
              <p className="text-amber-200 mb-4">{selectedCharacter.description}</p>
              
              <h3 className="text-lg font-cinzel font-bold text-yellow-400 mb-2">角色特征</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCharacter.traits.map((trait, index) => (
                  <span key={index} className="bg-amber-900 text-amber-200 px-3 py-1 rounded-full">
                    {trait}
                  </span>
                ))}
              </div>
              
              <h3 className="text-lg font-cinzel font-bold text-yellow-400 mb-2">初始技能</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedCharacter.skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-amber-900 p-2 rounded">
                    <Wand className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-amber-200">{skill}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleConfirmSelection}
                className="magic-button mt-6 w-full md:w-auto"
              >
                确认选择此角色
              </button>
            </div>
          </div>
        </div>
      )}

      {!user && !selectedCharacter && (
        <div className="text-center py-12 relative z-10">
          <Eye className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-2">请选择一个角色</h3>
          <p className="text-amber-200">点击上方角色卡片查看详细信息</p>
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;
