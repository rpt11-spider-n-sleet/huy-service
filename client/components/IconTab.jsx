import React from 'react';
import { Button } from 'reactstrap';
import TiMediaPlayOutline from 'react-icons/lib/ti/media-play-outline';
import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import IoSocialBufferOutline from 'react-icons/lib/io/social-buffer-outline';
import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import IoIosPaperplaneOutline from 'react-icons/lib/io/ios-paperplane-outline';
import axios from 'axios';




class IconTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            numOfComments: 0,
            numOfCollection: 0
        }
    }

    shortenNum(num) {
        const stringifiedNum = num;
        if (stringifiedNum.length >= 7 && stringifiedNum.length < 10) {
            const milDigit = stringifiedNum.slice(0, stringifiedNum.length - 4);
            return this.convertMilToString(stringifiedNum, milDigit);
        } else if (stringifiedNum.length >= 10 && stringifiedNum.length < 13) {
            const bilDigit = stringifiedNum.slice(0, stringifiedNum.length - 7)
            return this.convertBilToString(stringifiedNum, bilDigit);
        } else if (stringifiedNum.length >= 4 && stringifiedNum.length < 7) {
            const kDigit = stringifiedNum.slice(0, stringifiedNum.length - 1)
            return this.convertThousandToString(stringifiedNum, kDigit);
        } else {
            return num
        }

    }

    convertMilToString(stringifiedNum, milDigit) {
        if (Number(milDigit[milDigit.length - 1]) >= 5) {
            let newNum = Number(milDigit.slice(0, milDigit.length - 1)) + 1;
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' M';
        } else {
            let newNum = Number(milDigit.slice(0, milDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' M';
        }
    }

    convertBilToString(stringifiedNum, bilDigit) {
        if (Number(bilDigit[bilDigit.length - 1]) >= 5) {
            console.log('last digit >5')
            let newNum = Number(bilDigit.slice(0, bilDigit.length - 1)) + 1;
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' B';
        } else {
            let newNum = Number(bilDigit.slice(0, bilDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' B';
        }

    }

    convertThousandToString(stringifiedNum, kDigit) {
        if (stringifiedNum.length === 4) {
            let newNum = Number(kDigit.slice(0, kDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' K';
        } else {
            if (Number(kDigit[kDigit.length - 1]) >= 5) {
                let newNum = Number(kDigit.slice(0, kDigit.length - 1)) + 1;
                let newArr = newNum.toString().split('');
                newArr.splice(newArr.length - 1, 0, ".")
                return newArr.join('') + ' K';
            } else {
                let newNum = Number(kDigit.slice(0, kDigit.length - 1));
                let newArr = newNum.toString().split('');
                newArr.splice(newArr.length - 1, 0, ".")
                return newArr.join('') + ' K';
            }
        }
    }

    getNumOfComments(video_id) {
        axios.get(`http://localhost:8081/comments/${video_id}`).then((data)=>{
            this.setState({
                numOfComments: data.data.length
            })
        })
    }

    // getNumOfCollections(video_id) {
    //     axios.get(`http://localhost:8080/collections/${video_id}`).then((data)=>{
    //         this.setState({
    //             numOfComments: data.data.length
    //         })
    //     })
    // }

    componentWillMount() {
        this.getNumOfComments(10);
        // this.getNumOfCollections(10)
    }

    render() {
        return (
            <div style={{float: 'left'}}>
                <Button style={{backgroundColor:'white', borderColor:'white', width: '10em'}}>
                    <TiMediaPlayOutline style={{color: 'black', width:'2em', height:'2em'}}/>
                    <div style={{display:'inline', color: 'black'}}>{this.shortenNum(this.props.data.plays)}</div>
                </Button>
                &nbsp;
                <Button style={{backgroundColor:'white', borderColor:'white', width: '10em'}}>
                    <TiHeartOutline style={{color: 'black', width:'1.75em', height:'2em'}}/>
                    <div style={{display:'inline', color: 'black'}}>{" "+this.shortenNum(this.props.data.plays)}</div>
                </Button>
                &nbsp;
                <Button style={{backgroundColor:'white', borderColor:'white', width: '10em'}}>
                    <IoSocialBufferOutline style={{color: 'black', width:'1.75em', height:'2em'}}/>
                    <div style={{display:'inline', color: 'black'}}>{" "+this.state.numOfCollection}</div>
                </Button>
                &nbsp;
                <Button style={{backgroundColor:'white', borderColor:'white', width: '10em'}}>
                    <MdChatBubbleOutline style={{color: 'black', width:'1.75em', height:'2em'}}/>
                    <div style={{display:'inline', color: 'black'}}>{" "+this.state.numOfComments}</div>
                </Button>
                <Button style={{backgroundColor:'rgb(238, 241, 242)', borderColor:'white', width: '7em', float:'right'}}>
                    <IoIosPaperplaneOutline style={{color: 'black', width:'1.75em', height:'2em'}}/>
                    <div style={{display:'inline', color: 'black'}}>{" Share"}</div>
                </Button>
            </div>
        )
    }

}

export default IconTab;