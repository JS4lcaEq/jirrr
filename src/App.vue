<template>
  <div id="app">
    <div class="row">
      <div class="desc">
        <el-button @click="storageSave">Записать</el-button>
        <el-button @click="storageClear">Стереть</el-button>
      </div>
      <div class="desc">общие тр-ты:</div>

      <div class="value">{{ tasksCount }}</div>

      <div class="desc">разработчик:</div>

      <div style="flex: 1 0"><el-input v-model="cMember.name"></el-input></div>

      <div class="desc">
        <el-popconfirm title="Удалить?" @confirm="onDel">
          <el-button slot="reference">Удалить</el-button>
        </el-popconfirm>
      </div>
      <div class="desc"><el-button @click="onAdd">+</el-button></div>
    </div>

    <hr />

    <div class="row">
      <div></div>

      <div class="desc">задача:</div>

      <div style="flex: 1 0"><el-input v-model="cTask.name"></el-input></div>

      <div class="desc">дней:</div>

      <div style="width: 100px"><el-input v-model="cTask.time"></el-input></div>

      <div class="desc">тип:</div>

      <div style="width: 150px">
        <el-select v-model="cTask.typeId" placeholder="Select">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div>
        <el-popconfirm title="Удалить?" @confirm="onDelTask">
          <el-button slot="reference">Удалить</el-button>
        </el-popconfirm>
      </div>
      <div><el-button @click="onMove">Переместить</el-button></div>
    </div>
    <hr />
    <div class="member">
      <div class="nm"></div>
      <div class="tasks">
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">1</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">2</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">3</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">4</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">5</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">6</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">7</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">8</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">9</div>
        </div>
        <div class="task">
          <div class="task-space">&nbsp;</div>
          <div class="task-name">10</div>
        </div>
      </div>
      <div class="add-button"></div>
    </div>
    <div
      v-for="item in members"
      :key="item.id"
      class="member"
      :class="{ active: item.isActive }"
      @click="onSelect(item)"
    >
      <div class="nm">{{ item.name }}</div>
      <div class="tasks">
        <div
          class="task"
          v-for="task in item.tasks"
          :key="task.id"
          :class="{
            prev: task.isPrev,
            active: task.isActive,
            w2: task.time == 2,
            w3: task.time == 3,
            w4: task.time == 4,
            w5: task.time == 5,
            w6: task.time == 6,
            w7: task.time == 7,
            w8: task.time == 8,
            w9: task.time == 9,
            w10: task.time == 10,
          }"
        >
          <div
            class="task-space"
            :class="{ active: isMoving }"
            @click="onMoved(task, item)"
          >
            &nbsp;
          </div>
          <div
            class="task-name"
            @click="onSelectTask(task)"
            @mouseover="notify('Задача', 'Можно сделать текущей - клик', 'th')"
          >
            <strong>{{ parseType(task.typeId) }}</strong> {{ task.name }}
          </div>
        </div>
      </div>
      <div class="add-button">
        <el-button @click="onAddTask" v-if="item.isActive">+</el-button>
      </div>
    </div>

    <div class="space"></div>

    <div style="display: flex">
      <div><canvas id="fire" width="500" height="500"></canvas></div>
      <div class="persent">
        <p v-for="type in types" :key="type.value">
          <strong>{{type.sn}}</strong> {{ type.label }} : {{ typesCount[type.value] }} %
        </p>
        <p>не указано: {{ typesCount[0] }} %</p>
      </div>
    </div>
    <div class="debug">
      <p>{{ members }}</p>
      <p>{{ fire }}</p>
      <hr />
      <p>{{ pTask }}</p>
      <hr />
      <p>{{ cTask }}</p>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

let element;
let context;

