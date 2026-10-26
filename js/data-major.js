/* ================= 22 张大阿卡纳 ================= */
const DATA_MAJOR = [
{
 id:"00",n:0,suit:"major",en:"The Fool",zh:"愚者",img:"00-TheFool.jpg",
 kwUp:["新的开始","冒险","天真","无限可能"],kwRev:["鲁莽","犹豫","停滞","缺乏方向"],
 enKwUp:["New beginnings","Adventure","Innocence","Infinite potential"],enKwRev:["Recklessness","Indecision","Stagnation","Lack of direction"],
 up:"牌面是脚边有悬崖、仰望天空的年轻人，小白狗提醒他危险，他背着小包袱即将启程。象征全新的开始、纯粹的信任与无限可能性。心理上代表放下过往、以赤子之心拥抱未知；灵性上呼应「无知即勇」，提醒你出发比完美更重要。正位时鼓励你相信直觉，跨出第一步，别让恐惧定义你。",
 rev:"逆位的愚者失去了天真的勇气，变得鲁莽冲动，或相反地畏首畏尾。可能是该深思却贸然行事，也可能是机会就在眼前却因犹豫而错过。心理上暗示内心的不安在放大风险；灵性上提醒你：真正的勇气不是盲目，而是看清危险后依然选择前行。建议停下评估，找回初心，别用逃避代替冒险。",
 enUp:"A young traveler stands at the edge of a cliff, full of trust and wonder. The Fool brings new beginnings, pure faith, and unlimited potential — take the leap, guided by intuition.",
 enRev:"The reversed Fool acts recklessly or hesitates at the threshold. Reconnect with your original intent and balance innocence with awareness before moving forward."
},
{
 id:"01",n:1,suit:"major",en:"The Magician",zh:"魔术师",img:"01-TheMagician.jpg",
 kwUp:["意志力","创造力","资源整合","行动力"],kwRev:["拖延","误用才能","操控","缺乏方向"],
 enKwUp:["Willpower","Creativity","Manifestation","Resourcefulness"],enKwRev:["Procrastination","Misused talent","Manipulation","Lack of direction"],
 up:"魔术师一手朝天一手朝地，桌上摆放四元素的权杖、圣杯、宝剑与星币，象征「上界如下界」——你已握有完成愿望所需的全部工具。代表意志力、创造力与资源的整合，是行动力最强的一张牌。心理上：你正处在能力与自信的高点，表达与执行都顺畅；灵性上：你即是创造者，能量源源不绝。正位提示把握此刻，主动出击。",
 rev:"逆位魔术师意味着能量被浪费或误用——空有才华却缺乏方向，或过度操控、玩弄手段。可能是拖延、自我怀疑掐断了创造力，也可能用花言巧语掩盖真实意图。心理上：才华与行动之间出现断层；灵性上：提醒你回归诚实，检查自己的动机。建议停止空想，把技能用在真正重要的事情上。",
 enUp:"The Magician holds all four elements at his command — will, creativity, and resourcefulness are fully available. Your power to manifest is at its peak; act with confidence.",
 enRev:"Energy is scattered or misused: talents go to waste, or manipulation creeps in. Return to honest motives and channel your skills toward what truly matters."
},
{
 id:"02",n:2,suit:"major",en:"The High Priestess",zh:"女祭司",img:"02-TheHighPriestess.jpg",
 kwUp:["直觉","潜意识","静默","内在智慧"],kwRev:["忽视直觉","表面信息","压抑真相","心神不宁"],
 enKwUp:["Intuition","Subconscious","Silence","Inner wisdom"],enKwRev:["Ignored intuition","Superficiality","Suppressed truth","Restlessness"],
 up:"女祭司端坐于黑白双柱之间，帷幕之后是幽深的潜意识之海。象征直觉、静默与内在智慧。她不急于行动，而是在等待与倾听中洞悉真相。心理上：答案不在外面，而在你的潜意识里，请相信第六感；灵性上：这是「知而不言」的智慧，月亮的光是间接的，真理需要自己领悟。正位时适合冥想、静观或等待时机。",
 rev:"逆位女祭司暗示你与直觉失去连接，可能忽视内心的声音、被表面信息误导，或过度压抑情感与真相。也可能是「知道却不愿面对」。心理上：理性压倒了感知，你听不见自己；灵性上：提醒你重拾静默，倾听潜意识。建议暂时放下外界的喧嚣，给内心留白，真相自会浮现。",
 enUp:"The High Priestess sits between two pillars, guarding the veil of the subconscious. Silence your mind — the answer you seek already lives within your intuition.",
 enRev:"You have lost touch with your inner voice, misled by appearances or suppressing the truth. Still the noise, and let your intuition speak again."
},
{
 id:"03",n:3,suit:"major",en:"The Empress",zh:"女皇",img:"03-TheEmpress.jpg",
 kwUp:["丰饶","滋养","创造力","感官享受"],kwRev:["过度付出","依赖","创作受阻","自我忽视"],
 enKwUp:["Abundance","Nurturing","Creativity","Sensuality"],enKwRev:["Over-giving","Dependency","Creative block","Self-neglect"],
 up:"女皇坐在丰收的麦田间，身边是金星符号，象征丰饶、滋养与爱的创造力。代表母亲般的呵护、感官享受、物质丰盛与美的表达。心理上：你被温柔地支持着，值得享受生活的果实；灵性上：大地之母的能量提醒你扎根现实，用爱与耐心培育你的事业与关系。正位往往预示好孕、收获、创作成果或关系的升温。",
 rev:"逆位女皇可能意味着创造力受阻、过度付出或自我忽视——照顾了所有人却忘了自己。也可能象征依赖、占有欲过强，或物质、身体层面的匮乏感。心理上：爱的给予失去边界，滋养变成了消耗；灵性上：提醒你先滋养自己，空杯子倒不出水。建议设立边界，把温柔也留给自己。",
 enUp:"The Empress overflows with abundance, nurture and creative love. Receive life's gifts and let your creations bloom through patience and care.",
 enRev:"You give too much and receive too little — dependence or creative blockage drains you. Set loving boundaries and refill your own cup first."
},
{
 id:"04",n:4,suit:"major",en:"The Emperor",zh:"皇帝",img:"04-TheEmperor.jpg",
 kwUp:["秩序","权威","责任","稳定"],kwRev:["控制欲","固执","逃避责任","僵化"],
 enKwUp:["Order","Authority","Responsibility","Stability"],enKwRev:["Control","Stubbornness","Avoidance","Rigidity"],
 up:"皇帝稳坐于石座上，手持权杖与宝球，身后是荒凉山峦，象征秩序、权威、责任与结构。代表理性治理、父亲的能量、规则与稳定。心理上：你拥有掌控局面的能力，自律带来安全感；灵性上：这是「建立秩序」的功课——真正的力量来自内在的纪律而非压迫。正位时适合制定计划、承担领导角色、落实长期目标。",
 rev:"逆位皇帝意味着权威被滥用或缺失——要么控制欲过强、固执专横，要么软弱逃避、无法承担责任。可能是僵化的规则扼杀了活力，也可能是你正反抗不合理的管束。心理上：安全感的来源出了问题；灵性上：提醒你审视自己与「权威」的关系。建议放下过度的控制，学会柔韧地坚持原则。",
 enUp:"The Emperor brings order, authority and stability. Take charge with discipline and build structures that endure — true power comes from inner structure.",
 enRev:"Authority is either abused or abandoned: rigid control, or refusal to take responsibility. Soften your grip and examine how you relate to power."
},
{
 id:"05",n:5,suit:"major",en:"The Hierophant",zh:"教皇",img:"05-TheHierophant.jpg",
 kwUp:["传统","信仰","导师","制度"],kwRev:["质疑权威","离经叛道","教条束缚","伪导师"],
 enKwUp:["Tradition","Faith","Guidance","Institutions"],enKwRev:["Questioning authority","Rebellion","Dogma","False guru"],
 up:"教皇端坐于两柱之间，向信徒布道，象征传统、信仰、制度与精神导师。代表遵循既定规则、学习正统知识、寻求长辈或权威的指引。心理上：你渴望被认同，需要一个体系或社群来安放信念；灵性上：透过传统与仪式获得智慧，婚礼、教育、传承都在这张牌的范畴。正位提示：在框架内前进，虚心求教会让你走得更稳。",
 rev:"逆位教皇表示对传统与教条的质疑或背离——你不再盲从权威，开始建立属于自己的信念体系。也可能暗示被教条束缚太久，或遭遇「伪导师」。心理上：内在的叛逆在觉醒，这是成长的必经之路；灵性上：从「信别人」转向「信自己」。建议批判性地看待规则，但别为了反叛而反叛。",
 enUp:"The Hierophant stands for tradition, faith and wise counsel. Learn from established systems and mentors — following sound frameworks brings stability.",
 enRev:"You question dogma and refuse to follow blindly, forging your own belief system. Guard against false teachers and rebellion for its own sake."
},
{
 id:"06",n:6,suit:"major",en:"The Lovers",zh:"恋人",img:"06-TheLovers.jpg",
 kwUp:["爱","结合","选择","价值观契合"],kwRev:["失衡","价值观冲突","摇摆不定","沟通失灵"],
 enKwUp:["Love","Union","Choice","Alignment"],enKwRev:["Imbalance","Conflict","Indecision","Miscommunication"],
 up:"伊甸园中天使庇佑之下的男女，象征爱、结合、选择与价值观的契合。不只是爱情——它代表做出跟随内心的选择，与某人或某事建立深刻的联结。心理上：你在爱与理性之间寻求和谐；灵性上：这是心与心的合而为一，也是与神圣意志的盟约。正位时感情甜蜜，也预示重大的、忠于内心的决定。",
 rev:"逆位恋人意味着关系中的失衡、价值观冲突或沟通失灵——爱意犹在，却无法对齐。也可能代表你在选择面前摇摆不定、违背本心。心理上：内部分裂让外在关系也失和；灵性上：提醒你诚实面对自己的需求，别在妥协中迷失。建议坦诚沟通，先与自己和解，再谈与他人结合。",
 enUp:"The Lovers unite heart and values — love, meaningful bonds, and choices made from the soul. In matters of the heart, follow what rings true.",
 enRev:"Imbalance or conflicting values strain the bond; you waver between choices. Communicate honestly, reconcile with yourself first, then with others."
},
{
 id:"07",n:7,suit:"major",en:"The Chariot",zh:"战车",img:"07-TheChariot.jpg",
 kwUp:["意志力","胜利","掌控方向","克服障碍"],kwRev:["失去方向","意志涣散","失控","停滞"],
 enKwUp:["Willpower","Victory","Direction","Overcoming obstacles"],enKwRev:["Lost direction","Scattered will","Out of control","Stalled"],
 up:"战士驾驭黑白双狮拉动的战车，代表意志力、胜利与掌控方向。象征以坚定的决心克服对立，把两种力量驯服为前进的动力。心理上：自律与专注让你势不可挡；灵性上：这是「驾驭自我」的功课——情绪与理智、本能与意志都要为你所用。正位往往预示突破难关、竞赛获胜、事业进展。方向明确，就全速前进。",
 rev:"逆位战车表示失去方向或动力——意志涣散、冲突失控，前进的车轮陷在泥里。可能是过度激进导致翻车，也可能是害怕前行而原地打转。心理上：内在的两种力量在互相拉扯；灵性上：提醒你先整合自己，再出发。建议放慢速度，重新确认目标，把散乱的精力收拢。",
 enUp:"The Chariot charges forward on willpower and focus. Master your opposing forces, keep your eyes on the goal, and victory follows.",
 enRev:"You have lost momentum or direction — inner forces pull against each other. Slow down, realign with your goal, and gather your scattered energy."
},
{
 id:"08",n:8,suit:"major",en:"Strength",zh:"力量",img:"08-Strength.jpg",
 kwUp:["以柔克刚","勇气","耐心","内在力量"],kwRev:["自我怀疑","情绪失控","底气不足","压抑"],
 enKwUp:["Gentle strength","Courage","Patience","Inner power"],enKwRev:["Self-doubt","Losing control","Weakness","Suppression"],
 up:"温柔的女子轻抚雄狮之口，象征以柔克刚、内在勇气与耐心。真正的力量不是征服，而是驯服——用爱化解兽性，用坚持战胜恐惧。心理上：你比想象中更坚韧，温和比强硬更有力；灵性上：这是「驯服内在野兽」的修炼，接纳自己的阴影才能获得真正的自由。正位时适合以柔克刚地处理难题，病中也是恢复的好兆头。",
 rev:"逆位力量暗示内在的软弱或失控——可能是自我怀疑、底气不足，让情绪这头「狮子」反噬了你。也可能是过度压抑导致爆发。心理上：你与自己的本能失去了和平；灵性上：提醒你别用暴力对抗恐惧，先接纳它。建议从小事上重建自信，练习温和而坚定的表达。",
 enUp:"Strength tames the lion with gentleness, not force. Your quiet courage and patience can dissolve what aggression cannot — trust your inner calm.",
 enRev:"Self-doubt or raw emotion has slipped out of your control. Make peace with your inner lion — accept it, then guide it with gentleness."
},
{
 id:"09",n:9,suit:"major",en:"The Hermit",zh:"隐士",img:"09-TheHermit.jpg",
 kwUp:["独处","内省","寻求真理","智慧之光"],kwRev:["过度孤僻","逃避自省","孤独封闭","急于求成"],
 enKwUp:["Solitude","Introspection","Seeking truth","Inner light"],enKwRev:["Isolation","Avoidance","Closed off","Impatience"],
 up:"老人提灯独行于雪山之巅，灯中六芒星象征内在的智慧之光。代表独处、内省、追寻真理。离开人群不是逃避，而是为了更好地看清自己与远方。心理上：你需要一段安静的时光整理思绪；灵性上：这是「向内求」的旅程，答案在静默中显现。正位时适合独处学习、深思熟虑、暂缓社交，让灵魂充电。",
 rev:"逆位隐士意味着过度孤僻或拒绝自省——把自己锁在孤独里，或逃避应有的内省。也可能是你急于回到人群，却还没找到答案。心理上：独处变成了疏离，孤独变成了封闭；灵性上：提醒你灯一直亮着，别害怕面对自己。建议在独处与联结之间找到平衡，向信任的人适度敞开心扉。",
 enUp:"The Hermit climbs alone, lantern in hand, seeking truth in silence. Withdraw to reflect — the answer is found within, illuminated by your own light.",
 enRev:"Solitude has turned into isolation, or you avoid the inner work. Your lantern still burns — open up, find the balance between reflection and connection."
},
{
 id:"10",n:10,suit:"major",en:"Wheel of Fortune",zh:"命运之轮",img:"10-WheelOfFortune.jpg",
 kwUp:["转机","时来运转","周期循环","机遇"],kwRev:["时机未到","运势逆转","抗拒变化","卡在低谷"],
 enKwUp:["Turning point","Good fortune","Cycles","Opportunity"],enKwRev:["Bad timing","Setback","Resistance to change","Down cycle"],
 up:"命运之轮转动于云海之上，轮上的四神与字母象征周期循环与机遇。代表命运的转机、时来运转、不可控的潮起潮落。心理上：有些事不以你的意志为转移，顺势而为胜过强行对抗；灵性上：这是因果与循环的法则——起落皆为功课。正位时往往是好运的开始，抓住周期上升的窗口。",
 rev:"逆位命运之轮表示时机未到或运势暂时逆转——计划赶不上变化，仿佛被卡在循环的谷底。可能是抗拒改变，也可能是低估了周期的力量。心理上：失控感带来焦虑；灵性上：提醒你低谷亦是周期的一部分，潮落之后必有潮起。建议调整预期，把变化当作转机前的铺垫，耐心等待。",
 enUp:"The Wheel turns in your favor — cycles shift, fortune rises. Seize the moment of change and flow with destiny rather than against it.",
 enRev:"The wheel has dipped; timing feels off and plans unravel. This low is part of the cycle — adjust your expectations and wait patiently for the turn."
},
{
 id:"11",n:11,suit:"major",en:"Justice",zh:"正义",img:"11-Justice.jpg",
 kwUp:["公正","真相","因果","权衡"],kwRev:["失衡","不公","逃避责任","自欺"],
 enKwUp:["Justice","Truth","Karma","Balance"],enKwRev:["Imbalance","Injustice","Avoidance","Self-deception"],
 up:"正义女神一手持剑一手持天平，象征公正、真相、因果与权衡。代表理性的判断、法律事务的进展、为自己的行为负责。心理上：你需要在两难中做出公平的决定，对自己的选择诚实；灵性上：种什么因得什么果，此刻是「结算」的时刻。正位时适合签合同、打官司、做重大裁决，坦荡者问心无愧。",
 rev:"逆位正义表示失衡、不公或逃避责任——可能遭遇偏颇的对待，也可能你自己在自欺欺人、回避后果。也可能是决策时被偏见蒙蔽。心理上：内心的天平倾斜，良知在隐隐不安；灵性上：提醒你诚实面对因果，先修正自己，再要求世界公平。建议主动担责、补上欠下的「账」。",
 enUp:"Justice weighs truth with an even hand — fairness, karma and accountability. Be honest in your choices; the scales will settle in your favor.",
 enRev:"The scales have tipped: unfairness, avoidance, or self-deception. Correct your own side of the balance first, then ask the world to be fair."
},
{
 id:"12",n:12,suit:"major",en:"The Hanged Man",zh:"倒吊人",img:"12-TheHangedMan.jpg",
 kwUp:["以退为进","换位思考","心甘情愿","暂停"],kwRev:["无谓牺牲","徒劳等待","放不下","自我消耗"],
 enKwUp:["Surrender","New perspective","Sacrifice","Pause"],enKwRev:["Pointless sacrifice","Futile waiting","Clinging","Self-defeat"],
 up:"男子被倒吊于树间，神态安详，头顶光环，象征以退为进、换位思考、心甘情愿的牺牲。倒立看世界，反而看得更清。代表等待、暂停、放下控制。心理上：你被卡住，但卡住可能正是礼物——换个角度，问题即答案；灵性上：这是「舍」的智慧，先放下才能得到。正位时适合暂停脚步，静观其变。",
 rev:"逆位倒吊人表示无意义的牺牲或徒劳的等待——你可能在错误的事情上耗尽了耐心，或终于决定挣脱。也可能是「该放下却放不下」。心理上：卡顿感变成焦虑，牺牲感变成怨恨；灵性上：提醒你检查自己困住的原因，也许绳索早就松了。建议果断做决定，别再自我消耗。",
 enUp:"The Hanged Man hangs peacefully, seeing the world upside down. Pause, surrender control, and let a new perspective reveal the answer.",
 enRev:"Your sacrifice serves no one and the waiting drags on — or you finally break free. Stop the self-defeat; the rope may already be loose."
},
{
 id:"13",n:13,suit:"major",en:"Death",zh:"死神",img:"13-Death.jpg",
 kwUp:["结束","蜕变","重生","放下旧我"],kwRev:["抗拒改变","停滞过渡","执念","未完成告别"],
 enKwUp:["Endings","Transformation","Rebirth","Release"],enKwRev:["Resistance","Stuck","Clinging","Unfinished goodbyes"],
 up:"白马骑士高举黑旗，象征结束与重生、蜕变的必然。死亡不是终结，而是旧阶段的完成，为新生腾出空间。心理上：你需要告别某种旧模式、旧关系或旧身份，痛是成长的代价；灵性上：凤凰浴火，不破不立。正位时是彻底的清理与转型，别抗拒，顺流而下才能重生。",
 rev:"逆位死神表示抗拒改变——该结束的迟迟不肯放手，被卡在过渡期。可能是害怕未知而紧抓旧物，也可能是转变进行到一半停了下来。心理上：执念让人疲惫；灵性上：提醒你抗拒只会延长痛苦，放手才能前行。建议给自己一个告别仪式，主动结束该结束的。",
 enUp:"Death closes one chapter so another can begin. Let go of what has served its time — transformation, not destruction, is the true message.",
 enRev:"You resist an ending that has already begun, clinging to what is gone. The pain of holding on exceeds the pain of letting go — release it."
},
{
 id:"14",n:14,suit:"major",en:"Temperance",zh:"节制",img:"14-Temperance.jpg",
 kwUp:["调和","平衡","耐心","灵性炼金"],kwRev:["失衡","过犹不及","节奏混乱","情绪失控"],
 enKwUp:["Balance","Moderation","Patience","Alchemy"],enKwRev:["Imbalance","Excess","Disruption","Emotional chaos"],
 up:"天使一脚踩水一脚踩地，将两杯之水来回倾倒，象征调和、平衡与耐心。代表中庸之道、情绪管理与灵性的炼金术。心理上：你在整合对立面，找到恰到好处的节奏；灵性上：这是「中道」的修行，水火相济方为大道。正位时适合合作、磨合、恢复健康，事情会在稳健中渐入佳境。",
 rev:"逆位节制表示失衡或过犹不及——节奏被打乱，要么用力过猛，要么缺乏调和。可能是情绪失控、关系失调，或做事没有章法。心理上：天平两端来回摆动，身心俱疲；灵性上：提醒你回到中道，别走极端。建议简化生活，重新分配精力，找回舒适的节奏。",
 enUp:"Temperance blends fire and water into harmony — patience, moderation, and gentle alchemy. Steady, balanced progress brings the best outcome.",
 enRev:"Life has fallen out of rhythm — excess, chaos, or extremes drain you. Return to the middle path, simplify, and restore your balance."
},
{
 id:"15",n:15,suit:"major",en:"The Devil",zh:"恶魔",img:"15-TheDevil.jpg",
 kwUp:["欲望","执念","物质束缚","自我设限"],kwRev:["挣脱束缚","觉醒","戒除瘾","解放"],
 enKwUp:["Desire","Attachment","Material bondage","Self-limitation"],enKwRev:["Breaking free","Awakening","Detox","Liberation"],
 up:"恶魔高踞于锁链之上，男女颈上套着看似可解的枷锁，象征欲望、执念、物质束缚与自我设限。代表诱惑、沉迷与「心甘情愿的囚禁」。心理上：你被欲望、恐惧或坏习惯控制，而锁链其实很松——是你选择不挣脱；灵性上：看见阴影即是解药，直面欲望才能驾驭欲望。正位时提醒你审视成瘾、依附与利益纠葛。",
 rev:"逆位恶魔表示挣脱束缚、觉醒与解放——锁链正在脱落，你开始夺回主导权。可能是戒除坏习惯、结束消耗型关系或放下执念。心理上：内在的力量重新回到手中；灵性上：这是光进入阴影的时刻。建议坚定地切断旧联结，庆祝自己的成长，但警惕反复。",
 enUp:"The Devil binds with chains that are looser than they appear — desire, addiction, self-limitation. Face your shadow; the lock is of your own making.",
 enRev:"The chains are falling away — you awaken, break free from addiction or toxic ties, and take back your power. Guard against slipping back."
},
{
 id:"16",n:16,suit:"major",en:"The Tower",zh:"高塔",img:"16-TheTower.jpg",
 kwUp:["剧变","崩塌","真相揭露","重建"],kwRev:["延迟的灾难","内爆","逃避危机","修补危楼"],
 enKwUp:["Upheaval","Collapse","Truth revealed","Rebuilding"],enKwRev:["Delayed disaster","Internal collapse","Avoidance","Patching cracks"],
 up:"闪电击毁高塔，人从塔顶坠落，象征剧变、崩塌与真相的揭露。看似灾难，实则是虚假结构的必然坍塌——被闪电击中的，本就是不该立住的塔。心理上：突如其来的变故打破幻象，痛苦却诚实；灵性上：这是「清洗」的能量，为更稳固的重建清场。正位时可能伴随意外冲击，但请相信崩塌之后是自由。",
 rev:"逆位高塔表示灾难被避免或延迟——危机尚在酝酿，或你在尽力修补一座本会倒塌的建筑。也可能暗示内爆：表面平静，内部早已开裂。心理上：逃避真相让你持续消耗；灵性上：提醒你主动拆除危楼，好过被动等待崩塌。建议提前排查隐患，勇敢面对问题核心。",
 enUp:"Lightning strikes the Tower — sudden upheaval shatters false structures. Painful but honest, this clearing makes room for something more true to build.",
 enRev:"The collapse is delayed or brewing beneath the surface. Don't keep patching a broken foundation — face the core issue before it falls on its own."
},
{
 id:"17",n:17,suit:"major",en:"The Star",zh:"星星",img:"17-TheStar.jpg",
 kwUp:["希望","疗愈","灵感","指引"],kwRev:["信心受挫","灵感枯竭","希望黯淡","暂时低谷"],
 enKwUp:["Hope","Healing","Inspiration","Guidance"],enKwRev:["Discouragement","Creative drought","Dimmed hope","Temporary low"],
 up:"女子跪在池边倾倒生命之水，头顶巨星闪耀，象征希望、疗愈、灵感与指引。历经高塔的崩塌之后，星星升起——这是最温柔的好牌之一。心理上：创伤开始愈合，你重拾信心与梦想；灵性上：宇宙的祝福透过星光传递，愿望有了实现的可能。正位时适合许愿、创作、启程，保持纯粹与乐观。",
 rev:"逆位星星表示希望黯淡或信心受挫——可能梦想受挫、灵感枯竭，或对未来的信念动摇。也许是「暂时看不见星光」，而非星光消失。心理上：低谷中容易否定自己；灵性上：提醒你星光不灭，只是需要拨开云雾。建议允许自己休整，重新连接热爱的小事，希望会回来的。",
 enUp:"After the storm, the Star shines — hope, healing and inspiration return. Make a wish, trust the universe, and let your light guide the way.",
 enRev:"Hope feels distant and inspiration runs dry, but the star has not gone out. Rest, reconnect with small joys, and let faith return in time."
},
{
 id:"18",n:18,suit:"major",en:"The Moon",zh:"月亮",img:"18-TheMoon.jpg",
 kwUp:["潜意识","梦境","恐惧","幻象"],kwRev:["迷雾散去","真相浮现","焦虑缓解","走出暗夜"],
 enKwUp:["Subconscious","Dreams","Fear","Illusion"],enKwRev:["Fog lifting","Truth emerging","Anxiety easing","Night ending"],
 up:"月光下的狼与狗对着月亮吠叫，龙虾从水中爬出，象征潜意识、梦境、恐惧与幻象。真相被迷雾笼罩，直觉比逻辑更可靠。心理上：焦虑与不安被放大，想象出来的怪物比真实的更吓人；灵性上：这是穿越心灵暗夜的旅程，恐惧只是旅程的一部分。正位时适合审视梦境、处理情绪，不宜仓促做重大决定。",
 rev:"逆位月亮表示迷雾正在散去——恐惧显形后反而变小，真相逐渐浮出水面。可能是焦虑缓解、误会澄清，或你终于看清幻象背后的实情。心理上：走出暗夜的时刻，内心趋于安定；灵性上：恭喜你通过了恐惧的考验。建议继续保持警觉，等雾散尽再前行，别在黎明前放弃。",
 enUp:"The Moon veils truth in dream and shadow — fears loom larger than reality. Trust intuition, walk through the dark night, and don't decide in haste.",
 enRev:"The fog lifts and fears shrink in daylight; truth surfaces and anxiety eases. Stay alert until the mist fully clears — dawn is near."
},
{
 id:"19",n:19,suit:"major",en:"The Sun",zh:"太阳",img:"19-TheSun.jpg",
 kwUp:["成功","喜悦","生命力","真相大白"],kwRev:["快乐打折","自信受挫","热情降温","光芒暂隐"],
 enKwUp:["Success","Joy","Vitality","Clarity"],enKwRev:["Dimmed joy","Low confidence","Cooling passion","Hidden light"],
 up:"孩童骑着白马在向日葵园中欢笑，太阳普照，象征成功、喜悦、生命力与真相大白。这是最明亮的好牌。代表健康的自信、纯粹的快乐与目标的达成。心理上：你沐浴在认可与成就感中；灵性上：与内在的孩童重逢，活力与创造力的源泉被重新接通。正位时几乎做什么都顺，尽情发光吧。",
 rev:"逆位太阳表示快乐打了折扣或自信受挫——可能成功延迟、热情降温，或你暂时看不清自己的光芒。也可能是「过度乐观」掩盖了问题。心理上：内心的小太阳被乌云遮住；灵性上：提醒你阳光一直都在，只是角度问题。建议别纠结暂时的阴霾，找回让你真正开心的事，光芒自会回来。",
 enUp:"The Sun shines at full brightness — success, joy, vitality and clarity. Celebrate, be confident, and let your authentic self radiate openly.",
 enRev:"Joy is dimmed and confidence dips, but the sun never left. Find what truly delights you again; your light is only momentarily veiled."
},
{
 id:"20",n:20,suit:"major",en:"Judgement",zh:"审判",img:"20-Judgement.jpg",
 kwUp:["觉醒","召唤","重生","清算"],kwRev:["回避召唤","自我批判","难以原谅","后悔"],
 enKwUp:["Awakening","Calling","Rebirth","Accountability"],enKwRev:["Ignoring the call","Self-criticism","Unforgiveness","Regret"],
 up:"天使吹响号角，死者从棺中苏醒，象征觉醒、重生、召唤与清算。代表被召唤去面对真实，过去的经验在此刻得到升华与救赎。心理上：你被内在的声音唤醒，是时候回应使命；灵性上：这是「复活」的时刻，旧我死去，新我升起。正位时适合做出人生级的决定，回应内心的召唤，宽恕自己与他人。",
 rev:"逆位审判表示回避召唤或自我批判——你听见了号角却假装没听见，或在反复审判自己、难以原谅。可能是对过去的决定懊悔，迟迟无法向前。心理上：内耗于「本可以」；灵性上：提醒你审判的目的是新生，不是惩罚。建议放下悔恨，接受已发生的一切，号角不会一直响。",
 enUp:"The trumpet calls — awaken to your true purpose and rise renewed. Judgment brings rebirth, redemption, and the courage to answer your calling.",
 enRev:"You ignore the call or linger in self-judgment and regret. Judgment exists for rebirth, not punishment — forgive and answer while the call lasts."
},
{
 id:"21",n:21,suit:"major",en:"The World",zh:"世界",img:"21-TheWorld.jpg",
 kwUp:["完成","圆满","整合","抵达"],kwRev:["差一步","收尾受阻","害怕结束","未完成"],
 enKwUp:["Completion","Wholeness","Integration","Arrival"],enKwRev:["Almost there","Delayed finish","Fear of ending","Unfinished"],
 up:"舞者在花环中起舞，四角有四种生物，象征完成、圆满、整合与抵达。这是大阿卡纳的终点，所有功课在此收束。代表一个周期的完成、目标的达成、格局的开阔。心理上：你感到完整而满足；灵性上：你已与宇宙节奏共舞，可以庆祝，也可以开启新的篇章。正位时往往伴随毕业、成功、旅行或圆满结局。",
 rev:"逆位世界表示差一步的圆满——项目接近完成却受阻，或你总在终点前停下。可能是缺乏收尾的耐心，或害怕完成后失去方向。心理上：未竟之事悬在心头；灵性上：提醒你完成本身即是奖励，终点亦是起点。建议把最后一步走完，善始善终，世界会为你转动。",
 enUp:"The World completes the journey — wholeness, achievement, and arrival. Celebrate the cycle's end, then step joyfully into the new beginning.",
 enRev:"You are one step from completion yet keep stalling. Finish the last task — completion is its own reward, and every ending births a new cycle."
}
];
