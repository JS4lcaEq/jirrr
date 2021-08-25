<template>
  <div id="app">
    <el-row>

      <el-col :span="2" class="desc">
        общие тр-ты:
      </el-col> 

      <el-col :span="1">
      {{tasksCount}} 
      </el-col>  

      <el-col :span="2" class="desc">
        разработчик:
      </el-col> 

      <el-col :span="3">
        <el-input v-model="cMember.name"></el-input>
      </el-col>
      <el-col :span="3">
        <p>   </p>
      </el-col>
       <el-col :span="2" >
        <el-button @click="onDel">Удалить</el-button>
      </el-col> 



    


    </el-row>

    <el-row class="line">
      <el-col :span="24" class="desc">
        <hr />
      </el-col> 
    </el-row>
      
    <el-row>

            <el-col :span="3">
        <el-button @click="storageSave">Записать</el-button>
      </el-col> 

      <el-col :span="2" class="desc">
        задача:
      </el-col>      
      <el-col :span="3">
        <el-input v-model="cTask.name"></el-input>
      </el-col>
      <!-- <el-col :span="2" class="desc">
        затраты:
      </el-col>        -->

      <el-col :span="2">
        <el-input v-model="cTask.time"></el-input>
      </el-col>
      <el-col :span="1">
        <p>   </p>
      </el-col>
       <el-col :span="2">
        <el-button @click="onDelTask">Удалить</el-button>
      </el-col>     
    </el-row>
    <el-row class="line">
      <el-col :span="24" class="desc">
        <hr />
      </el-col> 
    </el-row>
  <div v-for="item in members" :key="item.id" class="member" :class="{'active': item.isActive}" @click="onSelect(item)">
    <div class="nm">{{item.name}}</div>
    <div  class="task" 
          v-for="task in item.tasks" 
          :key="task.id" 
          :class="{'active': task.isActive, 'w2': task.time==2, 'w3': task.time==3, 'w4': task.time==4, 'w5': task.time==5, 'w6': task.time==6, 'w7': task.time==7, 'w8': task.time==8, 'w9': task.time==9, 'w10': task.time==10}" 
          @click="onSelectTask(task)">
          <div>
            {{task.name}}
          </div>
    </div>
    <el-button @click="onAddTask" v-if="item.isActive">+</el-button>
  </div>


<div class="space"></div>
  <p><el-button @click="onAdd">+</el-button></p>
<div class="space"></div>

    <canvas id="fire" width="500" height="500"></canvas>
    <div class="debug">
    <p>{{members}}</p>  
    <p>{{fire}}</p>

    </div>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

