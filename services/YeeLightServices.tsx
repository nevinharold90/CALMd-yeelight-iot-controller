import UdpSocket from 'react-native-udp';
import { Buffer } from 'buffer';

const DISCOVERY_IP = '239.255.255.250';
const DISCOVERY_PORT = 1982;

// 🎯 TARGET LOCK: Replace this with the ID you see in your console logs 
// It usually looks like "0x0000000005243f"
const MY_TARGET_ID = "0x0000000004d6654"; 

export const discoverAndFilterBulb = (onTargetFound: (ip: string) => void) => {
    const socket = UdpSocket.createSocket({ type: 'udp4' });

    const message = Buffer.from(
        'M-SEARCH * HTTP/1.1\r\n' +
        'HOST: 239.255.255.250:1982\r\n' +
        'MAN: "ssdp:discover"\r\n' +
        'ST: wifi_bulb\r\n'
    );

    socket.on('message', (msg, rinfo) => {
        const response = msg.toString();
        
        // Regex to extract the ID and the IP from the 'Location' header
        const idMatch = response.match(/id: (0x[0-9a-fA-F]+)/);
        const locationMatch = response.match(/Location: yeelight:\/\/([\d\.]+):/);

        if (idMatch && locationMatch) {
            const bulbId = idMatch[1];
            const bulbIp = locationMatch[1];

            console.log(`--- Device Spotted ---`);
            console.log(`ID: ${bulbId} | IP: ${bulbIp}`);

            // 🛡️ THE FILTER: Only trigger the callback if it's YOUR bulb
            if (bulbId.toLowerCase().includes("4d6654")) { // Using end of your MAC
                console.log("✅ Target Verified. Connecting...");
                onTargetFound(bulbIp);
                socket.close(); // Stop searching once found
            }
        }
    });

    socket.bind(0);

    socket.send(message, 0, message.length, DISCOVERY_PORT, DISCOVERY_IP, (err) => {
        if (err) console.error('UDP Shout failed', err);
    });

    setTimeout(() => {
        try { socket.close(); } catch (e) {}
    }, 10000);
};