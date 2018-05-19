C:\windows\system32\inetsrv\appcmd.exe add apppool /name:ikka /PipelineMode:intergrated /ManagedRuntimeVersion:v4.0 /enable32BitAppOnWin64:true

C:\windows\system32\inetsrv\appcmd.exe add app /site.name:"default web site" /app.name:ikka /applicationpool:ikka /physicalpath:"%~dp0builds\development" /path:"/ikka" /enabledprotocols:http,https
