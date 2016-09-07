# mblog

    ##博客前端
        - 前端采用的是[jekyll模板](http://jekyllthemes.org/)，说明文档在[这](http://jekyll.bootcss.com/)
        - 模板的作者是Jalpc,[github](https://github.com/Jack614/jalpc_jekyll_theme)
        - 模板自带浏览数统计功能，评论功能使用的是[多说](http://duoshuo.com/)的评论

    ##博客后台
        - 使用的是django1.8.6版本

# 部署步骤（uwsgi+nginx）
    * 目前先进行手动部署，之后再更新ansible一键部署

    ##数据库
        * 创建数据库
            - create database mblog
            - 在settings文件内修改数据库名、用户名和密码
        * 同步数据创建超级用户
            - python manage.py syncdb
            - python manage.py runserver 0.0.0.0:8080(测试是否能启动)

    ##环境部署
        * 安装virtualenv
         - pip install virtualenv
         - 在项目根目录下执行此命令：virtualenv .env
        * 安装pip包
         - 在项目根目录下执行此命令：source .env/bin/activate
         - pip install -r dep/requirment.txt
        * nginx 配置文件
            ```
            server {
                listen       端口;
                server_name 域名;
                charset utf-8;
                access_log  /var/log/nginx/mblog_access.log;
                error_log  /var/log/nginx/mblog_error.log;

                #charset koi8-r;

                #access_log  logs/host.access.log  main;
                location /static{
                alias /project/pro/mblog/mblog/static;（项目静态文件位置）
                access_log      off;
                }

                location / {
                uwsgi_pass    127.0.0.1:8015;（绑定端口）
                include uwsgi_params;
                proxy_read_timeout 120;
                }
                }

            ```
        * uwsgi.py(在manage.py同级目录下添加wsgi文件)
         ```
            import os
            os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mblog.settings")
            application = get_wsgi_application()
         ```

        * mblog.ini(在manage.py同级目录下添加ini文件)
            ```
            [uwsgi]
            uid = root
            gid = root
            socket = 127.0.0.1:8001
            chdir = 项目manage.py文件所在目录
            wsgi-file = uwsgi.py

            master = 1
            processes = 2
            threads = 8
            vacum = True
            pidfile = /tmp/uwsgi.pid
            daemonize = /tmp/uwsgi.log

            ```
        * 编写启动脚本
            # vim /usr/local/bin/mblog
                #!/usr/bin/env bash
                function start(){
                         --ini ini文件所在目录/django.ini
                }
                function stop(){
                        for i in `pgrep `
                                do
                                        kill -9 $i
                                done
                }
                case "$1" in
                        start)
                                start
                                ;;
                        stop)
                                stop
                                ;;
                        restart)
                                stop
                                echo "restarting..........."
                                sleep 1
                                start
                                ;;
                        *)
                                exit 2
                esac
                exit
            # ln -s /usr/local/bin/mblog /usr/bin/mblog
        * 命令说明
         - mblog start
         - mblog restart
         - mblog stop
        * 最后重启nginx，重启mblog
