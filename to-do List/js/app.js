"use strict";

var App = angular.module("todo", ["LocalStorageModule"]);

App.controller("TodoCtrl", function ($scope, localStorageService) {

	$scope.init = function () {

		if (!localStorageService.get("todoList")) {
			$scope.model = [
				{
					name: "Primary", list: [
						{ taskName: "This is the first task and it is done:))", isDone: true },
						{ taskName: "This is the second task and it is not done :((", isDone: false }
					]
				},
			];
		}else{
			$scope.model = localStorageService.get("todoList");
		}
		$scope.show = "All";
		$scope.currentShow = 0;
	};

	$scope.addTodo = function () {
		
		$scope.model[$scope.currentShow].list.splice(0, 0, {taskName: $scope.newTodo, isDone: false });
		
		$scope.newTodo = "";
	};

	$scope.deleteTodo = function (item) {
		var index = $scope.model[$scope.currentShow].list.indexOf(item);
		$scope.model[$scope.currentShow].list.splice(index, 1);
	};

	$scope.changeTodo = function (i) {
		$scope.currentShow = i;
	};

	/* Filter Function for All | Incomplete | Complete */
	$scope.showFn = function (todo) {
		if ($scope.show === "All") {
			return true;
		}else if(todo.isDone && $scope.show === "Complete"){
			return true;
		}else if(!todo.isDone && $scope.show === "Incomplete"){
			return true;
		}else{
			return false;
		}
	};

	$scope.$watch("model",function (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("todoList",angular.toJson(newVal));
		}
	},true);

});