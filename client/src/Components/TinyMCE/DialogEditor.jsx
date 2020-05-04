import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Radio from '@material-ui/core/Radio';
import { green } from '@material-ui/core/colors';

import TinyEditor from './TinyEditor';
import { Grid, withStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
    backgroundColor:'red'
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  radio:{
    display:'flex',
    alignItems:'center',
  },
  radio_title:{
    fontFamily:'\'Barlow\', sans-serif'
  }
}));

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({handleClose,open,handleSubmitQues}) {
  const classes = useStyles();
  const [question,setQuestion] = useState({Question:'', Option1:'',Option2:'',Option3:'',Option4:'',answer:'Option1'})

  const [answer, setAnswer] = React.useState('Option1');

  const handleChange = ({target:{value}}) => {
    setAnswer(value)
    setQuestion({...question,answer:value})
  };

  const handleQuesState = (quesValue) =>{
    
    setQuestion({...question,...quesValue})
        
  }

  const processedQuestionState = () =>{
    const {Question,answer,...options} = question

    let processedQuestion={}
    const processedOption=Object.values({...options})

    processedQuestion={question:Question,options:[...processedOption],answer:question[answer]}

    return processedQuestion

  }

  return (
    <div className={classes.root}>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create Question And tick Answer
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>handleSubmitQues(processedQuestionState())}>
              Submit
            </Button>
          </Toolbar>
        </AppBar>
        <Grid item xs={12} style={{padding:'2rem'}}>
          <TinyEditor type='Question' handleQuesState={handleQuesState}/>
        </Grid>

        <div style={{display:'flex',flexWrap:'wrap'}}>
          <Grid item xs={6} style={{padding:'1em 3em'}}>  
            <div className={classes.radio}>
              <GreenRadio
                  checked={answer === 'Option1'}
                  onChange={handleChange}
                  value="Option1"
                  name="Option1"
                  inputProps={{ 'aria-label': 'Option1' }}
                /><Typography className={classes.radio_title}>OPTION-1</Typography>
            </div>
            <TinyEditor type='Option1' handleQuesState={handleQuesState}/>
          </Grid>

          <Grid item xs={6} style={{padding:'1em 3em'}}>
            <div className={classes.radio}>
              <GreenRadio
                checked={answer === 'Option2'}
                onChange={handleChange}
                value="Option2"
                name="Option2"
                inputProps={{ 'aria-label': 'Option2' }}
              /><Typography className={classes.radio_title}>OPTION-2</Typography>
            </div>
            <TinyEditor type='Option2' handleQuesState={handleQuesState}/>
          </Grid>

          <Grid item xs={6} style={{padding:'1em 3em'}}>
            <div className={classes.radio}>
              <GreenRadio
                checked={answer === 'Option3'}
                onChange={handleChange}
                value="Option3"
                name="Option3"
                inputProps={{ 'aria-label': 'Option3' }}
              /><Typography className={classes.radio_title}>OPTION-3</Typography>
            </div>
            <TinyEditor type='Option3' handleQuesState={handleQuesState}/>
          </Grid>

          <Grid item xs={6} style={{padding:'1em 3em'}}>
            <div className={classes.radio}>
              <GreenRadio
                checked={answer === 'Option4'}
                onChange={handleChange}
                value="Option4"
                name="Option4"
                inputProps={{ 'aria-label': 'Option4' }}
              /><Typography className={classes.radio_title}>OPTION-4</Typography>
            </div>
            <TinyEditor type='Option4' handleQuesState={handleQuesState}/>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
