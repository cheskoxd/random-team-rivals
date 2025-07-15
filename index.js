require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// Initialize Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Character arrays with image URLs (replace with actual image URLs)
const healers = [
  { name: 'Adam Wardlock', image: 'https://i.ibb.co/d4Z87s6p/warlok.png' },
  { name: 'Cloak and Dagger', image: 'https://i.ibb.co/HDQ1JMqQ/cd.png' },
  { name: 'Rocket Racoon', image: 'https://i.ibb.co/84Xbjdr5/racoon.png' },
  { name: 'Ultron', image: 'https://i.ibb.co/N2XrY93z/ultron.png' },
  { name: 'Invisible Woman', image: 'https://i.ibb.co/JRLcCvdJ/Invis.png' },
  { name: 'Luna Snow', image: 'https://i.ibb.co/yBP5VL6b/Luna.png' },
  { name: 'Mantis', image: 'https://i.ibb.co/4nVSDrwx/mantis.png' },
  { name: 'Loki', image: 'https://i.ibb.co/DFZ4dhw/loki.png' },
  { name: 'Jeff', image: 'https://i.ibb.co/VWVK1Bnf/jEFF.png' }
];

const tanks = [
  { name: 'Cap', image: 'https://i.ibb.co/xK8Jsh1t/cap.png' },
  { name: 'Strange', image: 'https://i.ibb.co/RGGP8DVQ/drs.png' },
  { name: 'Emma Frost', image: 'https://i.ibb.co/7J19jwSX/ef.png' },
  { name: 'Peni Parker', image: 'https://i.ibb.co/8n7nwRFr/peni.png' },
  { name: 'Thing', image: 'https://i.ibb.co/bjKGNXXp/thing.png' },
  { name: 'Groot', image: 'https://i.ibb.co/5hKfJCpT/Groot.png' },
  { name: 'Hulk', image: 'https://i.ibb.co/FqCnHJv0/hulk.png' },
  { name: 'Thor', image: 'https://i.ibb.co/xKHH8Dsh/thor.png' },
  { name: 'Venom', image: 'https://i.ibb.co/WWfTg1j2/venom.png' },
  { name: 'Magneto', image: 'https://i.ibb.co/B2jF2xGF/magnito.png' }
];

const dps = [
  { name: 'Black Panther', image: 'https://i.ibb.co/60RjDFfp/bp.png' },
  { name: 'Black Widow', image: 'https://i.ibb.co/VWc0cqDy/bw.png' },
  { name: 'Namor', image: 'https://i.ibb.co/qLZbR6Kk/Namor.png' },
  { name: 'Phoenix', image: 'https://i.ibb.co/35SHFFsP/PHOENIX.png' },
  { name: 'Psylocke', image: 'https://i.ibb.co/d0X3kMGM/psylok.png' },
  { name: 'Punisher', image: 'https://i.ibb.co/VWSVSh5f/punisher.png' },
  { name: 'Scarlet Witch', image: 'https://i.ibb.co/TsMJz59/scarlet.png' },
  { name: 'Spider-Man', image: 'https://i.ibb.co/Rk08Z30c/spiderman.png' },
  { name: 'Squirrel Girl', image: 'https://i.ibb.co/8LjpjHwP/sq.png' },
  { name: 'Star-Lord', image: 'https://i.ibb.co/mC9kLL3L/starlord.png' },
  { name: 'Storm', image: 'https://i.ibb.co/v4zBHCRn/storm.png' },
  { name: 'Human Torch', image: 'https://i.ibb.co/m5VKvn6k/fire.png' },
  { name: 'Hawkeye', image: 'https://i.ibb.co/WWnKg7r5/hawkeye.png' },
  { name: 'Hela', image: 'https://i.ibb.co/VYNLYQgB/Hela.png' },
  { name: 'Iron Fist', image: 'https://i.ibb.co/tpwZR96T/IRONFIST.png' },
  { name: 'Iron Man', image: 'https://i.ibb.co/Q3gW5cgW/IRONMA.png' },
  { name: 'Magik', image: 'https://i.ibb.co/LzFt1sWf/magic.png' },
  { name: 'Moon Knight', image: 'https://i.ibb.co/Kch2Hp18/mk.png' },
  { name: 'Mr. Fantastic', image: 'https://i.ibb.co/jP4CXJZ8/mr.png' },
  { name: 'Winter Soldier', image: 'https://i.ibb.co/M5KJQPQz/winter.png' },
  { name: 'Wolverine', image: 'https://i.ibb.co/C5M3bD8P/wolverine.png' }
];


const configs = [
  { name: '3 DPS, 1 Tank, 2 Healers', dps: 3, tank: 1, healer: 2 },
  { name: '3 Healers, 3 Tanks', dps: 0, tank: 3, healer: 3 },
  { name: '2 DPS, 2 Tanks, 2 Healers', dps: 2, tank: 2, healer: 2 },
  { name: '1 DPS, 2 Tank, 3 Healer', dps: 1, tank: 2, healer: 3 }
];

// Function to get random elements from an array
function getRandomElements(array, count) {
  if (count > array.length) return null; // Not enough elements
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Bot ready event
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Message event to handle commands
client.on('messageCreate', message => {
  if (message.content.startsWith('!randomteam') && !message.author.bot) {

    // Parse command for usernames
    const args = message.content.slice(11).trim().split(' ').filter(arg => arg); // Remove "!random" and split by space, filter empty
    console.log(`Received usernames: ${args.join(', ')}`);
    let usernames = [];

    if (args.length > 0) {
      if (args.length <= 6) {
        usernames = args;
      } else {
        message.channel.send('Error: Maximum 6 usernames allowed.');
        return;
      }
    }


    // Select a random config
    const config = configs[Math.floor(Math.random() * configs.length)];
    
    // Get random characters for each role
    const selectedDps = config.dps > 0 ? getRandomElements(dps, config.dps) : [];
    const selectedTanks = config.tank > 0 ? getRandomElements(tanks, config.tank) : [];
    const selectedHealers = config.healer > 0 ? getRandomElements(healers, config.healer) : [];

    // Check if we got enough characters
    if (!selectedDps || !selectedTanks || !selectedHealers) {
      message.channel.send('Error: Not enough characters available for the selected configuration.');
      return;
    }

    // Combine all selected characters
    const allCharacters = [
      ...selectedDps.map(char => ({ ...char, role: 'DPS' })),
      ...selectedTanks.map(char => ({ ...char, role: 'Tank' })),
      ...selectedHealers.map(char => ({ ...char, role: 'Healer' }))
    ];

    const characterCount = usernames.length == 0 ? 6 : usernames.length ;
    const shuffledCharacters = getRandomElements(allCharacters, characterCount); // Always select 6

    // Assign usernames if provided
    let assignedUsernames = [...usernames]; // Copy to avoid modifying original
    shuffledCharacters.forEach(char => {
      if (assignedUsernames.length > 0) {
        const randomIndex = Math.floor(Math.random() * assignedUsernames.length);
        char.username = assignedUsernames.splice(randomIndex, 1)[0]; // Assign and remove from list
      }
    });


    // Send one embed per character
    shuffledCharacters.forEach(char => {
      const embed = new EmbedBuilder()
        .setTitle(`${char.name.padEnd(22, '‎ ')}`)
        .setDescription(`${char.username ? char.username : char.role}`)
        .setThumbnail(char.image)
        .setColor(0x0099ff)
        message.channel.send({ embeds: [embed] });
    });
  }
});

// Login to Discord using token from .env
client.login(process.env.BOT_TOKEN);