// PLOT BEATS:
// 1) In medias res talking about Inception
// 2) Thanks for movie, we still up to stay over tomorrow night?
// 3) You need to stop hiding... // Can't even CALL.
// Weave in previous bits of convo pieces.
// Also, FULL CIRCLE with the Inception!
// OKAY, TOO CONVOLUTED, CUT OUT THE DIFFERENT FAMILIES & TYPO parts.

function Start_Jack_1(){
	
	/////// SET UP SCENE ////////

	Show("background","bedroom");
	Show("us","bedroom_us_1");
	Show("light","bedroom_light_1",{x:0,y:159});

	PlaySound("bg","bedroom_1",{loop:-1});

	/////////////////////////////

	j("然后他平静地说出了：");
	j("“我买下了航空公司”");
	j("那可要花上一大笔钱");
	n("他是那么说的？");
	n("当时剧院里每个人都在笑，搞得我什么都没听清");
	j("你要么是需要字幕，要么就是该掏耳朵了");
	j("那结局你怎么解释？");

	Choose({
		"这些全都是一场梦": Inception_Dream,
		"他回到现实世界了？": Inception_Awake,
		"没啥，Cobbs终于放手了": Inception_Neither
	});

}

function Inception_Dream(message){

	$.inception_answer = "dream";

	n(message);
	j("所以他自我救赎的故事整个都是编的？");
	n("一个弥天大谎");
	j("你这人有点悲观啊，是不是?");

	Choose({
		"嗯，我就是很悲观。": Sadsack,
		"纵使悲情满胸怀，莫使贵人多挂念": function(message){
			$.im_a_poet = true;

			n(message);
			j("啊Nicky，你这诗写的可以啊");
			n("来给我开瓶红酒");
			n("因为这可能是你听过我说的最优雅的东西了");
			j("抱歉我这啥都没有");
			n("不管怎么说吧…");
			Thanks();
		},
		"我只是很现实而已": function(message){
			$.hippies = true;

			n(message);
			j("你需要多想想好的方面");
			n("你也需要别这么“颓废”");
			n("不管怎么说吧…");
			Thanks();
		}
	});

}
function Inception_Awake(message){

	$.inception_answer = "awake";
	$.im_a_poet = true;

	n(message);
	n("不然的话，只能说整部电影全都是在撒谎了");
	n("尽为诳语则万物皆虚");
	j("啊Nicky，你这是准备要写诗啊");
	j("我觉得你大概应该喜欢这个电影吧？");

	Choose({
		"没错,我超喜欢的": function(message){
			n(message);
			Thanks();
		},
		"呃，除了有些地方很让人看不懂": function(message){
			n(message);
			j("我觉得这电影是故意这么设计的");
			n("那它这算是任务圆满完成了");
			n("不管怎么说吧…");
			Thanks();
		},
		"无~~~~~~~~聊": function(message){
			n(message);
			j("我就当成是了");
			Thanks();
		}
	});

}
function Inception_Neither(message){

	$.inception_answer = "neither";

	n(message);
	j("哦？");
	n("他甚至都不打算看看那个陀螺最后是不是倒了");
	n("真相啦，骗局啦，虚虚实实啦…Cobbs都不在乎");
	n("重点是，他最后很开心，除此之外都不重要");
	j("你要么是很有诗意，要么就是超级悲观");

	Choose({
		"你要不说我还没发现我挺有诗意的": function(message){

			$.im_a_poet = true;

			n("我可能是个诗人");
			n("我自己甚至都没注意");
			j("我的阅历告诉我你在抒情能力上无出其右");
			n("那是歇斯底里");
			n("不管怎么说吧…");
			Thanks();

		},
		"我只是超级悲观而已": Sadsack,
		"两个都有吧":function(message){

			$.hippies = true;
			$.im_a_poet = true;

			n(message);
			n("诗出于悲痛之呻吟，艺出于苦楚之抒怀");
			j("你怎么听着和我妈一样");
			n("你家长已经<i>颓废</i>到一定程度了.");
			n("不管怎么说吧…");
			Thanks();

		}
	});

}

function Sadsack(message){
	
	$.sadsack = true;

	n(message);
	j("呃…你没必要这么说啊…");
	j("我还是希望咱们这次出门看电影能稍微激励你一下");
	n("当然有！");
	Thanks();

}

