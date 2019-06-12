from aiohttp import web
import socketio
import asyncio

from pythonosc.udp_client import SimpleUDPClient
from pythonosc.osc_server import AsyncIOOSCUDPServer
from pythonosc.dispatcher import Dispatcher

ORAC_IP='127.0.0.1'
ORAC_PORT=6100
ORAC_LISTEN_PORT=6009
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

def oracMessageHandler(address, *args):
    q.put_nowait((address[1:], args))

dispatcher = Dispatcher()
dispatcher.set_default_handler(oracMessageHandler)

oracServerTransport = None
async def runUdpServer():
    print('Starting OSC UDP server')
    server = AsyncIOOSCUDPServer(('0.0.0.0', ORAC_LISTEN_PORT), dispatcher, loop)
    global oracServerTransport
    oracServerTransport, protocol = await server.create_serve_endpoint()  
    print('OSC UDP server stopped')

async def stopUdpServer():
    oracServerTransport.close()  # Clean up serve endpoint

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
    site = web.TCPSite(runner, 'localhost', SOCKET_PORT)
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