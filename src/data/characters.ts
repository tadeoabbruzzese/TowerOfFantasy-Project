export interface Character {
  id: string;
  name: string;
  rarity: number; // 1-5 stars
  element: 'Physical' | 'Volt' | 'Fire' | 'Ice' | 'Altered';
  weapon: string;
  weaponType: 'Sword' | 'Claymore' | 'Dual Pistols' | 'Bow' | 'Scythe' | 'Staff' | 'Gauntlets' | 'Spear';
  resonance: 'DPS' | 'Support' | 'Defense';
  gender: 'Male' | 'Female';
  description: string;
  image: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    resistance: number;
    crit: number;
  };
  abilities: {
    normal: string;
    dodge: string;
    skill: string;
    discharge: string;
  };
}

export interface CharacterTier {
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  characters: string[]; // Character IDs
}

// Mock data for Tower of Fantasy characters
export const characters: Character[] = [
  {
    id: 'meryl',
    name: 'Meryl',
    rarity: 5,
    element: 'Ice',
    weapon: 'Frost Barrier',
    weaponType: 'Claymore',
    resonance: 'Defense',
    gender: 'Female',
    description: 'A senior Hykros executor specializing in combat operations. Years of experience on the front line has given her a blunt personality. She rarely talks to others unless it\'s absolutely necessary.',
    image: '/images/meryl.jpg',
    stats: {
      hp: 12800,
      attack: 765,
      defense: 1020,
      resistance: 810,
      crit: 560
    },
    abilities: {
      normal: 'Attack with a claymore to deal ice damage.',
      dodge: 'Dodge then attack to trigger Ice Rush, dealing AoE ice damage.',
      skill: 'Create an ice barrier that blocks projectiles and slows enemies.',
      discharge: 'Deal massive ice damage in a large area around you.'
    }
  },
  {
    id: 'king',
    name: 'King',
    rarity: 5,
    element: 'Fire',
    weapon: 'Scythe of the Crow',
    weaponType: 'Scythe',
    resonance: 'DPS',
    gender: 'Male',
    description: 'A special forces executor specializing in exterminating mutated organisms. His identity is highly confidential.',
    image: '/images/king.jpg',
    stats: {
      hp: 11300,
      attack: 920,
      defense: 580,
      resistance: 450,
      crit: 810
    },
    abilities: {
      normal: 'Attack with a scythe to deal fire damage.',
      dodge: 'Dodge then attack to trigger Returning Blade, pulling enemies closer.',
      skill: 'Unleash a spinning scythe attack that deals continuous fire damage.',
      discharge: 'Summon dual blades and dash through enemies, dealing massive fire damage.'
    }
  },
  {
    id: 'samir',
    name: 'Samir',
    rarity: 5,
    element: 'Volt',
    weapon: 'Dual EM Stars',
    weaponType: 'Dual Pistols',
    resonance: 'DPS',
    gender: 'Female',
    description: 'An excellent Executor who excels at solving problems independently but is not good at teamwork.',
    image: '/images/samir.jpg',
    stats: {
      hp: 10800,
      attack: 980,
      defense: 520,
      resistance: 480,
      crit: 880
    },
    abilities: {
      normal: 'Shoot dual pistols to deal volt damage.',
      dodge: 'Dodge then attack to trigger a spinning aerial attack.',
      skill: 'Summon a domain that continuously deals volt damage to enemies within.',
      discharge: 'Rapidly fire pistols in all directions, dealing massive volt damage.'
    }
  },
  {
    id: 'nemesis',
    name: 'Nemesis',
    rarity: 5,
    element: 'Volt',
    weapon: 'Venus',
    weaponType: 'Staff',
    resonance: 'Support',
    gender: 'Female',
    description: 'The Angel of Clemency who once served as the will of Hykros. She is now being controlled by a mysterious force.',
    image: '/images/nemesis.jpg',
    stats: {
      hp: 11500,
      attack: 860,
      defense: 650,
      resistance: 720,
      crit: 620
    },
    abilities: {
      normal: 'Fire volt projectiles that deal damage and heal nearby allies.',
      dodge: 'Dodge then attack to create a healing field.',
      skill: 'Deploy an electron cube that attacks enemies and heals allies.',
      discharge: 'Create a large healing field and fire powerful volt beams.'
    }
  },
  {
    id: 'crow',
    name: 'Crow',
    rarity: 5,
    element: 'Volt',
    weapon: 'Thunderblades',
    weaponType: 'Sword',
    resonance: 'DPS',
    gender: 'Male',
    description: 'A mysterious assassin with a playful demeanor. He appears and disappears like a phantom, leaving no trace behind.',
    image: '/images/crow.jpg',
    stats: {
      hp: 10500,
      attack: 1020,
      defense: 540,
      resistance: 460,
      crit: 920
    },
    abilities: {
      normal: 'Rapidly attack with daggers to deal volt damage.',
      dodge: 'Dodge then attack to teleport behind enemies and unleash a powerful backstab.',
      skill: 'Throw a thunder blade that deals volt damage in a line.',
      discharge: 'Dash through enemies multiple times, dealing massive volt damage.'
    }
  },
  {
    id: 'zero',
    name: 'Zero',
    rarity: 5,
    element: 'Fire',
    weapon: 'Negating Cube',
    weaponType: 'Staff',
    resonance: 'Support',
    gender: 'Male',
    description: 'A genius young scientist with a cold and analytical personality. He shows little interest in anything other than research.',
    image: '/images/zero.jpg',
    stats: {
      hp: 11800,
      attack: 780,
      defense: 690,
      resistance: 750,
      crit: 590
    },
    abilities: {
      normal: 'Attack with a cube that deals fire damage.',
      dodge: 'Dodge then attack to create a shield for nearby allies.',
      skill: 'Create a domain that negates projectiles and heals allies.',
      discharge: 'Generate energy orbs that damage enemies and heal allies.'
    }
  },
  {
    id: 'claudia',
    name: 'Claudia',
    rarity: 5,
    element: 'Physical',
    weapon: 'Guren Blade',
    weaponType: 'Sword',
    resonance: 'Support',
    gender: 'Female',
    description: 'The disciplined executor wielding Guren Blade with unwavering strength.',
    image: '/images/claudia.jpg',
    stats: {
      hp: 11800,
      attack: 780,
      defense: 690,
      resistance: 750,
      crit: 590
    },
    abilities: {
      normal: 'Attack with a sword that deals physical damage.',
      dodge: 'Dodge then attack to deal more damage.',
      skill: 'Deal multiple slashes that deal physical damage and provides physical buffs to the team.',
      discharge: 'Applies stacks of physical buffs.'
    }
  },
  {
    id: 'frigg',
    name: 'Frigg',
    rarity: 5,
    element: 'Ice',
    weapon: 'Balmung',
    weaponType: 'Sword',
    resonance: 'DPS',
    gender: 'Female',
    description: 'The icy commander wielding Balmung with chilling precision.',
    image: '/images/frigg.jpg',
    stats: {
      hp: 11800,
      attack: 780,
      defense: 690,
      resistance: 750,
      crit: 590
    },
    abilities: {
      normal: 'Attack with a long sword that deals frost damage.',
      dodge: 'Dodge then attack to deal multiple slash that deals more damage.',
      skill: 'Create a domain that gives hyperbody.',
      discharge: 'Unleash a massive slash that deals a heavy damage.'
    }
  },
  {
    id: 'cobaltb',
    name: 'Cobalt B',
    rarity: 5,
    element: 'Fire',
    weapon: 'Flaming Revolver',
    weaponType: 'Dual Pistols',
    resonance: 'DPS',
    gender: 'Female',
    description: 'The explosive engineer wielding Flaming Revolver with a destructive passion.',
    image: '/images/cobaltb.jpg',
    stats: {
      hp: 11800,
      attack: 780,
      defense: 690,
      resistance: 750,
      crit: 590
    },
    abilities: {
      normal: 'While on the ground, swing the weapon to attack and deal flame damage.',
      dodge: 'Dodge then attack to shot multiple bullets and deal damage.',
      skill: 'Fire 3 rounds of bombs forward that explode upon hitting targets or after reaching max range, dealing fire damage and launching targets.',
      discharge: 'Fire a high-explosive bomb at the target location, creating a Detonating Zone that persists for a duration.'
    }
  },
  {
    id: 'ruby',
    name: 'Ruby',
    rarity: 5,
    element: 'Fire',
    weapon: 'Spark',
    weaponType: 'Staff',
    resonance: 'DPS',
    gender: 'Female',
    description: 'The fiery child prodigy wielding Spark with explosive enthusiasm.',
    image: '/images/ruby.jpg',
    stats: {
      hp: 11800,
      attack: 780,
      defense: 690,
      resistance: 750,
      crit: 590
    },
    abilities: {
      normal: 'While on the ground, swing the weapon to attack and deal flame damage.',
      dodge: 'Dodge then attack  trigger Surrounding Sparks, dealing fire damage and creating a shield for nearby Wanderers and teammates, lasting for a certain duration.',
      skill: 'Summon a Blazing Fan at the target location, dealing fire damage to enemies within range and inflicting a burn effect for a duration.',
      discharge: 'Unleash a Blazing Fan that explodes after a short delay, dealing massive fire damage to nearby enemies and launching them.'
    }
  },
  {
    id: 'sakifuwa',
    name: 'Saki Fuwa',
    rarity: 5,
    element: 'Ice',
    weapon: 'Heartstream',
    weaponType: 'Sword',
    resonance: 'Defense',
    gender: 'Female',
    description: 'The serene guardian wielding Heartstream with a fluid yet powerful resolve',
    image: '/images/sakifuwa.jpg',
    stats: {
      hp: 11800,
      attack: 780,
      defense: 690,
      resistance: 750,
      crit: 590
    },
    abilities: {
      normal: 'While on the ground, swing the weapon to attack and deal frost damage',
      dodge: 'Dodge then attack to dealing ice damage and inflicting a Frostbite effect.',
      skill: 'Unleash a wave that travels forward, dealing ice damage to enemies along its path and inflicting a Freeze effect.',
      discharge: 'Create a Snowstorm Sanctuary at the current location. Enemies within the sanctuary take continuous ice damage and have their movement speed and Allies within the sanctuary gain increased shatter.'
    }
  },
  {
    id: 'lin',
    name: 'Lin',
    rarity: 5,
    element: 'Altered',
    weapon: 'Shadoweave',
    weaponType: 'Staff',
    resonance: 'Support',
    gender: 'Female',
    description: 'The Shadoweave wielder, a playful enigma with unpredictable power.',
    image: '/images/lin.jpg',
    stats: {
      hp: 11800,
      attack: 780,
      defense: 690,
      resistance: 750,
      crit: 590
    },
    abilities: {
      normal: 'Attack with a shadoweave that deals altered damage.',
      dodge: 'Dodge then attack to trigger Shadowshift, dealing altered damage and leaving behind a Shadow Clone that explodes after a short delay.',
      skill: 'Release a Lotus Bloom that travels forward, dealing altered damage to enemies along its path and pulling them towards the end of its trajectory. Within the area, players receive massive buffs according to different elements.',
      discharge: 'Create a Serene Domain at the current location. Within the domain, allies gain increased damage and shatter. At the end of the duration, the domain explodes, dealing massive altered damage to nearby enemies.'
    }
  },
  {
    id: 'tianlang',
    name: 'Tian Lang',
    rarity: 5,
    element: 'Volt',
    weapon: 'Thunderbreaker',
    weaponType: 'Claymore',
    resonance: 'DPS',
    gender: 'Male',
    description: 'The resolute leader wielding Thunderbreaker with electrifying authority and unwavering command.',
    image: '/images/tianlang.jpg',
    stats: {
      hp: 11800,
      attack: 780,
      defense: 690,
      resistance: 750,
      crit: 590
    },
    abilities: {
      normal: 'Attack with a long sword that deals volt damage.',
      dodge: 'Dodge then attack to trigger Lightning Dash, dealing volt damage and leaving behind a Lightning Mark on the target. After a short delay, the mark detonates, dealing additional volt damage.',
      skill: 'Summon a Stormcaller at the target location that pulses with lightning, dealing volt damage to nearby enemies and increasing their received volt damage for a duration.',
      discharge: 'Unleash a powerful lightning strike at the target dealing massive volt damage to enemies within the area.'
    }
  }
];

export const defaultTierList: CharacterTier[] = [
  {
    tier: 'S',
    characters: []
  },
  {
    tier: 'A',
    characters: []
  },
  {
    tier: 'B',
    characters: []
  },
  {
    tier: 'C',
    characters: []
  },
  {
    tier: 'D',
    characters: []
  }
];

export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(character => character.id === id);
};