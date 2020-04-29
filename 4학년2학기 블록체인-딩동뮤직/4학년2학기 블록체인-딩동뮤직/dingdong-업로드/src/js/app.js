App = {
  web3Provider: null,
  contracts: {},


  init: function() {
    $.getJSON('../real-estate.json', function(data) {
      var list = $('#list');
      var template = $('#template');

      for (i = 0; i < data.length; i++) {
        template.find('img').attr('src', data[i].picture);
        template.find('.id').text(data[i].id);
        template.find('.type').text(data[i].type);
        template.find('.area').text(data[i].area);
        template.find('.price').text(data[i].price);
        template.find('audio').attr('src',data[i].mp3); 

        list.append(template.html());
      }
    })

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
	  $.getJSON('RealEstate.json', function(data) {
      App.contracts.RealEstate = TruffleContract(data);
      App.contracts.RealEstate.setProvider(App.web3Provider);
      App.listenToEvents();
    });
  },

  buyRealEstate: function() {	
    var id = $('#id').val();
    var name = $('#name').val();
    var price = $('#price').val();
    var age = $('#age').val();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.RealEstate.deployed().then(function(instance) {
        var nameUtf8Encoded = utf8.encode(name);
        return instance.buyRealEstate(id, web3.toHex(nameUtf8Encoded), age, { from: account, value: price });
      }).then(function() {
        $('#name').val('');
        $('#age').val('');
        $('#buyModal').modal('hide');  
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  loadRealEstates: function() {
    App.contracts.RealEstate.deployed().then(function(instance) {
      return instance.getAllBuyers.call();
    }).then(function(buyers) {
      for (i = 0; i < buyers.length; i++) {
        if (buyers[i] !== '0x0000000000000000000000000000000000000000') {

          //change
          var imgType = $('.panel-realEstate').eq(i).find('img').attr('src').substr(7);

          switch(imgType) {
            case '1.jpg':
              test();
              var audio = new Audio('1.mp3');
              audio.play();
              break;

            case '2.jpg':
              test();
              break;

            case '3.jpg':
              test();
              break;
          }

           
          $('.panel-realEstate').eq(i).find('.btn-buyerInfo').removeAttr('style');


        }
      }
    }).catch(function(err) {
      console.log(err.message);
    })
  },
	
  listenToEvents: function() {
	  App.contracts.RealEstate.deployed().then(function(instance) {
      instance.LogBuyRealEstate({}, { fromBlock: 0, toBlock: 'latest' }).watch(function(error, event) {
        if (!error) {
          $('#events').append('<p>' + event.args._buyer + ' 계정에서 ' + event.args._id + ' 번 음악을 매입했습니다.' + '</p>');
        } else {
          console.error(error);
        }
        App.loadRealEstates();
      })
    })
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });

  $('#buyModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).parent().find('.id').text();
    var price = web3.toWei(parseFloat($(e.relatedTarget).parent().find('.price').text() || 0), "ether");

    $(e.currentTarget).find('#id').val(id);
    $(e.currentTarget).find('#price').val(price);
  });

  $('#buyerInfoModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).parent().find('.id').text();
   
    App.contracts.RealEstate.deployed().then(function(instance) {
      return instance.getBuyerInfo.call(id);
    }).then(function(buyerInfo) {
      $(e.currentTarget).find('#buyerAddress').text(buyerInfo[0]);
      $(e.currentTarget).find('#buyerName').text(web3.toUtf8(buyerInfo[1]));
      $(e.currentTarget).find('#buyerAge').text(buyerInfo[2]);
    }).catch(function(err) {
      console.log(err.message);
    })
  });

});



$(document).ready(function() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
  
  audioElement.addEventListener('ended', function() {
      this.play();
  }, false);
  
  audioElement.addEventListener("canplay",function(){
      $("#length").text("Duration:" + audioElement.duration + " seconds");
      $("#source").text("Source:" + audioElement.src);
      $("#status").text("Status: Ready to play").css("color","green");
  });
  
  audioElement.addEventListener("timeupdate",function(){
      $("#currentTime").text("Current second:" + audioElement.currentTime);
  });
  
  $('#play').click(function() {
      audioElement.play();
      $("#status").text("Status: Playing");
  });
  
  $('#pause').click(function() {
      audioElement.pause();
      $("#status").text("Status: Paused");
  });
  
  $('#restart').click(function() {
      audioElement.currentTime = 0;
  });
});


uploadFile = function() {
  var file = document.getElementById('myFile');
  var filedata = new FormData(); // FormData 인스턴스 생성

  if (!file.value) return; // 파일이 없는 경우 빠져나오기

  filedata.append('uploadfile', file.files[0]);

  var _xml = new XMLHttpRequest();
  _xml.open('POST', '/api/test_upload/', true);
  _xml.onload = function(event) {
    if (_xml.status == 200) {
      alert('Uploaded');
    }
    else {
      alert('Error');
    }
  };

  _xml.send(filedata);
};



