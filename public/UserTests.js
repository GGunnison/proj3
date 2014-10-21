QUnit.asyncTest("testing Login", function(assert){
	expect(1);

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/users/login",
		data: {'username':'Grant', 'password': 'hello'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(res.content.username, 'Grant' );
			QUnit.start();
		}
	});
});

QUnit.asyncTest('login without being in db', function(assert){

	$.ajax({
		type:'POST', 
		url: "http://localhost:3000/users/login",
		data: {'username': "Harry", "password": "potter"},
		error: function(obj){
			assert.equal(1, 1, "We should always succeed  in failing here");
			QUnit.start();
		}
	});
});


QUnit.asyncTest('logout', function(assert){
	$.ajax({
		type:"GET",
		url: "http://localhost:3000/users/logout",
		data: {'username': 'Grant'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(1, 1, "We had a success logging in here");
 			QUnit.start();
		}
	});

});

QUnit.asyncTest('logout while not logged in', function(assert){

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/users/logout",
		data:{'username': "Taylor", 'password': "password"},
		error: function(obj){
			assert.equal(1,1, "We failed to log in");
			QUnit.start();
		}
	});
});

QUnit.asyncTest('add new user', function(assert){

	$.ajax({
		type:"POST",
		url: "http://localhost:3000/users/add",
		data: {'username': "Billy Joel", "password": "mountains", "displayname": "Billy",
		'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(res.content.username, 'Billy Joel')
			QUnit.start();
		}
	});
});

QUnit.asyncTest('add user already made', function(assert){
	$.ajax({
		type:"POST",
		url: "http://localhost:3000/users/add",
		data: {'username': "Billy Joel", "password": "mountains", "displayname": "Billy",
		'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'},
		error: function(obj){
			assert.equal(1, 1, "We expect a failure here")
			QUnit.start();
		}
	});

})