function Thanks(){
	
	n("总之，谢谢你带我出去看盗梦空间");
	j("也谢谢你能陪我，Nicky");
	j("我觉得你该在你之前做的那个奇怪的游戏里面讽刺一下盗梦空间");
	n("嗯…也许吧");
	n("所以我们明天晚上再见面？");

	j("虽然…");
	n("我希望我能说服我家长能让我在外面过夜");

	j("我更希望你告诉你爸妈我们是出去看电影了，而不是在一块学习。");
	n("我会假装我们在为了期中考试彻夜复习的…呃？");

	j("你没法一直隐瞒下去的");
	n("Jack…");

	Choose({
		"他们永远都不会知道的": function(message){
			$.coming_out_readiness="no";
			n(message);
			j("真的？永远？");
			Hiding();
		},
		"我其实也想告诉他们": function(message){
			$.coming_out_readiness="yes";
			n(message);
			Hiding();
		},
		"我还没准备好告诉他们": function(message){
			$.coming_out_readiness="maybe";
			n(message);
			j("我可以帮你准备");
			Hiding();
		}
	});

}

function Hiding(){

	j("Nicky，一直这么藏下去会让你寝食难安的");

	if($.inception_answer=="awake"){
		j("就像你之前说的，活在谎言里面还有什么意义？");
	}
	if($.inception_answer=="dream"){
		j("这也就是你说的……弥天大谎？");
	}

	if($.sadsack){
		j("你刚才说你很悲观的时候");
		j("我就知道你没在开玩笑，至少不全是。");
	}

	n("得了吧Jack");
	j("我去年的时候就出柜了");
	if($.hippies){
		n("你这个比较<b>没有</b>任何意义");
		n("就像我说过的那样，你和你家长都超级颓废");
		n("要是我是你的话，我甚至都分不清他们是一边抽大麻还是一边抽烟然后一边听你说的");
		j("喂！我们每隔一天才哈一次草");
		n("呃");
		j("重点是，我家长支持我出柜");
	}else{
		j("而且他们还<b>很</b>支持");
	}

	j("你现在人都在加拿大了，很多人对LGBT团体都很友好");
	j("你怎么就知道你家长不支持呢？");

	Choose({
		"亚洲的家长一般都很反感同性恋": Hiding_2,
		"我不知道…我觉得我都没试过…": Hiding_2,
		"除了<b>学习</b>之外他们什么都不会支持的": Hiding_2
	});

}

function Hiding_2(message){
	
	n(message);

	if($.coming_out_readiness=="no"){
		n("再说一遍，他们永远都不会知道的");
	}

	j("你可能在信任上有点问题");
	j("你甚至都只是在和我打字聊天而不是直接打电话过来");
	j("…因为你觉得你父母可能会偷听到");

	n("他们真的会的！");

	j("你们这种交流方式");
	j("语焉不详，势合形离，无以羁绊");

	if($.im_a_poet){
		n("呃…你看来和我一样也是个诗人啊");
	}else{
		n("还不算太糟啦…");
	}

	if($.coming_out_readiness=="yes"){
		j("你自己也说了你想告诉他们");
		j("那就告诉他们吧");
	}else{
		j("Nicky.");
	}
	j("今天晚上就跟他们说");

	Choose({
		"今晚？得了吧！": Hiding_3,
		"唉…我尽量吧": Hiding_3,
		"我会小心的点出来的": Hiding_3
	});

}

function Hiding_3(message){
	
	n(message);
	j("……");
	n("我不想吓到他们");
	n("而且仍然还需要说服他们能让我明天晚上在外面过夜");
	n("我会告诉他们我还是在跟你一起学习的");
	j("……");
	n("到吃饭时间了，我要下楼了");

	j("其实……我挺赞同的");
	n("呃？");
	j("关于你关于电影结局的想法");
	switch($.inception_answer){
		case "dream": j("我觉得Cobbs仍然在做梦，活在谎言之中"); break;
		case "awake": j("我觉得Cobbs重新回到了真实世界，找回了他真正的家庭"); break;
		case "neither": j("我觉得都不重要，只要Cobbs开心就好了"); break;
	}
	n("哦");
	j("嗯");
	if($.coming_out_readiness=="maybe"){
		j("希望这能帮你改变你那个“还没准备好”的想法");
	}
	j("祝你好运，一个小时之内给我回话");

	var insult = "";
	if($.hippies) insult+="颓废的家伙";
	if($.im_a_poet) insult+="大诗人";
	n("回见");
	if(insult!=""){
		n("你个"+insult);
	}else{
		n("你个小笨蛋");
	}

	Jack_1_End();

}

function Jack_1_End(){
	Clear();
	Start_Dinner_1();
}