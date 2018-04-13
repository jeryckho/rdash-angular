angular
    .module('KMS')
    .factory('Sheet', ['$http', '$q', 'Template', function ($http, $q, Template) {
        var svc = {
            Template: {},
            Datas: {}
        };

        svc.GetSheet = function (id) {
            return $q(function (resolve, reject) {
                $http.get('data/' + id + '.json').success(function (data) {
                    svc.Datas = data;
                    resolve(svc);
                }).error(function () {
                    svc.Datas = {};
                    reject(svc);
                });
            });
        }

        svc.Get = function (tpl, sht) {
            return Template.Get(tpl)
                .then(function (SvcTpl) {
                    return $q(function (resolve, reject) {
                        $http.get('data/' + sht + '.json').success(function (data) {
                            svc.Template = SvcTpl;
                            svc.Datas = data;
                            resolve(svc);
                        }).error(function () {
                            svc.Datas = {};
                            svc.Template = {};
                            reject(svc);
                        });
                    });
                }, function () {
                    svc.Datas = {};
                    svc.Template = {};
                    return $q.reject(svc);
                });
        }

        svc.Find = function (ref) {
            var reducedA = ref.split('.').reduce(function (obj, i) {
                if (obj != undefined) {
                    return obj[i];
                }
            }, svc.Datas);
            return reducedA;
        }

        svc.Set = function (ref, val) {
            var List = ref.split('.');
            var obj = svc.Datas;
            for (var idx = 0, len = List.length; idx < len - 1; idx++) {
                if (obj[List[idx]] == undefined) {
                    obj[List[idx]] = (List[idx + 1] == parseInt(List[idx + 1], 10)) ? [] : {};
                }
                obj = obj[List[idx]];
            }
            obj[List[List.length - 1]] = val;
        }

        svc.X = function (bx) {
            switch (bx.fer) {
                case 'start':
                    return bx.x;
                case 'end':
                    return bx.x + bx.w;
                default:
                    return bx.x + bx.w / 2;
            }
        }

        return svc;
    }]);
