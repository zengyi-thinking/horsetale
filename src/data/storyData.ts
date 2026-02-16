export interface StoryChoice {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tag: string;
}

export interface StoryStage {
  id: string;
  title: string;
  narrative: string[];  // multiple paragraphs for scrollable narrative
  choices: StoryChoice[];
}

export interface StoryRoute {
  id: string;
  emoji: string;
  title: string;
  description: string;
  stages: StoryStage[];
}

// ========== 事业路线 ==========
const careerRoute: StoryRoute = {
  id: "career",
  emoji: "⚔️",
  title: "事业征途",
  description: "驾驭骏马，踏上事业巅峰之路",
  stages: [
    {
      id: "c1",
      title: "晨光初照",
      narrative: [
        "天边泛起金光，一匹神骏的金色战马在晨雾中向你缓缓走来。它的鬃毛如同燃烧的火焰，眼中闪烁着智慧的光芒。",
        "\"你愿意跟我走吗？\"马儿的眼神仿佛在这样问你。你翻身上马，感受到一股温暖的力量从马背传来，仿佛整个世界都在为你加油。",
        "前方出现了三条道路，每条路都通向不同的方向。晨光中，你隐约看到每条路尽头不同的景象……",
      ],
      choices: [
        { id: "c1a", emoji: "🏢", title: "商业帝国", description: "走进繁华都市，开创一番事业", tag: "事业" },
        { id: "c1b", emoji: "📚", title: "学术殿堂", description: "踏入知识之海，追求真理", tag: "智慧" },
        { id: "c1c", emoji: "🎨", title: "匠心之路", description: "以手艺为本，精益求精", tag: "匠心" },
      ],
    },
    {
      id: "c2",
      title: "风云际会",
      narrative: [
        "骏马载着你穿越山林，来到一座古老的城池。城门上悬挂着\"天下英雄\"四个大字，金漆斑驳中透着历史的厚重。",
        "城中正在举办一场盛大的比武大会，来自四面八方的英雄豪杰齐聚于此。擂台上旌旗猎猎，锣鼓震天。",
        "一位白发老者走到你面前，手持三张令牌：\"年轻人，选择一张令牌，它将决定你在此城的命运。\"",
        "你看着三张令牌上刻着不同的图案，心中暗暗思量……",
      ],
      choices: [
        { id: "c2a", emoji: "🐉", title: "龙腾令", description: "以勇气直面挑战，一飞冲天", tag: "勇气" },
        { id: "c2b", emoji: "🤝", title: "结义令", description: "广结天下豪杰，共创伟业", tag: "人脉" },
        { id: "c2c", emoji: "🧠", title: "谋略令", description: "运筹帷幄之中，决胜千里之外", tag: "谋略" },
      ],
    },
    {
      id: "c3",
      title: "破浪前行",
      narrative: [
        "凭借令牌的力量，你在城中站稳了脚跟。然而好景不长，一场突如其来的危机让整座城池陷入了困境。",
        "粮仓告急、商路断绝、人心惶惶。所有人都看向你，等待你的决定。骏马在你身边嘶鸣，仿佛在鼓励你。",
        "\"每一次危机，都是一次机遇。\"你想起父亲曾经说过的话，深吸一口气，目光变得坚定。",
        "三个方案在你脑海中浮现，每一个都有其利弊……",
      ],
      choices: [
        { id: "c3a", emoji: "🔥", title: "破釜沉舟", description: "孤注一掷，背水一战", tag: "魄力" },
        { id: "c3b", emoji: "🕊️", title: "和衷共济", description: "团结众人，共渡难关", tag: "团结" },
        { id: "c3c", emoji: "🌱", title: "另辟蹊径", description: "打破常规，寻找新出路", tag: "创新" },
      ],
    },
    {
      id: "c4",
      title: "功成名就",
      narrative: [
        "经过一番努力，城池终于度过了危机。人们欢呼雀跃，把你高高举起。骏马在一旁自豪地仰首长嘶。",
        "城主亲自设宴为你庆功，席间觥筹交错、欢声笑语。你望着窗外的星空，心中感慨万千。",
        "\"这一路走来，有艰辛，有欢笑，有迷茫，也有坚定。\"你举起酒杯，思绪万千。",
        "宴会的最后，城主递给你一封密信：\"新的一年，你有什么愿望？\"",
      ],
      choices: [
        { id: "c4a", emoji: "👑", title: "登峰造极", description: "继续攀登，追求更高的成就", tag: "成就" },
        { id: "c4b", emoji: "🏡", title: "衣锦还乡", description: "功成身退，回归宁静", tag: "家庭" },
        { id: "c4c", emoji: "🌍", title: "行走天下", description: "带着经验，去看更大的世界", tag: "眼界" },
      ],
    },
  ],
};