export default {
  name: "app",
  components: {
    // HelloWorld
  },
  data() {
    return {
      members: [ { "id": 0.11482149135454323, "name": "Максим", "tasks": [ { "id": 0.0023599485286690536, "name": "м1", "time": "5", "isActive": true, "typeId": 2, "startDay": 0, "fireDay": 5, "fs": 0, "fe": 5 }, { "id": 0.37211958881958207, "name": "м2", "time": "5", "isActive": false, "typeId": 4, "startDay": 5, "fireDay": 10, "fs": 0, "fe": 5 } ], "isActive": true }, { "id": 0.29428513232894016, "name": "Катя", "tasks": [ { "id": 0.9271747778856098, "name": "к1", "time": "5", "isActive": false, "startDay": 0, "fireDay": 5, "fs": 5, "fe": 10, "typeId": 1 }, { "id": 0.2861063346717799, "name": "к2", "time": "5", "isActive": false, "startDay": 5, "fireDay": 10, "fs": 5, "fe": 10, "typeId": 3 } ], "isActive": false } ],
      inMember: "inMember",
      cMember: { id: 1, name: "", tasks: [] },
      tasks: [],
      cTask: {},
      pTask: {},
      types: [
        { label: "тех.долг", value: 1, sn: "Т" },
        { label: "нов.фун.", value: 2, sn: "Н" },
        { label: "арх.", value: 3, sn: "А" },
        { label: "дефект", value: 4, sn: "Д" },
      ],
      isMoving: false,
      notifyTimer: {},
    };
  },
  mounted() {
    const self = this
    element = document.getElementById("fire");
    context = element.getContext("2d");
    this.storageLoad();
    let cTask = null
    this.members.forEach(member => {
      member.tasks.forEach(task => {
        if(task.isActive){
          cTask = task
          self.onSelectTask(cTask)
        }
      })
    })
    setTimeout(function(){
      self.pic(self.fire);
    }, 200)
    
  },
  computed: {
    typesCount() {
      let ret = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
      this.members.forEach((member) => {
        member.tasks.forEach((task) => {
          let typeId = task.typeId;
          if (typeId) {
            ret[typeId] =
              Number.parseFloat(ret[typeId]) + Number.parseInt(task.time); // / this.tasksCount
          } else {
            ret[0] = Number.parseFloat(ret[0]) + Number.parseInt(task.time);
          }
        });
      });
      for (let i = 0; i < 5; i++) {
        ret[i] = Math.round((ret[i] * 100) / this.tasksCount);
      }
      return ret;
    },
    tasksCount() {
      let count = 0;
      this.members.forEach((member) => {
        member.tasks.forEach((task) => {
          count = Number.parseInt(count) + Number.parseInt(task.time);
        });
      });
      return count;
    },
    kH() {
      return 500 / this.tasksCount;
    },
    kW() {
      return 50;
    },
    fire() {
      let ret = {};
      this.setTaskDays()
      this.members.forEach((member) => {
        member.tasks.forEach((task) => {
          let index = task.fireDay
          if (ret[index] == undefined) {
            ret[index] = 0;
          }
          task.fs = ret[index]
          ret[index] = ret[index] + Number.parseInt(task.time);
          task.fe = ret[index]
        });
      });
      this.pic(ret);
      return ret;
    },
  },
  methods: {
    setTaskDays(){
      this.members.forEach(member => {
        let start = 0
        member.tasks.forEach(task => {
          task.startDay = start
          task.fireDay = start + Number.parseInt(task.time)
          start = task.fireDay
        })
      })
    },
    
    notify(title, message, id) {
      if (this.notifyTimer[id] && Date.now() - this.notifyTimer[id] < 5000)
        return;

      this.notifyTimer[id] = Date.now();
      this.$notify({
        title: title,
        message: message,
        position: "bottom-right",
      });
    },
    changeTasks(srcTask, dstTask) {
      let srcName = srcTask.name;
      let dstName = dstTask.name;
      let srcTypeId = srcTask.typeId;
      let dstTypeId = dstTask.typeId;
      srcTask.name = dstName;
      srcTask.typeId = dstTypeId;
      dstTask.name = srcName;
      dstTask.typeId = srcTypeId;
    },
    checkMemberOverload(member) {
      let overload = 0;
      member.tasks.forEach((task) => {
        overload = overload + Number.parseInt(task.time);
      });
      return overload - 10 > 0;
    },
    repareTime(member) {
      member.tasks.forEach((task) => {
        if (this.checkMemberOverload(member)) {
          task.time = 1;
        }
      });
    },
    parseType(id) {
      if (id) {
        let finded = this.types.filter((x) => x.value == id);
        if (finded && finded.length > 0) {
          return finded[0].sn;
        }
      }
      return null;
    },
    onMoved(task, member) {
      if (!this.isMoving) return;

      let deleteIndex = this.cMember.tasks.indexOf(this.cTask);
      this.cMember.tasks.splice(deleteIndex, 1);

      let pasteIndex = member.tasks.indexOf(task);
      member.tasks.splice(pasteIndex, 0, this.cTask);

      this.isMoving = false;

      if (this.checkMemberOverload(member)) {
        this.cTask.time = 1;
      }

      if (this.checkMemberOverload(member)) {
        task.time = 1;
      }

      this.repareTime(member);
    },
    onMove() {
      this.isMoving = true;
        this.notify(
          "Перемещение задачи",
          "Зелеными маркерами подсвечены возможные места перемещения",
          "tm"
        );
    },
    storageClear(){
      window.localStorage.removeItem('dt')
      window.location.reload()

    },
    storageSave() {
      window.localStorage.setItem("dt", JSON.stringify(this.members));
    },
    storageLoad() {
      const SELF = this
      let raw = window.localStorage.getItem("dt");
      if (raw) {
        this.members = JSON.parse(raw);
      }else{
        setTimeout(() => {
          SELF.notify("нет данных", "загружены демонстрационные данные", "dt")
          SELF.storageSave()
          SELF.storageLoad()
        }, 500);
        
      }
      //console.log(raw)
    },
    pic(ret) {
      if (context) {
        context.font = "12px serif";
        context.clearRect(0, 0, 500, 500);
        context.beginPath();
        context.moveTo(1, 1);
        let summ = 0;
        let activeSumm = 0;
        for (var key = 0; key < 11; key++) {
          if (ret[key.toString()]) {
            summ = summ + ret[key.toString()];
            if(this.cTask.fireDay == key){
              activeSumm = summ
            }
          }
          context.lineTo(key * this.kW, summ * this.kH);
          //console.log(key, "=", ret[key.toString()])
        }
        context.strokeStyle = "#000";
        context.stroke();
        context.closePath();
        context.beginPath();
        for (let i = 0; i < 10; i++) {
          context.moveTo(i * 50, 1);
          context.lineTo(i * 50, 500);
          context.fillStyle = "rgba(0,0,0,0.9)";
          context.fillText(i+1, (i+1)*50 - 12, 10);
        }
        let k = 500/this.tasksCount
        for (let i = 0; i < this.tasksCount; i++) {
          context.moveTo(1, i * this.kH);
          context.lineTo(500, i * this.kH);
          context.fillText(i+1 , 5 , (i + 1)*k );
        }
        context.strokeStyle = "rgba(0, 0, 0, 0.1)";
        context.stroke();

        context.fillStyle = "rgba(0,255,0,0.1)";
        context.fillRect(this.cTask.startDay * 50, 1, this.cTask.time * 50, 500)
        context.fillRect(0, (activeSumm - ret[this.cTask.fireDay] + this.cTask.fs) * this.kH, 500, this.cTask.time * this.kH)
      }
    },
    onSave() {
      // let self = this;
      // this.dt.push({idname: self.inMember, tasks:[]})
    },
    onDel() {
      let indexToDel = this.members.indexOf(this.cMember);
      this.members.splice(indexToDel, 1);
      this.cMember = {};
      this.cTask = {};
    },
    onDelTask() {
      let index = 0;
      let indexToDel;
      this.cMember.tasks.forEach((task) => {
        if (task.id == this.cTask.id) {
          indexToDel = index;
        }
        index++;
      });
      console.log("indexToDel", indexToDel);
      this.cMember.tasks.splice(indexToDel, 1);
      this.cTask = {};
    },
    onAdd() {
      let item = {
        id: null,
        name: "новый участник",
        tasks: [],
        isActive: false,
      };
      this.members.push(item);
      item.id = Math.random();
    },
    onSelect(member) {
      this.cMember = member;
      this.clearMembersIsActive();
      member.isActive = true;
    },
    onAddTask() {
      let self = this;
      let task = {
        id: Math.random(),
        name: "новая задача",
        time: 1,
        isActive: false,
        typeId: 2,
      };
      self.cMember.tasks.push(task);
    },
    clearMembersIsActive() {
      this.members.forEach((member) => {
        member.isActive = false;
      });
    },

    onSelectTask(task) {
      if (this.isMoving) {
        this.changeTasks(this.cTask, task);
      } else {
        this.cTask = task;
        this.notify(
          "Выбор задачи",
          "Выбранную задачу можно отредактировать, обменять с другой задачей или переместить",
          "ta"
        );
      }
      this.members.forEach((member) => {
        member.tasks.forEach((tsk) => {
          tsk.isActive = false;
        });
      });
      task.isActive = true;
      this.isMoving = false;
      this.setTaskDays()
      let show = this.fire
      show
    },
  },
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
.persent {
  padding-left: 50px;
}
.row {
  display: flex;
}
.row div {
  padding: 0 5px;
  line-height: 40px;
}
.row .desc {
  padding-left: 50px;
}
.el-row {
  line-height: 40px;
}
.el-row.line hr {
  color: #eee;
}
.debug,
hr {
  color: #eeeeee;
  border: 1px solid #eeeeee;
}
.member {
  background-color: #eee;
  margin: 10px;
  height: 40px;
  display: flex;
}
.member.active .nm {
  /* border-bottom: solid 3px red; */
  background-color: rgba(0, 255, 0, 0.2);
}
.task {
  float: left;
  height: 40px;
  width: 10%;
}
.task-name {
  background-color: rgba(0, 0, 255, 0.1);
  height: 100%;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
}
.task-space {
  width: 10px;
  float: left;
  background-color: #eee;
  height: 100%;
}
.task-space.active {
  background-color: rgb(200, 255, 0);
  cursor: pointer;
}
.task.active .task-name {
  background-color: rgba(0, 255, 0, 0.2);
}
.task.prev .task-name {
  background-color: rgba(0, 255, 0, 0.1);
}
.task.w2 {
  width: 20%;
}
.task.w3 {
  width: 30%;
}
.task.w4 {
  width: 40%;
}
.task.w5 {
  width: 50%;
}
.task.w6 {
  width: 60%;
}
.task.w7 {
  width: 70%;
}
.task.w8 {
  width: 80%;
}
.task.w9 {
  width: 90%;
}
.task.w10 {
  width: 100%;
}
.nm {
  width: 100px;
  height: 100%;
  overflow: hidden;
}
.tasks {
  flex: 1 0;
}
.space {
  clear: both;
  width: 100%;
}
.add-button {
  width: 60px;
}
#fire {
  border: solid 1px #ccc;
}
.desc {
  text-align: right;
}
</style>
