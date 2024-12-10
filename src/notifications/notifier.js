const HangspotEvent = {
    System: 'system',
    Like: 'like',
    Save: 'save',
    Spot: 'spot',
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class Notifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.recieveEvent(new EventMessage('Hangspot,', HangspotEvent.System, { msg: 'connected'}));
        };
        this.socket.onclose = (event) => {
            this.recieveEvent(new EventMessage('Hangspot', HangspotEvent.System, {msg: 'disconnected'}))
        };
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.recieveEvent(event);
            } catch {}
        };
    }

    broadcastEvent(from, type, value) {
        const event = new HangspotEvent(from, type, value);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler)
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    recieveEvent(event) {
        this.events.push(event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }
}

const notifier = new Notifier();
export {HangspotEvent, notifier};