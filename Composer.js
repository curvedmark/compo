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
	if (this.pending || !this.queue.length) return;
	var fn = this.queue.shift();
	var self = this;
	push.call(this.args, function () {
		self.pending = false;
		self.args = arguments;
		self.runOne()
	});
	this.pending = true;
	fn.apply(undefined, this.args);
};