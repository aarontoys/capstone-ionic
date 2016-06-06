(function () {

  angular
  .module('starter')
  .service('xDaysService', xDaysService);

  // xDaysService.$inject =

  function xDaysService () {
    return {
      freqOpts: function () {
        return {
          selected: null,
          test: 'day',
          options: [
            {
              name: 'day',
              range: new Array(31),
              incrementVal: 1
            },
            {
              name: 'week',
              range: new Array(52),
              incrementVal: 7
            },
            {
              name: 'month',
              range: new Array(12),
              incrementVal: 30
            }
          ]
        }
      },

      buildxDaysSchedule: function (obj) {
        var arr = [];
        arr.push(obj.startDate);
        arr.push(obj.occur * obj.mult);
        return arr;
      }
      
    }
  }


})();