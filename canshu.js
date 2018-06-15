//ra: rarity        
//wt: weight
//at: ATK, POWER    at1, at2     ｗｔ<vp1：　ａｔ１　　vp1～vp2：at2，　　＞vp2　ａｔ２ 
//ag: AGI                  ag1, ag2
//sp: speed               sp1, sp2
// lk: 幸运
//lk_s: 单次战斗的幸运加成

//at_ex: 额外加的攻击
//at_end： 过期时间 

//ag_ex: 额外加的敏捷
//ag_end:过期时间        

//sp_ex： 额外加的速度
//sp_end： 过期时间
// pt 保护罩到期时间； 保护罩期间不能攻击，不能被攻击
//born: birthday
//name : name    自带的名字
// nick: 玩家定义的名字
// rk:  rank range


// ow: owner
// sl: sale  是否出售
//  sl_end:
// fee: 售价
// ft: fight  是否战斗
// fc: fight; ？？
// ht: height

// atm: last attack time
// dtm: last defence time

// dp: 删除阶段; 0/1  1的话表示被吃了





setRate: function(value)               设置交易付费给卖方的比率， <1
getUserIntegral: function(address) 获取用户的积分
addUserIntegral: function(address, fen) 给用户增加积分， 管理员权限；
setCdMap: function(id, value, cnt) 设置CD的图谱
addSC: function(sc) 增加道具
setSC: function(id, sc) 设置道具
buySC: function(id) 买道具， id: 道具ID
buySCMulty: function(id_list) 批量购买道具： id_list: 道具ID列表
getUserSC: function(from) 获取用户的道具信息；
useSC: function(scid, mid) 使用道具， scid: 道具在用户包裹中的编号， mid: 宠物编号
getSC: function() 获取道具列表信息
setRange: function(range_name, range) 设置抽卡的概率列表；
getLog: function(start, num) 获取日志, start: 日志开始的ID， num: 日志的条数
getMonsterFightLog: function(id) 获取宠物的战斗日志， id: 宠物的ID
getTeamFightLog: function(start, num) 获取3v3队伍的战斗日志: start: 日志开始的ID， num: 日志的条数
getFightLog: function(start, num) 获取1V1战斗日志， start: 日志开始的ID， num: 日志的条数
getFightLogList: function(id_list) 获取指定日志列表的战斗详细信息， id_list: 日志的ID列表
randomSw: function() 设置随机数函数的选择开关， 0： 代表用默认随机函数， 非0用自己的随机函数， 管理员权限；
fight: function(atk_id, dfd_id) 1 V1 战斗， atk_id： 攻击方宠物ID, dfd_id： 防守方宠物ID
ar: function(mid) 获取宠物的模拟攻击数据， mid: 宠物ID
dr: function(mid) 获取宠物的模拟防守数据， mid: 宠物ID
fr: function(a_mid, d_mid) 模拟宠物的战斗： a_mid: 攻击宠物的MID, d_mid： 防守宠物的MID
getEgg: function(id) 获取宠物蛋的信息：
addEgg: function(egginfo) 增加宠物蛋
setEgg: function(id, egginfo) 修改制定ID的宠物蛋信息
setEggCnt: function(cnt) 设置宠物蛋的数量
bp: function() 买1个宠物
bf: function() 获取1个免费宠物
bornFen: function() 积分换宠物
bornFenM: function() 积分批量换宠物
bm: function() 一下买十个宠物
me: function() 我的地址
getM: function(start, num) 按照ID序列获取宠物的信息， start: 宠物的开始ID， num: 宠物的个数
getM2: function(start, num, key_array) 按照ID序列获取宠物指定的KEY列表信息， start: 宠物的开始ID， num: 宠物的个数， key_array： key的列表
getMBI: function(id) 根据宠物的ID获取信息
getML: function(id_list) 根据宠物的ID列表获取宠物的信息 id_list： 宠物的ID列表
getML2: function(id_list, key_array) 根据宠物的ID列表获取宠物的指定KEY的信息 id_list： 宠物的ID列表
getUser: function(address) 获取用户的宠物的列表信息
getUserMonster: function(address) 获取用户的宠物的详细信息
getUserMonster2: function(address, arr) 获取用户的宠物的指定KEY的详细信息
sale: function(id, value, sec) 设置宠物可以卖， id： 宠物的ID， value： nas价格， sec： 卖多长时间， 单位秒
notsale: function(id) 设置宠物不可以卖
tradeMonster: function(id) 购买宠物,
    feedMulty: function(stay, list) 把list列表中的宠物喂给stay， 喂了后list列表中的宠物会不见
feed: function(stay, bye) 把bye宠物喂给stay宠物， 喂了后， bye宠物会不见
bkctime: function() 当前区块链的时间
getUserTeam: function(address) 获取用户的战队列表
getTeamM: function(start, num) 获取战队信息， start: 战队的开始ID， num: 战队的个数；
getTBI: function(tid) 根据战队ID获取战队信息；
getMonsterTeam: function(mid) 获取宠物的战队ID
createTeam: function(mid, name, min) 创建战队， mid： 创建的宠物的ID name： 战队名称, min： 加入战队的最低属性
jtm: function(mid_list, tid)
joinTeam: function(mid, tid) 加入战队 mid： 宠物的ID， tid: 战队ID
exitTeam: function(mid, tid) 退出战队； mid： 宠物的ID， tid: 战队ID
fightTeam: function(atk_tid, dfd_tid) 战队对战： atk_tid： 攻击战队的ID， dfd_tid： 防守战队的ID


 
  [atk_id,atker['at'],atker['ag'],atker['lk'],atker['sp'],a['wt']]
  [dfd_id,dfder['at'],dfder['ag'],dfder['lk'],dfder['sp'],d['wt']]
  [this._getTimeBySec(),result['rand'], this._toDecimal3(result['extf']), result['win'], this._toDecimal3(atker['wt'] - a['wt'])]