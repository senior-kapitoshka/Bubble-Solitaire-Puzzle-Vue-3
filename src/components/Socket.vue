<script setup>
import { ref } from 'vue'
import { inject } from 'vue'

const props=defineProps({
        id:Number,
        p:{type:Array},
        field:{type:Array},
        game:{type:Array}
        })

const gameOverFlag = inject('gameOverFlag');
const winOrLose = inject('winOrLose');


const getSocketId = (index) =>{
    return props.p.filter((peg)=> peg.socketId == index)
  };

const startDrag=(event, peg)=>{
    
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemID',peg.socketId);
  
};

const onDrop=(event,socketId)=>{
      const pegID= event.dataTransfer.getData('itemID');
      const peg=props.p.find((peg)=> peg.socketId == pegID);
      
      let flagX=
              (
                Math.abs(Math.floor(socketId/10)-Math.floor(peg.socketId/10))===2 
                          && socketId%10===peg.socketId%10
              ),
          flagY=
              (
                Math.abs(socketId%10-peg.socketId%10)===2 &&
                          Math.floor(socketId/10)===Math.floor(peg.socketId/10)
              );

      if(props.field[Math.floor(socketId/10)][socketId%10]===0
                 && (flagX || flagY)
        ){

        let freeSocket=peg.socketId;
        
        peg.socketId = socketId;
        

        let occupeSocket=socketId;

        let neighb ;

        if(flagX){
          if(occupeSocket>freeSocket){
              neighb=occupeSocket-10;
          }else{
              neighb=occupeSocket+10;
          }
        }else{
          if(occupeSocket>freeSocket){
              neighb=occupeSocket-1;
          }else{
              neighb=occupeSocket+1;
          }
        }

        let pegToRemove=props.p.find((peg)=> peg.socketId == neighb);
        pegToRemove.socketId = -1;

        props.field[Math.floor(occupeSocket/10)][occupeSocket%10]=1;
        props.field[Math.floor(freeSocket/10)][freeSocket%10]=0;
        props.field[Math.floor(neighb/10)][neighb%10]=0;


        // GAME OVER CHECK--------------------------------------
        let check=false;
        let cnt=0;
        for(let i=0;i<7;++i){
          for(let j=0;j<7;++j){
            if(props.field[i][j]===1){
              ++cnt;
              if(
                (i===0 || i===6) 
              &&  ((props.field[i][j-1]===1 && props.field[i][j+1]===0) ||
              (props.field[i][j-1]===0 && props.field[i][j+1]===1))
              ){
                  check=true;
                  break;
              }else if(
                (j===0 || j===6) 
              &&  ((props.field[i-1][j]===1 && props.field[i+1][j]===0) ||
              (props.field[i-1][j]===0 && props.field[i+1][j]===1))
              ){
                  check=true;
                  break;
              }else if( 
                j-1>=0 && j+1<7 && i-1>=0 && i+1<7 &&
                ((props.field[i][j-1]===1 && props.field[i][j+1]===0) || 
                (props.field[i-1][j]===1 && props.field[i+1][j]===0) || 
                (props.field[i][j-1]===0 && props.field[i][j+1]===1) || 
                (props.field[i-1][j]===0 && props.field[i+1][j]===1))  
                ) {
                  check=true;
                  break;
                  }
            }
          }
        }
        if(!check){
           gameOverFlag.value=true;
           if(cnt===1) winOrLose=true;
        }
        //--------------------------------------------------
    }
};

</script>

<template>

<div class="socketDropZone" 
    v-if="(props.game.indexOf(id)>-1 || id===33) "
    :key="id" 
    @drop="onDrop($event,id)"
    @dragenter.prevent
    @dragover.prevent
    
  > 
  
        <div v-for="peg in getSocketId(id)"
            :key="peg.socketId"
            draggable=true
            class="peg bubble"
            @dragstart="startDrag($event,peg)"
                >
        </div>
  </div>
    <div class="blackDropZone" 
      v-else
    > 
    </div>
</template>


<style scoped>
@import './pegBubble.css';

.socketDropZone{
  border-radius: 50%;
  width:7vw;
  height:7vw;


  margin: 0.05vw;
  -webkit-perspective: 6vw;
  -moz-perspective: 6vw;
  -ms-perspective: 6vw;
  -o-perspective: 6vw;
  perspective: 6vw;
  -webkit-perspective-origin: 3vw 3vw;
  -moz-perspective-origin: 3vw 3vw;
  -ms-perspective-origin: 3vw 3vw;
  -o-perspective-origin: 3vw 3vw;
  perspective-origin: 3vw 3vw;

}


.blackDropZone{
  border:0.2vw solid rgb(206, 202, 202);
  border-radius: 42%;
  width:7vw;
  height:7vw;
}




</style>