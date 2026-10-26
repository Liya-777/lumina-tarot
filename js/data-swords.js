/* ================= 小阿卡纳 · 宝剑（风） ================= */
const DATA_SWORDS = [
{
 id:"s01",suit:"swords",n:1,en:"Ace of Swords",zh:"宝剑王牌",img:"Swords01.jpg",
 kwUp:["真相","清晰","突破","心智胜利"],kwRev:["混乱","误解","言辞伤人","思路不清"],
 enKwUp:["Truth","Clarity","Breakthrough","Mental victory"],enKwRev:["Confusion","Misunderstanding","Harsh words","Clouded mind"],
 up:"云端之手握住宝剑，剑尖穿过王冠，象征真理之剑刺破迷雾。代表头脑的清晰、突破性的洞见与正义的锋芒。心理上：思路豁然开朗，该做的决定呼之欲出；灵性上：这是「觉知之刃」，劈开幻象。正位时适合做重要决策、开口谈清楚、写下计划，真相会为你开路。",
 rev:"逆位宝剑王牌表示思路混乱或沟通失准——想不明白、说不清楚，或是言辞太锋利伤了人。可能是真相被情绪蒙住，或你在回避一个清楚的结论。心理上：杂念太多，剑拔不出来；灵性上：提醒你先厘清内心，再对外发言。建议把问题写下来，逐条拆解，迷雾会散。",
 enUp:"A crowned sword pierces the clouds — truth, clarity, and a breakthrough of the mind. Cut through confusion and speak the clear truth.",
 enRev:"The mind is clouded and words misfire — confusion, hasty speech, avoidance. Write it down, untangle it piece by piece, and clarity returns."
},
{
 id:"s02",suit:"swords",n:2,en:"Two of Swords",zh:"宝剑二",img:"Swords02.jpg",
 kwUp:["僵局","抉择","回避","需要平衡"],kwRev:["打破僵局","看清现实","做出决定","解开纠结"],
 enKwUp:["Stalemate","Choice","Avoidance","Balance"],enKwRev:["Breaking the deadlock","Seeing clearly","Deciding","Untangling"],
 up:"蒙眼女子双手交叉持剑，身后是海与月。象征两难僵局与回避——她不是看不见，而是蒙上眼假装看不见。心理上：你卡在两个选项之间，用「再想想」拖延决定；灵性上：提醒你盲目的平静只是暂时的。正位时适合暂停、权衡，但别让回避变成常态。",
 rev:"逆位宝剑二表示僵局开始松动——你摘下眼罩，愿意直面现实，做出那个拖了很久的决定。可能是终于看清了利弊，或被迫面对真相。心理上：决定带来如释重负；灵性上：这是「睁眼」的勇气。建议相信你已经知道答案，把犹豫交给行动，剑放下一把即可。",
 enUp:"Blindfolded, she crosses two swords — a stalemate born of avoidance. Pause and weigh your options, but do not hide behind indecision.",
 enRev:"The blindfold lifts and the deadlock breaks — you see clearly and choose. Trust the answer you already know; act on it."
},
{
 id:"s03",suit:"swords",n:3,en:"Three of Swords",zh:"宝剑三",img:"Swords03.jpg",
 kwUp:["心碎","背叛","伤痛","言语之伤"],kwRev:["疗愈","释怀","原谅","走出痛苦"],
 enKwUp:["Heartbreak","Betrayal","Grief","Harsh words"],enKwRev:["Healing","Forgiveness","Release","Moving on"],
 up:"三柄剑刺穿红心，雨云低垂。象征心碎、背叛与言语造成的伤——痛是真实的，乌云也是。心理上：你可能正经历失望、分离或信任崩塌；灵性上：剑刺穿心，却也打开了心的通道。正位时允许自己悲伤，伤痛需要被承认才能被疗愈。",
 rev:"逆位宝剑三表示伤口开始愈合——痛苦逐渐退潮，你愿意原谅、释怀，或至少决定不再被它困住。可能是心碎后的重建期。心理上：痛还在，但有了缝隙可以呼吸；灵性上：这是「疗愈进行中」的信号。建议给自己时间，把刺拔出后，让心慢慢长回来。",
 enUp:"Three swords pierce a heart beneath rain clouds — heartbreak, betrayal, and the sting of words. Grief is real; let it be felt to be healed.",
 enRev:"The wound begins to close — forgiveness, release, and gradual healing. The pain lingers, but breath returns; be patient with your heart."
},
{
 id:"s04",suit:"swords",n:4,en:"Four of Swords",zh:"宝剑四",img:"Swords04.jpg",
 kwUp:["休整","静养","暂停","冥想"],kwRev:["过度休息","拖延复出","倦怠","压抑"],
 enKwUp:["Rest","Recovery","Pause","Meditation"],enKwRev:["Over-resting","Delayed return","Burnout","Suppression"],
 up:"骑士横卧于石棺般的床上，三剑悬于墙上，一柄搁在身边。象征休整、静养与暂停——这不是失败，而是充电。心理上：身体和心都在提醒你慢下来；灵性上：静默是灵魂的呼吸。正位时适合休息、冥想、养病、暂停争斗，为下一步积蓄力量。",
 rev:"逆位宝剑四表示休息过头或该复出了——可能是在用「休息」逃避现实，迟迟不肯回到战场。也可能是躺平太久，反而越歇越累。心理上：安逸变成了停滞；灵性上：提醒你静养的目的是为了重新出发。建议给自己一个复出日期，带着恢复的力量回去。",
 enUp:"The knight rests in stillness, swords at bay — recovery, retreat, and necessary pause. Rest without guilt; strength is being rebuilt within.",
 enRev:"Rest has overstayed — avoidance or burnout masquerades as recovery. Set a date to return; stillness must serve action, not replace it."
},
{
 id:"s05",suit:"swords",n:5,en:"Five of Swords",zh:"宝剑五",img:"Swords05.jpg",
 kwUp:["冲突","输赢","不义之胜","竞争"],kwRev:["和解","放下争执","止损","承认失败"],
 enKwUp:["Conflict","Win-lose","Unfair victory","Competition"],enKwRev:["Reconciliation","Letting go","Cutting losses","Accepting defeat"],
 up:"胜者抱剑而立，败者垂头离去，地上散落两把剑。象征冲突与「赢了场面、输了人心」的胜利。心理上：竞争让人紧绷，赢的代价可能超过价值；灵性上：提醒你有些仗不值得打，有些胜不值得要。正位时适合止损、评估输赢成本，别被好胜心绑架。",
 rev:"逆位宝剑五表示争执开始平息——你愿意放下输赢，握手言和，或承认这场仗没意义。可能是及时止损，或从冲突中学到教训。心理上：紧绷感松了下来；灵性上：这是「退一步」的智慧。建议主动求和，把力气留给真正重要的事。",
 enUp:"One walks away with swords, another defeated — conflict and victories that cost too much. Ask yourself if this battle is worth winning.",
 enRev:"The fight winds down — reconciliation, letting go, cutting your losses. A graceful retreat is wisdom, not defeat."
},
{
 id:"s06",suit:"swords",n:6,en:"Six of Swords",zh:"宝剑六",img:"Swords06.jpg",
 kwUp:["过渡","离开困境","疗愈之旅","渐入佳境"],kwRev:["困在原地","回程","拖延","未解决"],
 enKwUp:["Transition","Moving away","Healing voyage","Calmer waters"],enKwRev:["Stuck","Returning","Delay","Unresolved"],
 up:"船夫撑船载着乘客驶向彼岸，六柄剑插在船底。象征过渡与离开困境——水面渐平，心也在路上。心理上：你正在离开一段颠簸，去向更平静的地方；灵性上：这是「过河」的旅程，带走该带走的，放下该放下的。正位时适合搬家、换工作、结束旧阶段，前方有更稳的水域。",
 rev:"逆位宝剑六表示过渡卡住了——想走没走成，或回头看了太多次。可能是旧事未了，船在原地打转。心理上：悬而未决最耗神；灵性上：提醒你船底插着的剑是经历，不是锚。建议把未完成的事项收尾，给自己一个明确的出发日期。",
 enUp:"A boat glides toward calmer shores, swords stowed below — transition and healing. Leave the turbulence behind; smoother waters await.",
 enRev:"The crossing stalls — unfinished business or too many backward glances. Close the loose ends and set a clear departure date."
},
{
 id:"s07",suit:"swords",n:7,en:"Seven of Swords",zh:"宝剑七",img:"Swords07.jpg",
 kwUp:["策略","隐秘","智取","独行"],kwRev:["败露","自食其果","坦白","放弃小聪明"],
 enKwUp:["Strategy","Stealth","Cunning","Going solo"],enKwRev:["Exposure","Consequences","Confession","Honesty"],
 up:"一人趁营地无人，悄悄抱走五柄剑。象征策略与隐秘行动——不一定是坏事，也可能是「不按常理出牌」。心理上：你在权衡要不要走捷径，或独自承担计划；灵性上：提醒你聪明要配得上坦荡。正位时适合智取、暗中准备，但守住底线。",
 rev:"逆位宝剑七表示小聪明败露——隐瞒的事被发现，或算计落空、自食其果。也可能是你决定坦白，卸下心头的秘密。心理上：心虚比真相更累；灵性上：这是「诚实」的回归。建议主动说清楚，即使丢脸，也好过背着剑跑。",
 enUp:"Sneaking swords from the camp — strategy, stealth, and clever solo moves. Outwit wisely, but keep your cunning within honest bounds.",
 enRev:"The trick is exposed or backfires; concealment weighs on you. Confess, take responsibility, and let honesty lighten the load."
},
{
 id:"s08",suit:"swords",n:8,en:"Eight of Swords",zh:"宝剑八",img:"Swords08.jpg",
 kwUp:["束缚","自我设限","无力感","恐惧"],kwRev:["挣脱","看清出路","解放","鼓起勇气"],
 enKwUp:["Restriction","Self-limitation","Powerlessness","Fear"],enKwRev:["Breaking free","Seeing the way","Liberation","Courage"],
 up:"蒙眼女子被八柄剑围困，脚下却无锁链。象征束缚与自我设限——困住你的，往往不是剑，而是蒙眼的布。心理上：你感到走投无路，但其实出路一直都在；灵性上：提醒你枷锁是自己戴上的。正位时适合停下审视，看看哪些「不能」其实只是「以为」。",
 rev:"逆位宝剑八表示束缚正在解开——你摘下眼罩，发现围困的剑只是虚影，出路就在眼前。可能是鼓起勇气迈出一步，或看清了限制的真相。心理上：无力感消退，选择权回到手中；灵性上：这是「自由」的觉醒时刻。建议现在就做一件「以为不能」的事。",
 enUp:"Blindfolded among swords, yet no chains bind her — the trap is your own belief. Take off the blindfold; the way out has always been there.",
 enRev:"The bonds loosen — you see the escape that was never blocked. Courage returns; do the thing you thought impossible today."
},
{
 id:"s09",suit:"swords",n:9,en:"Nine of Swords",zh:"宝剑九",img:"Swords09.jpg",
 kwUp:["焦虑","噩梦","忧思过度","失眠"],kwRev:["焦虑缓解","直面恐惧","寻求帮助","黎明将至"],
 enKwUp:["Anxiety","Nightmares","Worry","Sleeplessness"],enKwRev:["Anxiety easing","Facing fears","Seeking help","Dawn approaching"],
 up:"半夜惊醒者捂脸而坐，九柄剑悬于墙上。象征焦虑、忧思与内心的拷问——剑是挂着的，伤是自己想出来的。心理上：恐惧被放大，最坏的情节在脑内循环；灵性上：提醒你「想」出来的痛苦和「发生」的痛苦是两回事。正位时请正视焦虑，必要时求助，别独自熬到天亮。",
 rev:"逆位宝剑九表示焦虑开始退潮——最怕的事没有发生，或你终于愿意直面恐惧、开口求助。可能是一场担忧的结束，黎明前的最后黑暗。心理上：紧绷的弦开始松；灵性上：这是「渡过心劫」的征兆。建议把担心的事写下来，一件件划掉，天会亮的。",
 enUp:"Nine swords hang over a sleepless night — anxiety and mental torment. Most of these wounds are imagined; the swords are on the wall, not in you.",
 enRev:"Anxiety loosens its grip — fears shrink in daylight, help arrives, dawn nears. Write the worries down and cross them off, one by one."
},
{
 id:"s10",suit:"swords",n:10,en:"Ten of Swords",zh:"宝剑十",img:"Swords10.jpg",
 kwUp:["谷底","终结","彻底结束","触底"],kwRev:["触底反弹","缓慢恢复","不愿放手","重生前夜"],
 enKwUp:["Rock bottom","Ending","Final blow","Surrender"],enKwRev:["Recovery","Rising again","Clinging","Rebirth"],
 up:"一人趴伏于地，背上插满十柄剑，远处的海面却已泛起黎明。象征谷底与彻底的终结——最坏的已经发生，剩下的只有上升。心理上：你可能经历重创，但请注意背景的天光；灵性上：这是「死而后生」的画面，终点即起点。正位时允许自己倒下休息，然后看着黎明。",
 rev:"逆位宝剑十表示谷底已过、缓慢回升——最痛的时刻过去，伤口开始结痂，你正一点点站起来。可能是挣扎着不愿放手旧事，或恢复期比想象中漫长。心理上：疼痛渐远，力气渐回；灵性上：这是「重生前夜」。建议接受恢复的节奏，别急着证明自己没事。",
 enUp:"Ten swords pin him down, yet dawn breaks on the horizon — rock bottom and final endings. The worst is done; from here, the only way is up.",
 enRev:"You rise slowly from the ashes — recovery begins, wounds scab over. Do not rush the healing; rebirth takes its own time."
},
{
 id:"s11",suit:"swords",n:11,en:"Page of Swords",zh:"宝剑侍从",img:"Swords11.jpg",
 kwUp:["警觉","观察","新想法","侦察"],kwRev:["多疑","八卦","言语轻率","口舌之争"],
 enKwUp:["Alertness","Observation","New ideas","Vigilance"],enKwRev:["Suspicion","Gossip","Careless words","Arguments"],
 up:"少年持剑立于风中，警觉地瞭望。象征敏锐的观察力与求知欲——他爱问、爱想、爱拆解。心理上：你处于头脑活跃期，新点子不断冒出；灵性上：这是「学剑」的阶段，好奇心是佩剑。正位时适合学习、调研、收集信息，多问几个为什么。",
 rev:"逆位宝剑侍从表示警觉变成了多疑——把无害的信息解读成恶意，或忍不住打探、传话。可能是说话不经大脑，惹出口舌是非。心理上：好奇心转向了八卦；灵性上：提醒你剑要用来开路，不是用来指人。建议收敛打听欲，说话前先过脑。",
 enUp:"The Page of Swords scans the horizon, curious and sharp — alertness, fresh ideas, and the love of learning. Ask questions and gather facts.",
 enRev:"Suspicion or careless gossip clouds the sharp mind. Wield your words carefully; curiosity should open doors, not start fires."
},
{
 id:"s12",suit:"swords",n:12,en:"Knight of Swords",zh:"宝剑骑士",img:"Swords12.jpg",
 kwUp:["果决","行动力","直言","快速推进"],kwRev:["鲁莽","好斗","急躁","言辞伤人"],
 enKwUp:["Decisiveness","Action","Directness","Speed"],enKwRev:["Recklessness","Aggression","Impatience","Hurtful words"],
 up:"骑士高举宝剑策马冲锋，云在身后翻卷。象征果决与行动力——想到就冲，直言不讳，速度是武器。心理上：你处于「快刀斩乱麻」的状态，适合推进停滞的事；灵性上：这是「风」最迅疾的一面。正位时适合快速决策、冲刺项目，但记得带缰绳。",
 rev:"逆位宝剑骑士表示冲得太快或太过好斗——话比脑快，剑比理快，容易伤人伤己。可能是急躁让计划翻车，或攻击性吓退了合作者。心理上：速度掩盖了方向问题；灵性上：提醒你剑锋要朝向问题，不是朝向人。建议慢半拍，把话想好再说。",
 enUp:"The Knight of Swords charges at full speed — decisive, direct, unstoppable. Act now, but aim your blade at problems, not people.",
 enRev:"Speed turns reckless — impatience, aggression, careless words. Slow down, think before you speak, and let direction lead the charge."
},
{
 id:"s13",suit:"swords",n:13,en:"Queen of Swords",zh:"宝剑王后",img:"Swords13.jpg",
 kwUp:["理性","独立","洞察","直言不讳"],kwRev:["冷漠","刻薄","愤世","过度防御"],
 enKwUp:["Rationality","Independence","Insight","Frankness"],enKwRev:["Coldness","Sharp tongue","Cynicism","Over-defensive"],
 up:"王后持剑端坐，云端之手在旁，目光清明。象征理性、独立与洞察——她用头脑看世界，不靠幻想过活。心理上：你正处于清醒而自主的状态，界限分明；灵性上：这是「慧剑」的化身，斩断情绪迷雾。正位时适合做理性判断、谈判、为自己发声。",
 rev:"逆位宝剑王后表示理性变成了冷漠——用锋利的言语自卫，或把所有人都当潜在威胁。可能是受过伤后筑起高墙，愤世嫉俗。心理上：清醒变成了疏离；灵性上：提醒你剑也用来守护温柔。建议放下部分防御，让洞察带一点温度。",
 enUp:"The Queen of Swords sees with a clear, independent mind — rationality, honesty, and sharp insight. Speak your truth and set firm boundaries.",
 enRev:"Clarity has hardened into coldness or cynicism. Let your sword guard your heart, not wall it off; insight with warmth is wisdom."
},
{
 id:"s14",suit:"swords",n:14,en:"King of Swords",zh:"宝剑国王",img:"Swords14.jpg",
 kwUp:["公正","理性权威","清晰判断","纪律"],kwRev:["滥用权力","冷酷裁决","偏见","固执"],
 enKwUp:["Justice","Authority","Clear judgment","Discipline"],enKwRev:["Abuse of power","Cold verdicts","Bias","Rigidity"],
 up:"国王持剑端坐于石座，双刃剑指天，象征公正、理性与权威——他依据事实与原则裁决，不偏不倚。心理上：你拥有清晰判断力，适合担当仲裁与决策角色；灵性上：这是「法」的化身，规则之内有慈悲。正位时适合做裁决、签协议、制定标准。",
 rev:"逆位宝剑国王表示权威失去公正——可能用权力压人、裁决带偏见，或固执己见听不进新证据。可能是冷酷的理性伤害了关系。心理上：原则变成了教条；灵性上：提醒你法律之上还有情理。建议自查立场，听听反方意见，让裁决经得起推敲。",
 enUp:"The King of Swords judges with truth and discipline — fairness, authority, and clear-eyed reason. Decide on facts, not feelings; rule with principle.",
 enRev:"Power turns rigid or biased — cold verdicts, stubborn certainty. Re-examine your stance, hear the other side, and let judgment stay honest."
}
];
