function TaskListController($scope, $http) {

    $scope.tasks = [];

    $scope.init = function () {
        $scope.ListRefresh();
    };

    $scope.addTask = function () {
        $scope.InsertTask($scope.NameModel, $scope.DescriptionModel, $scope.StatusModel, $scope.PriorityModel);
    };

    $scope.deleteTask = function (TaskId) {
        $scope.delTask(TaskId);
    };

    $scope.delTask = function (TaskId) {
        $("#item_" + TaskId).fadeOut();
        $http({ method: 'DELETE', url: '/api/task?id=' + TaskId }).success(function (data) {
            for (var i = 0; i < $scope.tasks.length; i++) {
                var task = $scope.tasks[i];
                if (task.TaskId == TaskId) {
                    var index = $scope.tasks.indexOf(task);
                    console.log("Index: " + index);
                    $scope.tasks.splice(index,1);
                    break;
                }
            }
        });
    };

    $scope.InsertTask = function (name, description, status, priority) {
        $http({ method: 'POST', url: '/api/task', data: { "Name": name, "Description": description, "Status": status, "Priority": priority } }).success(function (data) {
            $scope.tasks.push(data);
        });
    };

    $scope.ListRefresh = function () {
        $scope.tasks = [];
        $http({ method: 'GET', url: '/api/task' }).success(function (data) {
            $scope.tasks = data; 
        });
    };
}
