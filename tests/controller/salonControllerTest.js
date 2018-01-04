http_mocks = require('node-mocks-http')
    , should = require('should')
    , mockery = require('mockery')
    , controller = require('../../app/controller/salonController')

function buildResponse() {
    return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}
var salonController = require('../../app/controller/salonController')

const salon = {
    nom: 'OuestAvenir',
    ville: 'Rennes',
    date_debut: '2015-10-30',
    date_fin: '2016-11-30',
    description: 'forum de l\'ouest',
    id_salon: 'OuestAvenir_2015-10-30_2016-11-30'
};

describe('Salon Controller Tests', function () {
    before(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        })
        console.log('je suis dans le before')

        mockery.registerMock('../../app/persistence/salonPersistence', {
            get: (cb) => cb(null, [
                {
                    "nom": "DevFest",
                    "ville": "Nantes",
                    "date_debut": "2015-10-30",
                    "date_fin": "2016-11-30",
                    "description": "cdscds",
                    "id_salon": "DevFest_2015-10-30_2016-11-30"
                },
                {
                    "nom": "AnjouPerspectives",
                    "ville": "Angers",
                    "date_debut": "2017-11-9",
                    "date_fin": "2017-11-9",
                    "description": "super forum",
                    "id_salon": "AnjouPerspectives_2017-11-9_2017-11-9"
                }
            ]),
            //create: (salon, cb) => cb(null, salon)
        })

        //this.controller = require('../../app/controller/salonController')
        //console.log(this.controller.handle)
        
    })

    after(function () {
        mockery.disable()
    })

    it('get', function (done) {
        var response = buildResponse()
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/salon/list/',
        }, console.log('je suis dans le request'))

        response.on('end', function () {
            response._isJSON().should.be.true
            var data = JSON.parse(response._getData())
            should.not.exist(data.error)
            data.salons.length.should.eql(2)
            data.salons[0].nom.should.eql("DevFest")
            data.salons[1].nom.should.eql("AnjouPerspectives")
            done()
        })
        this.controller.handle(request, response)
    })

    /*it('create', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
          method: 'POST',
          url: '/create',
        })
    
        request.body = {
            nom: 'OuestAvenir',
            ville: 'Rennes',
            date_debut: '2015-10-30',
            date_fin: '2016-11-30',
            description: 'forum de l\'ouest',
            id_salon: 'OuestAvenir_2015-10-30_2016-11-30'
        }
    
        response.on('end', function() {
          response._isJSON().should.be.true
    
          var data = JSON.parse(response._getData())
          should.not.exist(data.error)
          data.salons[0].title.should.eql(request.body.nom)
          done()
        })
    
        this.controller.handle(request, response)
      })*/
})