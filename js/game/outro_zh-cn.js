// Then we broke up soon/X...
// Three stories (Lie / Truth / Half-truth) ... one interaction with each.
// Did you skip or not? Tie that into the sections.
// Your final choice, a whaaaaaat.

function Start_Outro(){

	// Just clear dialogue & stuff.
	queue(ClearScene,0);
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse_2");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	///////////////////////////////

	if($.breaking_up_soon){
		N("然后我们三天之后就分手了。");
	}else{
		N("然后我们三个星期之后就分手了。");
	}

	// Weave - intro
	if($.main_menu_convo_1==1){
		p("……");
		N("告诉过你了这结局没那么美好。");
	}else if($.main_menu_convo_1==3){
		p("……");
		N("告诉过你了，没有血，只有泪。");
	}else if($.main_menu_convo_2==1){
		p("……");
		N("你说的没错，我确实有点悲观。");
	}

	Choose({
		"<b>我想哭。</b>":function(message){
			p(message);
			N("哭吧，哭出来能好一点。");
			Closure();
		},
		"啊…得了吧，这结局也太冷酷了。":function(message){
			p(message);
			N("我不否认你说的。");
			Closure();
		},
		"也不能说我完全猜不到。":function(message){
			p(message);
			N("是啊……我和Jack都能猜到结局。");
			Closure();
		}
	});

}

function Closure(){

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("呃。");
	p("我好像一直在用和你爸同样颜色的气泡。");

	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("这提醒我了，很多角色都不是他们本人。");
	N("所有的名字都不是原本的，除了我的。");
	N("我从头到尾都没提过我有个弟弟，因为他和这件事情无关，是无辜的。");
	N("还有我把我父亲加回来了，尽管他在早在2010年以前就已经不再是我们一家人之一了。");

	if($.main_menu_convo_2==3){
		N("就像你说的，这个“不太真实的游戏”基本全都是编的。");
	}
	
	p("不过至少你能给我换个颜色好不好。");
	N("距离那个晚上已经过去四年了……");
	N("你觉得后来发生了什么？");

	if($.main_menu_convo_2==2){
		N("别担心，就像之前说的，这里面没有正确的。");
	}

	$.coming_out_stories_left = 3;
	$.order_of_stories = [];

	Choose({
		"我猜不出来，直接告诉我吧。": function(message){
			p(message);
			N("好吧，我来告诉你发生了什么");
			N("…并且发生了什么，还发生了什么");
			p("啥？");
			Closure_Story();
		},
		"我猜猜……事情变得越来越好了？": function(message){
			p(message);
			N("对！没错，而且我这里有三个版本告诉你是怎么变好的。");
			p("啥？");
			Closure_Story();
		},
		"鲜花彩虹之中基情四射地走向人生巅峰？": function(message){
			p(message);
			N("对！没错。至少在三个版本的尾声里面有一个是这样的。");
			p("你看我说的没错吧。");
			Closure_Story();
		}
	});

}

function Closure_Story(){

	if($.coming_out_stories_left==3){
		N("你想先听那个尾声？");
		N("别担心，三个我都会告诉你。");
	}else if($.coming_out_stories_left==2){
		N("然后，你想听哪一个？");
	}else if($.coming_out_stories_left==1){
		N("最后，咱们来听听剩下的这一个……");
	}else{
		Finale_1();
		return;
	}

	$.coming_out_stories_left -= 1;

	var options = [];
	if(!$.told_story_lie) options["完全虚构的尾声"]=Tell_Me_A_Lie;
	if(!$.told_story_truth) options["毫无虚构的尾声"]=Tell_Me_A_Truth;
	if(!$.told_story_half_truth) options["没那么虚构的尾声"]=Tell_Me_A_Half_Truth; 
	Choose(options);

}

function Is_Last_Story(){
	if($.coming_out_stories_left==0){
		if($.asked_about && $.asked_credits){
			p("又来了，既然只剩下最后一个选项……");
		}else{
			p("为什么你还要做出来让我去点。");
			N("我怎么知道。让我接着说。");
		}
	}
}



