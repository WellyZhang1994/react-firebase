import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#0B72B9'
const arcOrange = '#FFBA60'
const arcGrey = '#866666'

export default  createMuiTheme({
    palette: {
        common:{
            
        },
        primary:{
           
        },
        secondary:{
          
        }
    },
    typography:{
        h2:{

        },
        h3:{
           
        },
        h4:{
         
        },
        body2:{
         
        }, 
        subtitle1:{
           
        },
        subtitle2:{
            
        },
        tab:{
         
        },
        estimate:{
            
        }
    },
    overrides:{
        MuiInputLabel:{
            root:{
                color:arcBlue,
                fontSize:'1rem'
            }
        },
        MuiInput:{
            root:{
                color:arcGrey,
                fontWeight:300
            },
            underline:{
                "&:before":{
                    borderBottom: `2px solid ${arcBlue}`
                },
                "&:hover:not($disabled):not($focused):not($error):before":{
                    borderBottom: `2px solid ${arcBlue}`
                }
            }
        }
    }
})
