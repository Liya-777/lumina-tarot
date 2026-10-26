/* ================= 小阿卡纳 · 圣杯（水） ================= */
const DATA_CUPS = [
{
 id:"c01",suit:"cups",n:1,en:"Ace of Cups",zh:"圣杯王牌",img:"Cups01.jpg",
 kwUp:["新情感","爱的新开始","灵感涌泉","直觉开启"],kwRev:["情绪堵塞","爱意受阻","灵感干涸","空虚"],
 enKwUp:["New love","Emotional opening","Inspiration","Intuition"],enKwRev:["Blocked feelings","Withheld love","Dried inspiration","Emptiness"],
 up:"圣杯从云端溢出五道水流，白鸽衔着圣饼降落。象征情感的丰盈、爱的新开始与直觉的苏醒——心门敞开，爱与灵感同时涌出。心理上：你准备好去爱、被爱、表达感受；灵性上：这是「心之泉」的开启，慈悲与灵感同源。正位时适合表白、修复关系、开始创作，跟随内心的柔软。",
 rev:"逆位圣杯王牌表示情感被堵住了——也许是压抑情绪、害怕受伤而关上心门，或一段关系迟迟没有进展。灵感也像干涸的井。心理上：冷漠是保护色，底下是没流出来的泪；灵性上：提醒你堵不如疏。建议允许自己感受，哪怕先承认「我不太好」，心泉才会重新流动。",
 enUp:"An overflowing cup pours forth — love, intuition, and creative inspiration rise together. Open your heart; something tender is beginning.",
 enRev:"Feelings are dammed up — withheld love, blocked expression, dry inspiration. Let yourself feel, even the hard parts, and the well refills."
},
{
 id:"c02",suit:"cups",n:2,en:"Two of Cups",zh:"圣杯二",img:"Cups02.jpg",
 kwUp:["相爱相敬","关系确立","合作","吸引力"],kwRev:["关系失衡","误会","分手","合作破裂"],
 enKwUp:["Mutual love","Union","Partnership","Attraction"],enKwRev:["Imbalance","Misunderstanding","Breakup","Failed partnership"],
 up:"两人相对举杯，中间是赫尔墨斯双蛇杖——象征平等相爱、心意相通的结合。不只是爱情，也是盟友与伙伴的默契。心理上：你与某人深度对齐，彼此看见、彼此滋养；灵性上：这是「合一」的小宇宙，承诺在眼神里。正位时适合确定关系、达成合作、和解重修。",
 rev:"逆位圣杯二表示关系的天平倾斜——付出不对等、误会累积，或表面的和谐下藏着疏远。可能是热情冷却，也可能是沟通断了线。心理上：一个人端着杯子太累；灵性上：提醒你关系是双人舞，不是独角戏。建议把话说开，重新校准彼此的位置，谈不拢就体面放手。",
 enUp:"Two cups meet in equal exchange — love, partnership, and soul-level understanding. Commit, collaborate, and let the bond deepen.",
 enRev:"The exchange is unequal — misunderstanding or drift weakens the bond. Speak honestly, recalibrate, and if balance cannot return, release with grace."
},
{
 id:"c03",suit:"cups",n:3,en:"Three of Cups",zh:"圣杯三",img:"Cups03.jpg",
 kwUp:["友谊","庆祝","姐妹情","团队欢乐"],kwRev:["过度享乐","社交疲惫","小摩擦","孤立"],
 enKwUp:["Friendship","Celebration","Sisterhood","Group joy"],enKwRev:["Excess","Social burnout","Petty friction","Isolation"],
 up:"三位女子高举圣杯起舞，果园丰收，象征友谊、庆祝与群体的喜悦——好事要和在乎的人一起分享。心理上：你被伙伴环绕，笑声是最好的解药；灵性上：这是「共饮」的功课，独乐乐不如众乐乐。正位时适合聚会、团建、婚礼、庆祝成功，也预示朋友的助力。",
 rev:"逆位圣杯三表示欢乐变味或社交透支——也许是庆祝过度成了放纵，或朋友之间起了小摩擦。也可能是热闹之后更孤独。心理上：群体让你疲惫，反而想一个人待着；灵性上：提醒你友谊需要经营，也需要边界。建议精简社交圈，把真心留给真心，小别扭当面说开。",
 enUp:"Three cups raised in dance — friendship, celebration, and shared joy. Gather your people and toast the good things together.",
 enRev:"Joy tips into excess or friction taints the circle. Trim the noise, tend the true friendships, and set gentle boundaries."
},
{
 id:"c04",suit:"cups",n:4,en:"Four of Cups",zh:"圣杯四",img:"Cups04.jpg",
 kwUp:["倦怠","冷漠","沉思","错过的机会"],kwRev:["重新投入","走出麻木","接受新机会","觉醒"],
 enKwUp:["Apathy","Contemplation","Discontent","Missed offer"],enKwRev:["Re-engagement","Waking up","Accepting offers","Renewal"],
 up:"一人抱臂坐在树下，面前三只圣杯，云端又递来一只——他却没抬头。象征倦怠、麻木与错过的机会。心理上：你并非不快乐，只是对眼前的选项提不起兴趣；灵性上：提醒你「不满意」本身是信号，说明心还活着。正位时适合自省、休息，但也请抬头看看那只递来的杯子。",
 rev:"逆位圣杯四表示你终于从麻木中醒来——开始对生活重新感兴趣，愿意伸手接过那只杯子。可能是厌倦期结束，或是你决定不再无视眼前的机会。心理上：内在的火焰重新点燃；灵性上：这是「苏醒」的微小时刻。建议带着新眼光看旧事物，主动说「好」，行动会带回热情。",
 enUp:"Sitting under a tree, you ignore the cup offered from the clouds — apathy and contemplation. Rest, but then look up; an offer waits.",
 enRev:"The numbness lifts and you stir back to life. Accept what is offered, see the familiar with fresh eyes, and let action rekindle feeling."
},
{
 id:"c05",suit:"cups",n:5,en:"Five of Cups",zh:"圣杯五",img:"Cups05.jpg",
 kwUp:["失落","遗憾","悲伤","只看到失去"],kwRev:["走出悲伤","接受与修复","放下过去","重新出发"],
 enKwUp:["Loss","Regret","Grief","Focusing on loss"],enKwRev:["Moving on","Acceptance","Healing","Second chances"],
 up:"黑斗篷者低头凝视倒在地上的三只圣杯，身后还有两只立着，桥通向远方。象征失落、遗憾与悲伤——但注意：失去的只是三杯，还有两杯在，也有路可走。心理上：悲伤是真实的，值得被承认；灵性上：提醒你转身，看看还拥有什么。正位时允许自己难过，但别让遗憾挡住桥。",
 rev:"逆位圣杯五表示你开始走出悲伤——接受已发生的失去，把目光移回还立着的杯子上。可能是修复关系、原谅自己，或决定带着教训重新出发。心理上：泪干了，脚步开始向前；灵性上：这是「哀悼完成」的时刻。建议感谢过去教会你的，然后转身走上那座桥。",
 enUp:"Three cups lie spilled, but two still stand and a bridge leads on — grief and regret, yet not everything is lost. Mourn, then turn toward what remains.",
 enRev:"You emerge from grief — acceptance, healing, and the strength to move forward. Forgive, honor the lesson, and cross the bridge."
},
{
 id:"c06",suit:"cups",n:6,en:"Six of Cups",zh:"圣杯六",img:"Cups06.jpg",
 kwUp:["纯真","回忆","童年","善意馈赠"],kwRev:["困在过去","长不大","依赖旧模式","放下执念"],
 enKwUp:["Innocence","Nostalgia","Childhood","Giving"],enKwRev:["Stuck in the past","Immaturity","Old patterns","Letting go"],
 up:"孩童在花园中递出装满白色花朵的圣杯，老屋与旧时光在背景里。象征纯真、回忆与善意的馈赠——过去的温柔正在流向当下。心理上：你被旧日温暖治愈，或想回到某个无忧的时刻；灵性上：这是「初心」的回访，提醒你记得出发时的模样。正位时适合与老友重逢、翻旧物、修复童年课题。",
 rev:"逆位圣杯六表示被过去困住——也许是活在对旧时光的怀念里，无法向前，或重复着早已过时的关系模式。可能是「长不大」的舒适区。心理上：回忆成了避风港，也成了牢笼；灵性上：提醒你初心是用来前行的，不是用来回头的。建议把旧故事收进心里，转身面对当下的花园。",
 enUp:"A child offers a cup of flowers — innocence, nostalgia, and gifts from the past. Let old warmth heal you, and carry its sweetness forward.",
 enRev:"You linger in yesterday — old patterns, safe memories, unfinished childhood business. Honor the past, then step out of its garden."
},
{
 id:"c07",suit:"cups",n:7,en:"Seven of Cups",zh:"圣杯七",img:"Cups07.jpg",
 kwUp:["选择","幻想","诱惑","想象的清单"],kwRev:["做出选择","认清幻象","务实落地","聚焦"],
 enKwUp:["Choices","Illusions","Temptation","Fantasy"],enKwRev:["Deciding","Seeing clearly","Grounded action","Focus"],
 up:"云上七只圣杯盛着城堡、珠宝、桂冠与龙等幻象。象征选择过多与想象的诱惑——每个杯子都诱人，但大多是幻影。心理上：选项让人眼花缭乱，反而无法行动；灵性上：提醒你区分「想要的」与「真的需要的」。正位时适合列清单、权衡，但别在幻想里迷路。",
 rev:"逆位圣杯七表示幻象散去，迷雾中的杯子显出真容——你终于能分清哪些是泡沫，哪些值得抓牢。可能是做出了选择，或决定务实落地。心理上：聚焦让焦虑减少；灵性上：这是「取舍」的完成式。建议把清单删到只剩一个目标，然后动手，幻想经不起行动检验。",
 enUp:"Seven cups float in clouds, each holding a tempting illusion. Many choices, few real — discern between fantasy and what you truly need.",
 enRev:"The mirages clear and you see which cups are real. Make the choice, cut the list to one, and let grounded action replace daydreaming."
},
{
 id:"c08",suit:"cups",n:8,en:"Eight of Cups",zh:"圣杯八",img:"Cups08.jpg",
 kwUp:["离开","寻找更深意义","放下安逸","追寻"],kwRev:["害怕离开","犹豫不决","回头","逃避改变"],
 enKwUp:["Departure","Seeking meaning","Walking away","Quest"],enKwRev:["Fear of leaving","Indecision","Turning back","Avoiding change"],
 up:"月夜下，旅人离开叠成塔的八只圣杯，独自走向山间。象征主动离开与对更深意义的追寻——不是失去，而是放下已经满的杯子去寻更远的泉。心理上：你感到「这里有我想要的，但不是全部」；灵性上：这是灵魂的远行。正位时适合离职、搬家、结束一段安逸却停滞的关系。",
 rev:"逆位圣杯八表示想走却走不了——也许是害怕未知、放不下沉没成本，或走到一半又回头。可能是「再等等」成了习惯。心理上：留下的理由全是「应该」，不是「想要」；灵性上：提醒你离开从来不是背叛，是诚实。建议给自己设定一个期限，想清楚要带走什么，然后出发。",
 enUp:"Under the moon, the traveler leaves eight full cups behind, seeking deeper meaning. Walk away from comfort that no longer feeds your soul.",
 enRev:"You want to leave but keep turning back — fear and sunk costs hold you. Set a date, pack what matters, and honor your need for more."
},
{
 id:"c09",suit:"cups",n:9,en:"Nine of Cups",zh:"圣杯九",img:"Cups09.jpg",
 kwUp:["愿望达成","满足","享受成果","物质丰足"],kwRev:["表面满足","贪心","空虚","过度放纵"],
 enKwUp:["Wish fulfilled","Satisfaction","Enjoyment","Abundance"],enKwRev:["Superficial joy","Greed","Emptiness","Excess"],
 up:"心满意足者坐在九只圣杯排成的弧前，双手抱胸。象征愿望达成与「满足」——这是小阿卡纳里著名的「许愿牌」。心理上：你得到了想要的，或至少开始享受拥有的；灵性上：提醒你满足感来自内心，不是杯子的数量。正位时适合庆祝成果、犒赏自己，也预示心愿将成。",
 rev:"逆位圣杯九表示满足打了折——杯是满的，心是空的。可能是贪心让你总想要更多，或快乐被「不够」的想法稀释。心理上：物质无法填补情感的缺口；灵性上：提醒你九个杯不如一个真正的满足。建议盘点已经拥有的，练习感恩，别让欲望绑架快乐。",
 enUp:"Nine cups in an arc, and a man at peace — wishes fulfilled, satisfaction, and contentment. You deserve to enjoy what you have worked for.",
 enRev:"The cups are full but the heart is not — greed or emptiness steals the joy. Count what you already hold, and practice gratitude."
},
{
 id:"c10",suit:"cups",n:10,en:"Ten of Cups",zh:"圣杯十",img:"Cups10.jpg",
 kwUp:["家庭圆满","幸福安稳","和谐","传承"],kwRev:["家庭摩擦","表面和谐","关系疏离","理想破灭"],
 enKwUp:["Family joy","Harmony","Fulfillment","Legacy"],enKwRev:["Family friction","Fake harmony","Alienation","Broken ideal"],
 up:"彩虹横跨天际，十只圣杯成列，夫妻与孩童在彩虹下相拥。象征家庭圆满、情感安稳与理想的幸福图景——不是完美，而是足够好。心理上：你在关系与家庭中感到踏实；灵性上：这是「爱之传承」的愿景。正位时适合谈婚论嫁、家庭聚会、安家置业，好日子正在过。",
 rev:"逆位圣杯十表示理想中的幸福与现实有落差——可能是家庭摩擦、关系疏离，或「看起来很好」的表面和谐。也可能是对完美家庭的执念压垮了真实。心理上：比较与期待让幸福失真；灵性上：提醒你彩虹是给自己看的，不是给别人看的。建议放下剧本，接纳真实的家人与关系，从一顿饭开始修复。",
 enUp:"A rainbow spans ten cups — family harmony, emotional fulfillment, and the happiness you have built. Cherish the home and the hearts in it.",
 enRev:"Reality falls short of the ideal — friction, distance, or a facade of harmony. Release the perfect picture and tend the real relationships."
},
{
 id:"c11",suit:"cups",n:11,en:"Page of Cups",zh:"圣杯侍从",img:"Cups11.jpg",
 kwUp:["敏感","直觉","新感情消息","艺术灵感"],kwRev:["情绪化","幼稚","梦幻逃避","消息混乱"],
 enKwUp:["Sensitivity","Intuition","Romantic news","Imagination"],enKwRev:["Moodiness","Immaturity","Escapism","Mixed signals"],
 up:"少年好奇地望着圣杯中跃出的鱼——那是直觉与灵感的信使。象征敏感、浪漫想象与新消息，可能是感情方面的讯息或艺术灵感的敲门。心理上：你的心变得柔软开放，容易被美与善意打动；灵性上：这是「聆听内在之水」的阶段。正位时适合学艺术、接收情感讯息、温柔表达。",
 rev:"逆位圣杯侍从表示情绪像天气一样多变——今天心动明天冷淡，或用幻想逃避现实。可能是消息混乱、表达幼稚，让关系变得扑朔迷离。心理上：敏感没有出口，变成了情绪化；灵性上：提醒你梦要做，路也要走。建议练习把感受说清楚，而不是只让它在心里翻涌。",
 enUp:"A fish leaps from the Page's cup — intuition, tender news, and imagination stir. Stay open and let your feelings speak through art or words.",
 enRev:"Moodiness and daydreams cloud the message. Ground your emotions, communicate clearly, and let reality temper your imagination."
},
{
 id:"c12",suit:"cups",n:12,en:"Knight of Cups",zh:"圣杯骑士",img:"Cups12.jpg",
 kwUp:["浪漫","追求","理想主义","爱的使者"],kwRev:["花心","情绪不稳","不切实际","幻想破灭"],
 enKwUp:["Romance","Charm","Idealism","Proposal"],enKwRev:["Fickleness","Mood swings","Unrealistic","Broken fantasy"],
 up:"骑士缓步前行，双手捧杯，头盔上有翅膀——他是带着玫瑰前来的浪漫使者。象征追求、理想主义与情感的邀约。心理上：你渴望被深情以待，也愿意温柔付出；灵性上：这是「为爱而行」的骑士精神。正位时适合表白、约会、表达心意，让浪漫落地成真。",
 rev:"逆位圣杯骑士表示浪漫空转——可能是承诺停留在嘴上，或情绪起伏让心意变得不可信。也许是理想主义撞上现实，幻想开始破灭。心理上：渴望爱又怕被看穿；灵性上：提醒你真心比情话珍贵。建议少一点表演，多一点行动，让承诺有重量。",
 enUp:"The Knight of Cups rides forward, offering his heart — romance, charm, and an invitation to love. Say what you feel; let romance become real.",
 enRev:"Charm without substance, promises without follow-through. Ground your affection in action and let reality meet your ideals halfway."
},
{
 id:"c13",suit:"cups",n:13,en:"Queen of Cups",zh:"圣杯王后",img:"Cups13.jpg",
 kwUp:["温柔","共情","直觉力","疗愈"],kwRev:["过度敏感","情绪淹没","依赖","内心失衡"],
 enKwUp:["Compassion","Empathy","Intuition","Healing"],enKwRev:["Over-sensitivity","Emotional overwhelm","Dependency","Inner imbalance"],
 up:"王后端坐海边，凝视手中的圣杯，杯顶有天使。象征温柔、共情与深沉的直觉——她是情绪的容器，也是疗愈的泉源。心理上：你懂得承接他人的情感，也值得被承接；灵性上：这是「水之智慧」的化身，柔软而深不可测。正位时适合倾听、陪伴、疗愈他人，也请允许自己被疗愈。",
 rev:"逆位圣杯王后表示情感超载——太容易共情，结果被别人的情绪淹没；或过度依赖他人确认自己的价值。可能是心湖起了风暴，难以自持。心理上：温柔变成内耗；灵性上：提醒你先稳住自己的水面，才能映照他人。建议练习「不接别人的情绪球」，给自己留一道堤坝。",
 enUp:"The Queen of Cups holds stillness and depth — empathy, intuition, and quiet healing. Be gentle with others, and just as gentle with yourself.",
 enRev:"Empathy overflows into overwhelm or dependence. Build a shore for your own feelings — you cannot pour healing from an empty cup."
},
{
 id:"c14",suit:"cups",n:14,en:"King of Cups",zh:"圣杯国王",img:"Cups14.jpg",
 kwUp:["情绪成熟","慈悲","掌控情感","外交"],kwRev:["情绪压抑","冷酷","操纵情感","内耗"],
 enKwUp:["Emotional maturity","Compassion","Mastery","Diplomacy"],enKwRev:["Suppression","Coldness","Emotional control","Inner turmoil"],
 up:"国王端坐于波涛之上，右手持杯，左手握权杖，海面平静。象征情绪的成熟与慈悲的掌控力——他感受得到风浪，却能让水面平稳。心理上：你学会了与情绪共处而不被淹没，适合处理复杂局面；灵性上：这是「外王内圣」的水之修行。正位时适合谈判、调解、稳定军心。",
 rev:"逆位圣杯国王表示情绪被压得太深——表面风平浪静，底下暗流涌动，可能在用冷静掩盖受伤。也许是冷酷或操纵，用理智控制人心。心理上：压抑的情绪终会找出口；灵性上：提醒你真正的掌控是允许流动。建议给自己一个安全的方式表达情绪，别把海啸闷在杯里。",
 enUp:"The King of Cups masters the waves — emotional maturity, compassion, and calm authority. Steady the waters around you with quiet wisdom.",
 enRev:"Deep feelings are sealed under ice — suppression, coldness, or subtle manipulation. Let the tide move; real mastery allows feeling to flow."
}
];
