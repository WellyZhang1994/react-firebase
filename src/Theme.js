import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#0B72B9'
const arcOrange = '#FFBA60'
const arcGrey = '#866666'

export default  createMuiTheme({
    palette: {
        common:{
            blue: `${arcBlue}`,
            orange: `${arcOrange}`
        },
        primary:{
            main: `${arcBlue}`
        },
        secondary:{
            main: `${arcOrange}`
        }
    },
    typography:{
        h2:{
            fontFamily:"Relway",
            fontWeight:700,
            color:`${arcBlue}`,
            fontSize: "2.5rem",
            lineHeight:1.5

        },
        h3:{
            fontFamily:'pacifico',
            fontSize:'2.5em',
            fontWeight:300,
            color:arcBlue
        },
        h4:{
            fontFamily:"Relway",
            fontWeight:700,
            color:`${arcBlue}`,
            fontSize: "1.75rem",
        },
        body2:{
            fontSize:'1.25rem',
            color: arcGrey,
            fontWeight:300

        }, 
        subtitle1:{
            fontSize: "1.25rem",
            fontWeight : 300,
            color : `${arcGrey}`
        },
        subtitle2:{
            fontSize: "1.25rem",
            fontWeight : 300,
            color : 'white'
        },
        tab:{
            fontFamily:'Raleway',
            textTransform:'none',
            fontWeight:700,
            fontSize: "1.1rem",
        },
        estimate:{
            fontFamily: "Roboto",
            fontSize:"1rem",
            textTransform:'none',
            color:"white"
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
