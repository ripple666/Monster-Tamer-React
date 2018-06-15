import {
	dragenVariety
} from '../assets/data/data.js'

import {
	MessageBox,
	Message
} from 'element-react';

import '../assets/styles/components/layout_componet.scss'
import createHashHistory from 'history/createHashHistory'
import {dragenTag,tagColor} from '../assets/data/data.js'

const history = createHashHistory()

let contractAddress = window.contractAddress
let call = window.call
let pay = window.pay
let receipt = window.receipt
let callArgs = new Array()

let $ = window.$



//设置导航栏
export function setCurNavStyle(pathName) {

	['nav-market', 'nav-my-assets', 'nav-attack', 'nav-hatch', 'nav-top', 'nav-warn', 'nav-tree'].forEach((v, i) => {
		let el = document.getElementById(v)
		if (el) {
			el.className = el.className.replace('active', '')
		}

	})


	if (document.getElementById('nav-' + pathName)) {
		document.getElementById('nav-' + pathName).className += ' active'
	}

}



//判断是否有护盾
export function isShield(arr) {
	let isShield = false;
	arr.forEach((v, i) => {
		if (v.shield) {
			isShield === true;
		}
	})
	return isShield
}


//截取search
export function getQueryString(string, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i');
	var r = string.substr(string.indexOf('?') + 1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	} else {
		return null;
	}
}

//对象排序
export function sortObj(obj, value) {
	var newObj = Object.keys(obj).sort(function(a, b) {
		return obj[b].value - obj[a].value;
	});
	return newObj
}


//根据体重和vp计算属性
function getProByVp(vp1, vp2, wt, dragen) {
	let property = {
		grade: 1,
		speed: 18,
		power: 1,
		agility: 18
	}
	if (wt < vp1) {
		property.power = dragen.at.toFixed(2)
		property.speed = dragen.sp.toFixed(2)
		property.agility = dragen.ag.toFixed(2)
	} else if (wt >= vp1 && wt <= vp2) {
		property.grade = 2
		property.power = (dragen.at + dragen.at1).toFixed(2)
		property.speed = (dragen.sp + dragen.sp1).toFixed(2)
		property.agility = (dragen.ag + dragen.ag1).toFixed(2)
	} else if (wt > vp2) {
		property.grade = 3
		property.power = (dragen.at + dragen.at1 + dragen.at2).toFixed(2)
		property.speed = (dragen.sp + dragen.sp1 + dragen.sp2).toFixed(2)
		property.agility = (dragen.ag + dragen.ag1 + dragen.ag2).toFixed(2)
	}

	return property
}



function timeStampToLocal(timeStamp) {
	let date = new Date(timeStamp*1000)
	var month = date.getMonth() +1
	var hours = date.getHours() 
	var minutes = date.getMinutes()
	var seconds = date.getSeconds()

	return {
		month,hours,minutes,seconds
	}
}


export function getBirthDay(num){
    console.log(num);
    var date = new Date(parseInt(num+'000'))
    var MonthArr = ['January','February','March','April','May','June','July','August','September','October','November','December']
    var mon = MonthArr[date.getMonth()]
    var day = date.getDate()
    var year = date.getFullYear()
    console.log( mon+' '+day+','+year);
    return mon+' '+day+','+year 
}


function getLeftTimeToObj(timeStamp){
	var time_sec = timeStamp/1000
	var seconds = parseInt(time_sec%60)
	var minutes = parseInt(time_sec/60%60)
	var hours= parseInt(time_sec/3600)
	
	return {
		seconds,hours,minutes
	}
}

