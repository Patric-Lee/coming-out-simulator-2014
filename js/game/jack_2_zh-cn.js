// Denounement
// j("That mode of communication?"); j("It's imprecise, impersonal, impossible to truly connect.");

// Recap what happened.
// Who's to blame.
// All coming towards --> Break up now, or try to stay together?

// Love you, X. Love you, Y.
// IMMEDIATELY CUT TO NOW - WE BROKE UP.

function Start_Jack_2(){

	/////// SET UP SCENE ////////

	Show("background","bedroom_2");
	Show("us","bedroom_us_2");
	Show("light","bedroom_light_2",{x:0,y:159});

	PlaySound("bg","bedroom_2",{loop:-1,volume:0.5});

	if($.punched){
		Show("punch","bedroom_punch",{x:256,y:404});
	}

	/////////////////////////////

	n("Jack。");
	if($.sadsack){
		j("怎么样亲爱的Nicky？有没有变得乐观一点？");
	}else{
		j("怎么样亲爱的Nicky？");
	}
	j("出柜这件事怎么样了？是不是像我说的那样一切都像我之前说的那样？");

	Choose({
		"Jack…我们这次真的玩脱了": function(message){
			n(message);
			j("不…不会吧");
			j("你在开玩笑吧？发生什么了？");
			What_Happened();
		},
		"事情差点就变得更糟了": function(message){
			n(message);
			j("啊？不是吧");
			j("我没想到他们…到底发生什么了？");
			What_Happened();
		},
		"闭嘴，Jack": function(message){
			n(message);
			j("哈，我就知道我是对的");
			n("不，Jack，我们没法再见面了");
			j("等一下");
			j("不是吧，你没开玩笑吧？是不是？到底发生什么了？");
			What_Happened();
		}
	});

}

function What_Happened(){

	if($.punched){
		Choose({
			"我爸直接揍了我的脸": What_Happened_Abuse,
			"他们要让我转学": What_Happened_School,
			"他们偷看了咱们发的所有信息": What_Happened_Texts
		});
	}else if($.father_oblivious==false){
		Choose({
			"我爸妈吵嘴了": What_Happened_Abuse,
			"他们要让我转学": What_Happened_School,
			"他们偷看了咱们发的所有信息": What_Happened_Texts
		});
	}else{
		n("我爸现在还没发现，但是我妈……");
		if($.changing_schools){
			Choose({
				"她要让我转学": What_Happened_School,
				"她在撮合我和一个我从来没见过的女孩子": What_Happened_Girl,
				"她偷看了咱们发的所有信息": What_Happened_Texts,
			});
		}else{
			Choose({
				"她给我请了个家教，我现在没有课余时间了。": What_Happened_School,
				"她在撮合我和一个我从来没见过的女孩子": What_Happened_Girl,
				"她偷看了咱们发的所有信息": What_Happened_Texts,
			});
		}
	}

}

function What_Happened_Abuse(message){
	$.told_jack = "abuse";

	n(message);
	j("我的天啊！");
	j("Nicky你有没有打电话给未成年人保护组织？");
	n("啥？没有，那太过了。");
	j("那……好吧。不过至少答应我你明天一定要去学校见一下辅导员。");
	n("好");
	j("……");
	What_Happened_2();
}
function What_Happened_School(message){
	$.told_jack = "school";

	n(message);
	j("不！");
	j("为什么？！他们至于吗？");
	n("因为“Jack和学校环境对我影响不好”或者别的乱七八糟的理由。他们就是想让我们俩分开");
	j("太可怕了…");
	What_Happened_2();
}
function What_Happened_Girl(message){
	$.told_jack = "girl";

	n(message);
	j("呃？认真的？");
	n("她好像是叫Claire啥的。而且她还会在课余时间给我辅导。");
	j("好奇怪，他们还用家庭辅导限制你吗？");
	n("对啊。"); 
	What_Happened_2();
}
function What_Happened_Texts(message){
	$.told_jack = "texts";

	n(message);
	j("这也太不地道了！");
	j("等一下，那你现在打算拿这些信息怎么办？");
	n("我再藏得好一点，我家长不是那种电脑水平很高的。");
	j("…那也还是不地道啊。");
	What_Happened_2();
}

