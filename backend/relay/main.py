from aiohttp import web
import socketio
import asyncio

from pythonosc.udp_client import SimpleUDPClient
from pythonosc.osc_server import AsyncIOOSCUDPServer
from pythonosc.dispatcher import Dispatcher

ORAC_IP='127.0.0.1'
ORAC_PORT=6100
ORAC_LISTEN_PORT=6009
SOCKET_LISTEN_IP='0.0.0.0'
SOCKET_PORT=8080

#
# Message queue for ORAC messages
#

q = asyncio.Queue()

#
# Async event loop
#

loop = asyncio.get_event_loop()

#
# ORAC UDP client
#

oracClient = SimpleUDPClient(ORAC_IP, ORAC_PORT)  # Create client

#
# ORAC UDP listener
#

def oracMessageHandler(address, args=''):
    print(address[1:])
    print(args)
    q.put_nowait((address[1:], args))

dispatcher = Dispatcher()
dispatcher.set_default_handler(oracMessageHandler)

oracServerTransport = None
async def runUdpServer():
    print('Starting OSC UDP server')
    server = AsyncIOOSCUDPServer((SOCKET_LISTEN_IP, ORAC_LISTEN_PORT), dispatcher, loop)
    global oracServerTransport
    oracServerTransport, protocol = await server.create_serve_endpoint()  
    print('OSC UDP server started')

async def stopUdpServer():
    print('Stopping OSC UDP server')
    oracServerTransport.close()  # Clean up serve endpoint
    print('OSC UDP server stopped')


#
# Orac UDP message consumer
#

async def consume(queue, client):
    print('Starting consumption loop for UDP messages')
    while True:
        item = await queue.get()
        await client.emit(item[0], item[1])
        queue.task_done()

#
# Socket IO server
#

sio = socketio.AsyncServer(async_mode='aiohttp')
app = web.Application()
sio.attach(app)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on('OracConnect')
async def OracConnect(sid):
    print('OracConnect!')
    oracClient.send_message('/Connect', ORAC_LISTEN_PORT)
    await sio.emit('ORAC_CONNECTED', True)

@sio.on('/NavNext')
async def NavNext(sid, data):
    oracClient.send_message('/NavNext', 1)

@sio.on('/NavPrev')
async def NavPrev(sid, data):
    oracClient.send_message('/NavPrev', 1)

@sio.on('/NavActivate')
async def NavActivate(sid, data):
    oracClient.send_message('/NavActivate', 1)

@sio.on('/PagePrev')
async def PagePrev(sid, data):
    oracClient.send_message('/PagePrev', 1)

@sio.on('/PageNext')
async def PageNext(sid, data):
    oracClient.send_message('/PageNext', 1)

@sio.on('/ModuleNext')
async def ModuleNext(sid, data):
    oracClient.send_message('/ModuleNext', 1)

@sio.on('/ModulePrev')
async def ModuleNext(sid, data):
    oracClient.send_message('/ModulePrev', 1)

@sio.on('/P1Ctrl')
async def ModuleNext(sid, data):
    oracClient.send_message('/P1Ctrl', data)

@sio.on('/P2Ctrl')
async def P2Ctrl(sid, data):
    oracClient.send_message('/P2Ctrl', data)

@sio.on('/P3Ctrl')
async def P3Ctrl(sid, data):
    oracClient.send_message('/P3Ctrl', data)

@sio.on('/P4Ctrl')
async def P4Ctrl(sid, data):
    oracClient.send_message('/P4Ctrl', data)

@sio.on('/P5Ctrl')
async def P5Ctrl(sid, data):
    oracClient.send_message('/P5Ctrl', data)

@sio.on('/P6Ctrl')
async def P6Ctrl(sid, data):
    oracClient.send_message('/P6Ctrl', data)

@sio.on('/P7Ctrl')
async def P7Ctrl(sid, data):
    oracClient.send_message('/P7Ctrl', data)

@sio.on('/P8Ctrl')
async def P8Ctrl(sid, data):
    oracClient.send_message('/P8Ctrl', data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

# We kick off our server

runner = None
async def runSocketServer():
    print('Starting Socket IO server')
    global runner
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', SOCKET_PORT)
    await site.start()
    print('Socket IO server running')

async def stopSocketServer():
    print('Stopping Socket IO server')
    await runner.cleanup()
    print('Socket IO server stopped')


if __name__ == '__main__':
    try:
        loop.run_until_complete(runSocketServer())
        loop.run_until_complete(runUdpServer())
        loop.run_until_complete(consume(q, sio))
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    print('Stopping...')
    loop.run_until_complete(stopSocketServer())   
    loop.run_until_complete(stopUdpServer())
    q.join()    
    print('All complete!')