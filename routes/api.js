var express = require('express');
var router = express.Router();

var {readData , writeData} = require('../public/data/data')
const datas = []
let idRoot = 0
/* GET users listing. */
router.get('/', function(req, res) {
  const todoFilter = [...datas]
  // console.log( readData().split(''))
  const type = req.query.type
  if(type ==='all' || !type){
    return res.status(200).json(todoFilter)

  }else if (type === 'incomplete'){
    return res.status(200).json(todoFilter.filter(item=>!item.complete))
  }else if (type === 'complete'){
    return res.status(200).json(todoFilter.filter(item=>item.complete))
  }


});

router.get('/todo/:id', function(req, res) {
  const id = Number(req.params.id)
  let todo =  datas.find(item =>item.id === id)
  if(todo){
    return res.status(200).json(todo)

  }

    return res.status(400).send("not found id")


  
});
router.post('/add', function(req, res) {
  const data = req.body
  data.id = idRoot + 1
  idRoot++
  datas.unshift(data)
  return res.status(200).json(datas)
});
router.put('/edit/:id', function(req, res) {
  const data = req.body
  const id = Number(req.params.id)
  const index = datas.findIndex(item => item.id === id)
  if(index>= 0){
    datas[index] = data
    return res.status(200).send("update succsec")
  }else{
    return res.status(400).send("not found id, update fail")
  }
});
router.delete('/delete/:id', function(req, res) {
  const id = Number(req.params.id)
  const index = datas.findIndex(item => item.id === id)
  if(index>= 0){
    datas.splice(index , 1)
    return res.status(200).send("delete succsec")
  }else{
    return res.status(400).send("not found id, update fail")
  }

});

module.exports = router;
