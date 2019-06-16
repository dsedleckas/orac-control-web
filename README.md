# orac-control-web

> Client for ORAC synth

## Build Setup

### Web client
``` bash
# install client dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# start BACKEND dev server for simple Socket.IO OSC
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For production use copy `./dist` contents to `./client`

### Server OSC <-> Socket.IO 
```bash
cd ./backend/relay
pip3 install -r requirements.txt
python3 main.py
```

### Automatically launch as a service (on your rPi)
`./install-orac-control-web.sh`
