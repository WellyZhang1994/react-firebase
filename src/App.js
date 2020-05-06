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
import { ConsoleWriter } from 'istanbul-lib-report';


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


const storage = firebase.storage()
const auth = firebase.auth()
const db = firebase.firestore()

function App() {

  const classes = useStyles()
  const [fileList,setFileList] = useState([])


  const handleDatabase = () =>{
    const ref = db.collection('User')
    ref.get().then(querySnapshot=>{
      querySnapshot.forEach(doc => {
        console.log(doc.id, doc.data());
      });
    })
  }

  const createAccount = () => {
      auth.createUserWithEmailAndPassword('paul@gmail.com', '12345678').then(x=>{
        console.log(x)
      }).catch(y=>{
        console.log(y)
      })
  }

  const updateAccount = () =>{
    const user = firebase.auth().currentUser
    const displayName = user.displayName
		const email = user.email
		const emailVerified = user.emailVerified
		const photoURL = user.photoURL
    //firebase 可支援的參數有displayName、email、emailVerified、photoURL
  
    var profile = {displayName,email,emailVerified,photoURL}
    const result = user.updateProfile(profile).then(function() {
      //將修改資料傳回firebase
      return user.updateProfile({'displayName': "paul", 'phoneNumber':'0988895303'});
    }).catch(function(error) {
      //修改資料未成功的錯誤訊息
      var errorMessage = error.message;
      console.log('profile error',errorMessage)
    });

  }

  const loginAccount = () =>{
      const email = 'paul@gmail.com'
      const password = '12345678'
      auth.signInWithEmailAndPassword(email, password).then(function(user) {
        //登入成功
        console.log('login success');
      }).catch(function(error) {
        //登入錯誤訊息
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const getCurrentUser = () =>{
      const user = auth.currentUser;
      console.log(user)
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

        
        console.log(url)
        var element = document.createElement('a');
        element.href = url
        //element.href = url
        element.target="_blank"
        element.download=fileName
        //onClick property 
        element.click(); 
        

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

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4} justify='center' alignItems='center' className={classes.mainContainer}>
        <Grid item>
          <Button onClick={()=>createAccount()} variant="contained" color="secondary">
            Auth
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>updateAccount()} variant="contained" color="secondary">
            Update Auth
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>loginAccount()} variant="contained" color="secondary">
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>getCurrentUser()} variant="contained" color="secondary">
            Current User
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>handleDatabase()} variant="contained" color="secondary">
            Database Show Data
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
