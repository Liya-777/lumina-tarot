/* ================= 小阿卡纳 · 星币（土） ================= */
const DATA_PENTACLES = [
{
 id:"p01",suit:"pentacles",n:1,en:"Ace of Pentacles",zh:"星币王牌",img:"Pentacles01.jpg",
 kwUp:["新机会","财富种子","务实开端","物质丰盛"],kwRev:["错失机会","财务不稳","计划落空","拖延"],
 enKwUp:["New opportunity","Seed of wealth","Practical start","Abundance"],enKwRev:["Missed chance","Financial wobble","Delayed plans","Procrastination"],
 up:"云端之手托着一枚星币，下方是通往花园的门。象征物质世界的新机会——一笔钱、一份工作、一个项目的种子落在你手中。心理上：你感到踏实的方向感与务实动力；灵性上：这是「扎根」的祝福，梦想开始有形状。正位时适合求职、投资、开启副业、学习实用技能。",
 rev:"逆位星币王牌表示机会溜走或尚未成熟——可能错过了一笔好的开端，或计划停留在纸上。可能是财务上的小波动让你不安。心理上：务实心被焦虑取代；灵性上：提醒你种子需要土壤，也需要时间。建议把目标落到具体数字和日期，让机会重新落地。",
 enUp:"A pentacle is offered at the garden gate — new opportunity, the seed of wealth, a practical beginning. Plant it well; abundance grows from action.",
 enRev:"The chance slips away or plans stay on paper — financial jitters or procrastination. Turn intentions into concrete numbers and dates."
},
{
 id:"p02",suit:"pentacles",n:2,en:"Two of Pentacles",zh:"星币二",img:"Pentacles02.jpg",
 kwUp:["平衡","多任务","灵活调配","收支"],kwRev:["失衡","手忙脚乱","财务压力","顾此失彼"],
 enKwUp:["Balance","Multitasking","Flexibility","Juggling"],enKwRev:["Imbalance","Overwhelm","Money stress","Dropping balls"],
 up:"舞者用指尖耍弄两枚星币，身后的船在波浪间起伏。象征平衡与灵活——同时处理几件事，在变动中保持节奏。心理上：你在时间与金钱之间走钢丝，但游刃有余；灵性上：这是「流动」的功课，稳住中心即可。正位时适合兼顾副业、调配预算、应对多线任务。",
 rev:"逆位星币二表示节奏被打乱——事情太多接不住，收支开始失衡，顾了这头丢了那头。可能是压力让你动作变形。心理上：焦头烂额是常态；灵性上：提醒你杂耍的关键是丢下不必要的球。建议精简任务清单，先保住最重要的那枚星币。",
 enUp:"A dancer juggles two pentacles amid rolling waves — balance, flexibility, and graceful multitasking. Keep your center; the rhythm holds.",
 enRev:"The balls start dropping — overload, money stress, lost balance. Put down what is unnecessary and protect what matters most."
},
{
 id:"p03",suit:"pentacles",n:3,en:"Three of Pentacles",zh:"星币三",img:"Pentacles03.jpg",
 kwUp:["合作","技艺","团队建设","认可"],kwRev:["合作不顺","质量打折","缺乏协调","被挑剔"],
 enKwUp:["Collaboration","Craftsmanship","Teamwork","Recognition"],enKwRev:["Poor teamwork","Substandard work","Discoordination","Criticism"],
 up:"工匠、修士与建筑师在教堂前商议蓝图。象征合作与技艺——不同专长的人为同一个作品各展所长。心理上：你的能力被看见、被需要，团队因你而完整；灵性上：这是「众人拾柴」的功课。正位时适合团队协作、接受专业评价、打磨作品质量。",
 rev:"逆位星币三表示合作卡壳——分工不清、各执己见，或作品质量被质疑。可能是沟通不足让蓝图走样。心理上：单打独斗的疲惫感回来了；灵性上：提醒你最好的作品往往诞生于对话。建议明确分工，把不同意见当成打磨的机会。",
 enUp:"Three artisans shape a cathedral together — collaboration, craftsmanship, and recognition of skill. Build with others; the work is better for it.",
 enRev:"Coordination falters and quality suffers — unclear roles, clashing views. Talk it through, divide the work, and let feedback refine the craft."
},
{
 id:"p04",suit:"pentacles",n:4,en:"Four of Pentacles",zh:"星币四",img:"Pentacles04.jpg",
 kwUp:["占有","储蓄","控制","安全感"],kwRev:["过度囤积","吝啬","恐惧失去","僵化"],
 enKwUp:["Security","Saving","Control","Stability"],enKwRev:["Hoarding","Stinginess","Fear of loss","Rigidity"],
 up:"一人紧抱星币，头顶一枚、脚下两枚，坐在城前。象征对安全感的掌控——守财、守位、守住边界。心理上：稳定感来自「抓得紧」，但也因此放不开；灵性上：提醒你真正的安全不来自囤积，而来自内心的底气。正位时适合储蓄、理财、守住成果，但别让守变成困。",
 rev:"逆位星币四表示抓得太紧反而漏——可能是吝啬、过度控制让关系与机会流失，或恐惧失去让你僵在原地。也可能是时候松手，让资源流动起来。心理上：攥紧的拳头握不住新东西；灵性上：这是「舍得」的练习。建议检查哪些「安全」其实在拖累你，试着松开一点。",
 enUp:"Clutching four pentacles close, he guards his security — saving, control, stability. Hold your ground, but let the hand stay open enough to receive.",
 enRev:"Gripping too tight makes things slip — hoarding, fear of loss, rigidity. Loosen your hold; security that must be clutched is not security."
},
{
 id:"p05",suit:"pentacles",n:5,en:"Five of Pentacles",zh:"星币五",img:"Pentacles05.jpg",
 kwUp:["困顿","匮乏","被冷落","求助"],kwRev:["走出困境","获得援助","重燃希望","资源回归"],
 enKwUp:["Hardship","Lack","Exclusion","Seeking help"],enKwRev:["Recovery","Receiving aid","Hope returning","Resources back"],
 up:"风雪中两人蹒跚走过教堂的彩窗——温暖与援助就在咫尺，却未被看见。象征困顿、匮乏与被冷落的时刻。心理上：你可能正经历物质或情感上的寒冬；灵性上：提醒你窗口的光一直都在，求助不是软弱。正位时适合承认困境、开口求助、寻找社群支持。",
 rev:"逆位星币五表示寒冬正在过去——援助到达、资源回归、你被看见。可能是一次及时的帮助，或你终于走进那扇亮着灯的窗。心理上：希望重新燃起；灵性上：这是「被接住」的时刻。建议接受善意，也记住这份暖意，将来传下去。",
 enUp:"Two walk in snow past a lit window — hardship and exclusion, yet help is near. Name your need and knock; the warmth is within reach.",
 enRev:"The winter thaws — aid arrives, resources return, hope rekindles. Accept the help offered, and remember to pass the warmth along."
},
{
 id:"p06",suit:"pentacles",n:6,en:"Six of Pentacles",zh:"星币六",img:"Pentacles06.jpg",
 kwUp:["给予与接受","慷慨","施受平衡","资助"],kwRev:["施舍失衡","债务","依赖","不平等"],
 enKwUp:["Giving and receiving","Generosity","Balance","Support"],enKwRev:["Unequal giving","Debt","Dependency","Imbalance"],
 up:"商人手持天平，向跪地的乞丐分放星币。象征给予与接受的平衡——财富流动起来才有意义。心理上：你处于「有余」的位置，可以分享；也提醒你接受时不必羞愧；灵性上：这是「流动」的功课，施与受本是一体。正位时适合资助他人、接受馈赠、回报人情。",
 rev:"逆位星币六表示施受失衡——可能是单方面索取或过度付出，或资助带着条件、变成控制。也许是债务与依赖让你不安。心理上：天平倾斜，关系也随之变形；灵性上：提醒你帮助的前提是尊重。建议盘点给予与接受的比例，让关系回到对等。",
 enUp:"A merchant shares pentacles in fair measure — generosity, support, and the healthy flow of giving and receiving. Give from abundance, receive with grace.",
 enRev:"The balance tips — dependency, debt, or gifts with strings attached. Restore equality; true support empowers rather than binds."
},
{
 id:"p07",suit:"pentacles",n:7,en:"Seven of Pentacles",zh:"星币七",img:"Pentacles07.jpg",
 kwUp:["耐心","投资等待","评估收成","长期视角"],kwRev:["急于求成","回报缓慢","失望","放弃"],
 enKwUp:["Patience","Assessing growth","Long-term view","Harvest"],enKwRev:["Impatience","Slow returns","Disappointment","Giving up"],
 up:"农夫倚着锄头，凝视藤蔓上已结出的星币。象征耐心与评估——种下了，长出来了，现在需要决定继续等待还是调整。心理上：你在衡量投入与回报，思考下一步；灵性上：这是「耕耘与守望」的节奏。正位时适合复盘项目、耐心等待成果、评估是否值得继续投入。",
 rev:"逆位星币七表示等待让你焦躁——回报比预期慢，开始怀疑当初的投入。可能是急于求成想换方向，或半途放弃的念头在滋生。心理上：耐心被时间消磨；灵性上：提醒你果实需要季节，催不来的。建议回顾最初的计划，确认方向无误就再等一季。",
 enUp:"The farmer pauses to study his growing pentacles — patience, assessment, long-term vision. Evaluate the harvest, then decide whether to tend or redirect.",
 enRev:"Returns lag and patience frays; you doubt the planted seed. Review the original plan — if the direction is sound, give it one more season."
},
{
 id:"p08",suit:"pentacles",n:8,en:"Eight of Pentacles",zh:"星币八",img:"Pentacles08.jpg",
 kwUp:["精进","专注","技能打磨","学徒"],kwRev:["敷衍","急功近利","低质量","缺乏热情"],
 enKwUp:["Craftsmanship","Focus","Skill-building","Diligence"],enKwRev:["Carelessness","Shortcuts","Low quality","Disinterest"],
 up:"工匠俯身专心雕刻星币，一排成品挂在墙上。象征精进与专注——手艺是一锤一凿磨出来的。心理上：你进入心流，享受把一件事做好的过程；灵性上：这是「以技入道」的修行。正位时适合学习专业技能、打磨作品、考证书，慢即是快。",
 rev:"逆位星币八表示心不在焉——敷衍了事、急于求成，或对重复的练习失去热情。可能是被短期利益带着跑。心理上：作品的质量折射出内心的浮躁；灵性上：提醒你功夫不负有心人，也负没心人。建议回到基本功，把一件事做到让自己满意为止。",
 enUp:"A craftsman carves pentacle after pentacle — dedication, skill, and loving repetition. Mastery comes one careful stroke at a time.",
 enRev:"Careless hands and short attention — quality slips, interest fades. Return to the basics and take pride in doing one thing properly."
},
{
 id:"p09",suit:"pentacles",n:9,en:"Nine of Pentacles",zh:"星币九",img:"Pentacles09.jpg",
 kwUp:["独立","自律","丰足","自给自足"],kwRev:["依赖他人","表面光鲜","挥霍","不安全感"],
 enKwUp:["Independence","Self-discipline","Abundance","Self-sufficiency"],enKwRev:["Dependency","Showy facade","Overspending","Insecurity"],
 up:"衣着华贵的女子独自立于葡萄园中，指尖停着猎鹰。象征独立与自律带来的丰足——她的一切是自己挣来的，自在从容。心理上：你享受独处与自我犒赏，不需要别人确认价值；灵性上：这是「内在富有」的具象。正位时适合独处、投资自己、享受成果。",
 rev:"逆位星币九表示独立感被侵蚀——可能是依赖他人供养或情绪，或用表面的光鲜掩盖内在不安。也许是挥霍无度撑不起面子。心理上：丰足是演出来的，心是虚的；灵性上：提醒你真正的优雅来自底气。建议盘点真实收支，把安全感建立在自己身上。",
 enUp:"In her vineyard, attended by a falcon — independence, discipline, and self-made abundance. Enjoy your harvest; you have earned this peace.",
 enRev:"The facade of plenty hides dependency or overspending. Rebuild your security on your own ground; true elegance needs no performance."
},
{
 id:"p10",suit:"pentacles",n:10,en:"Ten of Pentacles",zh:"星币十",img:"Pentacles10.jpg",
 kwUp:["家族传承","财富积累","根基","长期成就"],kwRev:["家族矛盾","遗产纠纷","根基不稳","过度求稳"],
 enKwUp:["Legacy","Wealth","Foundations","Long-term success"],enKwRev:["Family conflict","Inheritance disputes","Shaky roots","Over-caution"],
 up:"拱门下老人端坐，身边是家族与狗，十枚星币成树形排列。象征家族传承与世代积累的根基——财富与智慧代代相传。心理上：你感受到「根」的支撑，或渴望建立这样的根基；灵性上：这是「传承」的功课。正位时适合置业、家庭规划、建立长期资产。",
 rev:"逆位星币十表示根基松动——家族矛盾、遗产纠纷，或「安稳」变成不敢冒险的牢笼。可能是表面的传承下藏着疏离。心理上：根扎得不深，风一吹就晃；灵性上：提醒你传承的不只是钱，还有价值观。建议主动沟通家族议题，把「根」重新扎牢。",
 enUp:"Beneath the arch, generations stand together — legacy, accumulated wealth, and deep roots. Build foundations that outlast you.",
 enRev:"Roots shake — family friction, inheritance disputes, or safety that became a cage. Tend the family bonds; what you pass on is more than money."
},
{
 id:"p11",suit:"pentacles",n:11,en:"Page of Pentacles",zh:"星币侍从",img:"Pentacles11.jpg",
 kwUp:["学习","新机会","务实","理财启蒙"],kwRev:["拖延","不切实际","浪费","缺乏投入"],
 enKwUp:["Learning","New opportunity","Practicality","First steps"],enKwRev:["Procrastination","Unrealistic plans","Waste","Lack of commitment"],
 up:"少年双手托着星币，认真端详。象征学习与务实的新开始——他愿意从头学起，把每一分都当真。心理上：你对某个方向产生扎实的兴趣，想认真投入；灵性上：这是「学徒」的谦逊，从零开始不丢人。正位时适合学习理财、求职实习、开启一个务实的小目标。",
 rev:"逆位星币侍从表示空有计划没有行动——拖延、不切实际，或对细节缺乏耐心。可能是三分钟热度没落地。心理上：想法很多，手没动；灵性上：提醒你星币需要被「拿起来」才有价值。建议把目标缩小到今天能完成的一小步，立刻执行。",
 enUp:"The Page of Pentacles studies his coin with fresh eyes — learning, practical beginnings, and quiet diligence. Start small and start now.",
 enRev:"Plans stall without execution — procrastination, vague goals, wasted effort. Shrink the goal to one small step and take it today."
},
{
 id:"p12",suit:"pentacles",n:12,en:"Knight of Pentacles",zh:"星币骑士",img:"Pentacles12.jpg",
 kwUp:["稳健","勤勉","按部就班","可靠"],kwRev:["停滞","固执","无聊","缺乏进展"],
 enKwUp:["Reliability","Diligence","Steadiness","Routine"],enKwRev:["Stagnation","Stubbornness","Boredom","No progress"],
 up:"骑士稳稳端坐于马背，手持星币，原野辽阔。象征稳健与勤勉——他不追求速度，追求每一步都踩实。心理上：你是那个让人放心的人，靠积累取胜；灵性上：这是「日拱一卒」的修行。正位时适合长期项目、储蓄计划、按部就班推进。",
 rev:"逆位星币骑士表示稳健变成了停滞——太保守不敢动，或重复的日常让你失去动力。可能是固执地守着老方法，看不见新路。心理上：安全感的代价是无聊；灵性上：提醒你稳不等于停。建议在熟悉的节奏里加入一点新变化，让马慢慢跑起来。",
 enUp:"The Knight of Pentacles moves slowly and surely — reliability, diligence, and patient progress. Steady wins the race; keep plodding forward.",
 enRev:"Stability hardens into stagnation — routine, stubbornness, boredom. Inject one small change into the familiar rhythm and let the horse move."
},
{
 id:"p13",suit:"pentacles",n:13,en:"Queen of Pentacles",zh:"星币王后",img:"Pentacles13.jpg",
 kwUp:["务实","滋养","理财有方","物质关怀"],kwRev:["过度操心","焦虑物质","自我牺牲","占有的爱"],
 enKwUp:["Practicality","Nurturing","Money sense","Comfort"],enKwRev:["Over-worrying","Material anxiety","Self-neglect","Possessive love"],
 up:"王后怀抱星币坐在丰饶花园中，兔子在脚边。象征务实与滋养的结合——她把日子过得安稳，也用物质表达爱。心理上：你是那个把家和工作都打理妥当的人；灵性上：这是「大地之爱」的化身。正位时适合理财规划、照顾家人、经营舒适的日常。",
 rev:"逆位星币王后表示过度操心物质——焦虑收入、反复盘算，或为了照顾所有人牺牲了自己。可能是用物质表达爱，却忽略了情感本身。心理上：安稳变成紧绷；灵性上：提醒你丰饶的第一步是照顾好自己。建议把一部分操心放下来，允许自己也被照顾。",
 enUp:"The Queen of Pentacles cultivates a garden of comfort — practicality, nurture, and wise money care. Tend your world, and let yourself be tended too.",
 enRev:"Worry about money or others crowds out self-care. Loosen the accounting, receive some care, and let abundance include your own needs."
},
{
 id:"p14",suit:"pentacles",n:14,en:"King of Pentacles",zh:"星币国王",img:"Pentacles14.jpg",
 kwUp:["成功","财富","商业头脑","可靠权威"],kwRev:["物质至上","贪财","僵化守旧","财务风险"],
 enKwUp:["Success","Wealth","Business acumen","Authority"],enKwRev:["Materialism","Greed","Rigidity","Financial risk"],
 up:"国王端坐于葡萄园宝座，城堡在远方，衣袍绣满葡萄与藤蔓。象征世俗的成功与富足——他懂得让资产生长，也懂得享受果实。心理上：你拥有掌控现实的能力，做事让人放心；灵性上：这是「入世修行」的典范，财富服务于生活。正位时适合做大生意、投资、稳定扩张。",
 rev:"逆位星币国王表示物质压倒一切——过度逐利、贪心冒进，或守着老方法拒绝变化。可能是财务上的冒进埋下隐患。心理上：成功的定义窄成了数字；灵性上：提醒你富足包含健康、关系与自由。建议平衡欲望与风险，让财富为人服务，而非相反。",
 enUp:"The King of Pentacles rules a fertile kingdom — success, wealth, and seasoned business sense. Grow your assets and enjoy the harvest you build.",
 enRev:"Greed or rigidity distorts success — risky moves, material obsession, stale methods. Balance ambition with prudence; wealth should serve life."
}
];
