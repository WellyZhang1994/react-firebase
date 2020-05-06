import React from 'react';
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
    height:'840px'
  }
}));

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
 
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var storage = firebase.storage()

function App() {

  const classes = useStyles()

  const handleDatabase = () =>{
     console.log('hi')
  }

  const handleUploadClick = (event) =>{
    const file = event.target.files[0]
    var storageRef = storage.ref(file.name);
    storageRef.put(file).then(x=>{
      console.log(x)
    }).catch(x=>{

    })
  }

  const listStorageFile = () =>{

      const filesList = []

      storage.ref('/').listAll().then(files=>{
          files.items.map(file=>{
            filesList.push(file.location.path)
            console.log(filesList)
          })
         
      })
  }

  const downloadFile = (fileName) =>{
    const pathReference = storage.ref(fileName);
    pathReference.getDownloadURL().then( url => {
        console.log(url)
        var a = document.createElement('a');
        a.href = url
        a.download = 'download';
        a.target="_blank"
        a.click();
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4} justify='center' alignItems='center' className={classes.mainContainer}>
        <Grid item>
          <Button onClick={()=>handleDatabase()} variant="contained" color="secondary">
            Database
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
              accept="image/*"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={handleUploadClick}
            />
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>downloadFile('favicon.ico')} variant="contained" color="primary">
            Download File
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>listStorageFile()} variant="contained" color="primary">
            List Storage File
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
