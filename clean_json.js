import {appendFile} from 'node:fs';
import data from './data/data.json' assert { type: "json" };
import data2 from './data/d2.json' assert { type: "json" };
import data3 from './data/d3.json' assert { type: "json" };

const Clean=()=>{
    console.log("Starting Veela training....")
    let all=data.all;
    const diz=[]
    console.log("The data length is "+all.length+" Type "+typeof(all))

    //get all list of diz
    const Get=(d)=>{
        d.forEach((x)=>{
            let sym=Object.keys(x);
            sym.forEach((y)=>{
            if(y==="Disease" || y==="Source" || y==="disease"){
                diz.push(x[y])
                console.log("Getting diseases....")
            }
            })
        })
        console.log("Getting done")
    }

    Get(data.all)
    Get(data2)
    Get(data3)

    console.log("Before "+diz.length)
    //remove duplicate diz
    const u_diz=[... new Set(diz)]
    console.log("After "+u_diz.length)

    let f_data=[]

    u_diz.forEach((x)=>{
        f_data.push({"disease":x,"sym":[]})
    })
    console.log("Done adding diseases....")

    console.log("Starting putting syms....")
    const GetSym=(k)=>{
        k.forEach((x)=>{
            let sym=Object.keys(x);
            sym.forEach((y)=>{
                f_data.forEach((z)=>{
                    if(z.disease===x["Disease"] || z.disease===x["disease"] || z.disease===x["Source"]){
                        if(y==="symptom" || y==="Target" || y.search("Symptom")!=-1){
                            z.sym.push(x[y])
                        }
                    }
                })
            })
        })
        console.log("Putting each sym on it's disease....")
    }
    GetSym(data.all)
    GetSym(data2)
    GetSym(data3)
    console.log(f_data.length)
    
    console.log("Starting duplicates....")
    f_data.forEach((x)=>{
        x.sym=[... new Set(x.sym)];
    })
    console.log("Done removing duplicates....")

    console.log(f_data[0])
    console.log("Starting writing to a file....")
    f_data.forEach((x)=>{
        appendFile('final.json','{"dis":"'+x.disease+'","sym":"'+x.sym.toString()+'"},\n',e=>console.log(e))
    })
    console.log("Done writing to file....")

}
Clean()

