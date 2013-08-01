var push = [].push;

module.exports = Composer;

function Composer() {
	this.queue = [];
	this.started = false;
}

Composer.prototype.add = function (fn) {
	this.queue.push(fn);
	if (this.started) this.runOne();
};

Composer.prototype.run = function () {
	this.started = true;
	this.args = arguments;
	this.runOne();
};

Composer.prototype.runOne = function () {
	if (this.running || !this.queue.length) return;
	var fn = this.queue.shift();
	var self = this;
	push.call(this.args, function () {
		self.running = false;
		self.args = arguments;
		self.runOne()
	});
	this.running = true;
	fn.apply(undefined, this.args);
};