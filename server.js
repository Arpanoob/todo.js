const express=require('express');
const app=express();
const fs=require('fs');
app.use(express.json());
var d=[];
app.post('/todo', function (req, res) {
  fs.readFile('todo.txt', 'utf-8', function (err, data) {
    let dataArray=[];
    if (err) {
      console.error('Error ', err);
      dataArray = [];
    } else {
      if (data.length === 0) {
        dataArray = [];
      } else {
        dataArray = JSON.parse(data);
      }
    }

    try {
      dataArray.push(req.body);
      fs.writeFile('todo.txt', JSON.stringify(dataArray), function (writeErr) {
        if (writeErr) {
          console.error('Error writing to file:', writeErr);
          res.status(500).end('error');
        } else {
          console.log(' updated successfully!');
          res.status(200).json(dataArray);
        }
      });
    } catch (e) {
      console.error('Error:', e);
      res.status(500).end('error');
    }
    d=dataArray;
  });
});


app.delete('/todo', function (req, res) {
  const name = req.body.text;

  fs.readFile('todo.txt', 'utf-8', function (err, data) {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).end('error');
      return;
    }

    let dataArray = [];
    if (data.length > 0) {
      dataArray = JSON.parse(data);
    }

                     // find the index of the object with the name
    const indexToRemove = dataArray.findIndex((item) => item.text === name);

    if (indexToRemove !== -1) {
      // If the object is found, hatao from the rray
      dataArray.splice(indexToRemove, 1);

      // Write the updated array back to the file as JSON
      fs.writeFile('todo.txt', JSON.stringify(dataArray), function (writeErr) {
        if (writeErr) {
          console.error('Error writing to file:', writeErr);
          res.status(500).end('error');
        } else {
          console.log('File content updated successfully!');
          res.status(200).json(dataArray);
        }
      });
    } else {
      //  object is not found error response
      res.status(404).end('Object no found');
    }
  });
});
//app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000,()=>{console.log("listening to port 3000");});
app.get('/',(req,res)=>{ res.sendFile(__dirname+"/index.html");});
app.get('/home',(req,res)=>{ res.sendFile(__dirname+"/index.html");});
app.get('/contact', function(req, res) {
    res.sendFile(__dirname +  "/contact.html");
  });
app.get('/about',(req,res)=>{
    res.sendFile(__dirname+"/about.html");
})
app.get('/todo',(req,res)=>{
  res.sendFile(__dirname+"/todo.html");
})
app.get('/todo.txt',function(req,res){
  res.sendFile(__dirname+"/todo.txt")
})