
angular.module('app', []);

angular.module('app').component('guessNumber', {
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
      if (this.input === result) {
        this.success = true;
        this.elapsedTime = Math.round((new Date().getTime() - startTime) / 1000);
        return;
      }
      if (this.lastResults.length >= 5) {
        this.lastResults = [];
      }
      if (this.input) {
        this.lastResults.unshift({
          input: this.input,
          info: this.input > result ? 'too high' : 'too low',
          css: this.input > result ? 'danger' : 'warning'
        });
        this.input = '';
      }
    };

  }],
  templateUrl: 'tmpl/guessNumber.html'
});
