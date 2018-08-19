import runAdditionRNNDemo from './index'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
var app = new Vue({
  el: '#app',
  data: {
    message: 'TensorFlow.js: Addition RNN',
    trainingSize: 5000,
    hasHandler: Boolean(runAdditionRNNDemo),
    inputs: [
      // {
      //   label: 'RNN Layers',
      //   val: 1,
      //   id: 'rnnLayers'
      // },
      // {
      //   label: 'RNN Hidden Layer Size',
      //   val: 128,
      //   id: 'rnnLayerSize'
      // },
      // {
      //   label: 'Batch Size',
      //   val: 128,
      //   id: 'batchSize'
      // }, {
      //   label: 'Train Iterations',
      //   val: 100,
      //   id: 'trainIterations'
      // }, {
      //   label: '# of test examples',
      //   val: 20,
      //   id: 'numTestExamples'
      // }
    ]
  },
  mounted() {
    // axios
    //   .get('/api/config?id=1', {
    //     // 'Access-Control-Allow-Origin': '*',
    //     // 'Content-type': 'application/x-www-form-urlencoded'
    //     // Authorization: `Bearer aaa`
    //     crossdomain: true
    //   })
    fetch('http://localhost:3000/api/config?id=1', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => res.json())
      .then(data => {
        let arr = []
        for (const prop in data.data) {
          if (prop === 'type') {
            continue;
          }
          arr.push({
            val: data.data[prop],
            label: prop,
            id: prop
          })
        }
        this.inputs = arr;
      })
      .catch(err => {
        debugger;
      })

    // fetch('http://localhost:3000/api/config?id=1', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   credentials: 'include'
    // })
    //   .then(data => {

    //   })
    runAdditionRNNDemo()
  }
})
