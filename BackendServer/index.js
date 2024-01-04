const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');

const db=mysql.createPool(
    {
        host:"localhost",
        user:"root",
        password:"pavan123",
        database:"crud_contact"
    }
)

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/get/api',(req,res)=>{
    const sqlquery="select * from contact_db";
    db.query(sqlquery,(err,result)=>{
        res.send(result);
    })
})
app.post("/api/post",(req,res)=>{
    const{name,email,contact}=req.body;
    const sqlquery="insert into contact_db(name,email,contact) values(?,?,?)";
    db.query(sqlquery,[name,email,contact],(error,result)=>{
        if(error)
        {
            console.log(error);
        }
    })
})

app.delete("/api/remove/:id",(req,res)=>{
    const{id}=req.params;
    const sqlquery="delete from contact_db where id=?";
    db.query(sqlquery,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})

app.get("/get/api/:id",(req,res)=>{
    const{id}=req.params;
    const sqlquery="select * from contact_db where id=?";
    db.query(sqlquery,id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});
app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const{name,email,contact}=req.body;
    const sqlquery="update contact_db set name=?,email=?,contact=? where id=?";
    db.query(sqlquery,[name,email,contact,id],(error,result)=>{
        if(error)
        {
            console.log(error);
        }
        res.send(result)
    })
})
app.get('/',(req,res)=>{
    // const sqlquery="insert into contact_db(name,email,contact) values('pavan','pavan@gmail.com',394876212)";
    // db.query(sqlquery,(err,result)=>{
    //     console.log("error is ",err);
    //     console.log("result is ",result);
    //      res.send("hello express");
    // })
   
})

app.listen(5000,()=>{
    console.log("server is running on 5000 PORT");
})