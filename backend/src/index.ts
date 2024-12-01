import express from 'express'

const app = express(); 



app.post('api/v1/signup',async(req,res)=>{

})
app.post('api/v1/signin',async(req,res)=>{

})
app.get('api/v1/content',async(req,res)=>{

})
app.delete('api/v1/content',async(req,res)=>{

})
app.post('api/v1/brain/share',async(req,res)=>{

})
app.get('api/v1/brain/:shareLink',async(req,res)=>{

})
app.post('api/v1/signup',async(req,res)=>{

})


app.listen(3001,()=>{
    console.log("server is up!!!!!")
})