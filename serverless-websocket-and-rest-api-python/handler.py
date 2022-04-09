import os
import json
import boto3


def run(event, context):
    print('event:', json.dumps(event))

    isHttp = 'http' in event['requestContext']
    ws_endpoint = os.environ.get('WS_ENDPOINT')

    if isHttp:
        html = str

        with open("./index.html", "r") as page:
            # print(page.read())
            html = page.read()

        # print(html.replace("{endpointUrl}", ws_endpoint_url))

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/html"
            },
            "body": html.replace("{endpointUrl}", "wss://{}".format(ws_endpoint))
        }

    # websocket then

    routeKey = event['requestContext']['routeKey']
    connectionId = event['requestContext']['connectionId']
    # domainName = event['requestContext']['domainName']
    # stage = event['requestContext']['stage']
    # endpoint_url = 'https://3vlbalzss5.execute-api.sa-east-1.amazonaws.com/dev'
    # endpoint_url = 'https://{domainName}/{stage}'.format(
    #     domainName=domainName, stage=stage)

    if routeKey == 'message':
        print('**Message**')

        body = json.loads(event['body'])
        data = body['data'] if 'data' in body else None

        try:
            apigm = boto3.client('apigatewaymanagementapi',
                                endpoint_url="https://{}".format(ws_endpoint))

            if data != None:
                apigm.post_to_connection(
                    ConnectionId=connectionId, Data=b"Hello again! I'm some other message")
            else:
                apigm.post_to_connection(
                    ConnectionId=connectionId, Data=b"Hello from server running python")
        except Exception as e:
            print("Error on posting message to client:", e)

    response = {
        "statusCode": 200
    }

    return response
