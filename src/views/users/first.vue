<template>
    <div style="display:flex;align-items:center;justify-content:center">    
        <div  ref="main" style="width: 40vw;height:400px;"></div>
        <div  ref="main1" style="width: 40vw;height:400px;"></div>
    </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import {onMounted, ref,Ref,reactive} from 'vue'
import { useStore } from 'vuex'
 import axios from 'axios';
import moment from 'moment'
 const store=useStore();
 let table=reactive([0,0,0,0,0,0])
 let table1=reactive([0,0,0,0,0,0])
 let form=reactive([])
const main:Ref<HTMLElement | null | any>=ref(null)
  const main1:Ref<HTMLElement | null | any>=ref(null)
onMounted(()=>{init();init1()});
const init=()=>{
  const id=store.state.user.user.id||sessionStorage.getItem("userinfo");
  axios.post('/users/users/moneylook',{userid:id,type:'收入'}).then(res => { 
    let table2=res.data;
    table2.map(item=>{
      if(item.label=="转账"){
        table[0]=table[0]+item.cash       
      }else if(item.label=="杂费"){
        console.log('1',item.cash)
        table[1]=table[1]+item.cash
      }else if(item.label=="生活费"){
        table[2]=table[2]+item.cash
      }else if(item.label=="医药费"){
        table[3]=table[3]+item.cash
      }else if(item.label=="购物费"){
        table[4]=table[4]+item.cash
      }else if(item.label=="房租"){
        table[5]=table[5]+item.cash
      }
    })
 let myChart = echarts.init(main.value as HTMLElement);
let option = {
        title: {
          text: '收入'
        },
        tooltip: {},
        legend: {
          data: ['费用(元)']
        },
        xAxis: {
          data: ['转账', '杂费', '生活费', '医药费','购物费', '房租']
        },
        yAxis: {      
      type: 'value',
      name: '元',
      min: 0,
      max: 500,
      position: 'left',
      axisLabel: {
        formatter: '{value} '
      
    },
        },
        series: [
          {
            name: '费用(元)',
            type: 'bar',
            data: table
          }
        ]
      };
      myChart.setOption(option,true);
            }, err => {
                console.log(err);
                console.log('error');
            });

}
const init1=()=>{
  const id=store.state.user.user.id||sessionStorage.getItem("userinfo");
  axios.post('/users/users/moneylook',{userid:id,type:'支出'}).then(res => { 
    let table2=res.data;
    console.log('222',res.data)
    table2.map((item,index)=>{
      if(item.label=="转账"){
        table1[0]=table1[0]+item.cash
      }else if(item.label=="杂费"){
        table1[1]=table1[1]+item.cash
      }else if(item.label=="生活费"){
        table1[2]=table1[2]+item.cash
      }else if(item.label=="医药费"){
        table1[3]=table1[3]+item.cash
      }else if(item.label=="购物费"){
        table1[4]=table1[4]+item.cash
      }else if(item.label=="房租"){
        table1[5]=table1[5]+item.cash
      }
      if(index==table2.length-1) 
        {
          form.push({ value:table1[0], name: '转账' });
          form.push({ value:table1[1], name: '杂费' });
          form.push({ value:table1[2], name: '生活费' });
          form.push({ value:table1[3], name: '医药费' });
          form.push({ value:table1[4], name: '购物费' });
          form.push({ value:table1[5], name: '房租' });    }
    })
 let myChart = echarts.init(main1.value as HTMLElement);
let option = {
        title: {
          text: '支出',
          left: 'center'
        },
        tooltip: { trigger: 'item'},
        legend: {
          orient: 'vertical',
    left: 'left'
        },
        series: [
          {
            name: '费用(元)',
            type: 'pie',
            data: form,
          }
        ]
      };
      myChart.setOption(option,true);
            }, err => {
                console.log(err);
                console.log('error');
            });

}
</script>