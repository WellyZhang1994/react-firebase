import React ,{ useState }  from 'react';
import firebase from "firebase/app";
import { makeStyles } from '@material-ui/core/styles';
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './Theme'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  mainContainer:{
    width:'100',
    height:'200px'
  },
  fileContainer:{
    width:'100',
    height:'200px'
  }
}));

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdte_MLo48VqETLxqsqCl2AoF4GwD2sCw",
  authDomain: "wellyworkshop.firebaseapp.com",
  databaseURL: "https://wellyworkshop.firebaseio.com",
  projectId: "wellyworkshop",
  storageBucket: "wellyworkshop.appspot.com",
  messagingSenderId: "769000171395",
  appId: "1:769000171395:web:c1a8bb8bf512f39041b8b6",
  measurementId: "G-59Z9ZW904R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var storage = firebase.storage()

function App() {

  const classes = useStyles()
  const [fileList,setFileList] = useState([])


  const handleDatabase = () =>{
     console.log('hi')
  }

  const handleUploadClick = (event) =>{
    const file = event.target.files[0]
    var storageRef = storage.ref(file.name);
    storageRef.put(file).then(x=>{
      alert('Upload Success!')
    }).catch(x=>{

    })
  }

  const listStorageFile = () =>{

      const filesList = []

      storage.ref('/').listAll().then(files=>{
          files.items.map(file=>{
            filesList.push(file.location.path)
          })
          setFileList(filesList)
      })
  }

  const downloadFile = (fileName) =>{
    const pathReference = storage.ref(fileName);
    pathReference.getDownloadURL().then( url => {

        /*
        console.log(url)
        var element = document.createElement('a');
        element.href = url
        //element.href = url
        element.target="_blank"
        element.download=fileName
        //onClick property 
        element.click(); 
        */

        /*
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        */
    })
  }

  console.log(fileList)

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4} justify='center' alignItems='center' className={classes.mainContainer}>
        <Grid item>
          <Button onClick={()=>handleDatabase()} variant="contained" color="secondary">
            Auth
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>handleDatabase()} variant="contained" color="secondary">
            Database
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>handleDatabase()} variant="contained" color="secondary">
            Store
          </Button>
        </Grid>
        <Grid item>
          <Button

            variant="contained"
            component="label"
            color="primary"
          >
            Upload File
            <input
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={handleUploadClick}
            />
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>listStorageFile()} variant="contained" color="primary">
            List Storage File
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify='center' alignItems='center' className={classes.fileContainer}>
        {fileList.map(x=>{
          console.log(x)
          return(
            <Grid item key={x}>
              <Button onClick={()=>downloadFile(x)} variant="contained" >
                 {x}
              </Button>
            </Grid>
          )

        })}

      </Grid>

    </ThemeProvider>
  );
}

export default App;
