import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BsFillStarFill } from "react-icons/bs";
import Fade from 'react-reveal/Fade';



function Assets({ thumbnail, change, itemloading, assetsByCollections }) {

    const useStyles = makeStyles((theme) => ({

        empty: {
            display: "flex",
            paddingTop: "10%",
            justifyContent: "center",
            textAlign: "center",
            color:"white",
            [theme.breakpoints.down('sm')]: {
                fontSize: "10px",
                marginLeft: "25%"
            },
        },

        data: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingTop: "3%",
            flexWrap: "wrap",
            marginLeft: "20%",
            [theme.breakpoints.down('md')]: {
                paddingTop: "7%"
            },
            [theme.breakpoints.down('sm')]: {
                marginLeft: "25%",
                paddingTop: "17%"
            },
        },

        card: {
            width: "30%",
            marginTop: "5%",
            minHeight: 400,
            cursor: "default",
            marginBottom: "1vh",
            border: "3px outset black",
            [theme.breakpoints.down('md')]: {
                width: "45%",
                height: "400px"
            },
            [theme.breakpoints.down('sm')]: {
                width: "75%",
            },
        },
    }));

    const classes = useStyles();

    if (itemloading) {
        return <Box className={classes.empty}><ReactLoading type="spokes" height={100} width={50} /></Box>
    } else if (assetsByCollections.length === 0) {
        return <Box className={classes.empty}><h2>Please click on a Collection</h2></Box>
    }
    return (
        <Box className={classes.data}>
            {assetsByCollections
                .map((item, index) => (
                    thumbnail[item.collectionId - 1] === item.path ?
                        (
                            <Card key={index} style={{ border: "2px outset blue",borderRadius:"5%" }} className={classes.card}>
                                <Fade>
                                    <CardActionArea disableRipple={true} style={{ cursor: "default" }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <BsFillStarFill style={{ fontSize: "20px", color: "blue" }} />
                                            <BsFillStarFill style={{ fontSize: "20px", color: "blue" }} />
                                            <BsFillStarFill style={{ fontSize: "20px", color: "blue" }} />
                                        </Typography>
                                        <img alt="img" src={require(`../data/images/${item.path}`)} />
                                        <CardContent>
                                            <Typography style={{ textDecoration: "underline",fontWeight:"bold",fontStyle:"italic" }} gutterBottom variant="h5" component="h2">
                                                {item.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Button disabled={true} style={{ marginBottom: "5%" }} onClick={() => change(item)} variant="contained" color="primary">
                                        Thumbnail
                                    </Button>
                                </Fade>
                            </Card>
                        )
                        :
                        (<Card key={index} className={classes.card}>
                            <Fade>
                                <CardActionArea disableRipple={true} style={{ cursor: "default" }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.id}
                                    </Typography>
                                    <img alt="img" src={require(`../data/images/${item.path}`)} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <Button style={{ marginBottom: "5%" }} onClick={() => change(item)} variant="contained" color="primary">
                                    Make Master
                                </Button>
                            </Fade>
                        </Card>)
                ))
            }
        </Box >
    )
}

export default Assets;
