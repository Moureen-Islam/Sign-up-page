const express = require('express')
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express()
const port = 3000




app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')

})

app.post("/", (req,res)=>{
  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email
  console.log(firstName,lastName, email)

  const data= {
    members : [
      {
        email_address: email,
        status : "subscribed",
        merge_fields: {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data)
  const url = "https://us9.api.mailchimp.com/3.0/lists/76c493a509"

  const options = {
    method: "POST",
    auth: "Moureen1: 51cbef66ef670df03167823f8a282775-us9"

  }


  const request = https.request(url,options, (response)=>{
    response.on ("data", (data)=>{
      console.log(JSON.parse(data))

    })

    

  })
  request.write(jsonData)
  request.end()



    

    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Api key 
// 51cbef66ef670df03167823f8a282775-us9

// list-id
// 76c493a509

