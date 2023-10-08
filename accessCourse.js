

let othersBaseLink = ''
const teacherAccessCourses=async (courseId,perchaseId,type)=>{
   let courseUri =`http://localhost:1337/front/teacher/api/v1/interactive/${perchaseId}/${courseId}`
    if(type && type==='exams'){
        courseUri=`http://localhost:1337/front/api/v1/teacher/exams/interactive/${perchaseId}/${courseId}`
    }
   return fetch(courseUri,{
    method:'GET',
    credentials:'include'
}).then(async result=>{
    if(result>300){
        return Promise.reject(new Error('this is all a dream'))
    }
    else{
        let {endpoint} =(await result.json()).data
            return fetch(`http://localhost:1337/front/api/v1/teacher/interactive/utils`,{
                method:'GET',
                credentials:'include'
            }).then(async res=>{
                if(res.status<300){
                    let {agent,lrsendpoint} =  (await res.json()).data
                   

                    document.querySelector('body').innerHTML = ''
                    let iframe = document.createElement('iframe')
                    iframe.setAttribute('src',`${endpoint}?actor=${agent}&endpoint=${lrsendpoint}`)
                    iframe.style.width='100%'
                    iframe.style.height='100%'
                    document.querySelector('body').appendChild(iframe)
                    iframe.onload = function(e){
                        console.log('iframe loaded')
                        let data = {
                            username:'ala romdhani',
                            sex:'m'
                        }
                        iframe.contentWindow.postMessage(data,'*');

                    }
                }
                else{
                    console.log('error accured')
                }
            })
    }
})    


}
const getSoftSkills = async (courseId)=>{
    return fetch(`http://localhost:1337/front/student/api/v1/softskills/interactive/${courseId}`,{
        method:'GET',
        credentials:'include'
    }).then(async result=>{
        if(result>300){
            return Promise.reject(new Error('this is all a dream'))
        }
        else{
            let {endpoint} =(await result.json()).data
            document.querySelector('body').innerHTML = ''
            let iframe = document.createElement('iframe')
            iframe.setAttribute('src',`${endpoint}`)
            iframe.style.width='100%'
            iframe.style.height='100%'
            document.querySelector('body').appendChild(iframe)
            iframe.onload = function(e){
                console.log('iframe loaded')
                let data = {
                    username:'ala romdhani',
                    sex:'m'
                }
                iframe.contentWindow.postMessage(data,'*');

            }
        }
    })
}
const getOthersUtils = async (courseId)=>{
    return fetch(`http://localhost:1337/front/student/api/v1/ctypes/others/interactive/${courseId}`,{
        method:'GET',
        credentials:'include'
    }).then(async result=>{
        if(result>300){
            return Promise.reject(new Error('this is all a dream'))
        }
        else{
            let {endpoint} =(await result.json()).data
            return fetch(`http://localhost:1337/front/api/v1/student/interactive/utils?type=others`,{
                method:'GET',
                credentials:'include'
            }).then(async res=>{
                if(res.status<300){
                    let {agent,lrsendpoint} =  (await res.json()).data
                    document.querySelector('body').innerHTML = ''
                    let iframe = document.createElement('iframe')
                    iframe.setAttribute('src',`${endpoint}?actor=${agent}&endpoint=${lrsendpoint}`)
                    iframe.style.width='100%'
                    iframe.style.height='100%'
                    document.querySelector('body').appendChild(iframe)
                    iframe.onload = function(e){
                        console.log('iframe loaded')
                        let data = {
                            username:'ala romdhani',
                            sex:'m'
                        }
                        iframe.contentWindow.postMessage(data,'*');

                    }
                }
                else{
                    console.log('error accured')
                }
            })      
        }
    })
};
const getcourseUtils = async (courseId)=>{
    return fetch(`http://localhost:1337/front/student/api/v1/interactive/${courseId}`,{
        method:'GET',
        credentials:'include'
    }).then(async result=>{
        if(result>300){
            return Promise.reject(new Error('this is all a dream'))
        }
        else{
            let {endpoint} =(await result.json()).data
            return fetch(`http://localhost:1337/front/api/v1/student/interactive/utils`,{
                method:'GET',
                credentials:'include'
            }).then(async res=>{
                if(res.status<300){
                    let {agent,lrsendpoint} =  (await res.json()).data
                    console.log("endpoint ",endpoint)
                    console.log("agent ",agent)
                    console.log("lrsEndpoint ",lrsendpoint)

                    document.querySelector('body').innerHTML = ''
                    let iframe = document.createElement('iframe')
                    iframe.setAttribute('src',`${endpoint}?actor=${agent}&endpoint=${lrsendpoint}`)
                    iframe.style.width='100%'
                    iframe.style.height='100%'
                    document.querySelector('body').appendChild(iframe)
                    iframe.onload = function(e){
                        console.log('iframe loaded')
                        let data = {
                            username:'ala romdhani',
                            sex:'m'
                        }
                        iframe.contentWindow.postMessage(data,'*');

                    }
                }
                else{
                    console.log('error accured')
                }
            })      
        }
    })
};
(async function (){
    window.addEventListener('message',(e)=>{
        if(e.data==='window:closing'){
          console.log('the window is closing right now')
            history.back()        
        }

    },false)
    const urlParams = new URLSearchParams(window.location.search);
    try{
        const myParam = urlParams.get('courseId') || (()=>{ throw new Error('courseId is messing')})();
        let type = urlParams.get('type') || 'course';
        let userType=urlParams.get('userType') || 'teacher'
        let purchaseId=urlParams.get('purchaseId') || (userType==='teacher'?(()=>{ console.log(urlParams.get('purchaseId'));throw new Error('purchaseId is messing')})():undefined)
        if(userType==='teacher'){
            console.log(type) 
           if(type==='exams'){
            await teacherAccessCourses(myParam,purchaseId,'exams')
            }
            else{
                await teacherAccessCourses(myParam,purchaseId)
           }
        }
        else{
            if(type==='softskills'){
                await getSoftSkills(myParam)
            }
            if(type==='others'){
                await getOthersUtils(myParam)
            }
            if(type==='course'){
                await getcourseUtils(myParam)
            }
            
        }
    }catch(e){
        console.log(e)
    }
    



})()

