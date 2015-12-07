app.directive('narvarSurvey', function () {
  var controller = function ($scope, $timeout) {
    var Steps = ( function () {
      var step = {
        number: 0,
        order: [],
        next: function () {
          this.number += 1
          this.setType()
        },
        setType: function () {
          $scope.type = this.order[ this.number ]
        }
      }
      function Steps ( steps ) {
        step.order = steps.replace(/ /g,'').split(',')
        step.setType()
      }
      Steps.prototype.next = function () {
        step.next()
      }
      return Steps
    })()
    var steps = new Steps( $scope.steps )
    $scope.stars = {
      description: {
        title: 'How was your delivery?',
        adjectives: [
          'Terrible',
          'Bad',
          'Ok',
          'Good',
          'Excellent'
        ]
      },
      hover: -1,
      record: function ( value ) {
        this.hover = value
        // Timeout to show stars after they are clicked on mobile
        $timeout( function () {
          console.log( "Stars Rating: " + (value + 1) )
          steps.next()
        }, 100)
      }
    }
    $scope.timing = {
      description: {
        title: 'When did your items arrive?',
        adjectives: [
          'Early',
          'On time',
          'Late'
        ]
      },
      record: function ( value ) {
        console.log( "Timing: " + value )
        steps.next()
      }
    }
    $scope.comment = {
      description: {
        title: 'Please, tell us more.',
        placeholder: 'Write your comment here...',
        submit: 'Submit'
      },
      record: function ( value ) {
        console.log( "Comment: " + value )
        steps.next()
      }
    }
    $scope.complete = {
      description: {
        title: 'Thank you!',
        sub: 'Your feedback helps us improve.',
        button: {
          text: 'Continue Shopping',
          href: 'http://corp.narvar.com/'
        }
      }
    }
  }

  return {
    controller: controller,
    scope : {
      steps: '@'
    },
    templateUrl: '../templates/narvar-survey.html'
  }
})
