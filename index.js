const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
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
      .addField('핑상태 보기', '어우 핑 개가타', true)
      .addField('대화', '유앱아 라고 하면\n유앱이가 아주 \n정성을 다해 다댑해줌\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('유앱이가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == '유앱이도움') {
    let helpImg = '';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: '유앱아 도와줘', desc: '유앱아 도와줘'},
      {name: '유앱이도움', desc: '유앱이 도움 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
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
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "이 명령어쓸 관리자 권한이 없자나.")
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


client.login(token);