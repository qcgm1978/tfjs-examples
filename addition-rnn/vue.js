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
    fetch('http://localhost:3000/api/config?id=1').then(res => res.json())
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
    runAdditionRNNDemo()
  }
})
