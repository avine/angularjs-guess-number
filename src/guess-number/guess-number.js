
angular.module('guess-number', ['angular-timeline']).component('guessNumber', {
  restrict: 'E',
  controller: ['$element', function($element) {

    // Prevent form to be submitted
    angular.element($element).find('form').on('submit', function (e) {
      e.preventDefault();
    });

    const result = Math.round(Math.random() * 1000);
    const startTime = new Date().getTime();

    // Show the expected in the console (it's for you guys...)
    console.log('Hi guys, the expected result is:', result);

    this.lastResults = [];

    this.submit = () => {
      if (this.lastResults.length >= 5) {
        this.lastResults = [];
      }
      if (this.input) {
        if (this.input !== result) {
          this.lastResults.unshift({
            input: this.input,
            info: this.input > result ? 'is too high' : 'is too low',
            css: this.input > result ? 'danger' : 'warning',
            glyphicon: this.input > result ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down'
          });
        } else {
          this.success = true;
          this.elapsedTime = Math.round((new Date().getTime() - startTime) / 1000);
          this.lastResults.unshift({
            input: this.input,
            info: `You won in ${this.elapsedTime} seconds`,
            css: 'success',
            glyphicon: 'glyphicon-ok'
          });
        }
      }
    };

  }],
  templateUrl: 'guess-number/guess-number.html'
});
