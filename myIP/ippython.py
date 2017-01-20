from json import load
from urllib2 import urlopen
import time
import subprocess



my_old=""
my_user="slobacartoonac"
my_pass="here goes password url_encoded"
my_repo="github.com/slobacartoonac/pythonium.git"
while 1:
    my_ip = load(urlopen('https://api.ipify.org/?format=json'))['ip']
    if(my_ip!=my_old):
        print my_ip
        f=open('myip.js','w');
        f.write('var my_ip_var=\''+my_ip+'\';')
        my_old=my_ip
        f.close()
        p = subprocess.Popen(
        	'git commit myip.js -m '+my_old,shell=True,stdout=subprocess.PIPE,
                stdin=subprocess.PIPE)
        for line in p.stdout.readlines():
            print line
        p.stdin.close()
        retval = p.wait()
        proc = subprocess.Popen(
            'git push --repo https://'+my_user+':'+my_pass+'@'+my_repo,shell=True,stdout=subprocess.PIPE,
            stdin=subprocess.PIPE)
        for line in proc.stdout.readlines():
            print line
        proc.stdin.close()
        print proc.wait()

        
    time.sleep(180);
