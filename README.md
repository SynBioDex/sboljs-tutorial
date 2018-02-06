## How to install

First, clone the repository:

`git clone git@github.com:chrisAta/sboljs-tutorial.git`


The single html file for this tutorial interface loads a bundle.js file that was created by using browserify on the main.js file. You therefore don't need to install any dependencies to use the tutorial, although they are listed in the package.json file just in case.

You then have to put the tutorial on something like nginx. First, install nginx:

`sudo apt install nginx`

You then need to add a server to the nginx sites-enabled. For example, create a new .conf file in '/etc/nginx/sites-enabled/' called tutorial.conf and write:

```
server {

        listen 81;
        root /path/to/sboljs-tutorial;
}
```

With the above .conf file, you should then be able to access and use the tutorial at localhost:81/sboljstutorial.html.

## How to make changes


If you want to make changes to the tutorial after installing, go into the sboljs-tutorial directory and install the dependencies located in package.json:

```
cd sboljs-tutorial
npm install
```
Given that the html file loads a bundle.js file, it's recommended you keep it updated with browserify while making your changes.
