const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : '';
const welcomeChannelName = "채팅";
const byeChannelName = "채팅";
const welcomeChannelComment = "잘왔다";
const byeChannelComment = "잘가";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "유저"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '유앱아') {
    return message.reply('머');
  
  }
  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '유앱아 엿먹어') {
      return message.reply('머 먹으라거?');
  }
  
  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '유앱아 엿먹어') {
      return message.reply('머 먹으라거?')
  }
  
  if(message.content == '유앱아 도와줘') {
    let img = '';
    let embed = new Discord.RichEmbed()
  
  
      .setTitle('유앱보오옷')
      .setURL('https://twitter.com/yoo7491_ap')
      .setAuthor('유앱이', img, 'https://twitter.com/yoo7491_ap')
      .setThumbnail(img)
      .addBlankField()
      .addField('역할 기능', '유저라는 역할 만드면 자동 유저 역할 부여')
      .addField('환영기능', '헤에에엘로', true)
      .addField('공지기능', '!전체공지', true)
      .addField('대화기능', '머', true)
      .addField('대화', '유앱아\n유앱아 엿먹어\nSome value here3\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('유앱이가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == '유앱아도움') {
    let helpImg = '';
    let commandList = [
      {name: '머', desc: '머머'},
      {name: '유앱아 도와줘', desc: '유앱이 도와줄거임'},
      {name: '유앱아도움', desc: '유앱이 도움줄거임 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보냄'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 유앱봇', helpImg)
      .setColor('#186de6')
      .setFooter(`유앱봇`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지 전송함');
    } else {
      return message.reply('채널에서 실행 ㄱ');
    }
  }

  if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지만 입력해라.")
      return;
    } else if(!isNum) { // c @유앱이 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지삭제함. (이 메세지 곧 사라짐.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어쓸 권한없자나")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);