@echo off
REM Windows ����Ч
REM set PHP_FCGI_CHILDREN=5

REM ÿ�����̴���������������������Ϊ Windows ��������
set PHP_FCGI_MAX_REQUESTS=1000
 
echo Starting PHP FastCGI...
RunHiddenConsole php-cgi.exe -b 127.0.0.1:9000 -c D:/wamp/bin/apache/apache2.2.22/bin/php.ini

echo Statring mysql
RunHiddenConsole net start wampmysqld

echo Starting nginx...
RunHiddenConsole c:/nginx/nginx.exe