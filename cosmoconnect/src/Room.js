import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
    useEffect(() => {
        const getUrlParams = (url) => {
            const urlStr = url.split('?')[1];
            const urlSearchParams = new URLSearchParams(urlStr);
            const result = Object.fromEntries(urlSearchParams.entries());
            return result;
        };

        const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
        const userID = Math.floor(Math.random() * 10000) + "";
        const userName = "userName" + userID;
        const appID = 0000; //Add your appID from Zegocloud account project
        const serverSecret = "SomeSecretCode"; //Add your ServerSecret from Zegocloud account project
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: document.querySelector("#root"),
            sharedLinks: [{
                name: 'Personal link',
                url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
            }],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 50,
            layout: "Auto",
            showLayoutButton: true,
        });
    }, []
    
    );

    return (
        <div>
            <head>
                <style>
                    {`
                        #root {
                            width: 100vw;
                            height: 100vh;
                        }
                    `}
                </style>
            </head>
            <div id="root"></div>
        </div>
    );
};

export default Room;
