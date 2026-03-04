import UdpSocket from 'react-native-udp';
import { Buffer } from 'buffer';
import TcpSocket from 'react-native-tcp-socket';


const DISCOVERY_IP = '239.255.255.250';
const DISCOVERY_PORT = 1982;

// 🎯 TARGET LOCK: The last 6 characters of your MAC address
const TARGET_ID_SUFFIX = "1b193e40";

export const discoverAndFilterBulb = (
    onSuccess: (ip: string) => void,
    onError: (errorMsg: string) => void // 🚨 Added error handling for the UI
) => {
    const socket = UdpSocket.createSocket({ type: 'udp4' });
    let isFound = false; // Flag to prevent multiple triggers

    const message = Buffer.from(
        'M-SEARCH * HTTP/1.1\r\n' +
        'HOST: 239.255.255.250:1982\r\n' +
        'MAN: "ssdp:discover"\r\n' +
        'ST: wifi_bulb\r\n'
    );

    socket.on('message', (msg) => {
        if (isFound) return; // Ignore if we already locked onto the target

        const response = msg.toString();
        
        // Regex to extract the ID and the IP from the 'Location' header
        const idMatch = response.match(/id: (0x[0-9a-fA-F]+)/i);
        const locationMatch = response.match(/Location: yeelight:\/\/([\d\.]+):/i);

        if (idMatch && locationMatch) {
            const bulbId = idMatch[1].toLowerCase();
            const bulbIp = locationMatch[1];

            console.log(`--- Device Spotted ---`);
            console.log(`ID: ${bulbId} | IP: ${bulbIp}`);

            // 🛡️ THE FILTER: Use the constant instead of a hardcoded string
            if (bulbId.includes(TARGET_ID_SUFFIX)) {
                console.log(`✅ Target Verified! MAC matched. IP locked to: ${bulbIp}`);
                isFound = true;
                onSuccess(bulbIp);
                
                try {
                    socket.close(); // Clean up the network port
                } catch (e) {
                    console.log("Socket close cleanup:", e);
                }
            }
        }
    });

    // Handle unexpected network errors
    socket.on('error', (err) => {
        console.error('UDP Socket Error:', err);
        onError(err.message);
        socket.close();
    });

    socket.bind(0, () => {
        // Send the "Shout" only after the socket is successfully bound
        socket.send(message, 0, message.length, DISCOVERY_PORT, DISCOVERY_IP, (err) => {
            if (err) {
                console.error('UDP Shout failed', err);
                onError("Failed to broadcast on network.");
            } else {
                console.log('🗣️ Broadcasting search for MAC ending in:', TARGET_ID_SUFFIX);
            }
        });
    });

    // ⏱️ THE FAILSAFE: If 5 seconds pass and no bulb answered, tell the UI to show an error
    setTimeout(() => {
        if (!isFound) {
            console.log("❌ Search timeout: Target bulb not found.");
            onError("Bulb not found. Ensure it is powered on and connected to the same network.");
            try { socket.close(); } catch (e) {}
        }
    }, 5000); // 5 seconds is plenty of time for a local UDP response

};

let persistentClient: any = null; 
let currentConnectedIp: string | null = null; // Track WHICH bulb we are talking to

export const sendColorCommand = (ip: string, payload: string) => {
    // 1. If the IP changed OR the socket died, we MUST reset
    if (persistentClient && (currentConnectedIp !== ip || persistentClient.destroyed)) {
        console.log("🔄 IP changed or socket died. Resetting connection...");
        persistentClient.destroy();
        persistentClient = null;
    }

    // 2. If healthy and same IP, send instantly
    if (persistentClient && !persistentClient.destroyed) {
        console.log("⚡ Instant Send (Hotline Active)");
        persistentClient.write(payload);
        return;
    }

    // 3. First time connection logic
    currentConnectedIp = ip;
    console.log(`🔌 Establishing Hotline to: ${ip}`);
    
    persistentClient = TcpSocket.createConnection({ port: 55443, host: ip }, () => {
        // This makes the data send the millisecond you call .write()
        persistentClient.setNoDelay(true); 
        persistentClient.write(payload); 
    });

    persistentClient.on('data', (data: any) => {
        console.log('💡 Bulb Replied:', data.toString());
    });

    persistentClient.on('error', (error: any) => {
        console.error('❌ Hotline Error:', error);
        persistentClient.destroy();
        persistentClient = null;
    });

    // Handle sudden disconnects (like if someone flips the light switch)
    persistentClient.on('close', () => {
        console.log('🔌 Hotline Closed');
        persistentClient = null;
    });
};