function Tell_Me_A_Lie(message){

	$.told_story_lie = true;
	$.order_of_stories.push("lie");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("很好。");
	Is_Last_Story();

	N("我逃离了我的家，除了一大箱衣服之外我什么都没带。");
	if($.im_a_poet){
		N("我一边在加拿大四处漫游。一边给陌生人写诗来维持生计。");
	}else{
		N("我一边在加拿大四处漫游。一边做不好玩的游戏来维持生计。");
	}
	N("我采遍了鲜花，朝着彩虹迈进，和一只基佬成为了好朋友。");
	p(". . .");
	N("最终我到了阿拉斯加，在那里我遇到了Bonnie & Clyde这对双性恋。");
	N("Bonnie是个六十多岁的老女人，Clyde是个快七十的老男人。");

	// FAMILY WITH BENEFITS
	// Weave in -- top or bottom

	Choose({
		"我猜路上你饿到把衣服都吃了。": function(message){
			$.outro_convo_lie = 1;
			p(message);
			N("幸亏我身子骨够软，我的行李箱可以兼做睡袋。");
			Tell_Me_A_Lie_2();
		},
		"这个故事比随口编的扯得还要远。": function(message){
			$.outro_convo_lie = 2;
			p(message);
			N("<b>我的故事我爱怎么说就怎么说。</b>");
			Tell_Me_A_Lie_2();
		},
		"老男人……": function(message){
			$.outro_convo_lie = 3;
			p(message);
			N("我知道你想歪了。");
			Tell_Me_A_Lie_2();
		}
	});
}
function Tell_Me_A_Lie_2(){
	
	N("他们拿我当收养来的孩子，然后我给他们当全职玩具。");

	if($.outro_convo_lie==1){
		p("…多亏了你的，呃，体质。");
	}

	switch($.top_or_bottom){
		case "top": N("玩的时候我一般把我的养父母当做女方对待。"); break;
		case "bottom": N("玩的时候我一般是作为女方。"); break;
		case "versatile": N("玩的时候我们轮流作为女方。"); break;
	}

	N("他们把我养育成人，施我以爱，最终我成为了一个对社会有贡献的男人。");

	switch($.outro_convo_lie){
		case 2: p("你这故事里面每一个字都比瞎编的还要扯。"); break;
		case 3: p("说的是那种老男人吧。"); break;
	}

	N("他们是我的新家人。");
	N("…PY交易的新家人。");

	p("……");

	Closure_Story();

}





function Tell_Me_A_Truth(message){

	$.told_story_truth = true;
	$.order_of_stories.push("truth");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("开始讲了啊。");
	Is_Last_Story();

	N("我接受了Jack的建议，在我的奇怪的小游戏里面加入了吐槽盗梦空间内容（Reimagine :The Game:）。");
	switch($.inception_answer){
		case "awake": N("虽然我没提到Cobbs在最后其实是醒了。"); break;
		case "dream": N("虽然我没提到Cobbs在最后其实还在做梦了。"); break;
		case "neither": N("我还是觉得Cobbs到底在不在做梦不重要。"); break;
	}
	N("Reimagine :The Game:这游戏出名了，作为一个好作品出名了");
	N("几个月之后，我开始我在湾区的美商艺电实习，远离了我的家庭。");

	Choose({
		"呃？传说中那个可恶的EA？": function(message){
			$.outro_convo_truth = 3;
			p(message);

			N("是是是我知道。");
			N("我现在还在通过做这些“艺术品”独立游戏来忏悔我之前的罪恶");
			p("给我认真反悔！！");
			Tell_Me_A_Truth_2();
		},
		"听说湾区对LGBT团体很友好": function(message){
			$.outro_convo_truth = 2;
			p(message);

			N("所以才叫弯区嘛.");
			p("呃……没人那么说吧。");
			Tell_Me_A_Truth_2();
		},
		"啊EA我知道，他们做了模拟人生对吧？": function(message){
			$.outro_convo_truth = 1;
			p(message);

			N("对的！不过我不是那个项目的。我们的团队在做网页版的——");
			N("[不能说的敏感内容]");
			p("哦");
			Tell_Me_A_Truth_2();
		}
	});

}
function Tell_Me_A_Truth_2(){
	
	N("离开EA之后我就去做独立游戏了。");
	N("不过我还和EA的朋友们有接触，还是住在湾区。");

	N("我的技术水平提高了。");
	N("我的社交能力也有了长进。");
	N("在这里，我终于知道了我应该要干什么。");

	switch($.outro_convo_truth){
		case 1: p("恩，考虑做 [不能说的敏感内容]: The Game."); break;
		case 2: p("不过讲道理，没人管它叫弯区"); break;
		case 3: p("不过讲道理，EA……"); break;
	}

	Closure_Story();

}





