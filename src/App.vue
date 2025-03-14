<script setup>
import Socket from './components/Socket.vue'
import * as loadMX from './assets/js/loadMX.js'
import { ref } from 'vue'
import { reactive } from "vue";
import { provide } from 'vue'

const selectMode= ref("English Mode");
const startFlag= ref(true);
const gameOverFlag = ref(false);
const winOrLose = ref(false);
provide('gameOverFlag', gameOverFlag);
provide('winOrLose', winOrLose);

let gameSockets, matrixField, pegs;

const start=()=>{
      startFlag.value=!startFlag.value;
      if(gameOverFlag.value){
            gameOverFlag.value=!gameOverFlag.value;
      }
      if(winOrLose.value){
            winOrLose.value=!winOrLose.value;
      }
      [gameSockets, matrixField]=loadMX.load(selectMode.value);
      if(selectMode.value==='English Mode'){
            pegs=reactive(
            [...Array(42).keys()]
            .map((i)=>({title:`peg ${i}`,socketId:gameSockets[i]}))  
            );
      }else{
            pegs=reactive(
            [...Array(46).keys()]
            .map((i)=>({title:`peg ${i}`,socketId:gameSockets[i]}))
            );
      }
}




const getId=(x,y)=>{
      return (y-1)*10+x-1;
}    

</script>

/*-----------------------html---------------------*/

<template>
       <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure>
      <figure><span class="dot"></span></figure> 
      <Transition name="slide-up">
      <div class="startMenu" v-if="startFlag ">
            
            <div class="wave-container">
                  <h1 class="wave-text">
                        <span data-text="B">B</span>
                        <span data-text="u">u</span>
                        <span data-text="b">b</span>
                        <span data-text="b">b</span>
                        <span data-text="l">l</span>
                        <span data-text="e">e</span>
                        <br>
                  </h1>
            </div>         

            <div class="selectCont">

                  <div id="radio-cont-engl">    
                        <input type="radio" id="engl" value="English Mode" v-model="selectMode" />
                        <label for="engl" id="circle-cont-engl">
                        <div id="circle-engl"></div>
                        </label>
                        <label for="engl" id="label-engl">
                              English Bubbles
                        </label>
                  </div>
                  <div class="startButtonCont">
                              <button class="startButton bubble" @click="start()">Start</button>
                              
                  </div>   
                  <div id="radio-cont-euro"> 
                        <input type="radio" id="euro" value="Euro Mode" v-model="selectMode" />
                        <label for="euro" id="circle-cont-euro">
                        <div id="circle-euro"></div>
                        </label>
                        <label for="euro" id="label-euro">
                              European Bubbles
                        </label>
                  </div>   

            </div>


            <div class="wave-container">
                  <h1 class="wave-text">             
                        <span data-text="S">S</span>
                        <span data-text="o">o</span>
                        <span data-text="l">l</span>
                        <span data-text="i">i</span>
                        <span data-text="t">t</span>
                        <span data-text="a">a</span>
                        <span data-text="i">i</span>
                        <span data-text="r">r</span>
                        <span data-text="e">e</span>
                        
                  </h1>
            </div>      

            
            
      </div> 
      
      <div class="gameField" v-else-if="!startFlag"> 

            <div class="restartButtonCont" >
                  <button class="restartButton bubble" @click="start()">Restart</button>
            </div>
                  <Transition name="slide-up"> 
                  <div class="fieldCont" v-if="!gameOverFlag">
                        <div class="x" v-for="indexX in 7">
                              <div class="y" v-for="indexY in 7" :key="indexX">
                                    <Socket 
                                                :id="getId(indexX,indexY)" 
                                                :p="pegs"  
                                                :field="matrixField"
                                                :game="gameSockets"
                                                />
                                    
                              </div>
                        </div>
                  </div>
                 
                  <div class="winner" v-else>
                        <div v-if="winOrLose">
                              <h1 class="wave-text">             
                                    <span data-text="C" :style="'font-size: 8vw'">C</span>
                                    <span data-text="o" :style="'font-size: 8vw'">o</span>
                                    <span data-text="n" :style="'font-size: 8vw'">n</span>
                                    <span data-text="g" :style="'font-size: 8vw'">g</span>
                                    <span data-text="r" :style="'font-size: 8vw'">r</span>
                                    <span data-text="a" :style="'font-size: 8vw'">a</span>
                                    <span data-text="t" :style="'font-size: 8vw'">t</span>
                                    <span data-text="u" :style="'font-size: 8vw'">u</span>
                                    <span data-text="l" :style="'font-size: 8vw'">l</span>
                                    <span data-text="a" :style="'font-size: 8vw'">a</span>
                                    <span data-text="t" :style="'font-size: 8vw'">t</span>
                                    <span data-text="i" :style="'font-size: 8vw'">i</span>
                                    <span data-text="o" :style="'font-size: 8vw'">o</span>
                                    <span data-text="n" :style="'font-size: 8vw'">n</span>
                                    <span data-text="s" :style="'font-size: 8vw'">s</span>
                                    <span data-text="!" :style="'font-size: 8vw'">!</span>
                                     &nbsp&nbsp&nbsp&nbsp&nbsp
                                     <br></br>
                                    <span data-text="y" :style="'font-size: 8vw'">y</span>
                                    <span data-text="o" :style="'font-size: 8vw'">o</span>
                                    <span data-text="u" :style="'font-size: 8vw'">u</span>
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                    <span data-text="a" :style="'font-size: 8vw'">a</span>
                                    <span data-text="r" :style="'font-size: 8vw'">r</span>
                                    <span data-text="e" :style="'font-size: 8vw'">e</span>
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                    <span data-text="t" :style="'font-size: 8vw'">t</span>
                                    <span data-text="h" :style="'font-size: 8vw'">h</span>
                                    <span data-text="e" :style="'font-size: 8vw'">e</span>
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                    <span data-text="w" :style="'font-size: 8vw'">w</span>
                                    <span data-text="i" :style="'font-size: 8vw'">i</span>
                                    <span data-text="n" :style="'font-size: 8vw'">n</span>
                                    <span data-text="n" :style="'font-size: 8vw'">n</span>
                                    <span data-text="e" :style="'font-size: 8vw'">e</span>
                                    <span data-text="r" :style="'font-size: 8vw'">r</span>

                                    <span data-text="!" :style="'font-size: 8vw'">!</span>
                                    
                                     <span data-text="!" :style="'font-size: 8vw'">!</span>
                                   
                                     <span data-text="!" :style="'font-size: 8vw'">!</span>
                                     &nbsp&nbsp&nbsp&nbsp&nbsp
                                    
                              </h1>
                        </div>
                        <div v-else>
                              <h1 class="wave-text" >             
                                    <span data-text="S"  :style="'font-size: 8vw'">S</span>
                                    <span data-text="o" :style="'font-size: 8vw'">o</span>
                                    <span data-text="r" :style="'font-size: 8vw'">r</span>
                                    <span data-text="r" :style="'font-size: 8vw'">r</span>
                                    <span data-text="y" :style="'font-size: 8vw'">y</span>
                                    <br></br>
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                     
                                    <span data-text="y" :style="'font-size: 8vw'">y</span>
                                    <span data-text="o" :style="'font-size: 8vw'">o</span>
                                    <span data-text="u" :style="'font-size: 8vw'">u</span>
                                    
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                    
                                    <span data-text="a" :style="'font-size: 8vw'">a</span>
                                    <span data-text="r" :style="'font-size: 8vw'">r</span>
                                    <span data-text="e" :style="'font-size: 8vw'">e</span>
                                    
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                    
                                    <span data-text="n" :style="'font-size: 8vw'">n</span>
                                    <span data-text="o" :style="'font-size: 8vw'">o</span>
                                    <span data-text="t" :style="'font-size: 8vw'">t</span>
                                     
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                     
                                    <span data-text="a" :style="'font-size: 8vw'">a</span>
                                     
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                    <br></br>
                                     
                                    <span data-text="w" :style="'font-size: 8vw'">w</span>
                                    <span data-text="i" :style="'font-size: 8vw'">i</span>
                                    <span data-text="n" :style="'font-size: 8vw'">n</span>
                                    <span data-text="n" :style="'font-size: 8vw'">n</span>
                                    <span data-text="e" :style="'font-size: 8vw'">e</span>
                                    <span data-text="r" :style="'font-size: 8vw'">r</span>
                                    
                              </h1>
                        </div>
                  </div>
                  </Transition> 
      </div>
      </Transition> 
