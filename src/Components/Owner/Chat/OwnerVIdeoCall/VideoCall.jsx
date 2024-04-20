import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function VideoCall() {
    const { senderId } = useParams();
    console.log(senderId,"senderidd");
    const owner = useSelector(state => state.owner.OwnerInfo);
    // const data = current.state?.data || "";
    // const receiverDetails = data[1];
    // const senderDetails = data[0];

    // let roomId, receiverId;
    // if (!data) {
    //     const queryParams = new URLSearchParams(location.search);
    //     roomId = queryParams.get("roomId");
    //     receiverId = queryParams.get("receiverId");
    // } else {
    //     roomId = senderDetails.toString();
    //     receiverId = receiverDetails.toString();
    // }

    // console.log("Data:", current);
    // console.log("Room ID:", roomId);
    // console.log("Receiver ID:", receiverId);
    // useEffect(() => {
    
    //     if (roomId) { 
    //         const element = document.getElementById("videoCallContainer");
    //         myMeeting(element, roomId); 
    //     }
    // }, [roomId, senderId, owner, receiverId]);

    let myMeeting = async (element) => { 
        if (owner.id === senderId) {
            const appID = 1717884966;
            const serverSecret = "22ba1f10b154c4f2f937f4ecf9fea8c6";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                senderId,
                Date.now().toString(),
                owner.username
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: element,
                sharedLinks: [
                  {
                    name: "Copy Link",
                    url: `https://varlet-frontend.vercel.app/owner/${senderId}`,
                    // url: `http://localhost:5173/owner/${senderId}`,
                  },
                ],
                scenario: {
                  mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: true,
              });
        } else {
            toast.error("Invalid user Link!");
        }
    };

    return (
        <div className="mt-[3rem]">
            <div id="videoCallContainer" className="w-screen h-screen" ref={myMeeting} />
        </div>
    );
}

export default VideoCall;
