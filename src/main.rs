
use serde_json::json;

fn drveela(data:&String)->String{
    let drdata=match std::fs::read_to_string("./src/data/data.json"){Ok(file)=>{file},Err(_)=>"None".to_string()};
    let drdata=match serde_json::from_str(&drdata) {Ok(drjson)=>{drjson},Err(_)=>{serde_json::json!({"sym":"None","dis":"None"})}};
    
    //clean my data
    let junk = regex::Regex::new(r"\n|\s|and|or|\d|,|[`!@#$%^&*()_+\-=\[\]{};':\\|.<>\/?~]").unwrap();
    let mydata=junk.replace_all(data.as_str(), ",").to_string();
    //println!("The response is {:?}",mydata);

    let mydata:Vec<&str>=mydata.split(',').filter(|x|x!=&"").collect();

    let mut results:Vec<serde_json::Value>=Vec::new();

    for d in drdata["all"].as_array().unwrap(){
        let mut rate=0;
        for data in &mydata{
            let v=d["sym"].as_str().unwrap().to_string().to_lowercase();
            if v.find(data.to_lowercase().as_str())!=None{rate=rate+1}
        }
        results.push(json!({"name":d["dis"],"rate":rate}))
    }
    let mut results:Vec<serde_json::Value>=results.into_iter().filter(|x|x["rate"].as_i64().unwrap()>0).collect();
    results.sort_by_key(|f|f["rate"].as_i64());

    let final_result=match results.last(){Some(value)=>{value["name"].to_string()},None=>{"No match found".to_string()}};

    final_result

}
fn main() {
    let umsg: String="headache and sleeping".to_string();
    let res=drveela(&umsg);
    println!("The response is {:?}",res);

}
