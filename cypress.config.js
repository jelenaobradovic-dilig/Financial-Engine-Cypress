/// <reference types="Cypress" />

const { defineConfig } = require("cypress");
const csv = require('@fast-csv/parse')

module.exports = defineConfig({
  e2e: {
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task',{
        //create task to read csv
        readFromCsvFile(){
          return new Promise(resolve=>{
            let dataArray=[];
            csv.parseFile('cypress/fixtures/import1.csv', {headers:true})
            .on('data',(data)=>
            {
              dataArray.push(data);
            })
            .on('end',()=>
            {
              resolve(dataArray)
              
            })
          })
        return null
        }
        
      })
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    
    defaultCommandTimeout: 15000,
    env: {baseUrl:"http://192.168.88.105:55755/#/sign-in"
    }
  },
});
