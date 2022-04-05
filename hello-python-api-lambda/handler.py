import json


def hello(event, context):
    response = {
        "statusCode": 200,
        "body": json.dumps(event['queryStringParameters'], indent=4, sort_keys=True, ensure_ascii=False)
        # "body": json.dumps(body, indent=4, sort_keys=True, ensure_ascii=False)
    }

    if event['queryStringParameters'] == None:
        print('No parameters')
        
        response = {
            "statusCode": 403,
            "body": "Not allowed"
        }

    return response

