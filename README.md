# orac-control-web

Web client for the ORAC [synth](https://github.com/TheTechnobear/Orac) to be run on the Raspberry PI. Installation tested and designed to work out of the box on the [Patchbox OS](https://blokas.io/patchbox-os/). Web client also includes UDP OSC <-> Socket.IO bridge and simple static file server.

## Install instructions
Application depends on `git`, `python3` (3.5) and `pip3`. 
On your rPi:
```bash
git clone https://github.com/dsedleckas/orac-control-web
cd ./orac-control-web
./install-orac-control-web.sh
```
Open http://\<rpi-ip-address\>:8080

## Development notes

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
# For production use copy `./dist` contents to `./client`
```


### Server OSC <-> Socket.IO 
```bash
cd ./backend
pip3 install -r requirements.txt
python3 main.py
```
