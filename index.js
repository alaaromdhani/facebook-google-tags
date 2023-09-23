(async function wow(){
    console.log('executing the route')
    await guardRoute()

})()
async function getProfile(){
    return fetch('https://faroukallani.me/front/api/v1/profile',{
        method:'GET',
        credentials:'include'
    })
}
async function login(credentials){
    return fetch('https://faroukallani.me/auth/local/login',{
        method:'POST',
        credentials:"include",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(credentials)
        
       
    
    },)
}
function changeLocation(loc){

    return (document.location.href === 'http://127.0.0.1:5500/articuate/'+loc+'.html')?'':document.location.href = 'http://127.0.0.1:5500/articuate/'+loc+'.html'
}
async function guardRoute(){
    try{
        let result  = await getProfile()
        if(result.status<300){
            changeLocation('courses')
        }
        
        
        
    }
    catch(e){
        console.log(e) 
   }

}

document.querySelector('#login').addEventListener('click',async e=>{
    try{
        const identifier = document.querySelector('#identifier').value
        const password = document.querySelector('#password').value
        
        let res = await login({identifier,password})
        if(res.status<300){
            alert('nice creadentials')
        }
        else{
            alert('bad credentials')
        }
    }catch(e){
        console.log('login failed',e)
    }



})