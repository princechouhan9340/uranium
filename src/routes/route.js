const express = require('express');
const logger = require('./logger')

const router = express.Router();

router.get('/all-movie', function (req, res) {
   const movies =  [ "The shining","Incendies","Rang de Basanti","Finding Nemo"]
   res.send(movies);
   
});

router.get('/all-movie1/:index', function (req, res) {
   const index = req.params.index;
   const candidates =  [ "The shining","Incendies","Rang de Basanti","Finding Nemo"];
   res.send(candidates.at(index));
   
});

router.get('/all-movie3/:index', function (req, res) {
   const index = req.params.index;
   const candidates =  [ "The shining","Incendies","Rang de Basanti","Finding Nemo"]
   if (index > candidates.length){
      res.send("error : this is not a valid index please enter the valid index")
   }
   else{
      res.send(candidates.at(index));
   } 
   
});

router.get('/films', function (req, res) {
   const movieArray = [
      {"id":1,
   "name":"The shining"
      },{
      "id":2,
      "name":"Incendies" 
      },{
         "id":3,
         "name":"Rangn de basanti"
      },{
         "id":4,
         "name":"Finding nemo"
      }
   ] 
   res.send(movieArray);
  
   
});
router.get('/films/:filmId', function (req, res) {
   let films=[ {
       "id": 1,
       "name": "The Shining"
      }, {
       "id": 2,
       "name": "Incendies"
      }, {
       "id": 3,
       "name": "Rang de Basanti"
      }, {
       "id": 4,
       "name": "Finding Nemo"
      }]
   
      let pramId = req.params.filmId;
    
   for(let i=0;i<films.length;i++){
      
       if(pramId==films[i].id){
           res.send(films[i])
           break;
       }   
   }
   res.send("Error Invalid Id")
    
   });

   router.get('/Array', function (req, res) {
      const array = [1, 2, 3, 4, 5, 7, 8, 9];

      let n2 = array.at(-1);
      
      let sumOfArray = 0;
      for (let i = 0; i < array.length; i++) {
          sumOfArray += array[i];
      }
      let sumOfNumbers = (n2 * (n2 + 1)) / 2;
      
      let missingnumber = sumOfNumbers - sumOfArray
      res.json(missingnumber);
      
      
   });

   router.get('/Array2', function (req, res){ 
const array = [33,34,35,37,38,39];
let sumOfArray = 0;
for (let i=0;i<array.length;i++){
    sumOfArray += array[i]
}

let sum = 0;
for (let j =33;j<39+1;j++){
   sum += j 
}

let missingNumber = sum - sumOfArray
res.json(missingNumber)
});


module.exports = router;
// adding this comment for no reason