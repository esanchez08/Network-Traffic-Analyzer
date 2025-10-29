from scapy.all import sniff, IP, TCP, ARP
from collections import defaultdict
import json, time, threading, os

packet_count = defaultdict(int)
arp_table = {}
alerts = []
last_reset = time.time()
RESET_INTERVAL = 10
DATA_FILE = "data/traffic.json"

def analyze_packet(packet):
    global last_reset

    if time.time() - last_reset > RESET_INTERVAL:
        save_data()
        packet_count.clear()
        last_reset = time.time()

    
    if packet.haslayer(IP):
        src = packet[IP].src
        dst = packet[IP].dst
        packet_count[src] += 1

        if packet_count[src] > 50:  # Example threshold
            alerts.append(f"[ALERT 🚨] High traffic from {src}")

        if packet.haslayer(TCP) and packet[TCP].dport == 80:
            alerts.append(f"[WARNING ⚠️] Non-HTTPS traffic {src} → {dst}")

    
    if packet.haslayer(ARP):
        src_ip = packet[ARP].psrc
        src_mac = packet[ARP].hwsrc
        if src_ip in arp_table and arp_table[src_ip] != src_mac:
            alerts.append(f"[ALERT 🚨] Possible ARP spoofing: {src_ip} now uses {src_mac}")
        arp_table[src_ip] = src_mac

def save_data():
    os.makedirs("data", exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump({"packet_count": dict(packet_count), "alerts": alerts[-10:]}, f, indent=2)

def start_sniffer():
    sniff(prn=analyze_packet, store=False)

if __name__ == "__main__":
    print("🧠 Starting packet sniffer...")
    threading.Thread(target=start_sniffer, daemon=True).start()
    while True:
        save_data()
        time.sleep(5)