function What_Happened_2(){
	
	n("而且这是不幸之一，还有两件别的事啊");
	j("Nicky…");
	j("我真的，真的非常抱歉");
	j("都是我的错，我太急着让你出柜了。都怪我。");

	Choose({
		"是啊，不怪你怪谁……": function(message){
			$.blame = "jack";

			n(message);
			n("要不是你一直说“Nicky啊出柜了就不会让你寝食难安了”之类的话这一切都不会发生");
			j("……");
			n("对不起，我只能朝你倒苦水了");
			n("单纯的，全搞砸了");
			What_Now();
		},
		"不怪你，都是<b>他们</b>的错": function(message){
			$.blame = "parents";

			n(message);
			n("他们早就开始看咱们的短信了。不管我说什么都不会改变任何事。");
			if($.told_jack!="texts"){
				j("什么！你都没告诉我他们看你短信这件事！");
			}else{
				j("而且他们被那些传统观念束缚的太深了，那些腐朽的传统");
				n("恩…我还没有看开到接受这些观念");
			}
			What_Now();
		},
		"不怪你，都是我的错": function(message){
			$.blame = "nicky";

			n(message);
			n("我本来可以加锁屏密码的，或者是给短信加密，或者藏得更隐秘一点…");
			if($.told_jack!="texts"){
				j("他们连你的短信都看了？…");
			}
			j("Nicky，你应该去相信他们，因为他们是你的父母。不过他们滥用了你的信任，这不是你的错。 ");
			n("大概是吧……");
			What_Now();
		}
	});

}

function What_Now(){

	j("……");

	n("你知道的……就是我和父母交流的方式…");
	n("一直都是那种");
	n("语焉不详，势合形离，无以羁绊");

	j("……");
	j("那现在怎么办");

	Choose({
		"我要去破坏父母的计划": function(message){
			n(message);

			if($.told_jack=="texts"){
				n("我去换个新的邮箱和新的手机号");
				n("这样他们大概就没法接着窃听咱们了");
			}else if($.told_jack=="girl"){
				n("我会告诉Claire一切，足够幸运的话她应该也会帮我们。");
			}else{
				n("我会想办法的……");
			}

			What_Now_2();
		},
		"我明天要去见辅导员": function(message){
			n(message);

			if($.told_jack=="abuse"){
				n("就像我承诺过的，虽然是你替我承诺的");
			}else if($.told_jack=="school"){
				n("至于学校，实际上我也不知道他们到底会不会，或是什么时候会把我转走。");
			}else{
				n("至少我可以找别人倒倒苦水");
			}

			What_Now_2();
		},
		"我要离家出走": function(message){
			n(message);

			n("我的意思倒不是说断绝关系。不过如果真的断绝了的话我也只能去你那里了。");
			n("不管怎么样，我得回去看看怎么去找实习或者申奖学金之类的");
			n("然后离这些人远远的");
			What_Now_2();
		}
	});

}

function What_Now_2(){

	j("不是，我意思是…我们现在……怎么办？");
	n("Jack…");
	j("我们要怎样，会发生什么");
	n("…");

	Choose({
		"我们只能分手了": function(message){
			$.breaking_up_soon = true;

			n(message);

			j("不，别啊……");
			n("我不能把你也拉下水，这事我干不出来啊");
			j("求你别说“我们还能当朋");
			n("我们还能当朋友");
			n("……");
			j("肯定的，我们当然是朋友，总不可能变成陌生人吧。");
			n("……");
			What_Now_3();
		},
		"只要我们还能在一起": function(message){
			n(message);

			j("……");
			j("只要……");
			n("……");
			What_Now_3();
		},
		"我也不知道": function(message){
			$.breaking_up_soon = true;

			n(message);

			j("……");
			What_Now_3();
		}
	});

}

function What_Now_3(){

	n("时间不早了");
	n("再不睡我明天就起不来了");
	j("好吧");
	j("……");
	j("我爱你，Nicky。");
	n("我也爱你，Jack。");
	
	var insult = "";
	if($.hippies) insult+="颓废的家伙";
	if($.im_a_poet) insult+="大诗人";
	if(insult!=""){
		n("你个"+insult);
	}else{
		n("你个小笨蛋");
	}

	The_Game_Ends();

}

function The_Game_Ends(){
	Wait(500);
	Start_Outro();
}

