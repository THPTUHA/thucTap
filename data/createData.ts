import fs from "fs";
const videoName = [];

for(let i = 10; i< 36;i++){
    videoName.push(i.toString(36).toUpperCase());
}

const videos = [];
let content = "";

for(let i = 0 ; i < videoName.length ; ++i){
    // videos.push({
    //     id: i+1,
    //     name: videoName[i]
    // })
    content = (i+1)+ "#@#"+ videoName[i];
}

 const writeFile = async() => {
    await fs.writeFile('videos.txt',content,(err:any) =>{

    })
}

writeFile();


