let baseUrl=''
document.querySelector('#login').addEventListener('click',async e=>{
    e.preventDefault()
    const identifier = document.querySelector('#identifier').value
    const password = document.querySelector('#password').value
    let credentials = {identifier,password}
    const urlParams = new URLSearchParams(window.location.search);
    let loginUrl = (urlParams.get('userType') &&(urlParams.get('userType')==='teacher'))?'http://localhost:1337/auth/local/login':'http://localhost:1337/auth/local/student' 
   return  await fetch(loginUrl,{
        method:'POST',
        credentials:"include",
        headers:new Headers({'content-type': 'application/json'}),
        body:JSON.stringify(credentials)
    }).then(result=>{
        if(result.status>=200 && result.status<300 ){
            alert('nice credentials')
        }
        else{
            alert('bad credentials')
        }
    })

})