function Tell_Me_A_Half_Truth(message){
	$.told_story_half_truth = true;
	$.order_of_stories.push("half-truth");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("接下来让我讲给你听。");
	Is_Last_Story();

	N("Claire，可能是造化弄人，他也是双性恋");
	N("在"+$.studying_subject+"课上我们相互了解的时候知道的。");

	p("太巧了吧！");

	N("Claire也在他的性取向问题上有点困难，就和我一样。");
	N("我们俩都缺乏经验，Claire只跟女性交往过，而我是只和Jack");

	// CLAIRE AND I HELPED EACH OTHER EXPLORE OURSELVES, LESS GUILT, MORE EXPERIENCE.
	// Weave in -- studying what

	Choose({
		"就是你的翻版啊，只不过整个反过来了": function(message){
			$.outro_convo_half_truth = 1;
			p(message);
			N("好吧，呃，翻版就是反过来的。");
			p("你知道我的意思。");
			N("恩，Claire和我相互讲了自己跟另一半的故事。");
			Tell_Me_A_Half_Truth_2();
		},
		"所以，你们互相给对方上了“课”？": function(message){
			$.outro_convo_half_truth = 3;
			p(message);
			Tell_Me_A_Half_Truth_2();
		},
		"所以，在啪啪啪之后你们在一起了？": function(message){
			$.outro_convo_half_truth = 2;
			p(message);
			N("没有，她对我而言就像是姐姐妹妹一样，不是可以啪啪啪的那种。");
			p("你……没必要说的那么详细吧。");
			N("不过确实，Claire和我相互讲了自己跟另一半的故事。");
			Tell_Me_A_Half_Truth_2();
		}
	});

}
function Tell_Me_A_Half_Truth_2(){
	
	N("并且还交换了看法。");
	N("比如……如何用手指挑逗对方，又或是，用脑门轻轻蹭对方的唇尖之类的……");
	p("你说的有点太多了……");

	if($.changing_schools || !$.father_oblivious){
		N("后来我确实转学到了她的学校。");
	}

	N("直到现在，我们一直都是最好的朋友！我们一起搬到了美国，远离了自己的家庭。");
	N("我们相互帮助克服不安全感，并找回了自己的本真。");
	N("骄傲的双性恋组合。");

	p("这故事还真感人啊。");
	
	N("当然，我们还会互相对方在勾搭别人之类的事出主意。");

	p("……");

	Closure_Story();

}





