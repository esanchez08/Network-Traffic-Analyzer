# Network Traffic Analyzer

A Python-based network monitoring tool that captures live packets, identifies protocols, and detects suspcious 
network behavior in real time.

## Features
** Live Packet Sniffing ** - Monitors local networks using [Scapy][http://scapy.net]
** Protocol Identification ** - Classifies packets by protocol (HTTP,HTTPS,ARP,DNS,etc.)
** Suspicious Activity Detection ** :
    - unusual number of requests from one IP
    - Non-HTTPS
    - Possible ARP spoofing attempts
** Extensible Architecture ** - Ready for dashboard visualization 

## Tech Stack
** Languages **: Python 3
** Libraries **: Scapy
** Optional Extensions **: Flask,pyshark

## Installation
# Clone the repository
git clone https://github.com/esanchez08/Network-Traffic-Analyzer.git
cd Network-Traffic-Analyzer

# (Optional) Create a virtual environment
python3 -m venv venv
source venv/bin/activate  # macOS/Linux

# Install dependencies
python3 -m pip install -r requirements.txt

# To use packet sniffing:
sudo python3 sniffer.py