// ========== 爱情路线 ==========
const loveRoute: StoryRoute = {
  id: "love",
  emoji: "💕",
  title: "情缘之旅",
  description: "策马红尘，寻找心中的那个人",
  stages: [
    {
      id: "l1",
      title: "春风十里",
      narrative: [
        "马蹄踏过一片桃花林，粉色的花瓣如同雪花般纷纷扬扬。空气中弥漫着淡淡的花香，令人心旷神怡。",
        "忽然，一阵悦耳的笛声从林深处传来。骏马竖起耳朵，循着笛声缓缓前行。",
        "穿过层层花瓣，你看到一座古朴的石桥。桥上，桥下，桥边，三个不同的身影各自诉说着不同的故事。",
        "骏马停下脚步，似乎在等你做出选择……",
      ],
      choices: [
        { id: "l1a", emoji: "🌙", title: "月下邂逅", description: "追随月光，相信命运的安排", tag: "缘分" },
        { id: "l1b", emoji: "📝", title: "诗书传情", description: "以文会友，寻找心灵契合的人", tag: "知音" },
        { id: "l1c", emoji: "💃", title: "翩翩起舞", description: "在花间起舞，用热情打动世界", tag: "热情" },
      ],
    },
    {
      id: "l2",
      title: "情深似海",
      narrative: [
        "沿着你选择的方向，骏马带你来到了一个温馨的小镇。街道两旁挂满了红灯笼，到处洋溢着新年的喜庆。",
        "镇上正在举办灯谜会，三三两两的人们围在灯笼前猜谜。笑声、讨论声交织成一首温暖的乐章。",
        "一盏最大的走马灯缓缓旋转，灯面上画着三个不同的爱情故事。每个故事都让你心生向往。",
        "\"相逢即是缘。\"旁边的老婆婆笑眯眯地看着你，\"孩子，你最喜欢哪个故事？\"",
      ],
      choices: [
        { id: "l2a", emoji: "🏮", title: "细水长流", description: "平凡日子里的点滴温暖", tag: "陪伴" },
        { id: "l2b", emoji: "🎆", title: "轰轰烈烈", description: "轰轰烈烈，不负韶华", tag: "激情" },
        { id: "l2c", emoji: "🍵", title: "岁月静好", description: "两个人，一杯茶，慢慢变老", tag: "平淡" },
      ],
    },
    {
      id: "l3",
      title: "风雨同舟",
      narrative: [
        "离开小镇，前方的路变得崎岖起来。天空渐渐阴沉，一场暴风雨似乎正在酝酿。",
        "骏马在风中嘶鸣，但并不退缩。你拍拍它的脖颈，低声说：\"别怕，我们一起走。\"",
        "暴风雨终于来了，雷电交加中你几乎看不清前路。然而在最黑暗的时刻，远处传来一盏微弱的灯光。",
        "你感受到一股力量在支撑着你，那是来自内心深处的声音……",
      ],
      choices: [
        { id: "l3a", emoji: "🛡️", title: "守护之心", description: "不管风雨多大，我会保护我在乎的人", tag: "守护" },
        { id: "l3b", emoji: "💪", title: "坚韧不拔", description: "跌倒了就爬起来，永不放弃", tag: "坚强" },
        { id: "l3c", emoji: "🙏", title: "感恩之路", description: "珍惜每一个陪你走过风雨的人", tag: "感恩" },
      ],
    },
    {
      id: "l4",
      title: "花好月圆",
      narrative: [
        "暴风雨终于过去了，天空出现了一道绚丽的彩虹。阳光洒在你身上，温暖而舒适。",
        "骏马带你来到一座美丽的花园，各色花朵竞相绽放，蝴蝶翩翩起舞。喷泉中央，一对鸳鸯正在嬉戏。",
        "你坐在花园的长椅上，回顾这一路走来的点点滴滴。有笑有泪，有苦有甜，但每一步都是值得的。",
        "夜幕降临，满天繁星。你闭上眼睛，在心中许下新年的愿望……",
      ],
      choices: [
        { id: "l4a", emoji: "💍", title: "执子之手", description: "愿有岁月可回首，且以深情共白头", tag: "爱情" },
        { id: "l4b", emoji: "👨‍👩‍👧‍👦", title: "天伦之乐", description: "家和万事兴，阖家团圆", tag: "家庭" },
        { id: "l4c", emoji: "🌺", title: "处处皆花", description: "把爱传递给身边每一个人", tag: "博爱" },
      ],
    },
  ],
};

