<template>
  <div id="app">
    <div>
      <button class="btn btn-primary" @click="startTimer">Play timer</button>
      <button class="btn btn-primary" @click="pauseTimer">Pause timer</button>
      <div>{{ formatTimer(session.time) }}</div>
    </div>
    <br>
    <div>
      <form>
        <input  v-model="session.name">
      </form>
      <button class="btn btn-primary" @click="saveSession">Save session</button>
    </div>
    <br>
    <div>
      <h5>Sessions</h5>
      <button class="btn btn-primary" @click="fetchDay">Of today</button>
      <button class="btn btn-primary" @click="fetchWeek">Of week</button>
      <button class="btn btn-primary" @click="fetchMonth">Of month</button>
      <br><br>
      <ul class="list-group">
        <li class="list-group-item" v-for="se in sessions">{{ se.name }} - {{ formatTimer(se.time) }} - {{ formatTimestamp(se.created_at) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        isRunning: false,
        interval: null,
        session: {
            name: null,
            time: 0,
        },
        sessions: []
    }
  },
    methods: {
        fetchData(filter) {
            this.$http.get('sessions?filter='+filter)
                .then(response=>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const resultArray = [];
                    for (let key in data) {
                        resultArray.push(data[key]);
                    }
                    this.sessions = resultArray;
                });
        },
        fetchDay() {
            this.fetchData("day")
        },
        fetchWeek() {
            this.fetchData("week")
        },
        fetchMonth() {
            this.fetchData("month")
        },
        startTimer() {
            this.interval = setInterval(this.incrementTime, 1000);
            this.isRunning = true
        },
        incrementTime() {
            this.session.time = parseInt(this.session.time) + 1;
        },
        pauseTimer() {
            clearInterval(this.interval);
            this.isRunning = true
        },
        formatTimer(tm) {
            if (tm > 0) {
                return (new Date)
                    .clearTime()
                    .addSeconds(tm)
                    .toString('H:mm:ss');
            }
            return 0
        },
        formatTimestamp(timestamp) {
            if (timestamp == 0) {
                return ""
            }
            let fullDt = new Date(timestamp * 1000);
            let date = fullDt.getDate();
            let month = fullDt.getMonth();
            let year = fullDt.getFullYear();

            return this.pad(month + 1) + "/" + this.pad(date) + "/" + year;
        },
        pad(n) {
            return n<10 ? '0'+n : n;
        },
        saveSession() {
            console.log(this.session);
            this.$http.post('sessions', this.session)
                .then(response => {
                    console.log(response);
                }, error => {
                    console.log(error);
                });
            this.session.time = 0;
            this.session.name = "";
            this.isRunning = false;
        },
    }
}
</script>

<style>
</style>
