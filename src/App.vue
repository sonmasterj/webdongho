<template>
  <div>
    <br>
    <ul class="nav nav-tabs custom">
      <li class="nav-item">
        <a class="nav-link" :class="{active: status}" href="home" @click.prevent="status=true" >Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: !status}" href="graph" @click.prevent="status=false" >Graph</a>
      </li>
    </ul>
    <br>
    <center v-if="status">
      <div class="table" style="width: 1880px">
        <vue-table-dynamic :params="params"></vue-table-dynamic>
      </div>
       <export-excel
        class='btn btn-primary'
        :data   = "json">
        Export Excel
      </export-excel>
    </center>
    <div  class='graph' v-else>
      <div class="table" style="width: 440px">
        <vue-table-dynamic :params="params_mini"></vue-table-dynamic>
      </div>
      <line-chart :chart-data='dataChart' :options="options" class='chart'>

      </line-chart>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client';
import LineChart from '../src/LineChart';
export default {
  components:{
    LineChart
  },
  data(){
    return{
      dataChart : null,
      options: {
        title: {
          display: true,
          text: 'Đồ thị điện áp (V)'
        },
        responsive: true,
        // maintainAspectRatio: false,
        // bezierCurve: false,
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Time'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Voltage'
						}
					}]
				}
      },
      status: true,
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
          {column: 1, width: 60},
          {column: 2, width: 60},
          {column: 3, width: 60},
          {column: 4, width: 60},
          {column: 5, width: 60},
          {column: 6, width: 60},
          {column: 7, width: 60},
          {column: 8, width: 60},
          {column: 9, width: 60},
          {column: 10, width: 60},
          {column: 11, width: 60},
          {column: 12, width: 60},
          {column: 13, width: 60},
          {column: 14, width: 60},
          {column: 15, width: 60},
          {column: 16, width: 60},
          {column: 17, width: 60},
          {column: 18, width: 60},
          {column: 19, width: 60},
          {column: 20, width: 60},
          {column: 21, width: 60},
          {column: 22, width: 60},
          {column: 23, width: 60},
          {column: 24, width: 60},
          {column: 25, width: 60},
          {column: 26, width: 60},
          {column: 27, width: 60},
          {column: 28, width: 60},
        ]
      },
      params_mini:{
        data:[
          ['Time', 'V1N', 'V2N','V3N','Vlavg']
        ],
        header: 'row',
        border:true,
        highlight: {row:[0]},
        highlightedColor: 'rgb(52,125,227)',
        columnWidth: [
          {column: 0, width: 200},
          {column: 1, width: 60},
          {column: 2, width: 60},
          {column: 3, width: 60},
          {column: 4, width: 60},
        ]
      },
      maxRows: 25,
      json:[
        
      ],
      times:[],
      V1N:[],
      V2N:[],
      V3N:[],
      Vlavg:[]
      
    }
  },
  methods:{
    fillData(){
      this.dataChart={
        labels:this.times,
        datasets:[
          {
            label: "V1N",
            fill:false,
            lineTension:0,
            backgroundColor: '#f55442',
            borderColor: '#f55442',
            data: this.V1N
          },
          {
            label: "V2N",
            fill:false,
            lineTension:0,
            backgroundColor: '#f5e642',
            borderColor:'#f5e642',
            data: this.V2N
          },
          {
            label: "V3N",
            fill:false,
            lineTension:0,
            backgroundColor: '#42f54e',
            borderColor:'#42f54e',
            data: this.V3N
          },
          {
            label: "Vlavg",
            fill:false,
            lineTension:0,
            backgroundColor: '#f542ec',
            borderColor:'#f542ec',
            data: this.Vlavg
          },
        ]
      }
    }
  },
  created(){
    const socket = io('https://donghodien.herokuapp.com/');
    // const socket = io('http://localhost:3000');
    socket.on('data',(data)=>{
      //lay du lieu tu server
      const {time,V1N,V2N,V3N,Vlavg,V12,V23,V31,Vllavg,I1,I2,
            I3,Iavg,F,kW1,kW2,kW3,kVA1,
            kVA2,kVA3,kVAr1,kVAr2,kVAr3,Psum,Ssum,Qsum,kWh,kVAh,kVArh}=data;

      //neu du lieu lon hon maxRows => xoa row cu di
      if(this.maxRows<= this.params.data.length)
      {

        //bot phan tu cua mang table chinh
        this.params.data.splice(1,1);
        //bot phan tu cua mang table nho
        this.params_mini.data.splice(1,1);
        //bot phan tu cua exel
        this.json.splice(1,1);
        //bot phan tu trong chart
        this.times.splice(0,1);
        this.V1N.splice(0,1);
        this.V2N.splice(0,1);
        this.V3N.splice(0,1);
        this.Vlavg.splice(0,1);
      }

      //cap nhap mang du lieu cho table va exel
      this.params.data.push([time,V1N,V2N,V3N,Vlavg,V12,V23,V31,Vllavg,I1,I2,
            I3,Iavg,F,kW1,kW2,kW3,kVA1,
            kVA2,kVA3,kVAr1,kVAr2,kVAr3,Psum,Ssum,Qsum,kWh,kVAh,kVArh]);
      this.params_mini.data.push([time,V1N,V2N,V3N,Vlavg]);
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

      //cap nhap du lieu cho chart
      this.times.push(time);
      this.V1N.push(V1N);
      this.V2N.push(V2N);
      this.V3N.push(V3N);
      this.Vlavg.push(Vlavg);
      this.fillData();

      // console.log(this.params.data)
    });

    //khi mat ket noi=> in ra nguyen nhan
    socket.on('disconnect',(reason)=>{
      console.log('disconnected: ',reason);
    })

    //lay du lieu khi lan dau ket noi
    socket.on('fetchData',(logs)=>{
      if(this.json.length==0)
      {
        let i=0;
        let len = logs.length;
        if(len>this.maxRows)
        {
          i=len-this.maxRows;
        }
        for(let j=i;j<len;j++)
        {
          const {time,V1N,V2N,V3N,Vlavg,V12,V23,V31,Vllavg,I1,I2,
            I3,Iavg,F,kW1,kW2,kW3,kVA1,
            kVA2,kVA3,kVAr1,kVAr2,kVAr3,Psum,Ssum,Qsum,kWh,kVAh,kVArh}=logs[j];
          this.params.data.push([time,V1N,V2N,V3N,Vlavg,V12,V23,V31,Vllavg,I1,I2,
            I3,Iavg,F,kW1,kW2,kW3,kVA1,
            kVA2,kVA3,kVAr1,kVAr2,kVAr3,Psum,Ssum,Qsum,kWh,kVAh,kVArh]);
          this.params_mini.data.push([time,V1N,V2N,V3N,Vlavg]);
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

            });
          this.times.push(time);
          this.V1N.push(V1N);
          this.V2N.push(V2N);
          this.V3N.push(V3N);
          this.Vlavg.push(Vlavg);
          this.fillData();
        }
      }
      
    })
  }
}
</script>

<style >
  .custom{
     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
     font-weight: bold;
     font-size: 20px;
     max-width: 1880px;
  }
  .table{
    margin: 20px;
  }
  .graph{
    display: flex;
    justify-content: center;
  }
  .chart{
    width: 820px;
  }
</style>