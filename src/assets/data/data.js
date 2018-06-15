


//龙的品种分类
export let dragenVariety = {
	'1':'common',
	'2':'elite',
	'3':'rare',
	'4':'epic',
	'5':'legendary'
}

//龙的品种对应的带石头的tag标签
export let stone = { //石头图片
	'common' : require('../images/common.png'),
	'elite' : require('../images/elite.png'),
	'epic' : require('../images/epic.png'),
	'rare' : require('../images/rare.png'),
	'legendary' : require('../images/tegendary.png')
}

//龙的品种对应的tag标签
export let dragenTag = {  //龙标签背景色
	'common' : require('../images/dragen-tag_4.png'),
	'elite' : require('../images/dragen-tag_5.png'),
	'epic' : require('../images/dragen-tag_3.png'),
	'rare' : require('../images/dragen-tag_2.png'),
	'legendary' : require('../images/dragen-tag_1.png'),
}
export let tagColor = {  //龙标签背景色
	'common' :'#fff',
	'elite' : '#45b65d',
	'epic' : '#c272ff',
	'rare' : '#3dbdac',
	'legendary' :'#fc9e4a',
}


 //buff图标
export let buffImgs = {
	'shield' : require('../images/status/shield.png'),
	'strong' : require('../images/status/strong.png'),
	'freeze' : require('../images/status/freeze.png')
}
 //buff字体颜色
export let buffcolor = {
	'freeze' : '#0cd8f7',
	'shield' : '#00ff61',
	'strong' : '#ffc604'
}


//所有药物
export let medicines =  [
			//红色药剂
			{
				id:'2',
				img:require('../images/medicine/big-power-booster.png'),
				name:'Big Power Booster',
				power:'15',
				time:'48hour',
				effect:'Power Boost',
				price:'0.03'
			},
			{
				id:'1',
				img:require('../images/medicine/medium-power-booster.png'),
				name:'Medium Power Booster',
				power:'10',
				time:'36hour',
				effect:'Power Boost',
				price:'0.02'
			},
			{
				id:'0',
				img:require('../images/medicine/small-power-booster.png'),
				name:'Small Power Booster',
				power:'5',
				time:'24hour',
				effect:'Power Boost',
				price:'0.01'
			},
			//绿色药剂
			{
				id:'5',
				img:require('../images/medicine/Big-Agility-Booster.png'),
				name:'Big Agility Booster',
				power:'15',
				time:'48hour',
				effect:'Agility Boost',
				price:'0.03'
			},
			{
				id:'4',
				img:require('../images/medicine/Medium-Agility-Booster.png'),
				name:'Medium Agility Booster',
				power:'10',
				time:'36hour',
				effect:'Agility Boost',
				price:'0.02'
			},
			{
				id:'3',
				img:require('../images/medicine/Small-Agility-Booster.png'),
				name:'Small Agility Booster',
				power:'5',
				time:'24hour',
				effect:'Agility Boost',
				price:'0.01'
			},
			{
				id:'8',
				img:require('../images/medicine/Big Speed Booster.png'),
				name:'Big Speed Booster',
				power:'15',
				time:'48hour',
				effect:'Speed Boost',
				price:'0.03'
			},
			{
				id:'7',
				img:require('../images/medicine/Medium Speed Booster.png'),
				name:'Medium Speed Booster',
				power:'10',
				time:'36hour',
				effect:'Speed Boost',
				price:'0.02'
			},
			{
				id:'6',
				img:require('../images/medicine/Medium Speed Booster.png'),
				name:'Small Speed Booster',
				power:'5',
				time:'24hour',
				effect:'Speed Boost',
				price:'0.01'
			}
			//
]


export let medicinesObj =  {
			//红色药剂
			'2':{				
									id:'2',
									img:require('../images/medicine/big-power-booster.png'),
									name:'Big Power Booster',
									power:'15',
									time:'48hour',
									effect:'Power Boost',
									price:'0.03'
								},
			'1':{
									id:'1',
									img:require('../images/medicine/medium-power-booster.png'),
									name:'Medium Power Booster',
									power:'10',
									time:'36hour',
									effect:'Power Boost',
									price:'0.02'
								},
			'0':{
									id:'0',
									img:require('../images/medicine/small-power-booster.png'),
									name:'Small Power Booster',
									power:'5',
									time:'24hour',
									effect:'Power Boost',
									price:'0.01'
								},
			//绿色药剂
			'5':{
									id:'5',
									img:require('../images/medicine/Big-Agility-Booster.png'),
									name:'Big Agility Booster',
									power:'15',
									time:'48hour',
									effect:'Power Boost',
									price:'0.03'
								},
			'4':{
									id:'4',
									img:require('../images/medicine/Medium-Agility-Booster.png'),
									name:'Medium Agility Booster',
									power:'10',
									time:'36hour',
									effect:'Power Boost',
									price:'0.02'
								},
			'3':{
									id:'3',
									img:require('../images/medicine/Small-Agility-Booster.png'),
									name:'Small Agility Booster',
									power:'5',
									time:'24hour',
									effect:'Power Boost',
									price:'0.01'
								},
			//速度药剂
			'8':{
									id:'8',
									img:require('../images/medicine/Big Speed Booster.png'),
									name:'Big Power Booster',
									power:'15',
									time:'48hour',
									effect:'Speed Boost',
									price:'0.03'
								},
			'7':{
									id:'7',
									img:require('../images/medicine/Medium Speed Booster.png'),
									name:'Medium Speed Booster',
									power:'10',
									time:'36hour',
									effect:'Speed Boost',
									price:'0.02'
								},
			'6':{
									id:'6',
									img:require('../images/medicine/Medium Speed Booster.png'),
									name:'Small Speed Booster',
									power:'5',
									time:'24hour',
									effect:'Speed Boost',
									price:'0.01'
								},


}