// ========== 自我成长路线 ==========
const selfRoute: StoryRoute = {
  id: "self",
  emoji: "🧘",
  title: "心灵之旅",
  description: "让骏马带你回到内心深处",
  stages: [
    {
      id: "s1",
      title: "归零之境",
      narrative: [
        "骏马载着你来到一片无边的草原。天地之间，只有风声和马蹄声，一切都安静下来。",
        "你忽然意识到，这里没有城市的喧嚣，没有社交的压力，没有永无止境的待办清单。只有你，和这匹忠实的骏马。",
        "\"当所有外在的标签都被摘去，你还剩下什么？\"一个声音从心底浮起。",
        "草原深处隐约可见三个不同的方向，每个方向都散发着不同的光芒……",
      ],
      choices: [
        { id: "s1a", emoji: "🧭", title: "寻找方向", description: "重新审视自己的内心，找到真正想走的路", tag: "方向" },
        { id: "s1b", emoji: "🎭", title: "认识自我", description: "放下所有面具，真实面对自己", tag: "真实" },
        { id: "s1c", emoji: "🌿", title: "自然疗愈", description: "让大自然洗涤心灵，重获平静", tag: "平静" },
      ],
    },
    {
      id: "s2",
      title: "内心的回响",
      narrative: [
        "你选择的方向带你来到了一座古老的寺庙。寺庙坐落在云雾缭绕的山巅，钟声悠扬。",
        "寺庙里的老僧正在打坐。他缓缓睁开眼睛，看着你微笑：\"施主，你来了。我等你很久了。\"",
        "他邀请你在寺庙住下，每天清晨与他一起打坐冥想。在寂静中，你开始听到内心深处的声音。",
        "\"人生有三重境界，\"老僧指着三副挂画说，\"你觉得你在哪一重？\"",
      ],
      choices: [
        { id: "s2a", emoji: "📖", title: "看山是山", description: "以初心看世界，保持纯真与好奇", tag: "初心" },
        { id: "s2b", emoji: "🔮", title: "看山不是山", description: "深入思考，看透表象背后的本质", tag: "洞察" },
        { id: "s2c", emoji: "🏔️", title: "看山还是山", description: "经历繁华后回归质朴，大道至简", tag: "通透" },
      ],
    },
    {
      id: "s3",
      title: "蜕变时刻",
      narrative: [
        "在寺庙修行了数日，你感到自己的内心发生了微妙的变化。看待事物的方式不再急躁，心境变得开阔。",
        "一天清晨，你发现骏马站在寺庙门口，鬃毛上沾满了晶莹的露珠。它用鼻子蹭了蹭你的手，仿佛在说：\"该走了。\"",
        "老僧送你到山门口，递给你一把古朴的钥匙：\"这把钥匙能打开你心中最重要的那扇门。只有你自己知道它通向何方。\"",
        "你接过钥匙，翻身上马。前方的路明亮而清晰……",
      ],
      choices: [
        { id: "s3a", emoji: "✨", title: "释放才华", description: "不再隐藏，让光芒自由绽放", tag: "才华" },
        { id: "s3b", emoji: "❤️‍🔥", title: "点燃热爱", description: "找到真正热爱的事，全力以赴", tag: "热爱" },
        { id: "s3c", emoji: "🦋", title: "自由蜕变", description: "破茧成蝶，迎接全新的自己", tag: "蜕变" },
      ],
    },
    {
      id: "s4",
      title: "星辰归途",
      narrative: [
        "骏马载着你来到旅途的终点——一片星光璀璨的湖边。湖水如镜，倒映着满天繁星，美得令人屏息。",
        "你下马，走到湖边，看到水中自己的倒影。那个倒影微笑着，眼神中多了一份从容与坚定。",
        "\"这一路走来，我成长了许多。\"你对自己说。骏马在身后轻轻嘶鸣，仿佛在表示赞同。",
        "湖面上升起一缕缕金色的光芒，化作三颗闪亮的星星。每颗星都代表着一种力量，等着你去接收……",
      ],
      choices: [
        { id: "s4a", emoji: "🌟", title: "智慧之星", description: "照亮前路，永不迷失", tag: "智慧" },
        { id: "s4b", emoji: "💖", title: "爱之星", description: "让爱温暖自己和他人", tag: "爱" },
        { id: "s4c", emoji: "🔥", title: "力量之星", description: "拥有面对一切的勇气", tag: "力量" },
      ],
    },
  ],
};

