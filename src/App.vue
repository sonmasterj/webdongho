<template>
  <div>
    <center>
      <h1>Bảng giá trị đồng hồ</h1>
    </center>
    <hr>
    <br>
    <center >
      <div class="table" style="width: 1585px">
        <vue-table-dynamic :params="params"></vue-table-dynamic>
      </div>
       <export-excel
        class='btn btn-primary'
        :data   = "json">
        Export Excel
      </export-excel>
    </center>
  </div>

</template>

<script>
import io from 'socket.io-client';
export default {
  data(){
    return{
      params:{
        data:[
          ['Time', 'V1N', 'V2N','V3N','Vlavg','V12','V23','V31','Vllavg','I1','I2','I3','Iavg','F','kW1','kW2','kW3','kVA1','kVA2','kVA3','kVAr1','kVAr2','kVAr3','Psum','Ssum','Qsum','kWh','kVAh','kVArh']
        ],
        header: 'row',
        border:true,
        highlight: {row:[0]},
        highlightedColor: 'rgb(52,125,227)',
        // pagination:true,
        // pageSize:10,
        // pageSizes: [10,20,50,100],
        columnWidth: [
          {column: 0, width: 200},
          {column: 1, width: 45},
          {column: 2, width: 45},
          {column: 3, width: 45},
          {column: 4, width: 50},
          {column: 5, width: 45},
          {column: 6, width: 45},
          {column: 7, width: 45},
          {column: 8, width: 55},
          {column: 9, width: 45},
          {column: 10, width: 45},
          {column: 11, width: 45},
          {column: 12, width: 45},
          {column: 13, width: 45},
          {column: 14, width: 45},
          {column: 15, width: 45},
          {column: 16, width: 50},
          {column: 17, width: 50},
          {column: 18, width: 50},
          {column: 19, width: 50},
          {column: 20, width: 55},
          {column: 21, width: 55},
          {column: 22, width: 55},
          {column: 23, width: 55},
          {column: 24, width: 55},
          {column: 25, width: 55},
          {column: 26, width: 55},
          {column: 27, width: 55},
          {column: 28, width: 55},
        ]
      },
      maxRows: 30,
      json:[
        
      ]
      
    }
  },
  created(){
    const socket = io('https://donghodien.herokuapp.com/',{
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: Infinity
    });
    socket.on('data',(data)=>{
      const {time,V1N,V2N,V3N,Vlavg,V12,V23,V31,Vllavg,I1,I2,
            I3,Iavg,F,kW1,kW2,kW3,kVA1,
            kVA2,kVA3,kVAr1,kVAr2,kVAr3,Psum,Ssum,Qsum,kWh,kVAh,kVArh}=data;
      if(this.maxRows=== this.params.data.length)
      {
        this.params.data.splice(1,1);
        this.json.splice(1,1);
      }
      this.params.data.push([time,V1N,V2N,V3N,Vlavg,V12,V23,V31,Vllavg,I1,I2,
            I3,Iavg,F,kW1,kW2,kW3,kVA1,
            kVA2,kVA3,kVAr1,kVAr2,kVAr3,Psum,Ssum,Qsum,kWh,kVAh,kVArh]);
      this.json.push(
        {
            time: time,
            V1N: V1N,
            V2N: V2N,
            V3N : V3N,
            Vlavg: Vlavg,
            V12: V12,
            V23: V23,
            V31: V31,
            Vllavg: Vllavg,
            I1: I1,
            I2: I2,
            I3: I3,
            Iavg: Iavg,
            F: F,
            kW1: kW1,
            kW2: kW2,
            kW3: kW3,
            kVA1: kVA1,
            kVA2: kVA2,
            kVA3: kVA3,
            kVAr1: kVAr1,
            kVAr2: kVAr2,
            kVAr3: kVAr3,
            Psum: Psum,
            Ssum: Ssum,
            Qsum: Qsum,
            kWh: kWh,
            kVAh: kVAh,
            kVArh: kVArh

        }
      )
      // console.log(this.params.data)
    });
    socket.on('disconnect',(reason)=>{
      console.log('disconnected: ',reason);
    })
  }
}
</script>

<style >
  .table{
    text-align: center;
    font-size: 20px;
  }
  h1{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: tomato;
  }
</style>