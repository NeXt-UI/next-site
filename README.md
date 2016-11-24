# NeXt Website

## Development Environment Installation
+ ```npm install --global gulp-cli```
+ ```npm install --only=dev``` to install dependencies

## Build & Go

### Most Used
+ run ```gulp``` in project's root directory to build the website from scratch and start a simple watcher

### Full rebuild
+ ```gulp build-full``` to clean the ```dest``` directory and rebuild the project completely. Automatically used at initial launch with ```gulp```

### Quick Rebuild
+ ```gulp build-fast``` to clean and rebuild everything but vendor files. Used for the simple watcher