//根据体重和vp计算属性
function getStatus(dragen) {
	let statusArry = ['at', 'ag', 'sp'];
	let status = []
	let buffs = []


	let curStrongTimeLeft=0;
	statusArry.forEach((v, i) => { //是否吃药了
		let leftTime = dragen[v + '_end']*1000-window.bkctime
		let strongTimeLeft = getLeftTimeToObj(leftTime)
		
		if (leftTime>0 && leftTime>curStrongTimeLeft) {
			curStrongTimeLeft = leftTime

			status.push({
				name: 'strong',
				time:strongTimeLeft.hours+':'+strongTimeLeft.minutes
			})

			buffs.push('strong')
		}
	})



	let dtmCdTime = (dragen['dtm']+3600)*1000;
	let atmCdTime = dragen['atk_cd_end']*1000;

	let dtmTimeLeft = getLeftTimeToObj(dtmCdTime-window.bkctime)
	let atmTimeLeft = getLeftTimeToObj(atmCdTime-window.bkctime)


	let freeze = {

	}

	if (dtmCdTime > window.bkctime || atmCdTime > window.bkctime) { //是否存在冰冻状态  //攻击冻结，防御冻结

		if (dtmCdTime > atmCdTime){ //攻击时间和结束时间对比
			status.push({
				name: 'freeze',
				time: dtmTimeLeft.hours+':'+dtmTimeLeft.minutes
			})
			freeze.time = dtmTimeLeft.hours+':'+dtmTimeLeft.minutes
		} else {
			status.push({
				name: 'freeze',
				time: atmTimeLeft.hours+':'+atmTimeLeft.minutes
			})
			freeze.time = atmTimeLeft.hours+':'+atmTimeLeft.minutes
		}

	}


	let pttime = dragen['pt']*1000
	if (pttime > window.bkctime) { //是否存在保护
		let pttimeObj = getLeftTimeToObj(pttime-window.bkctime)
		buffs.push('shild')
		status.push({
			name: 'shild',
			time:pttimeObj.hours+':'+pttimeObj.minutes
		})
	}


	return {
		buffs,
		status,
		freeze
	}
}



export function processDragen(dragen, dragenId, from) {
	let property = getProByVp(dragen.vp1, dragen.vp2, dragen.wt, dragen)
	property.lucky = dragen.lk.toFixed(2)


	var needDragen = {
		id: dragenId,
		from: from,
		name: dragen.name,
		type: dragenVariety[dragen.rare.split('-')[0]],
		buffs: getStatus(dragen).buffs, //龙的buff
		status: getStatus(dragen).status,
		VG: dragen.wt.toFixed(2), //体重
		weight:dragen.wt,
		dragenImg: `https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dapp/monster/pic/${dragenId}-${property.grade}.png`,
		property: property,
		atk_cd_end:dragen.atk_cd_end*1000,//攻击cd
		dtm_cd_end:(dragen['dtm']+3600)*1000,//防守cd
		owner: dragen.ow,
		onsale: dragen.sl,
		born:dragen.tm,
		freeze:getStatus(dragen).freeze,
		price: ((dragen.fee)*Math.pow(10,-18)),
		grade: property.grade,
		inTeam:dragen.mtid,
		at:dragen.at,
		ag:dragen.ag,
		wt:dragen.wt,
	}

	return needDragen
}

export function processMultiDragen(data,type){
	var multiDragens = []
	

	for(let key in data){
		let powerTotal = 0;
		// if(idData[key].ow === window.userAddress){  //过滤已经死亡的龙
		// 	return
		// }
		let dragenArry = []
		let dragens = data[key].mlist
		let dragensLength = 0;
		for (let key_02 in dragens){
			dragensLength++
			let dragen = dragens[key_02]
			powerTotal += (dragen.at*3+dragen.ag*2)*Math.sqrt(dragen.wt)
			dragen = processDragen(dragen,key_02,'attack')
			dragenArry.push(dragen)
		}

		if(type === 'all'){
			multiDragens.push({
				id:key,
				power:powerTotal.toFixed(2),
				prestige:(data[key].fen).toFixed(2),
				dragens:dragenArry,
				fight:data[key].fight  ,
				jion:data[key].jion,
				from:'all'
			})
			console.log()
		}else if(type === 'me'){

			multiDragens.push({
				id:key,
				power:powerTotal.toFixed(2),
				prestige:(data[key].fen).toFixed(2),
				dragens:dragenArry,
				from:'me'
			})
		}
	
		
	}

	return multiDragens
}








