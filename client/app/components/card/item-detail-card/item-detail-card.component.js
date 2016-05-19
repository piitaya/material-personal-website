(function () {
	'use strict';
	angular
		.module('app')
		.component('itemDetailCard', {
            templateUrl: 'app/components/card/item-detail-card/item-detail-card.html',
            controller: ItemDetailCardComponent,
            controllerAs: "vm",
            bindings: {
                item: "<"
            }
        });

	ItemDetailCardComponent.$inject = [];
    
	function ItemDetailCardComponent() {
		var vm = this;
        
	}
})();