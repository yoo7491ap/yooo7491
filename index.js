const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const welcomeChannelName = "입퇴장로그";
const byeChannelName = "입퇴장로그";
const welcomeChannelComment = "잘와따";
const byeChannelComment = "잘가";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '유앱아 도와줘' }, status: 'online' })
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

  if(message.content == '유앱아 뒤져') {
    return message.reply('멍충이 나 봇인ㄷ;');
  }

  if(message.content == '유앱아 엿먹어') {
    return message.reply('머 먹으라거?');
  }

  if(message.content == '유앱아 뭐해?') {
    return message.reply('어...');
  }

  if(message.content == '유앱아 딱대') {
    return message.reply('딱대 :>');
  }

  if(message.content == '유앱아 사랑해') {
    return message.reply('ㅎㅎ..머');
  }

  if(message.content == '유앱아 심심해') {
    return message.reply('게임하면 되자나!');
  }

  if(message.content == '유앱이 멍청이') {
    return message.reply('너두 :>');
  }


  if(message.content == '유앱아 도와줘') {
    let img = 'https://cdn.discordapp.com/avatars/765031566127923220/4b9a15ac349c539b8dd5ccfdbb77d202.png?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('타이틀')
      .setURL('https://discord.gg/7kR8tvT')
      .setAuthor('유앱봇', img, 'https://discord.gg/7kR8tvT')
      .setThumbnail(img)
      .addBlankField()
      .addField('자동역할부여', '유저라는 역할 만들면 내가 유저 역할 줄거야')
      .addField('환영기능', '입퇴장로그라는 채널을 만들어바', true)
      .addField('!전체공자', '!전체공지2', true)
      .addField('대화기능', '유앱아', true)
      .addField('청소기능', '유앱아 청소\n숫자\n쓱싹쓱싹\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('유앱이가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == '유앱아 도움') {
    let helpImg = 'https://cdn.discordapp.com/avatars/765031566127923220/4b9a15ac349c539b8dd5ccfdbb77d202.png?size=128';
    let commandList = [
      {name: '유앱아 도와줘', desc: '유앱아 도움'},
      {name: '또 머있지..', desc: '아 기억났다'},
      {name: '유앱아 도와줘', desc: '유앱이 도움줌'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
      {name: '!전체공지2', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
      {name: '유앱아 청소', desc: '청소!!!!!!!'},
      {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
      {name: '!초대코드2', desc: '봇이 들어가있는 모든 채널의 초대 코드 표기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('유앱이가 도와줄께에에에ㅔ', helpImg)
      .setColor('#186de6')
      .setFooter(`유앱봇`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '!초대코드2') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없자나')
          }
        })
    });
  } else if(message.content == '!초대코드') {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용 못하는데');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없자나')
        }
      })
  } else if(message.content.startsWith('!전체공지2')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지2'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('유앱이가 도와줄께에에에ㅔㅇ')
        .setColor('#186de6')
        .setFooter(`유앱봇`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지 전송해써 잘해찌?');
    } else {
      return message.reply('채널에서 실행해');
    }
  } else if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지 전송해써 잘해찌?');
    } else {
      return message.reply('채널에서 실행하란마랴');
    }
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용 못해');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지만 입력해 선넘지말구")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
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
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지 소멸시켜따 (이 메세지도 곧 소멸됨)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어 쓸 권한이 없자나")
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