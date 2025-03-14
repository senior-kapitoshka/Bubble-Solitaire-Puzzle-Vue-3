
 export function load(mode){
    let gameSockets,
        matrixField;

    if(mode==="English Mode"){
        gameSockets=[...Array(67).keys()].filter((x)=>
                        (Math.floor(x/10)===2 ||
                        Math.floor(x/10)===3 ||
                        Math.floor(x/10)===4 ||
                        x%10===2 ||
                        x%10===3 ||
                        x%10===4) && x!==33     
                        );
        matrixField=Array(7).fill().map(()=>Array(7).fill());

        for(let i=0;i<7;++i){
            for(let j=0;j<7;++j){
                if(gameSockets.indexOf((i)*10+j)>-1){
                            matrixField[i][j]=1;
                }else if(i===3 && j===3){
                    matrixField[i][j]=0;
                }else{
                    matrixField[i][j]=8; 
                }
            }
        }    
    }else{
        gameSockets=[...Array(67).keys()].filter((x)=>

                                        (x===11 || x===15 ||
                                        x===51 || x===55 ||
                                        Math.floor(x/10)===2 ||
                                        Math.floor(x/10)===3 ||
                                        Math.floor(x/10)===4 ||
                                        x%10===2 ||
                                        x%10===3 ||
                                        x%10===4 ) && x!==33      
                                        );
        matrixField=Array(7).fill().map(()=>Array(7).fill());
        for(let i=0;i<7;++i){
            for(let j=0;j<7;++j){
                if(gameSockets.indexOf((i)*10+j)>-1){
                        matrixField[i][j]=1;
                }else if(i===3 && j===3){
                        matrixField[i][j]=0;
                }else{
                        matrixField[i][j]=8; 
                }
            }
        }

    }
    return [gameSockets, matrixField];
}

