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
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const useStyles = makeStyles((theme) => ({
  mainContainer:{
    width:'100%',
    height:'200px'
  },
  infoCotainer:{
    width:'98%',
    height:'350px',
    background: '#E0E0E0 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #0000000F',
    borderRadius: '5px',
    color:'#272727'
  },
  smWord:{
    textAlign: 'left',
    font: '18px/17px Lato',
    letterSpacing: '0px',
    opacity: 1,
    color:'#272727'
  },
  mdWord:{
      textAlign: 'left',
      font: '24px/22px Noto Sans',
      letterSpacing: '0.18px',
      color: '#272727',
      opacity: 1
  },
  commonDivider:{
    background: '#007979 0% 0% no-repeat padding-box',
    opacity: 1
  },
  file:{
    backgroundColor:'#009393',
    color:'#FFFFFF'
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
  const [account,setAccount] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const [dbInfo,setDbInfo] = useState([])

  const handleDatabase = () =>{
    const ref = db.collection('User')
    const info = []
    ref.get().then(querySnapshot=>{
      querySnapshot.forEach(doc => {
        info.push(doc.data())
        
      });
      setDbInfo(info)
    })
    
  }

  const changeAccount = (e) =>{
     const acc = e.target.value
     if(acc){
        setAccount(acc)
     }
  }
  const changePassword = (e) =>{
    const pass = e.target.value
    if(pass){
       setPassword(pass)
    }
  }
  const changeName = (e) =>{
    const na = e.target.value
    if(na){
       setName(na)
    }
  }

  
  const createAccount = () => {
      auth.createUserWithEmailAndPassword(account,password ).then(x=>{
        alert(`註冊成功 : ${account}`)
      }).catch(y=>{
        alert(y.message)
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
      user.updateProfile(profile).then(function() {
      //將修改資料傳回firebase
      alert('Modify Success!')
      return user.updateProfile({'displayName': name, 'phoneNumber':'0988895303'});
   
    }).catch(function(error) {
      //修改資料未成功的錯誤訊息
      var errorMessage = error.message;
      alert('profile error',errorMessage)
    });

  }

  const loginAccount = () =>{
      auth.signInWithEmailAndPassword(account, password).then( user => {
        //登入成功
        alert(`login success, UserAccount is ${user.user.email}`);
      }).catch(function(error) {
        //登入錯誤訊息
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const getCurrentUser = () =>{
      const user = auth.currentUser;
      alert(`User name = ${user.displayName}, User email = ${user.email}` )
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
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} className={classes.mainContainer}>
          <Grid item container lg={6}>
            <Grid item container justify='space-between' style={{width:'95%',marginTop:'17px'}} >
              <Grid item lg md sm xs={12}>
                  <Grid container direction='column' alignItems='center' className={classes.infoCotainer}>
                      <Grid item container justify='space-between' style={{marginTop:'20px',width:'95%'}}>
                          <Grid item >
                              <Typography className={classes.mdWord}>Firebase登入</Typography>
                          </Grid>
                          <Grid item >
                              <Typography style={{color:'#A2A6BB'}} className={classes.smWord}>| 更多訊息</Typography>
                          </Grid>
                      </Grid>
                      <Grid item style={{width:'95%',marginTop:'15px'}}>
                          <Divider className={classes.commonDivider}/>  
                      </Grid>

                      <Grid item container direction='row' style={{width:'95%',marginTop:'10px'}} spacing={4}>
                          <Grid item >
                            <Button onClick={()=>createAccount()} variant="contained" color="secondary">
                              Sign Up
                            </Button>
                          </Grid>
                          <Grid item >
                            <Button onClick={()=>loginAccount()} variant="contained" color="secondary">
                              Login
                            </Button>
                          </Grid>
                          <Grid item >
                            <Button onClick={()=>updateAccount()} variant="contained" color="secondary">
                              Update Auth
                            </Button>
                          </Grid>
                          <Grid item >
                            <Button onClick={()=>getCurrentUser()} variant="contained" color="secondary">
                              Current User
                            </Button>
                          </Grid>
                      </Grid>
                      <Grid item container direction='row' style={{ marginTop:'20px'}}>
                          <Grid item  style={{marginLeft:'40px',marginTop:'20px'}}>
                              <Typography className={classes.smWord}>Email</Typography>
                              <TextField className={classes.inputText} onChange={(e)=>changeAccount(e)} variant="outlined" />
                          </Grid>
                          <Grid item style={{marginTop:'20px',marginLeft:'40px'}}>
                              <Typography className={classes.smWord}>密碼</Typography>
                              <TextField className={classes.inputText}  onChange={(e)=>changePassword(e)} variant="outlined" />
                          </Grid>
                          <Grid item style={{marginTop:'20px',marginLeft:'40px'}}>
                              <Typography className={classes.smWord}>名稱</Typography>
                              <TextField className={classes.inputText}  onChange={(e)=>changeName(e)} variant="outlined" />
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container lg={6}>
            <Grid item container justify='space-between' style={{width:'95%',marginTop:'17px'}} >
              <Grid item lg md sm xs={12}>
                  <Grid container direction='column' alignItems='center' className={classes.infoCotainer}>
                      <Grid item container justify='space-between' style={{marginTop:'20px',width:'95%'}}>
                          <Grid item >
                              <Typography className={classes.mdWord}>Firebase DB</Typography>
                          </Grid>
                          <Grid item >
                              <Typography style={{color:'#A2A6BB'}} className={classes.smWord}>| 更多訊息</Typography>
                          </Grid>
                      </Grid>
                      <Grid item style={{width:'95%',marginTop:'15px'}}>
                          <Divider className={classes.commonDivider}/>  
                      </Grid>

                      <Grid item container direction='row' style={{width:'95%',marginTop:'10px'}} spacing={4}>
                          <Grid item >
                            <Button onClick={()=>handleDatabase()} variant="contained" color="secondary">
                              Database Show Data
                            </Button>
                          </Grid>
                      </Grid>
                      <Grid item container direction='row' style={{ marginTop:'20px'}}>
                           {dbInfo.length >0 ? 
                              dbInfo.map(x=>{
                                return(
                                <Typography key={x} style={{color:'#A2A6BB'}} className={classes.smWord}> {JSON.stringify(x)}</Typography>
                                )
                              })
                              
                           :''
                           }
                      </Grid>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container lg={6}>
            <Grid item container justify='space-between' style={{width:'95%',marginTop:'17px'}} >
                <Grid item lg md sm xs={12}>
                    <Grid container direction='column' alignItems='center' className={classes.infoCotainer}>
                        <Grid item container justify='space-between' style={{marginTop:'20px',width:'95%'}}>
                            <Grid item >
                                <Typography className={classes.mdWord}>Firebase Storage</Typography>
                            </Grid>
                            <Grid item >
                                <Typography style={{color:'#A2A6BB'}} className={classes.smWord}>| 更多訊息</Typography>
                            </Grid>
                        </Grid>
                        <Grid item style={{width:'95%',marginTop:'15px'}}>
                            <Divider className={classes.commonDivider}/>  
                        </Grid>

                        <Grid item container direction='row' style={{width:'95%',marginTop:'10px'}} spacing={4}>
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
                        <Grid item container spacing={2} direction='row' style={{width:'95%',marginTop:'10px'}} >

                            {fileList.map(x=>{
                              console.log(x)
                              return(
                                <Grid item key={x} lg={3}>
                                  <Button startIcon={<InsertDriveFileIcon />} onClick={()=>downloadFile(x)} className={classes.file}variant="contained" >
                                    {x}
                                  </Button>
                                </Grid>
                              )

                            })}
                        </Grid>
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      
      

    </ThemeProvider>
  );
}

export default App;
