export function setCurNavStyle(pathName){

	['nav-market','nav-my-assets','nav-attack','nav-hatch','nav-top','nav-warn','nav-tree'].forEach((v,i) =>{
			console.log(v)
			let el = document.getElementById(v)
			if(el){
				el.className = el.className.replace('active','')
			}
			
		}
	)
	console.log(pathName)
	if(document.getElementById('nav-'+pathName)){
		document.getElementById('nav-'+pathName).className += ' active'
	}
	
}
