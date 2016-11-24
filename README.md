# NeXt Website


## Development Environment
### Requirements
+ Node.js + NPM (latest is welcome). We tested on: Node v5.11.0, NPM v3.10.6
+ Bower, tested on v1.8.0+
+ Python 3.5

### Installation
+ ```npm install --global gulp-cli```
+ ```npm install --only=dev``` to install dependencies
+ ```bower install``` to install Bower dependencies, or ```bower update``` to update all packages

## Build & Go
### Most Used
+ run ```gulp``` in project's root directory to build the website from scratch and start a simple watcher

### Full rebuild
+ ```gulp build-full``` to clean the ```dest``` directory and rebuild the project completely. Automatically used at initial launch with ```gulp```

### Quick Rebuild
+ ```gulp build-fast``` to clean and rebuild everything but vendor files. Used for the simple watcher
