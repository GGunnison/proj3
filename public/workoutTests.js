
QUnit.asyncTest("testing Login", function(assert){
	expect(1);
	console.log('in first test');

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


QUnit.asyncTest("testing delete", function(assert){
	expect(1);
	console.log('in second tet');

	$.ajax({
		type: "DELETE",
		url: "http://localhost:3000/users/:Grant",
		data: {'username':'Grant', 'password': 'hello'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(1,0);
			QUnit.start();
		}
	});
});


QUnit.asyncTest('add new user', function(assert){
	console.log('in third test');
	$.ajax({
		type:"POST",
		url: "http://localhost:3000/users/add",
		data: {'username': "Robert", "password": "mountains", "displayname": "Billy",
		'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(res.content.username, 'Robert');
			console.log('after first ajax call');
			$.ajax({
				type: "DELETE",
				url: "http://localhost:3000/users/:Robert",
				data: {'username':'Grant', 'password': 'hello'},
				success: function(obj){
					var res = JSON.parse(obj);
					console.log('returned from delete call');
					QUnit.start();
				}
			});

			QUnit.start();
		}
	});
});


/*

			$.ajax({
				type: "POST",
				url: "http://localhost:3000/users/login",
				data: {'username':'Grant', 'password': 'hello'},
				success: function(obj){
					console.log('returned from second ajax call');
					var res = JSON.parse(obj);
					assert.equal(1,1);
					QUnit.start();
				}
			});

*/
