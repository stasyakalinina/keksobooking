'use strict';

(function () {
  var PriceLimit = {
    LOW: 10000,
    HIGH: 50000
  };
  var filtersForm = document.querySelector('.map__filters');

  var updatePins = function (ads) {
    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
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
          'low': ad.offer.price < PriceLimit.LOW,
          'middle': ad.offer.price >= PriceLimit.LOW && ad.offer.price <= PriceLimit.HIGH,
          'high': ad.offer.price >= PriceLimit.HIGH
        };
        return priceFilterValues[priceFilter.value];
      });
    };

    var filterByFeatures = function (featuresCheckbox) {
      return filteredAds.filter(function (ad) {
        return ad.offer.features.indexOf(featuresCheckbox.value) >= 0;
      });
    };

    if (selectFilters.length !== null && checkboxFilters.length !== null) {
      selectFilters.forEach(function (item) {
        if (item.value !== 'any') {
          filteredAds = (item.id !== 'housing-price') ? filterByValue(item, FilterRules[item.id]) : filterByPrice(item);
        }
      });
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
