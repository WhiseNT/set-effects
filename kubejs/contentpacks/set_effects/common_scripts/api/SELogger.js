//priority:1000
function Logger() {
    this.level = 0
}
Logger.prototype.log = function(message) {
    if (this.level >= 2) {
        console.log(message)
    }
    
}
Logger.prototype.debug = function(message) {
    if (this.level >= 1) {
        console.log(message)
    }
}
Logger.prototype.warn = function(message) {
    console.warn(message)
}
Logger.prototype.error = function(message) {
    console.error(message)
}
const log = new Logger()
