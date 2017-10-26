## 筆記: 如何設定python uwsgi server on nginx
DEMO: http://treeqqq.com/flask

### 步驟
1. 安裝uwsgi
2. 在flask資料夾中設定 filename.ini
```
;include header for using uwsgi
[uwsgi]

;uwsgi server
socket = 127.0.0.1:3031 

;your flask project directory
chdir = /your/path/to/project

; referece: http://uwsgi-docs.readthedocs.io/en/latest/Snippets.html
; tell uWSGI to rewrite PATH_INFO and SCRIPT_NAME according to mount-points
mount = /path = yourfile.py
manage-script-name = true

; generally flask apps expose the 'app' callable instead of 'application'
callable = app

processes = 4
threads = 2

; routing static file to static
route = /yourproject/static/(.*) static:/yourproject/static/$1

```
3. 參考flask的文件將設定寫在nginx.conf
http://flask.pocoo.org/docs/0.12/deploying/uwsgi/#configuring-nginx
這邊的path是寫在ini檔裡的那個path
```
location = /path {
                rewrite ^ /path/;
        }

        location /path {
                try_files $uri @path;
        }

        location @path {
                include uwsgi_params;
                uwsgi_pass 127.0.0.1:3031;
        }
```
4. 把下面的script 寫到/etc/init/uwsgi.conf, 重開server

```
# file: /etc/init/uwsgi.conf
description "uWSGI server"

start on runlevel [2345]
stop on runlevel [!2345]
respawn
exec /usr/local/bin/uwsgi -c /your/path/to/ini_file.ini
```
以上設定參考
http://uwsgi-docs.readthedocs.io/en/latest/Upstart.html
https://stackoverflow.com/questions/23073829/uwsgi-wont-reload-restart-or-let-me-run-service
