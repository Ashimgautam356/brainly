
// Hash function generator for the link
export const random =  (n:number):string=>{
    const options:string = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let randomString =""
    for(let i= 0; i<n; i++){
        randomString += options[Math.floor(Math.random()*options.length)]
    }
    return randomString
}