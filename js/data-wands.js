/* ================= 小阿卡纳 · 权杖（火） ================= */
const DATA_WANDS = [
{
 id:"w01",suit:"wands",n:1,en:"Ace of Wands",zh:"权杖王牌",img:"Wands01.jpg",
 kwUp:["灵感火种","新能量","创造的冲动","机会"],kwRev:["热情熄灭","拖延","灵感压抑","缺乏方向"],
 enKwUp:["Spark of inspiration","New energy","Creative impulse","Opportunity"],enKwRev:["Dying passion","Procrastination","Suppressed ideas","No direction"],
 up:"云端之手握着发芽的权杖，远方是城堡——一个新的念头正在破土而出。象征灵感的火种、生命力的爆发与创造的原动力。心理上：你感到一股跃跃欲试的能量，想开始点什么；灵性上：这是「火」的礼物，行动点燃一切可能。正位时适合启动新项目、表白、创业，抓住这股冲劲。",
 rev:"逆位王牌表示热情被浇灭或灵感尚未成型——想做的事迟迟没有开始，或开始了却提不起劲。可能是恐惧拖延了火苗，也可能是方向太散。心理上：冲动与行动之间隔着一层犹豫；灵性上：提醒你火种需要氧气，别让顾虑闷熄它。建议先迈出最小的一步，让行动重新点燃热情。",
 enUp:"A hand from the clouds offers a budding wand — inspiration, raw creative fire, and a door opening. Strike while the spark is hot; begin now.",
 enRev:"The spark is smothered by delay or fear. Find the smallest first step and take it — action is the oxygen that rekindles the flame."
},
{
 id:"w02",suit:"wands",n:2,en:"Two of Wands",zh:"权杖二",img:"Wands02.jpg",
 kwUp:["规划","远见","拓展视野","掌控全局"],kwRev:["计划受阻","害怕未知","缺乏远见","犹豫"],
 enKwUp:["Planning","Vision","Expansion","Mastery"],enKwRev:["Blocked plans","Fear of the unknown","Narrow view","Indecision"],
 up:"一人手握权杖俯瞰世界地图，另一根权杖固定在墙上。象征规划与远见——你已经在自己的领域站稳，此刻正眺望更远的地平线。心理上：你为未来布局，既有把握当下也有野心向外；灵性上：这是「从拥有到扩张」的转折点。正位时适合做长期规划、拓展业务、准备远行。",
 rev:"逆位权杖二表示计划卡在原地——想得太多做得太少，或害怕离开舒适区。可能是对未知的恐惧让你迟迟不敢出发。心理上：视野被担忧收窄；灵性上：提醒你世界地图一直在那里，敢看才敢去。建议把大目标拆小，先迈出第一步，再逐步扩展。",
 enUp:"From a stable stronghold you survey the wider world — planning, vision, and deliberate expansion. Look far, then commit to the journey.",
 enRev:"Plans stall at the threshold; fear of the unknown narrows your view. Break the big vision into small steps and take the first one."
},
{
 id:"w03",suit:"wands",n:3,en:"Three of Wands",zh:"权杖三",img:"Wands03.jpg",
 kwUp:["远见实现","扩张","合作","等待收获"],kwRev:["延误","合作不顺","视野受限","进展缓慢"],
 enKwUp:["Vision realized","Expansion","Cooperation","Harvest ahead"],enKwRev:["Delay","Poor cooperation","Limited vision","Slow progress"],
 up:"商人站在崖边眺望远方的船只，象征付出已见成效、扩张与合作正在发生。你播下的种子已发出新芽，耐心等待会有更好的消息。心理上：信心随着视野一起增长；灵性上：这是「看护成长」的阶段——不干预，只守望。正位时适合国际合作、扩大版图、静候佳音。",
 rev:"逆位权杖三表示进展延误或合作受阻——等的人没来、等的消息没到，或合作伙伴步调不一。可能是计划太过乐观，忽略了执行细节。心理上：期待落空带来焦躁；灵性上：提醒你成长有它自己的节奏。建议主动跟进，调整预期，把守望变成推动。",
 enUp:"Ships appear on the horizon — your plans expand and partnerships bear fruit. Keep watching with confidence; good news is on the way.",
 enRev:"Delays and mismatched partners stall expansion. Adjust expectations, follow up actively, and let growth proceed at its own pace."
},
{
 id:"w04",suit:"wands",n:4,en:"Four of Wands",zh:"权杖四",img:"Wands04.jpg",
 kwUp:["庆祝","稳定","归家","里程碑"],kwRev:["庆祝被扰","根基不稳","缺乏归属","仪式感缺失"],
 enKwUp:["Celebration","Stability","Homecoming","Milestone"],enKwRev:["Disrupted joy","Unstable ground","No belonging","Missing ceremony"],
 up:"四根权杖撑起花环，远处是城堡与欢庆的人群。象征庆祝、安定与归属——一段旅程的里程碑达成，值得举杯。心理上：你感到被接纳、被支持，身心有了落脚之处；灵性上：这是「感恩当下」的功课。正位时适合婚礼、乔迁、庆功宴、家庭团聚，享受此刻的圆满。",
 rev:"逆位权杖四表示庆祝被推迟或根基不稳——喜事被琐事打扰，或你感觉不到归属感。可能是表面热闹、内心漂泊，也可能是家庭、居所方面有动荡。心理上：仪式感缺失让快乐打折；灵性上：提醒你幸福需要被「庆祝」来确认。建议主动安排一次小小的庆祝，把心安放下来。",
 enUp:"Four wands raise a garland of celebration — stability, home, and a milestone reached. Gather your people and rejoice in this moment.",
 enRev:"Joy is interrupted or the ground feels unsteady. Create your own small ceremony of belonging; celebrate what you have built."
},
{
 id:"w05",suit:"wands",n:5,en:"Five of Wands",zh:"权杖五",img:"Wands05.jpg",
 kwUp:["竞争","冲突","磨合","竞技"],kwRev:["冲突缓解","和解","避免争执","学会合作"],
 enKwUp:["Competition","Conflict","Friction","Sparring"],enKwRev:["Conflict easing","Reconciliation","Avoiding fights","Learning cooperation"],
 up:"五个年轻人挥舞权杖混战，杖与杖交错。象征竞争、意见碰撞与磨合——乱中有序，混乱里藏着活力。心理上：不同声音在争夺主导权，争执是沟通的粗糙形式；灵性上：这是「练习场」，冲突能磨出更清醒的自我。正位时适合竞技、辩论、头脑风暴，把较量变成成长。",
 rev:"逆位权杖五表示冲突正在平息——争执降温，双方愿意坐下来谈。也可能是你选择回避对抗，或竞争变得不公平。心理上：疲惫感让斗志消退；灵性上：提醒你和平不等于压抑，健康的表达仍有必要。建议把力气从「赢」转向「共识」，让磨合走向合作。",
 enUp:"Five wands clash in spirited sparring — competition, debate, and healthy friction. Engage boldly; the chaos sharpens your edge.",
 enRev:"The fighting cools and reconciliation becomes possible. Avoid useless battles, but don't suppress your voice — turn rivalry into teamwork."
},
{
 id:"w06",suit:"wands",n:6,en:"Six of Wands",zh:"权杖六",img:"Wands06.jpg",
 kwUp:["胜利","认可","公众赞誉","晋升"],kwRev:["胜利延迟","骄傲自满","缺乏认可","挫败"],
 enKwUp:["Victory","Recognition","Public acclaim","Promotion"],enKwRev:["Delayed victory","Arrogance","Lack of recognition","Defeat"],
 up:"头戴桂冠的凯旋者骑马归来，人群夹道欢呼。象征胜利、认可与公众的掌声——你的努力被看见，荣耀实至名归。心理上：自信与成就感达到高峰；灵性上：这是「接受荣耀」的功课，坦然领受而不自满。正位时适合述职、公开亮相、接受表扬，也预示竞争中的胜出。",
 rev:"逆位权杖六表示胜利打折扣或认可迟到——付出未必马上被看见，也可能是成功让你飘了，招致反噬。心理上：对认可的渴望让人患得患失；灵性上：提醒你荣耀是过程的结果，不是目标本身。建议把重心放回事情本身，谦虚地继续精进，掌声会来的。",
 enUp:"Crowned with laurel, you ride home in triumph — victory, recognition, and public acclaim. Accept the honor graciously and keep your humility.",
 enRev:"Recognition lags or pride invites a fall. Stay grounded in the work itself; the applause will come when it is truly earned."
},
{
 id:"w07",suit:"wands",n:7,en:"Seven of Wands",zh:"权杖七",img:"Wands07.jpg",
 kwUp:["坚守立场","面对挑战","不屈不挠","保卫"],kwRev:["不堪重负","防线崩溃","放弃","过度防御"],
 enKwUp:["Holding ground","Facing challenges","Perseverance","Defense"],enKwRev:["Overwhelmed","Collapsing defense","Giving up","Over-defensiveness"],
 up:"一人立于高地，挥杖抵御下方攻来的六根权杖。象征坚守立场、迎战挑战——你站在有利位置，胜负取决于是否坚持。心理上：压力来自四面八方，但你有地形优势；灵性上：这是「守土」的功课，边界需要被捍卫。正位时适合坚持己见、顶住压力、拒绝被裹挟。",
 rev:"逆位权杖七表示防线吃紧或已生退意——挑战太多，你感到力不从心，或开始怀疑坚持的价值。可能是过度防御把盟友也挡在了外面。心理上：疲惫与不安让你想放弃高地；灵性上：提醒你守的不是面子，是原则。建议调整战术，向值得的人求助，退一步不一定是输。",
 enUp:"Standing on high ground, you fend off six wands — challenges press in, but your position holds. Stand firm; perseverance decides the day.",
 enRev:"The pressure grows and your defense wavers. Reassess your tactics, ask for support, and remember that guarding your values is worth the fight."
},
{
 id:"w08",suit:"wands",n:8,en:"Eight of Wands",zh:"权杖八",img:"Wands08.jpg",
 kwUp:["快速进展","消息将至","行动","旅行"],kwRev:["延误","沟通受阻","失控","计划打乱"],
 enKwUp:["Fast progress","News arriving","Action","Travel"],enKwRev:["Delay","Miscommunication","Loss of control","Disrupted plans"],
 up:"八根权杖凌空飞驰，掠过田野与河流，气势如虹。象征飞速进展、箭在弦上——事情正在以超出预期的速度推进，消息与结果很快到达。心理上：节奏加快，多线并进，有些应接不暇却充满动能；灵性上：这是「顺势加速」的时刻。正位时适合乘势而为、推进项目、安排出行，回复会很快。",
 rev:"逆位权杖八表示速度被打断——快递延误、邮件石沉大海、计划临时生变。可能是沟通出了岔子，或推进太快反而失控。心理上：悬而未决的等待最磨人；灵性上：提醒你失控时先稳住中心。建议确认信息、梳理优先级，把散落的箭一支支收回来。",
 enUp:"Eight wands streak across the sky — momentum, rapid progress, and imminent news. Everything is moving fast; ride the current and respond quickly.",
 enRev:"Speed falters: delays, miscommunication, or plans derail. Slow down deliberately, confirm the details, and gather the scattered threads."
},
{
 id:"w09",suit:"wands",n:9,en:"Nine of Wands",zh:"权杖九",img:"Wands09.jpg",
 kwUp:["坚韧","警惕","最后一搏","防线稳固"],kwRev:["精疲力竭","疑神疑鬼","准备放弃","过度防御"],
 enKwUp:["Resilience","Vigilance","Last stand","Fortified"],enKwRev:["Exhaustion","Paranoia","Ready to quit","Over-guarded"],
 up:"带伤者拄杖而立，身后八根权杖立成一排，他仍在戒备。象征坚韧与警惕——你已经受了伤、扛了很久，但选择继续守下去。心理上：创伤让你多疑，但坚持是你最强的武器；灵性上：这是「最后一里路」的考验。正位时提醒你：就差一点了，守住底线，但别忘记休息。",
 rev:"逆位权杖九表示防线接近崩溃——体力与心力都到了临界点，开始怀疑坚持的意义。可能是警惕过了头，草木皆兵，把疲惫传染给身边的人。心理上：防御变成消耗；灵性上：提醒你韧性也包括「承认需要休息」。建议放下部分戒备，疗伤后再战，退守不是失败。",
 enUp:"Wounded but standing, you guard the line — resilience and vigilance in the final stretch. Hold the boundary, but let yourself rest too.",
 enRev:"Exhaustion nears its limit and suspicion drains you further. Rest, lower the guard where it is safe, and heal before the next round."
},
{
 id:"w10",suit:"wands",n:10,en:"Ten of Wands",zh:"权杖十",img:"Wands10.jpg",
 kwUp:["重担","责任","压力","为目标忍耐"],kwRev:["卸下重担","学会放手","责任分散","崩溃释放"],
 enKwUp:["Burden","Responsibility","Pressure","Endurance"],enKwRev:["Laying down the load","Letting go","Sharing duties","Breaking point"],
 up:"一人艰难地抱着十根权杖走向小镇，腰被压弯。象征沉重的责任与过度负荷——你把所有事都揽在自己身上，为了目标咬牙前行。心理上：成就感与疲惫并存，你既是英雄也是苦工；灵性上：这是「承担」与「分配」的边界问题。正位时提醒你：责任要扛，但不必独自扛到底。",
 rev:"逆位权杖十表示终于放下或不得不放——重担被分担、项目被交接，或是被压垮后的被迫松手。可能是你学会说不，也可能是一切到了临界点。心理上：松手那一刻，既有轻松也有不甘；灵性上：这是「舍」的完成式。建议主动交接与求助，把力气留给真正需要你的地方。",
 enUp:"Bent under ten wands, you carry an impossible load. Your endurance is admirable, but you do not have to carry it alone — delegate, share, lighten.",
 enRev:"The burden finally breaks free — duties shared, or the load collapses on its own. Saying no is not failure; it is the beginning of balance."
},
{
 id:"w11",suit:"wands",n:11,en:"Page of Wands",zh:"权杖侍从",img:"Wands11.jpg",
 kwUp:["探索热情","新消息","学徒","好奇心"],kwRev:["三分钟热度","拖延","急躁","缺乏方向"],
 enKwUp:["Enthusiasm","Exploration","News","Curiosity"],enKwRev:["Fleeting interest","Procrastination","Impatience","Aimlessness"],
 up:"少年好奇地端详着手中的权杖，身上是火焰图案。象征热情、探索与新鲜感——一颗年轻的火种，对世界充满好奇。代表新消息、新学习或一个跃跃欲试的开始。心理上：你处在「什么都想试」的兴奋期；灵性上：这是学徒的谦逊与热忱。正位时适合学习新技能、接收新消息、勇敢尝试。",
 rev:"逆位权杖侍从表示三分钟热度或拖延——兴趣来得快去得也快，计划总停在嘴上。可能是急于求成，没耐心走完过程。心理上：好奇心没有转化为行动力；灵性上：提醒你火苗需要持续添柴。建议选定一件事，专注做满 30 天，把「想」变成「做」。",
 enUp:"The Page of Wands gazes at his staff with wide-eyed curiosity — enthusiasm, exploration, and exciting news. Begin the adventure; learn with joy.",
 enRev:"Enthusiasm fizzles into procrastination, or you rush without direction. Pick one flame and tend it daily — passion becomes power through practice."
},
{
 id:"w12",suit:"wands",n:12,en:"Knight of Wands",zh:"权杖骑士",img:"Wands12.jpg",
 kwUp:["冒险","热情","行动派","冲击力"],kwRev:["鲁莽冲动","虎头蛇尾","急躁","失控"],
 enKwUp:["Adventure","Passion","Action","Charge"],enKwRev:["Recklessness","Quitting halfway","Impatience","Out of control"],
 up:"骑士高举权杖策马奔腾，披风猎猎，山火在远方燃烧。象征冒险、热情与行动力——想到就去做，风驰电掣。心理上：你处于高能量的冲锋状态，魅力与冲动并存；灵性上：这是「火」最烈的一面，需要缰绳。正位时适合大胆出击、旅行、启动新冒险，但记得给热情装个刹车。",
 rev:"逆位权杖骑士表示冲过头或没冲出去——要么鲁莽行事撞了墙，要么热情烧完就熄火。可能是在冲动中做了决定，现在想反悔。心理上：肾上腺素退去后的空虚；灵性上：提醒你勇气体现在方向感，而非速度。建议先看清地图再策马，别让三分钟热血变成烂尾工程。",
 enUp:"The Knight of Wands charges ahead, fire in his wake — passion, adventure, and bold action. Move fast, but keep a hand on the reins.",
 enRev:"Reckless rushing or a blaze that dies young. Map the terrain before you gallop — courage needs direction, not just speed."
},
{
 id:"w13",suit:"wands",n:13,en:"Queen of Wands",zh:"权杖王后",img:"Wands13.jpg",
 kwUp:["自信","热情","魅力","感染力"],kwRev:["嫉妒","控制欲","情绪化","缺乏安全感"],
 enKwUp:["Confidence","Charisma","Passion","Magnetism"],enKwRev:["Jealousy","Control","Moodiness","Insecurity"],
 up:"王后手持向日葵与权杖端坐，脚边黑猫相伴。象征自信、热情与太阳般的吸引力——她知道自己要什么，也照亮身边的人。心理上：你正处于魅力与行动力兼备的状态，适合主导场面；灵性上：这是「自爱」的典范，先温暖自己才能温暖他人。正位时适合社交、带团队、展现领导风采。",
 rev:"逆位权杖王后表示魅力蒙尘——可能是嫉妒他人、缺乏安全感，或控制欲在关系中冒头。也可能是情绪起伏大，灼伤身边的人。心理上：阳光底下藏着阴影，自信需要用比较来确认；灵性上：提醒你回到自己的太阳，不必借别人的光。建议把注意力从他人转回自身，先哄好自己。",
 enUp:"The Queen of Wands radiates warmth and confidence — charisma, passion, and magnetic presence. Shine boldly and inspire those around you.",
 enRev:"Insecurity, jealousy, or a need to control dims your flame. Return to your own light — your warmth returns when you stop comparing."
},
{
 id:"w14",suit:"wands",n:14,en:"King of Wands",zh:"权杖国王",img:"Wands14.jpg",
 kwUp:["领导力","远见","魄力","开创者"],kwRev:["独断专行","冲动决策","威严失控","缺乏远见"],
 enKwUp:["Leadership","Vision","Charisma","Founder energy"],enKwRev:["Domineering","Impulsive decisions","Lost authority","No vision"],
 up:"国王端坐于宝座，手持发芽的权杖，衣袍上有蜥蜴与狮子图案。象征领导力、远见与开创精神——他是把火种变成事业的战略家。心理上：你具备掌控全局的气场，适合担纲主帅；灵性上：这是「君王之火」的功课，权力为创造服务。正位时适合创业、升任领导、拍板重大决定。",
 rev:"逆位权杖国王表示领导力失衡——可能是独断专行听不进意见，或凭一时冲动做决定。也可能是气势太盛压得人喘不过气。心理上：权威感来自恐惧而非服众；灵性上：提醒你真正的王权是「让人愿意跟随」。建议多听少断，把火气变成火候，谋定而后动。",
 enUp:"The King of Wands is a visionary leader — bold, charismatic, and built for founding. Take command, but let your fire serve the long game.",
 enRev:"Domineering or impulsive, your authority wobbles. Listen before deciding, temper the fire with patience, and lead by earning trust."
}
];