let element
let	context

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  data(){
    return{
      members: [ { "id": 0.11482149135454323, "name": "Максим", "tasks": [ { "id": 0.0023599485286690536, "name": "новая задача", "time": "2", "isActive": false }, { "id": 0.37211958881958207, "name": "новая задача", "time": "2", "isActive": false }, { "id": 0.9343021127754118, "name": "новая задача", "time": "2", "isActive": false }, { "id": 0.18407621000603458, "name": "новая задача", "time": "2", "isActive": false }, { "id": 0.43270851236231545, "name": "новая задача", "time": "2", "isActive": false } ], "isActive": false }, { "id": 0.29428513232894016, "name": "Катя", "tasks": [ { "id": 0.9271747778856098, "name": "новая задача", "time": "5", "isActive": true }, { "id": 0.2861063346717799, "name": "новая задача", "time": "5", "isActive": false } ], "isActive": true }, { "id": 0.22876539886181424, "name": "Андрей", "tasks": [ { "id": 0.0065651665361503575, "name": "325 пейджер", "time": "3", "isActive": false }, { "id": 0.4716512229226457, "name": "283 флекс", "time": "5", "isActive": false }, { "id": 0.07985047626073227, "name": "326 признак архив", "time": "2", "isActive": false } ], "isActive": false } ] ,
      inMember: "inMember",
      cMember: { id: 1, name: "", tasks:[] },
      tasks: [],
      cTask:{}
    }
  },
  mounted(){
    element = document.getElementById("fire")
    context = element.getContext('2d')
    this.storageLoad()
    this.pic(this.fire)

  },
  computed:{
    tasksCount(){
      let count = 0
      this.members.forEach((member)=>{
        member.tasks.forEach((task)=>{
          count = Number.parseInt(count) + Number.parseInt(task.time)
        })
      })
      return count
    },
    kH(){
      return 500 / this.tasksCount
    },
    kW(){
      return 50
    },
    fire(){
      let ret = {}
      this.members.forEach((member)=>{
        let start = 0
        member.tasks.forEach((task)=>{
          let index = Number.parseInt(start) + Number.parseInt(task.time)
          if(ret[index]== undefined){
            ret[index] = 0
          }
          ret[index] = ret[index] + Number.parseInt(task.time)
          start = index
        })
      })
      this.pic(ret)
      return ret
    }
  },
  methods:{
    storageSave(){
      window.localStorage.setItem("dt", JSON.stringify( this.members))

    },
    storageLoad(){
      let raw = window.localStorage.getItem("dt")
      if(raw){
        this.members = JSON.parse(raw)
      }
      //console.log(raw)
    },
    pic(ret){
      if(context){
        context.clearRect(0, 0, 500, 500);
        context.beginPath()
        context.moveTo(1, 1) 
        let summ = 0 
        for (var key = 0; key < 11; key++) {
          if(ret[key.toString()]){
            summ = summ + ret[key.toString()]
          }
          context.lineTo(key * this.kW, summ * this.kH)
          //console.log(key, "=", ret[key.toString()])
        } 
        context.strokeStyle = "#000";     
        context.stroke();
        context.closePath()
        context.beginPath()
        for(let i = 0 ; i < 10; i++){
          context.moveTo(i*50, 1)
          context.lineTo(i*50, 500)        
        }
        for(let i = 0 ; i < this.tasksCount; i++){
          context.moveTo(1, i*this.kH)
          context.lineTo(500, i*this.kH)        
        }
        context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        context.stroke();
      }
    },
    onSave(){
      // let self = this;
      // this.dt.push({idname: self.inMember, tasks:[]})
    },
    onDel(){
      let indexToDel = this.members.indexOf(this.cMember)
      this.members.splice(indexToDel, 1)
      this.cMember = {}
      this.cTask = {}
    },
    onDelTask(){
      let index = 0
      let indexToDel
      this.cMember.tasks.forEach((task)=>{
        if(task.id==this.cTask.id){
          indexToDel = index
        }
        index++
      })
      console.log("indexToDel", indexToDel)
      this.cMember.tasks.splice(indexToDel, 1)
      this.cTask = {}
    },
    onAdd(){
      let item = {id: null, name: "новый участник", tasks:[], isActive: false}
      this.members.push(item)
      item.id = Math.random()
    },
    onSelect(member){
      this.cMember = member;
      this.clearMembersIsActive();
      member.isActive = true;
    },
    onAddTask(){
      let self = this;
      let task = {id: Math.random(), name: "новая задача", time: 1, isActive: false}
      //self.tasks.push(task)
      self.cMember.tasks.push(task)
    },
    clearMembersIsActive(){
      this.members.forEach((member)=>{member.isActive = false})
    },

    onSelectTask(task){
      this.cTask = task
      this.members.forEach((member)=>{
        member.tasks.forEach((tsk)=>{tsk.isActive = false})
      })
      task.isActive = true;
    }
  }

}
</script>

<style>
.el-row{
  line-height: 40px;
}
.el-row.line hr { 
  color: #eee;
}
.debug{
  color: #eee;
}
.member{
background-color:#eee;
margin: 10px;
height: 40px;
border-bottom: solid 2px #fff;
}
.member.active{
  border-bottom: solid 2px red;
}
.task{
width: 100px;
float: left;
border-top: solid 2px #fff;
height: 35px;

}
.task div{
  background-color:rgba(0, 0, 255, 0.1);
  margin: 0 3px;
  height: 100%;
}
.task.active div{
  border-top: solid 2px red;
}
.task.w2{
  width: 200px;
}
.task.w3{
  width: 300px;
}
.task.w4{
  width: 400px;
}
.task.w5{
  width: 500px;
}
.task.w6{
  width: 600px;
}
.task.w7{
  width: 700px;
}
.task.w8{
  width: 800px;
}
.task.w9{
  width: 900px;
}
.task.w10{
  width: 1000px;
}
.nm{
  width: 200px;
  float: left;
  } 
.space{
  clear: both;
  width: 100%;
}

#fire{
  border: solid 1px #ccc;
}
.desc{
  text-align: right;
}
</style>
