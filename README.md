Node-webkit-packager
====================

A node-webkit Packager developed by itself.

Before build it self, you shold add your <code>nw.exe</code> directory into PATH. Then you can build the packager by:

<pre>node packager.js</pre>

This command will build the tool itself, then you can see the window below:

![image](https://github.com/Lellansin/node-webkit-packager/raw/master/images/window_screen_shot.jpg)

Drop <code>package.json</code> file to the window, then the program will generate the node-webkit packager and run it automatically.

The path of window's top is what you are packaging now, you can call the generate command by <code>[Ctrl+B]</code> easily.

![image](https://github.com/Lellansin/node-webkit-packager/raw/master/images/window_screen_shot_2.jpg)

Node-webkit 打包工具
--------------------

用 node webkit 开发的 node webkit 打包工具。

在使用之前，你需要先将 <code>nw.exe</code> 加入 PATH 环境变量。接着可以通过如下命令生成该工具：

<pre>node packager.js</pre>

运行之后该工具会自动给自身打包，并且显示出主体窗口（如上图所示）。

将 <code>package.json</code> 文件拖到窗口上可以自动打包并运行。最上方的框记录着当前打包的路径，下次可以通过快捷键 <code>[Ctrl+B]</code> 来快速调用。