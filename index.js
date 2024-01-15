import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import data from './data/data.json' assert { type: "json" };

const app=express();

app.use(cors());
app.use(bodyParser.json());


async function start(){
  app.listen(3005,()=>console.log("Listening on 3001"));
}
start()

//testing pinging server
app.get('/',(req,res)=>{res.send("<b>Hello there, i'm Dr Veela</b>")})

//handle detecting the disease using the training data
app.post('/predict',function(req,res){
  let value=req.body.name;value=value.replace(/(\n|\s|and|or|\d)/g,",");
  value=value.replace(/[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/g,",")
  value=value.split(',');value=value.filter(x=>x!==' '&&x!=='');let results=[];
  data.all.forEach((x)=>{
    let rate=0;
    value.forEach((v)=>{
      const re=RegExp(v,'i');const final=x.sym.replace(/_/g," ");
      if(final.match(re)){rate=rate+1}
    })
    results.push({d:x.dis,prate:rate});
  })
  results=results.filter(a=>a.prate>0);
  results.sort((a,b)=>parseInt(b.prate)-parseInt(a.prate));
  let finalr=results[0]?.d||"No match found";
  res.send({d:finalr});
})