export function showModal(config, callback) {


	$('#modal-title').html(config.title)
	$('#modal-content').html(config.htmlTemplate)

	$('#modal').modal('open');

	let chooseId = [];
	if (config.single) { //单选
		$('.modal-card').add('.modal-multi-dragen').off('click').on('click', function(e) {

			$('.modal-card').add('.Card-multi-dragen').each(function(i,v){
				$(this).removeClass('active')
			})
			chooseId[0] =$(this).data('id')
			$(this).toggleClass('active')
			console.log(chooseId)

		})
	} else { //多选
		$('.modal-card').add('.modal-multi-dragen').off('click').on('click', function(e) {
			let thisId = $(this).data('id')
		
			if(chooseId.includes(thisId)){
				chooseId.splice(chooseId.indexOf(thisId),1)
			}else{
				if(chooseId.length>=3){
					return
				}
				chooseId.push(thisId)
			}

			$(this).toggleClass('active')
			console.log(chooseId)
		})
	}


	

	$('#modal-sub').off('click').on('click', function(e) {
		e.preventDefault()
		e.stopPropagation()

		if(!chooseId.length){
			return
		}else if(chooseId.length===1){
			callback && callback(chooseId[0])
		}else{
			callback && callback(chooseId)
		}

		$('#modal').modal('close');
	})
}

export function alertMyDragens(id,dragens,multi,callback,infoConfig) { // //选择单条龙
		let htmlTemplateTit = `
				<div id="tit">
					${infoConfig.intro}
				</div>
		`;
		let htmlTemplateCont = ''
		dragens.forEach((dragen, i) => {
			if (dragen.id == id) {
				return
			}
			htmlTemplateCont += `			
				<div class="modal-card modal-content-sub modal-card_${dragen.id}" data-id="${dragen.id}">
					
					<div class="session_3">
						<span class="vg ">
							<span>${dragen.name}</span><br/>
							<span class="tag" style='background:url(${dragenTag[dragen.type]}) center/100% 100% no-repeat'>${dragen.type}</span><br/>
							<span>VP: ${dragen.VG}</span>
						</span>
						<ul class="properties" >
							<li>
								<span>
									<span class="key">lucky: </span>
									<span class="value">${dragen.property.lucky}</span>
								</span>
								<span>
									<span class="key">speed: </span>
									<span class="value">${dragen.property.speed}</span>
								</span>
							</li>
							<li>
								<span>
									<span class="key">power: </span>
									<span class="value">${dragen.property.power}</span>
								</span>
								<span>
									<span class="key">agility: </span>
									<span class="value">${dragen.property.agility}</span>
								</span>
							</li>
						</ul>
					</div>
					<div class="session_2">
						<img  class="dragen x-mid" src="${dragen.dragenImg}"/>
						<img alt="shield" class="shield x-mid" style=${dragen.buffs.includes('shield')?'display:block':'display:none'} src=${require('../assets/images/shield-light.png')}/>
						
					</div>
				</div>
			`
		})

		let config = {
			title: infoConfig.title,
			htmlTemplate: htmlTemplateTit + '<div id="cont" class="my-scroll">'+ htmlTemplateCont+'</div>',
			single: multi?false:true
		}

		if(callback){
			showModal(config, callback)
		}else {
			showModal(config, (chooseid) => {
				callArgs = new Array()
				callArgs[0] = chooseid;
				callArgs[1] = id;
				pay(contractAddress, 0, 'fight', callArgs, (resp) => {
					const location = {
						pathname: '/attacking',
						search: `?attackId=${chooseid}&defendId=${id}&txhash=${resp.txhash}`
					}
					history.push(location)
				})

			})
		}
		
}

