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
              name: 'days',
              range: new Array(31),
              incrementVal: 1
            },
            {
              name: 'weeks',
              range: new Array(52),
              incrementVal: 7
            },
            {
              name: 'months',
              range: new Array(12),
              incrementVal: 30
            }
          ]
        }
      },

      buildxDaysSchedule: function (obj) {
        var arr = [];
        arr.push(obj.startDate);
        arr.push(obj.occur * parseInt(obj.mult));
        return arr;
      }
    }
  }


})();