const getCSRFToken = ()=>{
    const cookies = document.cookie
    const regex = /csrf_access_token=([\w-][\w-]*)/gi
    const res = regex.exec(cookies)
	return res?res[1]:null;
}

export {getCSRFToken}