function Finale_1(){
	
	N("这就是最后一个故事。");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);
	
	Show("cup",null);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");

	Wait(1000);
	Show("nicky","coffee_nicky_still_2");

	//////////////////////////

	N("不过我亲爱的玩家，我注意到了。");
	if($.order_of_stories[0]=="truth"){
		N("你直接先听了毫无虚构的尾声。");
	}else if($.order_of_stories[2]=="truth"){
		N("你把最真的故事留到了最后。");
	}else if($.order_of_stories[0]=="lie"){
		N("你想先听瞎扯的尾声。");
	}else{
		N("你把完全虚构的尾声留到了最后");
	}
	N("这对你意味着什么？");
	p("……");

	p("你知道的……一般来说一个有多个结局的游戏，是不会把这些结局<b>一次性全</b>展示给你看的，");
	N("哈！你觉得这是<b>结局</b>？");

	Choose({
		"要我猜…难道这只是开始？": function(message){
			p(message);
			N("这只是开——啊对，没错。");
			Finale_2();
		},
		"啊好吧，这场游戏快要结束了吧？": function(message){
			p(message);
			N("没错，但是这场游戏，也就是我的故事，我的人生，还在继续。");
			Finale_2();
		},
		"我的天这游戏<b>到底有多长<b>。": function(message){
			p(message);
			N("别担心，我发誓下一个选项是你最后一个要点的了。");
			Finale_2();
		}
	});

}

function Finale_2(){

	Show("nicky","coffee_nicky_packup_1");

	N("……");
	N("你知道的，如果我能回到过去，重温我所有其他可能的选择……");
	N("……实际上我就是就是通过写这个游戏来这么做的……");
	N("……也不会改变任何事。");

	Show("nicky","coffee_nicky_packup_2");

	// SERIOUSNESS.
	PlaySound("sfx","laptop_shut");
	PlaySound("bg","bedroom_1",{loop:-1, volume:0.4});

	p("？？？");

	if($.punched){
		N("我的短信还是会被看，我还是会被转学。我的脸还是会被揍。");
	}else if($.father_oblivious==false){
		N("我的短信还是会被看，我还是会被转学。家里人还是吵架。");
	}else if($.changing_schools){
		N("我的短信还是会被看，我还是会被转学。他们还是想让Claire把我掰直。");	
	}else{
		N("我的短信还是会被看。我仍然没有课余时间，他们还是想让Claire把我掰直。");
	}

	N("有点斯德哥尔摩综合征的感觉…我很感激这一切。");

	Choose({
		"啥？": Finale_3,
		"你说啥？": Finale_3,
		"你这是在说啥？": Finale_3
	});

}

function Finale_3(message){

	p(message);

	PlaySound("sfx","laptop_pack");
	Show("nicky","coffee_nicky_packup_3");

	N("真的，我很感激。");
	N("要不是我之前的生活烂得跟屎一样，我不会有动机去重构我的先前的一生。");

	PlaySound("sfx","laptop_pack_2");
	Show("nicky","coffee_nicky_packup_4");

	N("2010年末, Dan Savage发起了“一切都会好起来”运动。");
	N("这三个故事……不管是真实的还是虚构的……他们都至少在一点上是真的：");
	N("一切好起来了。");

	p("……");

	N("并且……");
	N("在最后……");
	N("在这个又长又笨又痛苦的游戏最后……");
	N("面对了那些本来应该支持我的人之后……");

	p("……");

	N("我赢了。");
	N("……");
	N("我赢了。");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	// CUTSCENE -- MY NEW BOYFRIEND
	Wait(1000);
	
	PlaySound("sfx2","laptop_pack");
	Show("nicky","coffee_nicky_date_1");
	Wait(1000);
	
	PlaySound("sfx","step_2");
	Show("nicky","coffee_nicky_date_2");
	Wait(1000);
	
	PlaySound("sfx","step_1");
	Show("nicky","coffee_nicky_date_3");
	Wait(1000);
	
	PlaySound("sfx","step_2",{volume:0.75});
	Show("nicky","coffee_nicky_date_4");
	Wait(1000);

	PlaySound("sfx","step_1",{volume:0.5});
	Show("nicky",null);
	Wait(1000);

	PlaySound("sfx","step_2",{volume:0.25});
	Choose({
		"再玩一次？": Finale_4
	});

}
function Finale_4(message){
	
	p(message);
	N("人生不会给你第二次机会的。");

	Wait(800);
	queue(function(){
		document.getElementById("game").setAttribute("screen","blank");
	},1000);
	//queue(ClearScene,0); // coz the sound's cool!
	queue(function(){
		document.getElementById("game").setAttribute("screen","credits");
	},0);


}