export function alertMyMultiDragens(id,multiDragens,multi,callback,infoConfig){ //选择多条龙
	
		let htmlTemplateTit = `
				<div id="tit">
					${infoConfig.intro}
				</div>
		`;
		let htmlTemplateCont = ''

		multiDragens.forEach((multiDragen, i) => {
			if (multiDragens.id == id) { //用来过滤自己的龙队
				return
			}


			let dragenArr = ''
			multiDragen.dragens.forEach((dragen,d_i) =>{
				dragenArr +=`<div  style='margin-right:10px;background-color:rgba(0,0,0,0.1);padding:10px 10px 0 10px ;'>
									<img class="pic" style='width:180px' src='${dragen.dragenImg}'/>
									<div style='background:url(${require('../assets/images/type-multi.png')}) center/cover no-repeat;color:${tagColor[dragen.type]};text-align:center;font-size:16px;line-height:24px'>${dragen.type}</div>
								</div>`
			})



			htmlTemplateCont += `			
				<div class="Card-multi-dragen modal-multi-dragen" data-id="${multiDragen.id}">
					<div class="left">
						<div>
						   <img src='${require('../assets/images/mutil-power.png')}' />
						   <div>
						   		<div>${multiDragen.power}</div>
						   		<div>$team power</div>
						   </div>
						</div>
						<div>
						   <img src='${require('../assets/images/prestig.png')}'/>
						   <div>
						   		<div>${multiDragen.prestige}</div>
						   		<div>prestige</div>
						   </div>
						</div>
						<div>
						   <img src='${require('../assets/images/warn.png')}'/>
						   <div>
						   		<div>limitation</div>
						   		<div>common</div>
						   </div>
						</div>
					</div>
					<div class="mid">
						${dragenArr}
					</div>
				</div>
			`
		})


		let config = {
			title: infoConfig.title,
			htmlTemplate: htmlTemplateTit + '<div id="cont" class="my-scroll">'+ htmlTemplateCont+'</div>',
			single: multi?false:true
		}

		if(callback){
			showModal(config, callback)
		}else {
			showModal(config, (chooseid) => {
				callArgs = new Array()
				callArgs[0] = chooseid;
				callArgs[1] = id;
				pay(contractAddress, 0, 'fight', callArgs, (resp) => {
					const location = {
						pathname: '/attacking',
						search: `?attackId=${chooseid}&defendId=${id}&txhash=${resp.txhash}`
					}
					history.push(location)
				})

			})
		}
		
}














export function getMyDragens(callback){ //获取我的龙

	call(contractAddress, 0, 'me', callArgs, (resp) => {
		let result = JSON.parse(resp.result)
		//获取所有自己龙的列表
		callArgs = new Array()
		callArgs[0] = result

		call(contractAddress, 0, 'getUserMonster', callArgs, (resp) => {

			let result = JSON.parse(resp.result)

			var idData = result.data;

			var dragens = []
			for (let key in idData) {
				if (!idData[key].dp && !idData[key].sl ) { //过滤已经死亡的龙
					dragens.push(processDragen(idData[key], key, 'assets'))
				}
				
			}

			callback && callback(dragens)
		})
	})

}



export function noteSellDragen(id) {
	MessageBox.confirm('drop off?', 'tips', {
		type: 'warning'
	}).then(() => {
		callArgs = new Array()
		callArgs[0] = id
		pay(contractAddress, 0.1, 'notsale', callArgs, (resp) => {
			Message({
				type: 'success',
				message: 'success!'
			});
		})
	}).catch(() => {

	});
}

export function sellDragen(id) {
	MessageBox.prompt('set price', 'tips', {
	    inputPattern: /^\d+(\.\d+)?$/,
	    inputErrorMessage: 'invalid value'
	}).then(({ value }) => {
		callArgs = new Array()
		callArgs[0] = id
		callArgs[1] = value;
		callArgs[2] = 1000*60*60*24*365;
		pay(contractAddress, 0.1, 'sale',callArgs, (resp)=>{
			// window.location.reload()
		})
	}).catch(() => {
	    
	});
}

export function buyDragen(id,value) {
	
	callArgs = new Array()
	callArgs[0] = id
	pay(contractAddress, value,'tradeMonster',callArgs, (resp)=>{
		// window.location.reload()
	})
	
}


export function addLoading(){
	$('#main').append(` <div class="preloader-wrapper small active" id="loading-my" style='top:500px;position:absolute;left:50%;'>
      <div class="spinner-layer spinner-green-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>`)
}
export function rmLoading(){
	$('#loading-my').remove()
}