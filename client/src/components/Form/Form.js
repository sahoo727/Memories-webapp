import React,{useState} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles';
function Form(){
    const [postData,setPostData] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    });
    const classes = useStyles();
    const handleSubmit = () =>{}
    const clear = () => {}
    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>Creating a Memory</Typography>
                <TextField 
                    name='creator' 
                    variant='outlined' 
                    label='Creator' 
                    fullWidth 
                    value={postData.creator} 
                    onChange={(e)=>setPostData({...postData,creator:e.target.value})}           //... means that we are sending entire array of data, but here since wee explicity mentioned creator only that value will change rest all will remain the same
                />

                <TextField 
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth 
                    value={postData.title} 
                    onChange={(e)=>setPostData({...postData,title:e.target.value})}
                />

                <TextField 
                    name='message' 
                    variant='outlined' 
                    label='message' 
                    fullWidth 
                    value={postData.message} 
                    onChange={(e)=>setPostData({...postData,message:e.target.value})}
                />

                <TextField 
                    name='taggs' 
                    variant='outlined' 
                    label='Tags' 
                    fullWidth 
                    value={postData.tags} 
                    onChange={(e)=>setPostData({...postData,tags:e.target.value})}
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile:base64 })}
                    />
                </div>

                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth
                > Submit</Button>

                <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear}
                    fullWidth
                > Clear </Button>
            </form>
        </Paper>
    );
} 

export default Form;