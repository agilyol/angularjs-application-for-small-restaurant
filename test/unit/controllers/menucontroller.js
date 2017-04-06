/**
 * Created by agilyolchuyev on 13/03/2017.
 */
describe('Controller: MenuController', function () {
// load the controllers module
    beforeEach(module('confusionApp'));

    var MenuController, scope, $httpBackend;
    beforeEach(inject(function ($controller,_$httpBackend_, $rootScope, menuFactory) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGet("http://localhost:3000/dishes").respond(
            [
                {
                    "id": 0,
                    "name": "Uthapizza",
                    "image": "images/uthapizza.png",
                    "category": "mains",
                    "label": "Hot",
                    "price": "4.99",
                    "description": "A",
                    "comments":[{}]
                },
                {
                    "id": 1,
                    "name": "Zucchipakoda",
                    "image": "images/zucchipakoda.png",
                    "category": "mains",
                    "label": "New",
                    "price": "4.99",
                    "description": "A",
                    "comments":[{}]
                }
            ]
        );
        scope = $rootScope.$new();
        MenuController = $controller('MenuController',{
            $scope: scope, MenuFactory: menuFactory
        });
            $httpBackend.flush();

    }));
    it('should have showDetails as false', function () {

        expect(scope.showDetails).toBeFalsy();

    });

    it('should create "dishes" with 2 dishes fetched from xhr', function(){

        expect(scope.showMenu).toBeTruthy();
        expect(scope.dishes).toBeDefined();
        expect(scope.dishes.length).toBe(2);

    });

    it('should have the correct data order in the dishes', function() {

        expect(scope.dishes[0].name).toBe("Uthapizza");
        expect(scope.dishes[1].label).toBe("New");

    });

    it('should change the tab selected based on tab clicked', function(){

        expect(scope.tab).toEqual(1);

        scope.select(3);

        expect(scope.tab).toEqual(3);
        expect(scope.filtText).toEqual('mains');

    });
});