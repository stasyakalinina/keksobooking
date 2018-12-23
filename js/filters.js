'use strict';

(function () {
  var PRICE_LIMIT = {
    low: 10000,
    high: 50000
  };
  var filtersForm = document.querySelector('.map__filters');

  var updatePins = function (ads) {
    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'room',
      'housing-guests': 'guests'
    };
    var filteredAds = ads.slice();
    var selectFilters = filtersForm.querySelectorAll('select');
    var checkboxFilters = filtersForm.querySelectorAll('input[type=checkbox]:checked');

    var filterByValue = function (element, property) {
      return filteredAds.filter(function (ad) {
        return ad.offer[property].toString() === element.value;
      });
    };

    var filterByPrice = function (priceFilter) {
      return filteredAds.filter(function (ad) {
        var priceFilterValues = {
          'low': ad.offer.price < PRICE_LIMIT.low,
          'middle': ad.offer.price >= PRICE_LIMIT.low && ad.offer.price <= PRICE_LIMIT.high,
          'high': ad.offer.price >= PRICE_LIMIT.high
        };
        return priceFilterValues[priceFilter.value];
      });
    };

    var filterByFeatures = function (featuresCheckbox) {
      return filteredAds.filter(function (ad) {
        return ad.offer.features.indexOf(featuresCheckbox.value) >= 0;
      });
    };

    if (selectFilters.length !== null) {
      selectFilters.forEach(function (item) {
        if (item.value !== 'any') {
          // item.value !== 'housing-price' ? filteredAds = filterByValue(item, FilterRules[item.id]) : filteredAds = filterByPrice(item)
          if (item.value !== 'housing-price') {
            filteredAds = filterByValue(item, FilterRules[item.id]);
          } else {
            filteredAds = filterByPrice(item);
          }
        }
      });
    }

    if (checkboxFilters.length !== null) {
      checkboxFilters.forEach(function (item) {
        filteredAds = filterByFeatures(item);
      });
    }

    if (filteredAds.length) {
      window.map.renderPins(filteredAds.slice(0, window.map.pinsLimit));
    }
  };

  var onMapFiltersChange = window.utils.debounce(function () {
    window.map.removePins();
    window.map.closePopup();
    updatePins(window.map.getPinsData());
  });

  filtersForm.addEventListener('change', onMapFiltersChange);

})();
