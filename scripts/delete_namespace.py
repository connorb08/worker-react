import sys
import json
import subprocess

def main(env):

    targets = []
    delete_ids = []

    if env == "production":
        targets.append("__beta-connorbray-net-production-workers_sites_assets")
        targets.append("__beta-connorbray-net-production-workers_sites_assets_preview")
    elif env == "development":
        targets.append("__beta-connorbray-net-development-workers_sites_assets")
        targets.append("__beta-connorbray-net-development-workers_sites_assets_preview")
    else:
        print('Invalid environment')

    try: 

        data = json.load(sys.stdin)

        for binding in data:
            name = binding['title']
            if name in targets:
                delete_ids.append(binding['id'])
        
        for id in delete_ids:
            subprocess.run(['wrangler', 'kv:namespace', 'delete', '--namespace-id', id])

    except:
        print('Error fetching data!')

    



if __name__ == '__main__':
    main(sys.argv[1])