</template>


/*----------------------------css----------------------------*/
<style>
@import './assets/styles/header.css';
@import './assets/styles/bubblesBack.css';
@import './assets/styles/radioButt.css';
@import './assets/styles/startButton.css';
@import './assets/styles/restartButton.css';
@font-face {
    font-family: PsychopersonaluseRegular-OV1xd;
    src: url('./assets/fonts/PsychopersonaluseRegular-OV1xd.otf');
}

@font-face {
    font-family: Liquify-DEMO;
    src: url('./assets/fonts/Liquify-DEMO.otf');
}

@font-face {
    font-family: FunPlayArabic_DEMO-Light;
    src: url('./assets/fonts/FunPlayArabic_DEMO-Light.otf');
}

body{
  background: linear-gradient(180deg, rgb(148, 192, 250), 5%, #69b4fa, 50%, rgb(77, 76, 170), 90%,rgb(65, 19, 217));
  
  background-repeat: no-repeat;
  
  justify-content: center;
  align-items: center;
}

.winner{
      padding: 10vw 0;
      justify-content: center;
      align-items: center;
      display:grid;
}
.gameField{
      display:inline;
}

.fieldCont{
      justify-content: center;
      align-items: center;
      margin:0 20vw;
      display:grid;
     grid-template-columns: repeat(7, 7vw);  
}

.selectCont{
      display:flex;
      justify-content: center ;
}


.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.7s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}


</style>