export const storyRoutes: StoryRoute[] = [careerRoute, loveRoute, selfRoute];

export function generateBlessing(tags: string[]): string {
  const blessingMap: Record<string, string> = {
    事业: "事业腾飞，步步高升",
    智慧: "聪慧过人，明察秋毫",
    匠心: "匠心独运，精工细作",
    勇气: "勇往直前，披荆斩棘",
    人脉: "贵人相助，左右逢源",
    谋略: "运筹帷幄，决胜千里",
    魄力: "大气磅礴，一往无前",
    团结: "同心协力，众志成城",
    创新: "推陈出新，别具一格",
    成就: "功成名就，光耀门楣",
    家庭: "阖家欢乐，幸福安康",
    眼界: "高瞻远瞩，胸怀天下",
    缘分: "良缘天定，佳偶天成",
    知音: "高山流水，知音难觅却已得",
    热情: "热情如火，感染四方",
    陪伴: "长情相伴，不离不弃",
    激情: "生命热烈，不负韶华",
    平淡: "岁月静好，现世安稳",
    守护: "守护所爱，温暖一生",
    坚强: "坚韧不拔，百折不挠",
    感恩: "常怀感恩，福泽绵长",
    爱情: "情深似海，执子偕老",
    博爱: "大爱无疆，温暖人间",
    方向: "目标清晰，前路光明",
    真实: "真我本色，光芒万丈",
    平静: "心如止水，宁静致远",
    初心: "不忘初心，方得始终",
    洞察: "洞若观火，智珠在握",
    通透: "大道至简，返璞归真",
    才华: "才华横溢，惊艳四座",
    热爱: "心之所向，全力以赴",
    蜕变: "破茧成蝶，华丽蜕变",
    力量: "内心强大，无所畏惧",
    爱: "爱满人间，温暖如春",
  };

  const blessings = tags.map((tag) => blessingMap[tag] || "福星高照");
  
  const intro = "🐴 马年大吉 🐴\n\n";
  const body = `在这段奇妙的旅途中，你收集了${tags.length}张祝福卡片：\n「${tags.join("」「")}」\n\n骏马为你送上专属祝福：\n\n`;
  const list = blessings.map((b) => `✨ ${b}`).join("\n");
  const outro = "\n\n🧧 愿你马年一马当先，马到成功！🧧";

  return intro + body + list + outro;
}
