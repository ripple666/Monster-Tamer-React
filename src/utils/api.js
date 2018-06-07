export function setCurNavStyle(pathName){
	['market','my-assets','attack','hatch','top','warn','tree'].forEach((v,i) =>{
			let el = document.getElementById(v)
			el.className = el.className.replace('active','')
		}
	)

	pathName = pathName.split('/')[1]

	pathName = pathName ? pathName :'market'

	document.getElementById(pathName).className += ' active'
}
