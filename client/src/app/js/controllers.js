'use strict';

/* Controllers */

angular.module('litekmApp.controllers', []).
    controller('MyCtrl1', [function() {

    }])
    .controller('MyCtrl2', [function() {

    }])
    .controller('FileGridController', function($scope,$http) {
        $scope.mySelections = [];
        $scope.myData = [{name: "Moroni", age: 50},
                         {name: "Tiancum", age: 43},
                         {name: "Jacob", age: 27},
                         {name: "Nephi", age: 29},
                         {name: "Enos", age: 34}];
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        }; 
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [250, 500, 1000],
            pageSize: 250,
            currentPage: 1
        };	
        $scope.setPagingData = function(data, page, pageSize){	
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {		
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                    });            
                } else {
                    $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                        $scope.setPagingData(largeLoad,page,pageSize);
                    });
                }
            }, 100);
        };
    	
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    	
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
              $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
              $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);                         
        $scope.gridOptions = { 
            data: 'myData',
            selectedItems: $scope.mySelections,
            multiSelect: false,

            enablePaging: true,
    		showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions          
        };
    })
    .controller('DirTreeController', function($scope) {
    var apple_selected;
    $scope.my_tree_handler = function(branch) {
        var _ref;
        $scope.output = "You selected: " + branch.label;
        if ((_ref = branch.data) != null ? _ref.description : void 0) {
            return $scope.output += '(' + branch.data.description + ')';
        }
    };
    
    apple_selected = function(branch) {
        return $scope.output = "APPLE! : " + branch.label;
    };
    
    $scope.example_treedata = [
    {
        label: 'Animal',
        children: [
        {
            label: 'Dog',
            data: {
                description: "man's best friend"
            }
        }, {
            label: 'Cat',
            data: {
                description: "Felis catus"
            }
        }, {
            label: 'Hippopotamus',
            data: {
                description: "hungry, hungry"
            }
        }, {
            label: 'Chicken',
            children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
        }
        ]
    }, {
      label: 'Vegetable',
      data: {
        definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
        data_can_contain_anything: true
      },
      onSelect: function(branch) {
        return $scope.output = "Vegetable: " + branch.data.definition;
      },
      children: [
        {
          label: 'Oranges'
        }, {
          label: 'Apples',
          children: [
            {
              label: 'Granny Smith',
              onSelect: apple_selected
            }, {
              label: 'Red Delicous',
              onSelect: apple_selected
            }, {
              label: 'Fuji',
              onSelect: apple_selected
            }
          ]
        }
      ]
    }, {
      label: 'Mineral',
      children: [
        {
          label: 'Rock',
          children: ['Igneous', 'Sedimentary', 'Metamorphic']
        }, {
          label: 'Metal',
          children: ['Aluminum', 'Steel', 'Copper']
        }, {
          label: 'Plastic',
          children: [
            {
              label: 'Thermoplastic',
              children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
            }, {
              label: 'Thermosetting Polymer',
              children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
            }
          ]
        }
      ]
    }
  ];
  return $scope.try_changing_the_tree_data = function() {
    return $scope.example_treedata = [
      {
        label: 'North America',
        children: [
          {
            label: 'Canada',
            children: ['Toronto', 'Vancouver']
          }, {
            label: 'USA',
            children: ['New York', 'Los Angeles']
          }, {
            label: 'Mexico',
            children: ['Mexico City', 'Guadalajara']
          }
        ]
      }, {
        label: 'South America',
        children: [
          {
            label: 'Venezuela',
            children: ['Caracas', 'Maracaibo']
          }, {
            label: 'Brazil',
            children: ['Sao Paulo', 'Rio de Janeiro']
          }, {
            label: 'Argentina',
            children: ['Buenos Aires', 'Cordoba']
          }
        ]
      }
    ];
  };
});  