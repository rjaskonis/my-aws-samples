import subprocess
import json

push = subprocess.run(("aws ecr-public describe-repositories").split(" "), stdout=subprocess.PIPE)

result = json.loads(push.stdout)

repositories = result.get('repositories')

for repository in repositories:
    print(repository)