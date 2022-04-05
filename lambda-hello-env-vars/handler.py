import json
import os

def run(event, context):
    MY_VAR = os.environ['MY_VAR']

    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "MY_VAR": MY_VAR
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response