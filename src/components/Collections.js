import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ReactLoading from 'react-loading';

function Collections({ thumbnail, itemloading, collections, loading, runAssetsByCollectionsId }) {

    const useStyles = makeStyles((theme) => ({

        sidebar: {
            height: "100%",
            width: "20%",
            position: "fixed",
            zIndex: 1,
            backgroundColor: "#111",
            paddingTop: "5px",
            [theme.breakpoints.down('sm')]: {
                width: "25%"
            },
        },
        link: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
            border: "none",
            background: "inherit",
            outline: "none",
            fontSize: "110%",
            marginBottom: 0,
            marginTop: "16px",
            textDecoration: "underline",
            transition:"transform 1s",
            '&:hover': {
                transform:"scale(1.1)"
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: "100%",
                paddingBottom: "5%",
            },
        },
        link2: {
            color: "white",
            cursor: "pointer",
            border: "none",
            background: "inherit",
            outline: "none",
            fontSize: "110%",
            [theme.breakpoints.down('sm')]: {
                display: "none"
            },
        },
        imgContainer: {
            width: "7vw",
            background: "white",
            [theme.breakpoints.down('sm')]: {
                width: "15vw",
                height: "15vw"
            },
        },
        img: {
            width: "auto",
            height: "7vw",
            [theme.breakpoints.down('sm')]: {
                height: "15vw"
            },
        },
        tags: {
            margin: 5,
            color: "black",
            backgroundColor: "white",
            borderRadius: 1
        }
    }));
    const classes = useStyles();


    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" className={classes.sidebar}><ReactLoading type="bars" color="white" height={100} width={50} /></Box>
    }
    return (
        <Box className={classes.sidebar}>
            <Box style={{ height: "100%" }} display="flex" justifyContent="space-around" flexDirection="column" alignItems="center">
                <h2 style={{ textDecoration: "underline", fontStyle: "italic", cursor: "default" }} className={classes.link}>Collections</h2>
                {collections.map((item, index) => {
                    // Recursive Tags // 
                    let tempData = item.tags
                    let tags = []
                    const getTag = (item) => {
                        if (item.hasOwnProperty('subTag') === true) {
                            tags.push(item.name)
                            getTag(item.subTag)
                        } else
                            tags.push(item.name)
                    }
                    getTag(tempData);
                    return (
                        <button
                            key={index}
                            disabled={itemloading}
                            onClick={() => runAssetsByCollectionsId(item.id)}
                            className={classes.link}>
                            <p className={classes.link}>{item.name}</p>
                            <p className={classes.link2}>
                                {tags.map((item, index) => {
                                    return <span key={index} className={classes.tags}>{item}</span>
                                })}
                            </p>
                            <div className={classes.imgContainer}><img className={classes.img} alt="img" src={require(`../data/images/${thumbnail[index]}`)} /></div>
                        </button>
                    )
                })}
            </Box>
        </Box>
    )
}

export default Collections;
