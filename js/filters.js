'use strict';

(function () {
  var priceMap = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filtersForm = document.querySelector('.map__filters');
  var filtersElements = Array.from(filtersForm.children);

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },

    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },

    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },

    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkListElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  // var filterData = function (data) {
  //   return data.filter(function (item) {
  //     return filtersElements.every(function (filter) {
  //       return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
  //     });
  //   });
  // };

  var filterData = function (data) {
  // Finds data item matching current rules;
  return data.filter( itemMatchesRules );
}

  function itemMatchesRules(item){
    // Проверяем соответствует ли data item всем правилам
    return filtersElements.every(filter => filterMatchesRules(filter, item) );
  }

  function filterMatchesRules(filter, item){
    return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
  }

  var onMapFiltersChange = window.utils.debounce(function () {
    window.map.removePins();
    window.map.closePopup();

    var data = filterData(window.map.getPinsData());
    var pins = window.utils.slicePins(data);
    window.map.renderPins(pins);
  });

  filtersForm.addEventListener('change', onMapFiltersChange);
})();
