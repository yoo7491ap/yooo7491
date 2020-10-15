const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const moment = require("moment");
require("moment-duration-format");
const momenttz = require('moment-timezone');
const MessageAdd = require('./db/message_add.js')
const welcomeChannelName = "입퇴장로그";
const byeChannelName = "입퇴장로그";
const welcomeChannelComment = "잘왔다";
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

client.on("messageUpdate", (message) => {
  MessageSave(message, true)
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

  if(message.content == '유앱아 ㅅㅅ') {
    return message.reply('하읏..');
  }

  if(message.content == '유앱이 바보') {
    return message.reply('선넘ㄴ');
  }

  if(message.content == '유앱아 환영해줘') {
    return message.reply('안뇽!!!!');
  }

  if(message.content == '유앱아 섻') {
    return message.reply('ㅎㅎ....');
  }

  
  if(message.content == '유앱아 섹스') {
    return message.reply('...?');
  }

    
  if(message.content == '유앱아 하자') {
    return message.reply('머를..');
  }

  if(message.content == '유앱아 병신') {
    return message.reply('ㅂㄷㅂㄷ..');
  }

  if(message.content == '유앱아 머하냐') {
    return message.reply('멀라');
  }

  if(message.content == '유앱아 그거하자') {
    return message.reply('ㄱ..그거?');
  }

  if(message.content == '유앱아 놀자') {
    return message.reply('그래 놀아줄께');
  }

  if(message.content == '유앱아 뭐하고 놀까') {
    return message.reply('멀라');
  }

  
  if(message.content == '유앱아 놀아줘') {
    return message.reply('그래');
  }

  if(message.content == '유앱아 미안해') {
    return message.reply('뭔진 모르겠지만..용서해주께요');
  }

  if(message.content == '유앱아 정자') {
    return message.reply('나는 난자를 갖고있어요 님 장애세요?');
  }


  if(message.content == '-서버상태') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/avatars/765031566127923220/4b9a15ac349c539b8dd5ccfdbb77d202.png?size=128';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('유앱봇', img)
    embed.setFooter(`유앱봇`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('유저',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('서버',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

  if(message.content == '유앱아 도와줘') {
    let img = 'https://cdn.discordapp.com/avatars/765031566127923220/4b9a15ac349c539b8dd5ccfdbb77d202.png?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('유앱봇테스트서버')
      .setURL('https://discord.gg/7kR8tvT')
      .setAuthor('유앱이', img, 'https://discord.gg/7kR8tvT')
      .setThumbnail(img)
      .addBlankField()
      .addField('유앱아 명령어', '명령어 보여줌')
      .addField('자동역할부여', '역할 만들고 이름을 유저라고 바꿔바', true)
      .addField('환영기능', '채널만들고 입퇴장로그라고 이름 바꿔바', true)
      .addField('공지기능', '-전체공지,유앱아 공지보내', true)
      .addField('초대링크', '-초대코드,-초대코드2', true)
      .addBlankField()
      .setTimestamp()
      .setFooter('유앱이가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == '유앱아 명령어') {
    let helpImg = 'https://cdn.discordapp.com/avatars/401360635671347210/356ca4b3565a83f5f1cc7bcc7b25f38c.png?size=128';
    let commandList = [
      {name: '유앱아 도와줘', desc: '도움줌'},
      {name: '유앱아 명령어', desc: '명령어들'},
      {name: '-전체공지', desc: 'dm으로 전체 공지 보냄'},
      {name: '유앱아 공지보내', desc: 'dm으로 전체 embed 형식으로 공지 보냄'},
      {name: '유앱아 청소', desc: '청소'},
      {name: '-초대코드', desc: '해당 채널의 초대 코드 표기'},
      {name: '-초대코드2', desc: '봇이 들어가있는 모든 채널의 초대 코드 표기'},
     ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('명령어', helpImg)
      .setColor('#186de6')
      .setFooter(`유앱봇`)
      .setTimestamp()
    
      commandList.forEach(x => {
        commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
      });
  
      embed.addField('Commands: ', commandStr);
  
      message.channel.send(embed)
    } else if(message.content == '-초대코드2') {
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
    } else if(message.content == '-초대코드') {
      if(message.channel.type == 'dm') {
        return message.reply('dm에서 못써');
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
    } else if(message.content.startsWith('유앱아 공지보내')) {
      if(checkPermission(message)) return
      if(message.member != null) { // 채널에서 공지 쓸 때
        let contents = message.content.slice('유앱아 공지보내'.length);
        let embed = new Discord.RichEmbed()
          .setAuthor('공지와따아아')
          .setColor('#186de6')
          .setFooter(`유앱봇`)
          .setTimestamp()
    
        embed.addField('공지: ', contents);
    
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(embed)
        });
  
        return message.reply('공지 전송해써 잘해찌');
      } else {
        return message.reply('채널에서 실행해');
      }
    } else if(message.content.startsWith('-전체공지')) {
      if(checkPermission(message)) return
      if(message.member != null) { // 채널에서 공지 쓸 때
        let contents = message.content.slice('-전체공지'.length);
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(`<@${message.author.id}> ${contents}`);
        });
    
        return message.reply('공지 전송해써 잘해찌');
      } else {
        return message.reply('채널에서 실행해');
      }
    } else if(message.content.startsWith('유앱아 청소')) {
      if(message.channel.type == 'dm') {
        return message.reply('dm에서 못써');
      }
    
      if(message.channel.type != 'dm' && checkPermission(message)) return

      var clearLine = message.content.slice('유앱아 청소'.length);
      var isNum = !isNaN(clearLine)
  
      if(isNum && (clearLine <= 0 || 100 < clearLine)) {
        message.channel.send("1부터 99까지 입력해")
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
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지 소멸시킴 (이 메세지도 곧 소멸됨.)");
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

function getEmbedFields(message, modify=false) {
  if(message.content == '' && message.embeds.length > 0) {
    let e = message.embeds[0].fields;
    let a = [];

    for(let i=0;i<e.length;i++) {
        a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`);
    }

    return a.join('');
  } else if(modify) {
    return message.author.lastMessage.content;
  } else {
    return message.content;
  }
}

function MessageSave(message, modify=false) {
  imgs = []
  if (message.attachments.array().length > 0) {
    message.attachments.array().forEach(x => {
      imgs.push(x.url+'\n')
    });
  }

  username = message.author.username.match(/[\u3131-\uD79D^a-zA-Z^0-9]/ugi)
  channelName = message.channel.type != 'dm' ? message.channel.name : ''
  try {
    username = username.length > 1 ? username.join('') : username
  } catch (error) {}

  try {
    channelName = channelName.length > 1 ? channelName.join('') : channelName
  } catch (error) {}

  var s = {
    ChannelType: message.channel.type,
    ChannelId: message.channel.type != 'dm' ? message.channel.id : '',
    ChannelName: channelName,
    GuildId: message.channel.type != 'dm' ? message.channel.guild.id : '',
    GuildName: message.channel.type != 'dm' ? message.channel.guild.name : '',
    Message: getEmbedFields(message, modify),
    AuthorId: message.author.id,
    AuthorUsername: username + '#' + message.author.discriminator,
    AuthorBot: Number(message.author.bot),
    Embed: Number(message.embeds.length > 0), // 0이면 false 인거다.
    CreateTime: momenttz().tz('Asia/Seoul').locale('ko').format('ll dddd LTS')
  }

  s.Message = (modify ? '[수정됨] ' : '') + imgs.join('') + s.Message

  MessageAdd(
    s.ChannelType,
    s.ChannelId,
    s.ChannelName,
    s.GuildId,
    s.GuildName,
    s.Message,
    s.AuthorId,
    s.AuthorUsername,
    s.AuthorBot,
    s.Embed,
    s.CreateTime,
  )
    // .then((res) => {
    //   console.log('db 저장을 했다.', res);
    // })
    .catch(error => console.log(error))
}


client.login(token);