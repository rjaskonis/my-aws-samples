import json
import boto3
from boto3.session import Session

def handler(event, context):
    session = Session(region_name='sa-east-1')
    
    ec2 = session.client('ec2')
    described_volumes = ec2.describe_volumes()
    
    print('ec2:', ec2)
    print('described_volumes:', described_volumes)
    
    for volume in described_volumes['Volumes']:
        with open('local/{}.json'.format(volume['VolumeId']), 'w') as f:
            f.write(json.dumps(volume, default=str))

        created_snapshot = ec2.create_snapshot(Description='my first snapshot', VolumeId=volume['VolumeId'])
        snapshotId = created_snapshot['SnapshotId']

        created_tags = ec2.create_tags(Resources=[snapshotId], Tags=volume['Tags'])
        
        print(created_tags)



    # myFirstSnapshotId = 'snap-0db06cad922a08e2d'
    # created_tags = ec2.create_tags(Resources=[myFirstSnapshotId], Tags=[{
    #     'Key':'test',
    #     'Value': 'snap!!'
    # }])

    # print(created_tags)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
