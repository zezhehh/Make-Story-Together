from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json

class StoryConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.story_id = self.scope['url_route']['kwargs']['story_id']

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        pass

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print('receive', text_data_json)
        pass
