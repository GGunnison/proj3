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
});

QUnit.asyncTest( 'delete user', function(assert){
	$.ajax({
		type:"DELETE",
		url: "http://localhost:3000/users/Billy Joel",
		data : {},
		success: function(obj){
			assert.equal(1, 1, 'We successfully redirected to the workout page w/ the username')
			QUnit.start();
		}
	});
});

QUnit.asyncTest('delete user that does not exist', function(assert){
	$.ajax({
		type:'DELETE',
		url: "http://localhost:3000/users/Timmy",
		data : {},
		error: function(obj){
			assert.equal(1, 1, 'This should always be true for users that do not exist');
			QUnit.start();
		}
	});
});

QUnit.asyncTest('edit user info', function(assert){
	$.ajax({
		type:'put',
		url: "http://localhost:3000/users/Nick",
		data: {'username': "Nick", "password": "here", "displayname": "Nick",
		'birthday': '05-03-93', "height": "6'1", "weight": 187, 'level': 'pro'},
		success: function(obj){
			var res = JSON.parse(obj)
			console.log(res);
			assert.equal(res.content.password, 'here', 'Verify that the change happened');
			QUnit.start();
		}
	});
});

QUnit.asyncTest('edit without info', function(assert){
	$.ajax({
		type:'put',
		url: "http://localhost:3000/users/Nick",
		data: {'username': "Nick", "displayname": "Nick",
		'birthday': '05-03-93', "height": "6'1", "weight": 187, 'level': 'pro'},
		error: function(obj){
			assert.equal(0,0,'Will throw error without all info');
			QUnit.start();
		}
	});
});

QUnit.asyncTest('edit user info', function(assert){
	$.ajax({
		type:'put',
		url: "http://localhost:3000/users/Bill",
		data: {'username': "Nathan", "password": "here", "displayname": "Nick",
		'birthday': '05-03-93', "height": "6'1", "weight": 187, 'level': 'pro'},
		error: function(obj){
			assert.equal(0,0, 'Verify that the change happened');
			QUnit.start();
		}
	});
});


