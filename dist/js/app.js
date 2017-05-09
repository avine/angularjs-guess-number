
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
    console.log(result);

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
      if (!this.lastResults.includes(this.input)) {
        this.lastResults.unshift({
          input: this.input,
          info: this.input > result ? 'too high' : 'too low'
        });
      }
      this.input = '';
    };

  }],
  templateUrl: 'tmpl/guessNumber.html'
});
