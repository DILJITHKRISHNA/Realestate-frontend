import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function VideoCall() {
  const user = useSelector(state => state.user.userInfo);
  const current = useLocation();
  const { currentUser } = useParams();

  const queryParams = new URLSearchParams(location.search);
  let roomId = queryParams.get("roomId") || ""; 
  let receiverId = queryParams.get("receiverId") || ""; 

  let data = current.state?.data || {}; 
  receiverId = data.receiverDetails || receiverId; 

  console.log(roomId, "room iddd ");
  console.log(receiverId, "receiver i d");

  let myMeeting = async (element) => {
    if (user.id === currentUser) {
      const appID = 1717884966;
      const serverSecret = "22ba1f10b154c4f2f937f4ecf9fea8c6";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        receiverId,
        Date.now().toString(),
        user.username
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.origin + window.location.pathname + '?roomID=' + roomId, 
          },
        ],
      });
    } else {
      toast.error("Invalid user Link!");
    }
  };

  return (
    <div className="mt-[3rem] flex justify-center">
      <div className='h-screen w-screen' ref={myMeeting} />
    </div>
  );
}

export default VideoCall;